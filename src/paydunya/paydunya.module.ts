import { Module } from "@nestjs/common";
import { PaydunyaService } from "./paydunya.service.js";

@Module({
  providers: [PaydunyaService],
  exports: [PaydunyaService],
})
export class PaydunyaModule {}
