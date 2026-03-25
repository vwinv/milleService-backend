import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service.js';
import { ParticulierStatut, Role } from '../../../generated/prisma/client.js';

export interface JwtPayload {
  sub: string;
  email: string;
  role: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'change-me-in-production',
    });
  }

  async validate(payload: JwtPayload) {
    if (!payload?.sub) {
      throw new UnauthorizedException('Token invalide');
    }
    if (payload.role === Role.PARTICULIER) {
      const p = await this.prisma.particulier.findUnique({
        where: { userId: payload.sub },
        select: { statut: true },
      });
      if (p?.statut === ParticulierStatut.INACTIF) {
        throw new UnauthorizedException(
          'Ce compte client a été désactivé. Contactez le support si besoin.',
        );
      }
    }
    return {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
