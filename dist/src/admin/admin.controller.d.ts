import { PrismaService } from '../prisma/prisma.service.js';
import { CurrentUserPayload } from '../auth/decorators/current-user.decorator.js';
import { PrestataireWalletStatut, StatutDocument, StatutVerificationPrestataire } from '../../generated/prisma/client.js';
export declare class AdminController {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    getStats(): Promise<{
        clientsActifs: number;
        prestatairesActifs: number;
        credit: number;
        metiers: number;
    }>;
    getEvolution(months?: string): Promise<{
        months: number;
        labels: string[];
        clients: number[];
        prestataires: number[];
    }>;
    getTransactions(limit?: string): Promise<({
        id: any;
        date: any;
        prestataireNom: any;
        montant: number;
        wallet: string;
        statut: string;
        category: "PAIEMENT_PRESTATION";
    } | {
        id: string;
        date: Date;
        prestataireNom: string;
        montant: number | null;
        wallet: string;
        statut: string;
        category: "RETRAIT_PRESTATAIRE";
    })[]>;
    getClients(limit?: string, offset?: string, search?: string): Promise<{
        stats: {
            total: number;
            actifs: number;
            inactifs: number;
        };
        total: number;
        items: {
            id: string;
            userId: string;
            prenom: string;
            nom: string;
            nomComplet: string;
            email: string;
            telephone: string;
            adresse: string;
            avatarUrl: string | null;
            dateAdhesion: string;
            actif: boolean;
            statut: string;
        }[];
    }>;
    getClientDetails(particulierId: string): Promise<{
        id: string;
        userId: string;
        prenom: string;
        nom: string;
        nomComplet: string;
        email: string;
        telephone: string;
        adresse: string;
        avatarUrl: string | null;
        dateAdhesion: string;
        compteCreeLe: string;
        misAJourLe: string;
        prestationsTotal: number;
        prestationsAnnulees: number;
        actif: boolean;
        statut: string;
    }>;
    setClientActif(particulierId: string, body: {
        actif?: boolean;
    }): Promise<{
        actif: boolean;
        statut: string;
    }>;
    deleteClient(particulierId: string): Promise<{
        success: boolean;
    }>;
    getPrestataires(limit?: string): Promise<{
        stats: {
            total: number;
            actifs: number;
            inactifs: number;
        };
        items: {
            id: string;
            nom: string;
            email: string;
            telephone: string;
            metier: string;
            serviceIds: string[];
            statut: string;
            actif: boolean;
            statutVerification: StatutVerificationPrestataire;
            noteMoyenne: number;
            nbAvis: number;
            documentsTotal: number;
            documentsValides: number;
        }[];
    }>;
    setPrestataireActif(prestataireId: string, body: {
        actif?: boolean;
    }): Promise<{
        id: string;
        actif: boolean;
    }>;
    getPrestatairePaiementsParticuliers(prestataireId: string, limit?: string, offset?: string): Promise<{
        total: number;
        items: {
            id: string;
            date: string;
            montant: number;
            montantNetPrestataire: number;
            clientNom: string;
            serviceLibelle: string;
            prestationId: string | null;
            statut: string;
        }[];
    }>;
    getPrestataireDetails(prestataireId: string): Promise<{
        id: string;
        nom: string;
        email: string;
        telephone: string;
        adresse: string;
        bio: string;
        avatarUrl: string | null;
        actif: boolean;
        statutVerification: StatutVerificationPrestataire;
        dateAdhesion: string;
        metier: string;
        noteMoyenne: number;
        nbAvis: number;
        walletBalance: number;
        walletStatutPrestataire: PrestataireWalletStatut;
        walletBalancePlafond: number | null;
        services: {
            id: string;
            libelle: string;
        }[];
        documents: {
            id: string;
            typeCode: string;
            typeLibelle: string;
            obligatoire: boolean;
            statut: StatutDocument;
            motifRefus: string | null;
            fichierUrl: string;
            nomFichier: string | null;
            updatedAt: Date;
        }[];
    }>;
    patchPrestataireWalletStatut(prestataireId: string, body: {
        statut?: string;
    }): Promise<{
        statutPrestataire: PrestataireWalletStatut;
    }>;
    patchPrestataireWalletPlafond(prestataireId: string, body: {
        montantMax?: number | null;
    }): Promise<{
        balancePlafond: number | null;
    }>;
    deletePrestataireDocument(prestataireId: string, documentId: string): Promise<{
        success: boolean;
    }>;
    validatePrestataireDocument(prestataireId: string, documentId: string, admin: CurrentUserPayload): Promise<{
        ok: boolean;
        documentId: string;
        prestataireId: string;
        statutVerification: "EN_ATTENTE" | "VERIFIE";
    }>;
    rejectPrestataireDocument(prestataireId: string, documentId: string, body: {
        motif?: string;
    }): Promise<{
        ok: boolean;
        documentId: string;
        prestataireId: string;
        statutVerification: "REFUSE";
    }>;
    getServicesForAdmin(): Promise<{
        items: {
            id: string;
            libelle: string;
            slug: string;
            actif: boolean;
            prestatairesCount: number;
        }[];
    }>;
    getPrestatairesByService(serviceId: string): Promise<{
        service: {
            id: string;
            libelle: string;
        };
        items: {
            id: string;
            nom: string;
            email: string;
            telephone: string;
            actif: boolean;
            offreActive: boolean;
            statutVerification: StatutVerificationPrestataire;
        }[];
    }>;
    deleteService(serviceId: string): Promise<{
        ok: boolean;
        id: string;
    }>;
}
