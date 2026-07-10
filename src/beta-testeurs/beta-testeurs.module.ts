import { Module } from "@nestjs/common";
import { BetaTesteursController } from "./beta-testeurs.controller.js";
import { BetaTesteursService } from "./beta-testeurs.service.js";

@Module({
  controllers: [BetaTesteursController],
  providers: [BetaTesteursService],
})
export class BetaTesteursModule {}
