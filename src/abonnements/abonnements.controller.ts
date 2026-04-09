import { Controller, Get, Post, Body, Query, UseGuards } from "@nestjs/common";
import { AbonnementsService } from "./abonnements.service.js";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard.js";
import { RolesGuard } from "../auth/guards/roles.guard.js";
import { Roles } from "../auth/decorators/roles.decorator.js";
import {
  CurrentUser,
  CurrentUserPayload,
} from "../auth/decorators/current-user.decorator.js";
import { SouscrireAbonnementDto } from "./dto/souscrire-abonnement.dto.js";
import {
  SoftPayAbonnementBodyDto,
  SoftPayAbonnementDto,
} from "./dto/softpay-abonnement.dto.js";

@Controller("abonnements")
export class AbonnementsController {
  constructor(private readonly abonnementsService: AbonnementsService) {}

  /** Liste des offres disponibles (public ou protégé selon choix métier). */
  @Get("offres")
  getOffres() {
    return this.abonnementsService.getOffres();
  }

  /** Abonnement actif du prestataire connecté. */
  @Get("courant")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("PRESTATAIRE")
  getCourant(@CurrentUser() user: CurrentUserPayload) {
    return this.abonnementsService.getAbonnementCourant(user.userId);
  }

  /** Souscrire à une offre (prestataire). */
  @Post("souscrire")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("PRESTATAIRE")
  souscrire(
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: SouscrireAbonnementDto,
  ) {
    return this.abonnementsService.souscrire(user.userId, dto.offreId);
  }

  /** Initie un paiement PayDunya pour souscrire (facture + token SoftPay / page checkout). */
  @Post("souscrire/paydunya/init")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("PRESTATAIRE")
  initPaydunya(
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: SouscrireAbonnementDto,
  ) {
    return this.abonnementsService.initPaydunyaCheckout(user.userId, dto.offreId);
  }

  /** Indique si la facture PayDunya (token) a été soldée côté serveur (IPN traité). */
  @Get("souscrire/paydunya/invoice-paid")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("PRESTATAIRE")
  invoicePaid(
    @CurrentUser() user: CurrentUserPayload,
    @Query("invoiceToken") invoiceToken: string,
  ) {
    return this.abonnementsService.isPaydunyaInvoicePaidForPrestataire(
      user.userId,
      invoiceToken ?? "",
    );
  }

  @Post("souscrire/paydunya/softpay")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("PRESTATAIRE")
  softPay(
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: SoftPayAbonnementDto,
  ) {
    return this.abonnementsService.softPayAbonnement(user.userId, dto);
  }

  @Post("souscrire/paydunya/wave")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("PRESTATAIRE")
  payWave(
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: SoftPayAbonnementBodyDto,
  ) {
    return this.abonnementsService.softPayAbonnement(user.userId, {
      ...dto,
      method: "wave_sn",
    });
  }

  @Post("souscrire/paydunya/orange-money")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("PRESTATAIRE")
  payOrangeMoney(
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: SoftPayAbonnementBodyDto,
  ) {
    return this.abonnementsService.softPayAbonnement(user.userId, {
      ...dto,
      method: "orange_money_sn",
    });
  }

  @Post("souscrire/paydunya/free-money")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles("PRESTATAIRE")
  payFreeMoney(
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: SoftPayAbonnementBodyDto,
  ) {
    return this.abonnementsService.softPayAbonnement(user.userId, {
      ...dto,
      method: "free_money_sn",
    });
  }
}
