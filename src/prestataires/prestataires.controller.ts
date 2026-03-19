import { Controller, Get, Post, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { PrestatairesService } from './prestataires.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { RolesGuard } from '../auth/guards/roles.guard.js';
import { Roles } from '../auth/decorators/roles.decorator.js';
import { CurrentUser, CurrentUserPayload } from '../auth/decorators/current-user.decorator.js';
import { FavorisQueryDto } from './dto/favoris-query.dto.js';
import { SearchQueryDto } from './dto/search-query.dto.js';
import { CreateAvisDto } from './dto/create-avis.dto.js';
import { CreatePrestatairePhotoDto } from './dto/create-photo.dto.js';
import { UpdateMePrestataireDto } from './dto/update-me.dto.js';
import { UpdateStatutVerificationPrestataireDto } from './dto/update-statut-verification.dto.js';
import { UpdatePrestataireDocumentsDto } from './dto/update-documents.dto.js';

@Controller('prestataires')
export class PrestatairesController {
  constructor(private readonly prestatairesService: PrestatairesService) {}

  @Post('avis')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PARTICULIER')
  createAvis(
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: CreateAvisDto,
  ) {
    return this.prestatairesService.createOrUpdateAvis(
      user.userId,
      dto.prestataireId,
      dto.note,
      dto.commentaire,
    );
  }

  @Get('favoris')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PARTICULIER')
  getFavoris(
    @CurrentUser() user: CurrentUserPayload,
    @Query() query: FavorisQueryDto,
  ) {
    return this.prestatairesService.getPrestatairesFavoris(
      user.userId,
      query.lat,
      query.lng,
    );
  }

  @Get('search')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PARTICULIER')
  search(
    @CurrentUser() user: CurrentUserPayload,
    @Query() query: SearchQueryDto,
  ) {
    return this.prestatairesService.search(
      user.userId,
      query.serviceId,
      query.tarifMin,
      query.tarifMax,
      query.date,
    );
  }

  /** Stats prestations (en attente + terminées) pour le prestataire connecté. */
  @Get('me/prestation-stats')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PRESTATAIRE')
  getPrestationStats(@CurrentUser() user: CurrentUserPayload) {
    return this.prestatairesService.getPrestationStats(user.userId);
  }

  /** Liste des IDs des services proposés par le prestataire connecté (actifs). */
  @Get('me/services')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PRESTATAIRE')
  getMyServiceIds(@CurrentUser() user: CurrentUserPayload) {
    return this.prestatairesService.getMyServiceIds(user.userId);
  }

  /** Mise à jour des informations de base du prestataire connecté. */
  @Patch('me')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PRESTATAIRE')
  updateMe(
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: UpdateMePrestataireDto,
  ) {
    return this.prestatairesService.updateMe(user.userId, dto);
  }

  // =================== CATALOGUE PHOTOS PRESTATAIRE ===================

  /** Photos du catalogue pour le prestataire connecté. */
  @Get('me/photos')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PRESTATAIRE')
  getMyPhotos(@CurrentUser() user: CurrentUserPayload) {
    return this.prestatairesService.getMyPhotos(user.userId);
  }

  /** Ajoute une photo au catalogue du prestataire connecté. */
  @Post('me/photos')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PRESTATAIRE')
  addPhoto(
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: CreatePrestatairePhotoDto,
  ) {
    return this.prestatairesService.addPhoto(user.userId, dto);
  }

  /** Photos du catalogue pour un prestataire (profil public côté particulier). */
  @Get(':id/photos')
  getPhotosByPrestataire(@Param('id') prestataireId: string) {
    return this.prestatairesService.getPhotosByPrestataire(prestataireId);
  }

  /** Avis des clients sur un prestataire (nom, note, commentaire). */
  @Get(':id/avis')
  getAvisByPrestataire(@Param('id') prestataireId: string) {
    return this.prestatairesService.getAvisByPrestataireId(prestataireId);
  }

  /**
   * Retourne le statut de vérification du prestataire connecté
   * ainsi que le détail de ses documents (statut, motifs, etc.).
   */
  @Get('me/verification-status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PRESTATAIRE')
  getMyVerificationStatus(@CurrentUser() user: CurrentUserPayload) {
    return this.prestatairesService.getMyVerificationStatus(user.userId);
  }

  /**
   * Retourne la liste des documents du prestataire connecté.
   */
  @Get('me/documents')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PRESTATAIRE')
  getMyDocuments(@CurrentUser() user: CurrentUserPayload) {
    return this.prestatairesService.getMyDocuments(user.userId);
  }

  /**
   * Permet au prestataire connecté de renvoyer/mettre à jour ses documents.
   * Met les documents concernés en EN_ATTENTE et repasse le profil en EN_ATTENTE.
   */
  @Patch('me/documents')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PRESTATAIRE')
  updateMyDocuments(
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: UpdatePrestataireDocumentsDto,
  ) {
    return this.prestatairesService.updateMyDocuments(user.userId, dto.documents ?? []);
  }

  /**
   * Mise à jour du statut de vérification d'un prestataire (ADMIN only).
   * Permet à l'admin de passer le prestataire en EN_ATTENTE, VERIFIE ou REFUSE.
   */
  @Patch(':id/statut-verification')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  updateStatutVerification(
    @Param('id') prestataireId: string,
    @Body() dto: UpdateStatutVerificationPrestataireDto,
  ) {
    return this.prestatairesService.updateStatutVerification(
      prestataireId,
      dto.statutVerification,
      dto.motifRefus,
    );
  }
}
