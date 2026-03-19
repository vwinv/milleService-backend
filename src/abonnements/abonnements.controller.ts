import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AbonnementsService } from './abonnements.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { CurrentUser, CurrentUserPayload } from '../auth/decorators/current-user.decorator.js';
import { SouscrireAbonnementDto } from './dto/souscrire-abonnement.dto.js';

@Controller('abonnements')
export class AbonnementsController {
  constructor(private readonly abonnementsService: AbonnementsService) {}

  /** Liste des offres disponibles (public ou protégé selon choix métier). */
  @Get('offres')
  getOffres() {
    return this.abonnementsService.getOffres();
  }

  /** Abonnement actif du prestataire connecté. */
  @Get('courant')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PRESTATAIRE')
  getCourant(@CurrentUser() user: CurrentUserPayload) {
    return this.abonnementsService.getAbonnementCourant(user.userId);
  }

  /** Souscrire à une offre (prestataire). */
  @Post('souscrire')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PRESTATAIRE')
  souscrire(
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: SouscrireAbonnementDto,
  ) {
    return this.abonnementsService.souscrire(user.userId, dto.offreId);
  }
}
