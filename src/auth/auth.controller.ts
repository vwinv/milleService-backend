import { Body, Controller, Post, Patch, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { RefreshTokenDto } from './dto/refresh-token.dto.js';
import { UpdateParticulierDto } from './dto/update-particulier.dto.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { CurrentUser, CurrentUserPayload } from './decorators/current-user.decorator.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Post('refresh')
  refresh(@Body() dto: RefreshTokenDto) {
    return this.authService.refresh(dto.refresh_token);
  }

  /** Désactive le compte de l'utilisateur connecté. */
  @Post('me/deactivate')
  @UseGuards(JwtAuthGuard)
  deactivate(@CurrentUser() user: CurrentUserPayload) {
    return this.authService.deactivateAccount(user.userId);
  }

  /** Mise à jour du profil particulier du compte connecté. */
  @Patch('me/particulier')
  @UseGuards(JwtAuthGuard)
  updateParticulier(
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: UpdateParticulierDto,
  ) {
    return this.authService.updateParticulierProfile(user.userId, dto);
  }

  /** Convertit un compte PARTICULIER en compte PRESTATAIRE (création profil prestataire si besoin). */
  @Post('me/become-prestataire')
  @UseGuards(JwtAuthGuard)
  becomePrestataire(@CurrentUser() user: CurrentUserPayload) {
    return this.authService.becomePrestataire(user.userId);
  }

  /** Convertit un compte PRESTATAIRE en compte PARTICULIER (création profil particulier si besoin). */
  @Post('me/become-particulier')
  @UseGuards(JwtAuthGuard)
  becomeParticulier(@CurrentUser() user: CurrentUserPayload) {
    return this.authService.becomeParticulier(user.userId);
  }
}
