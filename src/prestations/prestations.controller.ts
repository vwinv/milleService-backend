import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { PrestationsService } from './prestations.service.js';
import { CreatePrestationDto } from './dto/create-prestation.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { CurrentUser, CurrentUserPayload } from '../auth/decorators/current-user.decorator.js';

@Controller('prestations')
@UseGuards(JwtAuthGuard)
export class PrestationsController {
  constructor(private readonly prestations: PrestationsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles('PARTICULIER')
  create(@CurrentUser() user: CurrentUserPayload, @Body() dto: CreatePrestationDto) {
    return this.prestations.create(user.userId, dto);
  }

  @Get('me')
  listMine(@CurrentUser() user: CurrentUserPayload) {
    return this.prestations.listForUser(user.userId, user.role as 'PARTICULIER' | 'PRESTATAIRE');
  }

  @Get(':id')
  findById(@CurrentUser() user: CurrentUserPayload, @Param('id') id: string) {
    return this.prestations.findById(id, user.userId, user.role as string);
  }

  @Patch(':id/accepter')
  @UseGuards(RolesGuard)
  @Roles('PRESTATAIRE')
  accepter(@CurrentUser() user: CurrentUserPayload, @Param('id') id: string) {
    return this.prestations.accepter(user.userId, id);
  }

  @Patch(':id/demarrer')
  @UseGuards(RolesGuard)
  @Roles('PRESTATAIRE')
  demarrer(@CurrentUser() user: CurrentUserPayload, @Param('id') id: string) {
    return this.prestations.demarrer(user.userId, id);
  }

  @Patch(':id/refuser')
  @UseGuards(RolesGuard)
  @Roles('PRESTATAIRE')
  refuser(@CurrentUser() user: CurrentUserPayload, @Param('id') id: string) {
    return this.prestations.refuser(user.userId, id);
  }

  @Patch(':id/terminer')
  @UseGuards(RolesGuard)
  @Roles('PRESTATAIRE')
  terminer(@CurrentUser() user: CurrentUserPayload, @Param('id') id: string) {
    return this.prestations.terminer(user.userId, id);
  }

  @Patch(':id/payer')
  @UseGuards(RolesGuard)
  @Roles('PARTICULIER')
  marquerPayee(@CurrentUser() user: CurrentUserPayload, @Param('id') id: string) {
    return this.prestations.marquerPayee(user.userId, id);
  }
}
