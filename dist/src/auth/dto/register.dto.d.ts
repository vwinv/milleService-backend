export declare class RegisterDocumentDto {
    typeCode: string;
    fichierUrl: string;
    nomFichier?: string;
}
export declare class RegisterDto {
    email?: string;
    password: string;
    role: 'PARTICULIER' | 'PRESTATAIRE';
    nom?: string;
    prenom?: string;
    telephone?: string;
    name?: string;
    bio?: string;
    zoneIntervention?: string[];
    adresse?: string;
    latitude?: number;
    longitude?: number;
    documents?: RegisterDocumentDto[];
    serviceIds?: string[];
}
