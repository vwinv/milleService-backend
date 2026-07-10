import { Body, Controller, Post } from "@nestjs/common";
import { BetaTesteursService } from "./beta-testeurs.service.js";
import { CreateBetaTesteurDto } from "./dto/create-beta-testeur.dto.js";

@Controller("beta-testeurs")
export class BetaTesteursController {
  constructor(private readonly betaTesteursService: BetaTesteursService) {}

  /** Inscription testeur bêta (public — landing page). */
  @Post()
  register(@Body() dto: CreateBetaTesteurDto) {
    return this.betaTesteursService.register(dto);
  }
}
