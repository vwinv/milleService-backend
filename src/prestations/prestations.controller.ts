import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from "@nestjs/common";
import { PrestationsService } from "./prestations.service.js";
import { CreatePrestationDto } from "./dto/create-prestation.dto.js";
import { PayerPrestationDto } from "./dto/payer-prestation.dto.js";
import {
  SoftPayPrestationBodyDto,
  SoftPayPrestationDto,
} from "./dto/softpay-prestation.dto.js";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard.js";
import { RolesGuard } from "../auth/guards/roles.guard.js";
import { Roles } from "../auth/decorators/roles.decorator.js";
import {
  CurrentUser,
  CurrentUserPayload,
} from "../auth/decorators/current-user.decorator.js";

@Controller("prestations")
@UseGuards(JwtAuthGuard)
export class PrestationsController {
  constructor(private readonly prestations: PrestationsService) {}

  @Post()
  @UseGuards(RolesGuard)
  @Roles("PARTICULIER")
  create(
    @CurrentUser() user: CurrentUserPayload,
    @Body() dto: CreatePrestationDto,
  ) {
    return this.prestations.create(user.userId, dto);
  }

  @Get("me")
  listMine(@CurrentUser() user: CurrentUserPayload) {
    return this.prestations.listForUser(
      user.userId,
      user.role as "PARTICULIER" | "PRESTATAIRE",
    );
  }

  @Get(":id")
  findById(@CurrentUser() user: CurrentUserPayload, @Param("id") id: string) {
    return this.prestations.findById(id, user.userId, user.role);
  }

  @Patch(":id/accepter")
  @UseGuards(RolesGuard)
  @Roles("PRESTATAIRE")
  accepter(@CurrentUser() user: CurrentUserPayload, @Param("id") id: string) {
    return this.prestations.accepter(user.userId, id);
  }

  @Patch(":id/demarrer")
  @UseGuards(RolesGuard)
  @Roles("PRESTATAIRE")
  demarrer(@CurrentUser() user: CurrentUserPayload, @Param("id") id: string) {
    return this.prestations.demarrer(user.userId, id);
  }

  @Patch(":id/refuser")
  @UseGuards(RolesGuard)
  @Roles("PRESTATAIRE")
  refuser(@CurrentUser() user: CurrentUserPayload, @Param("id") id: string) {
    return this.prestations.refuser(user.userId, id);
  }

  @Patch(":id/terminer")
  @UseGuards(RolesGuard)
  @Roles("PRESTATAIRE")
  terminer(@CurrentUser() user: CurrentUserPayload, @Param("id") id: string) {
    return this.prestations.terminer(user.userId, id);
  }

  @Patch(":id/payer")
  @UseGuards(RolesGuard)
  @Roles("PARTICULIER")
  marquerPayee(
    @CurrentUser() user: CurrentUserPayload,
    @Param("id") id: string,
    @Body() dto: PayerPrestationDto,
  ) {
    return this.prestations.marquerPayee(user.userId, id, dto);
  }

  /** Initie un paiement PayDunya (facture + token SoftPay). Réservé au particulier propriétaire. */
  @Post(":id/paiement/paydunya/init")
  @UseGuards(RolesGuard)
  @Roles("PARTICULIER")
  initPaydunya(
    @CurrentUser() user: CurrentUserPayload,
    @Param("id") id: string,
  ) {
    return this.prestations.initPaydunyaCheckout(user.userId, id);
  }

  /** Paiement mobile (Wave, Orange Money, Free Money) via SoftPay PayDunya Sénégal. */
  @Post(":id/paiement/paydunya/softpay")
  @UseGuards(RolesGuard)
  @Roles("PARTICULIER")
  softPayPrestation(
    @CurrentUser() user: CurrentUserPayload,
    @Param("id") id: string,
    @Body() dto: SoftPayPrestationDto,
  ) {
    return this.prestations.softPayPrestation(user.userId, id, dto);
  }

  /** SoftPay Wave Sénégal → API PayDunya `/api/v1/softpay/wave-senegal`. */
  @Post(":id/paiement/paydunya/wave")
  @UseGuards(RolesGuard)
  @Roles("PARTICULIER")
  payWithWave(
    @CurrentUser() user: CurrentUserPayload,
    @Param("id") id: string,
    @Body() dto: SoftPayPrestationBodyDto,
  ) {
    return this.prestations.softPayPrestation(user.userId, id, {
      ...dto,
      method: "wave_sn",
    });
  }

  /** SoftPay Orange Money Sénégal → `/api/v1/softpay/new-orange-money-senegal`. */
  @Post(":id/paiement/paydunya/orange-money")
  @UseGuards(RolesGuard)
  @Roles("PARTICULIER")
  payWithOrangeMoney(
    @CurrentUser() user: CurrentUserPayload,
    @Param("id") id: string,
    @Body() dto: SoftPayPrestationBodyDto,
  ) {
    return this.prestations.softPayPrestation(user.userId, id, {
      ...dto,
      method: "orange_money_sn",
    });
  }

  /** SoftPay Free Money Sénégal → `/api/v1/softpay/free-money-senegal`. */
  @Post(":id/paiement/paydunya/free-money")
  @UseGuards(RolesGuard)
  @Roles("PARTICULIER")
  payWithFreeMoney(
    @CurrentUser() user: CurrentUserPayload,
    @Param("id") id: string,
    @Body() dto: SoftPayPrestationBodyDto,
  ) {
    return this.prestations.softPayPrestation(user.userId, id, {
      ...dto,
      method: "free_money_sn",
    });
  }

  /**
   * Vérifie chez PayDunya si la facture est payée et enregistre en base (repli IPN).
   */
  @Get(":id/paiement/paydunya/invoice-paid")
  @UseGuards(RolesGuard)
  @Roles("PARTICULIER")
  paydunyaInvoicePaid(
    @CurrentUser() user: CurrentUserPayload,
    @Param("id") id: string,
    @Query("invoiceToken") invoiceToken: string,
  ) {
    return this.prestations.syncPaydunyaPrestationPayment(
      user.userId,
      id,
      invoiceToken ?? "",
    );
  }
}
