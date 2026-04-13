import type { PaydunyaSoftPayResponse, SoftPayCardInput, SoftPayExpressoSenegalInput, SoftPayFreeMoneySenegalInput, SoftPayMoovBeninInput, SoftPayMoovBurkinaInput, SoftPayMoovCiInput, SoftPayMoovMaliInput, SoftPayMoovTogoInput, SoftPayMtnBeninInput, SoftPayMtnCamerounInput, SoftPayMtnCiInput, SoftPayOrangeMoneyBurkinaInput, SoftPayOrangeMoneyCiInput, SoftPayOrangeMoneyMaliInput, SoftPayOrangeMoneySenegalInput, SoftPayPaydunyaWalletInput, SoftPayTMoneyTogoInput, SoftPayWaveCiInput, SoftPayWaveSenegalInput, SoftPayWizallSenegalConfirmInput, SoftPayWizallSenegalInput } from "./paydunya-softpay.types.js";
export type CreatePaydunyaInvoiceInput = {
    totalAmountFcfa: number;
    description: string;
    storeName: string;
    callbackUrl: string;
    returnUrl?: string;
    cancelUrl?: string;
    customData: Record<string, string | number | boolean | null | undefined>;
};
export type CreatePaydunyaInvoiceResult = {
    checkoutUrl: string;
    invoiceToken: string;
    responseCode: string;
    responseText: string;
};
export declare class PaydunyaService {
    private readonly logger;
    private masterKey;
    private privateKey;
    private token;
    private baseUrl;
    private paydunyaAuthHeaders;
    private parseSoftPayResponse;
    softPayPost(path: string, body: Record<string, unknown>): Promise<PaydunyaSoftPayResponse>;
    isConfigured(): boolean;
    verifyIpnHash(receivedHash: string | undefined | null): boolean;
    createCheckoutInvoice(input: CreatePaydunyaInvoiceInput): Promise<CreatePaydunyaInvoiceResult>;
    softPayCard(input: SoftPayCardInput): Promise<PaydunyaSoftPayResponse>;
    softPayOrangeMoneySenegal(input: SoftPayOrangeMoneySenegalInput): Promise<PaydunyaSoftPayResponse>;
    softPayFreeMoneySenegal(input: SoftPayFreeMoneySenegalInput): Promise<PaydunyaSoftPayResponse>;
    softPayExpressoSenegal(input: SoftPayExpressoSenegalInput): Promise<PaydunyaSoftPayResponse>;
    softPayWaveSenegal(input: SoftPayWaveSenegalInput): Promise<PaydunyaSoftPayResponse>;
    softPayWizallSenegal(input: SoftPayWizallSenegalInput): Promise<PaydunyaSoftPayResponse>;
    softPayWizallSenegalConfirm(input: SoftPayWizallSenegalConfirmInput): Promise<PaydunyaSoftPayResponse>;
    softPayOrangeMoneyCi(input: SoftPayOrangeMoneyCiInput): Promise<PaydunyaSoftPayResponse>;
    softPayMtnCi(input: SoftPayMtnCiInput): Promise<PaydunyaSoftPayResponse>;
    softPayMoovCi(input: SoftPayMoovCiInput): Promise<PaydunyaSoftPayResponse>;
    softPayWaveCi(input: SoftPayWaveCiInput): Promise<PaydunyaSoftPayResponse>;
    softPayOrangeMoneyBurkina(input: SoftPayOrangeMoneyBurkinaInput): Promise<PaydunyaSoftPayResponse>;
    softPayMoovBurkina(input: SoftPayMoovBurkinaInput): Promise<PaydunyaSoftPayResponse>;
    softPayMoovBenin(input: SoftPayMoovBeninInput): Promise<PaydunyaSoftPayResponse>;
    softPayMtnBenin(input: SoftPayMtnBeninInput): Promise<PaydunyaSoftPayResponse>;
    softPayTMoneyTogo(input: SoftPayTMoneyTogoInput): Promise<PaydunyaSoftPayResponse>;
    softPayMoovTogo(input: SoftPayMoovTogoInput): Promise<PaydunyaSoftPayResponse>;
    softPayOrangeMoneyMali(input: SoftPayOrangeMoneyMaliInput): Promise<PaydunyaSoftPayResponse>;
    softPayMoovMali(input: SoftPayMoovMaliInput): Promise<PaydunyaSoftPayResponse>;
    softPayMtnCameroun(input: SoftPayMtnCamerounInput): Promise<PaydunyaSoftPayResponse>;
    softPayPaydunyaWallet(input: SoftPayPaydunyaWalletInput): Promise<PaydunyaSoftPayResponse>;
    private disburseCallbackUrl;
    private parseDisburseSubmitOutcome;
    disburseGetInvoice(params: {
        account_alias: string;
        amount: number;
        withdraw_mode: string;
        callback_url: string;
        debit_account_number?: string;
    }): Promise<{
        disburse_token: string;
    }>;
    disburseSubmitInvoice(params: {
        disburse_invoice: string;
        disburse_id?: string;
    }): Promise<Record<string, unknown>>;
    disbursePush(params: {
        account_alias: string;
        amountFcfa: number;
        withdraw_mode: string;
        disburse_id?: string;
    }): Promise<{
        outcome: "success" | "pending" | "failed";
        disburseToken: string;
        transactionId?: string;
        responseText?: string;
        rawResponse: Record<string, unknown>;
    }>;
}
