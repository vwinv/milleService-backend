import { PrismaService } from '../prisma/prisma.service.js';
import { CurrentUserPayload } from '../auth/decorators/current-user.decorator.js';
import { NotificationsService } from '../notifications/notifications.service.js';
import { PrestataireWalletStatut, Role, StatutDocument, StatutVerificationPrestataire, WithdrawalMethod, WithdrawalStatus } from '../../generated/prisma/client.js';
export declare class AdminController {
    private readonly prisma;
    private readonly notifications;
    private readonly logger;
    constructor(prisma: PrismaService, notifications: NotificationsService);
    getStats(): Promise<{
        clientsActifs: number;
        prestatairesActifs: number;
        credit: number;
        metiers: number;
    }>;
    createGeneralNotification(body: {
        title: string;
        body?: string;
        type?: string;
        data?: Record<string, unknown>;
        audience?: 'TOUT' | 'ALL' | 'PARTICULIER' | 'PRESTATAIRE';
    }): Promise<{
        ok: boolean;
        sent: number;
    }>;
    createTargetedNotification(body: {
        userId: string;
        title: string;
        body?: string;
        type?: string;
        data?: Record<string, unknown>;
    }): Promise<{
        ok: boolean;
    }>;
    listAdminNotifications(limit?: string, offset?: string, audience?: string, unreadOnly?: string, type?: string, search?: string): Promise<{
        total: number;
        items: {
            id: string;
            createdAt: string;
            lu: boolean;
            title: string;
            body: string | null;
            type: string | null;
            userId: string;
            userEmail: string;
            userRole: Role;
            displayName: string;
        }[];
    }>;
    getEvolution(months?: string): Promise<{
        months: number;
        labels: string[];
        clients: number[];
        prestataires: number[];
    }>;
    getWalletSummary(): Promise<{
        totalSolde: number;
        credit: number;
        soldeMilleServices: number;
        soldesPrestataires: number;
        retraitTotal: number;
    }>;
    listWithdrawalRequests(limit?: string, offset?: string): Promise<{
        total: number;
        items: {
            id: string;
            date: string;
            prestataireId: string;
            prestataireNom: string;
            montant: number | null;
            wallet: string;
            method: WithdrawalMethod;
            status: WithdrawalStatus;
        }[];
    }>;
    decisionWithdrawalRequest(id: string, body: {
        decision?: string;
        payoutMethod?: WithdrawalMethod;
    }): Promise<{
        ok: boolean;
        status: "REFUSE";
    } | {
        ok: boolean;
        status: "TRAITE";
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
            userId: string;
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
            createdAt: string;
            prestatairesCount: number;
        }[];
    }>;
    createService(body: {
        libelle?: string;
    }): Promise<{
        id: string;
        libelle: string;
        slug: string;
        actif: boolean;
        createdAt: string;
        prestatairesCount: number;
    }>;
    updateService(serviceId: string, body: {
        actif?: boolean;
        libelle?: string;
    }): Promise<{
        id: string;
        libelle: string;
        slug: string;
        actif: boolean;
        createdAt: string;
        prestatairesCount: number;
    }>;
    private slugifyServiceLabel;
    private ensureUniqueServiceSlug;
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
