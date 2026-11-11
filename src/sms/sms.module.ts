import { Module } from "@nestjs/common";
import { YasSmsService } from "./yas-sms.service.js";

@Module({
  providers: [YasSmsService],
  exports: [YasSmsService],
})
export class SmsModule {}
