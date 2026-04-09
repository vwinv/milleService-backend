export declare function hourlyTarifFromServiceCatalog(tarifs: string | null | undefined): number | null;
export declare function resolveHourlyTarifForPrestation(ps: {
    tarifHoraire?: unknown;
    service?: {
        tarifs?: string | null;
    } | null;
} | null | undefined): number | null;
