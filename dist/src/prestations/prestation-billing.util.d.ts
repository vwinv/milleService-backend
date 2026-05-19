export declare const PRESTATION_SERVICE_FEE_FCFA = 500;
export declare const PRESTATION_TRAVEL_FEE_FCFA = 2000;
export declare function computePlatformTakePrestationFcfa(baseWorkFcfa: number, serviceFeeFcfa: number, rate: number): number;
export declare function executionHoursFromPrestationDates(input: {
    startedAt?: Date | null;
    acceptedAt?: Date | null;
    completedAt: Date | null;
    createdAt: Date;
    useNowAsEndIfOpen?: boolean;
}): number;
export declare function computePrestationTotalToChargeFcfa(tarifHoraire: number, executionHours: number): number;
