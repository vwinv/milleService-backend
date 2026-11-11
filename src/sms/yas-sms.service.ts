import { Injectable, Logger } from "@nestjs/common";

const DEFAULT_YAS_SMS_URL =
  "https://api.yasbusiness.sn/sms/1/text/single";
const DEFAULT_TIMEOUT_MS = 10_000;

@Injectable()
export class YasSmsService {
  private readonly logger = new Logger(YasSmsService.name);

  async send(to: string | null | undefined, text: string): Promise<boolean> {
    const authorization = process.env.YAS_SMS_AUTHORIZATION?.trim();
    if (!authorization) {
      this.logger.warn(
        "SMS Yas non envoyé : variable YAS_SMS_AUTHORIZATION absente.",
      );
      return false;
    }

    const recipient = this.normalizeSenegalPhone(to);
    if (!recipient) {
      this.logger.warn("SMS Yas non envoyé : numéro prestataire invalide.");
      return false;
    }

    const url = process.env.YAS_SMS_API_URL?.trim() || DEFAULT_YAS_SMS_URL;
    const sender = process.env.YAS_SMS_SENDER?.trim() || "yas";
    const timeoutMs = this.readTimeoutMs();

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: authorization,
        },
        body: JSON.stringify({
          from: sender,
          to: recipient,
          text: this.truncate(text.trim(), 160),
        }),
        signal: AbortSignal.timeout(timeoutMs),
      });

      const responseBody = await response.text();
      if (!response.ok) {
        this.logger.warn(
          `SMS Yas refusé HTTP ${response.status}: ${this.safeLogBody(responseBody)}`,
        );
        return false;
      }

      this.logger.log(
        `SMS Yas envoyé au numéro se terminant par ${recipient.slice(-4)}.`,
      );
      return true;
    } catch (error) {
      this.logger.warn(
        `Échec envoi SMS Yas: ${error instanceof Error ? error.message : String(error)}`,
      );
      return false;
    }
  }

  private normalizeSenegalPhone(value: string | null | undefined): string | null {
    const digits = (value ?? "").replace(/\D/g, "");
    const normalized =
      digits.length === 9
        ? `221${digits}`
        : digits.startsWith("00221")
          ? digits.slice(2)
          : digits;

    return /^221\d{9}$/.test(normalized) ? normalized : null;
  }

  private readTimeoutMs(): number {
    const configured = Number(process.env.YAS_SMS_TIMEOUT_MS);
    return Number.isFinite(configured) && configured > 0
      ? configured
      : DEFAULT_TIMEOUT_MS;
  }

  private truncate(value: string, maxLength: number): string {
    return value.length <= maxLength
      ? value
      : `${value.slice(0, maxLength - 1).trimEnd()}…`;
  }

  private safeLogBody(value: string): string {
    const compact = value.replace(/\s+/g, " ").trim();
    return compact ? compact.slice(0, 300) : "(réponse vide)";
  }
}
