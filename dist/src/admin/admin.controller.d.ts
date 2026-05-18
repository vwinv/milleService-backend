import { PrismaService } from "../prisma/prisma.service.js";
import { CurrentUserPayload } from "../auth/decorators/current-user.decorator.js";
import { NotificationsService } from "../notifications/notifications.service.js";
import { WalletsService } from "../wallets/wallets.service.js";
import { PaydunyaService } from "../paydunya/paydunya.service.js";
import { AbonnementsService } from "../abonnements/abonnements.service.js";
import { AuthService } from "../auth/auth.service.js";
import { RegisterDto } from "../auth/dto/register.dto.js";
import { AdminRenouvelerAbonnementDto } from "../abonnements/dto/admin-renouveler-abonnement.dto.js";
import { PrestataireWalletStatut, Role, StatutDocument, StatutPrestation, StatutVerificationPrestataire, WithdrawalMethod, WithdrawalStatus } from "../../generated/prisma/client.js";
export declare class AdminController {
    private readonly prisma;
    private readonly notifications;
    private readonly wallets;
    private readonly paydunya;
    private readonly abonnements;
    private readonly auth;
    private readonly logger;
    constructor(prisma: PrismaService, notifications: NotificationsService, wallets: WalletsService, paydunya: PaydunyaService, abonnements: AbonnementsService, auth: AuthService);
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
        audience?: "TOUT" | "ALL" | "PARTICULIER" | "PRESTATAIRE";
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
    withdrawGeneralWallet(admin: CurrentUserPayload, body: {
        amount?: number;
        payoutMethod?: WithdrawalMethod;
        note?: string;
        payWithPaydunya?: boolean;
        accountAlias?: string;
    }): Promise<{
        ok: true;
        paydunya: true;
    } | {
        ok: true;
        paydunya?: undefined;
    }>;
    listWithdrawalRequests(limit?: string, offset?: string): Promise<{
        total: number;
        items: {
            id: string;
            date: string;
            prestataireId: string;
            prestataireNom: string;
            prestataireTelephone: string | null;
            montant: number | null;
            wallet: string;
            method: WithdrawalMethod;
            status: WithdrawalStatus;
        }[];
    }>;
    decisionWithdrawalRequest(id: string, body: {
        decision?: string;
        payoutMethod?: WithdrawalMethod;
        payWithPaydunya?: boolean;
        accountAlias?: string;
    }): Promise<{
        ok: boolean;
        status: "REFUSE";
        paydunyaStatus?: undefined;
        message?: undefined;
    } | {
        ok: boolean;
        status: "EN_ATTENTE";
        paydunyaStatus: "pending";
        message: string;
    } | {
        ok: boolean;
        status: "TRAITE";
        paydunyaStatus: "success";
        message?: undefined;
    } | {
        ok: boolean;
        status: "TRAITE";
        paydunyaStatus?: undefined;
        message?: undefined;
    }>;
    getTransactions(limit?: string): Promise<({
        id: any;
        date: any;
        prestataireNom: string;
        montant: number;
        wallet: string;
        statut: string;
        category: "RETRAIT_PLATEFORME";
    } | {
        id: any;
        date: any;
        prestataireNom: string;
        montant: number;
        wallet: string;
        statut: string;
        category: "PAIEMENT_ABONNEMENT";
    } | {
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
    createPrestataireFromAdmin(dto: RegisterDto): Promise<{
        id: string;
        email: string;
        role: Role;
        prestataireId: string | undefined;
        nom: string | undefined;
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
    getDemandesMilleServices(limit?: string, offset?: string, statutFilter?: string): Promise<{
        stats: {
            total: number;
            enAttente: number;
            acceptee: number;
            enCours: number;
            terminee: number;
            payee: number;
            refusee: number;
            annulee: number;
        };
        total: number;
        items: {
            id: string;
            statut: StatutPrestation;
            statutLabel: string;
            typeDeTache: string | null;
            description: string | null;
            budget: number | null;
            adresse: string | null;
            createdAt: string;
            updatedAt: string;
            serviceLibelle: string;
            particulier: {
                id: string;
                nomComplet: string;
                telephone: string | null;
            };
            prestataire: {
                id: string;
                nom: string;
                telephone: string | null;
            };
        }[];
    }>;
    getServicesForAdmin(): Promise<{
        items: {
            id: string;
            libelle: string;
            slug: string;
            tarif: number | null;
            actif: boolean;
            createdAt: string;
            prestatairesCount: number;
        }[];
    }>;
    createService(body: {
        libelle?: string;
        tarif?: number | string;
    }): Promise<{
        id: string;
        libelle: string;
        slug: string;
        tarif: number | null;
        actif: boolean;
        createdAt: string;
        prestatairesCount: number;
    }>;
    updateService(serviceId: string, body: {
        actif?: boolean;
        libelle?: string;
        tarif?: number | string | null;
    }): Promise<{
        id: string;
        libelle: string;
        slug: string;
        tarif: number | null;
        actif: boolean;
        createdAt: string;
        prestatairesCount: number;
    }>;
    private parsePositiveTarif;
    private parseServiceTarifValue;
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
    getOffresForAdmin(): Promise<{
        items: {
            id: string;
            code: string;
            libelle: string;
            description: string;
            prix: number;
            dureeMois: number;
            actif: boolean;
            ordre: number;
            createdAt: string;
        }[];
    }>;
    createOffre(body: {
        code?: string;
        libelle?: string;
        description?: string;
        prix?: number;
        dureeMois?: number;
        ordre?: number;
    }): Promise<{
        id: string;
        code: string;
        libelle: string;
        description: string;
        prix: number;
        dureeMois: number;
        actif: boolean;
        ordre: number;
        createdAt: string;
    }>;
    updateOffre(offreId: string, body: {
        actif?: boolean;
        code?: string;
        libelle?: string;
        description?: string;
        prix?: number;
        dureeMois?: number;
        ordre?: number;
    }): Promise<{
        id: string;
        code: string;
        libelle: string;
        description: string;
        prix: number;
        dureeMois: number;
        actif: boolean;
        ordre: number;
        createdAt: string;
    }>;
    listAbonnements(statut?: string, search?: string, limit?: string, offset?: string): Promise<{
        stats: {
            total: number;
            actifs: number;
            expires: number;
        };
        total: number;
        items: {
            id: string;
            prestataireId: string;
            prestataireNom: string;
            prestataireEmail: string;
            offreId: string;
            offreLibelle: string;
            offreCode: string;
            offrePrix: number;
            dureeMois: number;
            dateDebut: string;
            dateFin: string;
            statut: import("../../generated/prisma/enums.js").StatutAbonnement;
            statutAffichage: "ACTIF" | "EXPIRE" | "ANNULE";
            createdAt: string;
        }[];
    }>;
    abonnementPaydunyaInvoicePaid(prestataireId: string, invoiceToken: string): Promise<{
        paid: boolean;
        abonnement?: Awaited<ReturnType<any>>;
    }>;
    enregistrerPaiementAbonnement(prestataireId: string, body: AdminRenouvelerAbonnementDto, user: CurrentUserPayload): Promise<{
        paymentStatus: "completed";
        method: "cash";
        id: string;
        prestataireId: string;
        dateDebut: string;
        dateFin: string;
        statut: import("../../generated/prisma/enums.js").StatutAbonnement;
        statutAffichage: "ACTIF" | "EXPIRE" | "ANNULE";
        offre: {
            prix: number;
            id: string;
            code: string;
            libelle: string;
            dureeMois: number;
        };
    } | {
        paymentStatus: "pending_payment";
        method: "wave_sn" | "orange_money_sn";
        amountFcfa: number;
        invoiceToken: string;
        checkoutUrl: string;
        message: string;
        softPay: {
            url: string | undefined;
            other_url: {
                om_url?: string;
                maxit_url?: string;
            } | undefined;
            return_url: string | undefined;
            message: string | undefined;
            fees: number | undefined;
            currency: string | undefined;
        };
    }>;
    expirerAbonnement(abonnementId: string): Promise<{
        id: string;
        statut: import("../../generated/prisma/enums.js").StatutAbonnement;
        statutAffichage: "ACTIF" | "EXPIRE" | "ANNULE";
    }>;
    private ensureUniqueOffreCode;
}
