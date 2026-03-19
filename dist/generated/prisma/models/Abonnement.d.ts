import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type AbonnementModel = runtime.Types.Result.DefaultSelection<Prisma.$AbonnementPayload>;
export type AggregateAbonnement = {
    _count: AbonnementCountAggregateOutputType | null;
    _min: AbonnementMinAggregateOutputType | null;
    _max: AbonnementMaxAggregateOutputType | null;
};
export type AbonnementMinAggregateOutputType = {
    id: string | null;
    prestataireId: string | null;
    offreId: string | null;
    dateDebut: Date | null;
    dateFin: Date | null;
    statut: $Enums.StatutAbonnement | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AbonnementMaxAggregateOutputType = {
    id: string | null;
    prestataireId: string | null;
    offreId: string | null;
    dateDebut: Date | null;
    dateFin: Date | null;
    statut: $Enums.StatutAbonnement | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type AbonnementCountAggregateOutputType = {
    id: number;
    prestataireId: number;
    offreId: number;
    dateDebut: number;
    dateFin: number;
    statut: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type AbonnementMinAggregateInputType = {
    id?: true;
    prestataireId?: true;
    offreId?: true;
    dateDebut?: true;
    dateFin?: true;
    statut?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AbonnementMaxAggregateInputType = {
    id?: true;
    prestataireId?: true;
    offreId?: true;
    dateDebut?: true;
    dateFin?: true;
    statut?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type AbonnementCountAggregateInputType = {
    id?: true;
    prestataireId?: true;
    offreId?: true;
    dateDebut?: true;
    dateFin?: true;
    statut?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type AbonnementAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AbonnementWhereInput;
    orderBy?: Prisma.AbonnementOrderByWithRelationInput | Prisma.AbonnementOrderByWithRelationInput[];
    cursor?: Prisma.AbonnementWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AbonnementCountAggregateInputType;
    _min?: AbonnementMinAggregateInputType;
    _max?: AbonnementMaxAggregateInputType;
};
export type GetAbonnementAggregateType<T extends AbonnementAggregateArgs> = {
    [P in keyof T & keyof AggregateAbonnement]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAbonnement[P]> : Prisma.GetScalarType<T[P], AggregateAbonnement[P]>;
};
export type AbonnementGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AbonnementWhereInput;
    orderBy?: Prisma.AbonnementOrderByWithAggregationInput | Prisma.AbonnementOrderByWithAggregationInput[];
    by: Prisma.AbonnementScalarFieldEnum[] | Prisma.AbonnementScalarFieldEnum;
    having?: Prisma.AbonnementScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AbonnementCountAggregateInputType | true;
    _min?: AbonnementMinAggregateInputType;
    _max?: AbonnementMaxAggregateInputType;
};
export type AbonnementGroupByOutputType = {
    id: string;
    prestataireId: string;
    offreId: string;
    dateDebut: Date;
    dateFin: Date;
    statut: $Enums.StatutAbonnement;
    createdAt: Date;
    updatedAt: Date;
    _count: AbonnementCountAggregateOutputType | null;
    _min: AbonnementMinAggregateOutputType | null;
    _max: AbonnementMaxAggregateOutputType | null;
};
type GetAbonnementGroupByPayload<T extends AbonnementGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AbonnementGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AbonnementGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AbonnementGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AbonnementGroupByOutputType[P]>;
}>>;
export type AbonnementWhereInput = {
    AND?: Prisma.AbonnementWhereInput | Prisma.AbonnementWhereInput[];
    OR?: Prisma.AbonnementWhereInput[];
    NOT?: Prisma.AbonnementWhereInput | Prisma.AbonnementWhereInput[];
    id?: Prisma.StringFilter<"Abonnement"> | string;
    prestataireId?: Prisma.StringFilter<"Abonnement"> | string;
    offreId?: Prisma.StringFilter<"Abonnement"> | string;
    dateDebut?: Prisma.DateTimeFilter<"Abonnement"> | Date | string;
    dateFin?: Prisma.DateTimeFilter<"Abonnement"> | Date | string;
    statut?: Prisma.EnumStatutAbonnementFilter<"Abonnement"> | $Enums.StatutAbonnement;
    createdAt?: Prisma.DateTimeFilter<"Abonnement"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Abonnement"> | Date | string;
    prestataire?: Prisma.XOR<Prisma.PrestataireScalarRelationFilter, Prisma.PrestataireWhereInput>;
    offre?: Prisma.XOR<Prisma.OffreScalarRelationFilter, Prisma.OffreWhereInput>;
    walletTransactions?: Prisma.WalletTransactionListRelationFilter;
};
export type AbonnementOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    offreId?: Prisma.SortOrder;
    dateDebut?: Prisma.SortOrder;
    dateFin?: Prisma.SortOrder;
    statut?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    prestataire?: Prisma.PrestataireOrderByWithRelationInput;
    offre?: Prisma.OffreOrderByWithRelationInput;
    walletTransactions?: Prisma.WalletTransactionOrderByRelationAggregateInput;
};
export type AbonnementWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.AbonnementWhereInput | Prisma.AbonnementWhereInput[];
    OR?: Prisma.AbonnementWhereInput[];
    NOT?: Prisma.AbonnementWhereInput | Prisma.AbonnementWhereInput[];
    prestataireId?: Prisma.StringFilter<"Abonnement"> | string;
    offreId?: Prisma.StringFilter<"Abonnement"> | string;
    dateDebut?: Prisma.DateTimeFilter<"Abonnement"> | Date | string;
    dateFin?: Prisma.DateTimeFilter<"Abonnement"> | Date | string;
    statut?: Prisma.EnumStatutAbonnementFilter<"Abonnement"> | $Enums.StatutAbonnement;
    createdAt?: Prisma.DateTimeFilter<"Abonnement"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Abonnement"> | Date | string;
    prestataire?: Prisma.XOR<Prisma.PrestataireScalarRelationFilter, Prisma.PrestataireWhereInput>;
    offre?: Prisma.XOR<Prisma.OffreScalarRelationFilter, Prisma.OffreWhereInput>;
    walletTransactions?: Prisma.WalletTransactionListRelationFilter;
}, "id">;
export type AbonnementOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    offreId?: Prisma.SortOrder;
    dateDebut?: Prisma.SortOrder;
    dateFin?: Prisma.SortOrder;
    statut?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.AbonnementCountOrderByAggregateInput;
    _max?: Prisma.AbonnementMaxOrderByAggregateInput;
    _min?: Prisma.AbonnementMinOrderByAggregateInput;
};
export type AbonnementScalarWhereWithAggregatesInput = {
    AND?: Prisma.AbonnementScalarWhereWithAggregatesInput | Prisma.AbonnementScalarWhereWithAggregatesInput[];
    OR?: Prisma.AbonnementScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AbonnementScalarWhereWithAggregatesInput | Prisma.AbonnementScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Abonnement"> | string;
    prestataireId?: Prisma.StringWithAggregatesFilter<"Abonnement"> | string;
    offreId?: Prisma.StringWithAggregatesFilter<"Abonnement"> | string;
    dateDebut?: Prisma.DateTimeWithAggregatesFilter<"Abonnement"> | Date | string;
    dateFin?: Prisma.DateTimeWithAggregatesFilter<"Abonnement"> | Date | string;
    statut?: Prisma.EnumStatutAbonnementWithAggregatesFilter<"Abonnement"> | $Enums.StatutAbonnement;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Abonnement"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Abonnement"> | Date | string;
};
export type AbonnementCreateInput = {
    id?: string;
    dateDebut: Date | string;
    dateFin: Date | string;
    statut?: $Enums.StatutAbonnement;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    prestataire: Prisma.PrestataireCreateNestedOneWithoutAbonnementsInput;
    offre: Prisma.OffreCreateNestedOneWithoutAbonnementsInput;
    walletTransactions?: Prisma.WalletTransactionCreateNestedManyWithoutAbonnementInput;
};
export type AbonnementUncheckedCreateInput = {
    id?: string;
    prestataireId: string;
    offreId: string;
    dateDebut: Date | string;
    dateFin: Date | string;
    statut?: $Enums.StatutAbonnement;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    walletTransactions?: Prisma.WalletTransactionUncheckedCreateNestedManyWithoutAbonnementInput;
};
export type AbonnementUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dateDebut?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dateFin?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    statut?: Prisma.EnumStatutAbonnementFieldUpdateOperationsInput | $Enums.StatutAbonnement;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    prestataire?: Prisma.PrestataireUpdateOneRequiredWithoutAbonnementsNestedInput;
    offre?: Prisma.OffreUpdateOneRequiredWithoutAbonnementsNestedInput;
    walletTransactions?: Prisma.WalletTransactionUpdateManyWithoutAbonnementNestedInput;
};
export type AbonnementUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    prestataireId?: Prisma.StringFieldUpdateOperationsInput | string;
    offreId?: Prisma.StringFieldUpdateOperationsInput | string;
    dateDebut?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dateFin?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    statut?: Prisma.EnumStatutAbonnementFieldUpdateOperationsInput | $Enums.StatutAbonnement;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    walletTransactions?: Prisma.WalletTransactionUncheckedUpdateManyWithoutAbonnementNestedInput;
};
export type AbonnementCreateManyInput = {
    id?: string;
    prestataireId: string;
    offreId: string;
    dateDebut: Date | string;
    dateFin: Date | string;
    statut?: $Enums.StatutAbonnement;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AbonnementUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dateDebut?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dateFin?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    statut?: Prisma.EnumStatutAbonnementFieldUpdateOperationsInput | $Enums.StatutAbonnement;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AbonnementUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    prestataireId?: Prisma.StringFieldUpdateOperationsInput | string;
    offreId?: Prisma.StringFieldUpdateOperationsInput | string;
    dateDebut?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dateFin?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    statut?: Prisma.EnumStatutAbonnementFieldUpdateOperationsInput | $Enums.StatutAbonnement;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AbonnementListRelationFilter = {
    every?: Prisma.AbonnementWhereInput;
    some?: Prisma.AbonnementWhereInput;
    none?: Prisma.AbonnementWhereInput;
};
export type AbonnementOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AbonnementCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    offreId?: Prisma.SortOrder;
    dateDebut?: Prisma.SortOrder;
    dateFin?: Prisma.SortOrder;
    statut?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AbonnementMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    offreId?: Prisma.SortOrder;
    dateDebut?: Prisma.SortOrder;
    dateFin?: Prisma.SortOrder;
    statut?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AbonnementMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    offreId?: Prisma.SortOrder;
    dateDebut?: Prisma.SortOrder;
    dateFin?: Prisma.SortOrder;
    statut?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type AbonnementNullableScalarRelationFilter = {
    is?: Prisma.AbonnementWhereInput | null;
    isNot?: Prisma.AbonnementWhereInput | null;
};
export type AbonnementCreateNestedManyWithoutPrestataireInput = {
    create?: Prisma.XOR<Prisma.AbonnementCreateWithoutPrestataireInput, Prisma.AbonnementUncheckedCreateWithoutPrestataireInput> | Prisma.AbonnementCreateWithoutPrestataireInput[] | Prisma.AbonnementUncheckedCreateWithoutPrestataireInput[];
    connectOrCreate?: Prisma.AbonnementCreateOrConnectWithoutPrestataireInput | Prisma.AbonnementCreateOrConnectWithoutPrestataireInput[];
    createMany?: Prisma.AbonnementCreateManyPrestataireInputEnvelope;
    connect?: Prisma.AbonnementWhereUniqueInput | Prisma.AbonnementWhereUniqueInput[];
};
export type AbonnementUncheckedCreateNestedManyWithoutPrestataireInput = {
    create?: Prisma.XOR<Prisma.AbonnementCreateWithoutPrestataireInput, Prisma.AbonnementUncheckedCreateWithoutPrestataireInput> | Prisma.AbonnementCreateWithoutPrestataireInput[] | Prisma.AbonnementUncheckedCreateWithoutPrestataireInput[];
    connectOrCreate?: Prisma.AbonnementCreateOrConnectWithoutPrestataireInput | Prisma.AbonnementCreateOrConnectWithoutPrestataireInput[];
    createMany?: Prisma.AbonnementCreateManyPrestataireInputEnvelope;
    connect?: Prisma.AbonnementWhereUniqueInput | Prisma.AbonnementWhereUniqueInput[];
};
export type AbonnementUpdateManyWithoutPrestataireNestedInput = {
    create?: Prisma.XOR<Prisma.AbonnementCreateWithoutPrestataireInput, Prisma.AbonnementUncheckedCreateWithoutPrestataireInput> | Prisma.AbonnementCreateWithoutPrestataireInput[] | Prisma.AbonnementUncheckedCreateWithoutPrestataireInput[];
    connectOrCreate?: Prisma.AbonnementCreateOrConnectWithoutPrestataireInput | Prisma.AbonnementCreateOrConnectWithoutPrestataireInput[];
    upsert?: Prisma.AbonnementUpsertWithWhereUniqueWithoutPrestataireInput | Prisma.AbonnementUpsertWithWhereUniqueWithoutPrestataireInput[];
    createMany?: Prisma.AbonnementCreateManyPrestataireInputEnvelope;
    set?: Prisma.AbonnementWhereUniqueInput | Prisma.AbonnementWhereUniqueInput[];
    disconnect?: Prisma.AbonnementWhereUniqueInput | Prisma.AbonnementWhereUniqueInput[];
    delete?: Prisma.AbonnementWhereUniqueInput | Prisma.AbonnementWhereUniqueInput[];
    connect?: Prisma.AbonnementWhereUniqueInput | Prisma.AbonnementWhereUniqueInput[];
    update?: Prisma.AbonnementUpdateWithWhereUniqueWithoutPrestataireInput | Prisma.AbonnementUpdateWithWhereUniqueWithoutPrestataireInput[];
    updateMany?: Prisma.AbonnementUpdateManyWithWhereWithoutPrestataireInput | Prisma.AbonnementUpdateManyWithWhereWithoutPrestataireInput[];
    deleteMany?: Prisma.AbonnementScalarWhereInput | Prisma.AbonnementScalarWhereInput[];
};
export type AbonnementUncheckedUpdateManyWithoutPrestataireNestedInput = {
    create?: Prisma.XOR<Prisma.AbonnementCreateWithoutPrestataireInput, Prisma.AbonnementUncheckedCreateWithoutPrestataireInput> | Prisma.AbonnementCreateWithoutPrestataireInput[] | Prisma.AbonnementUncheckedCreateWithoutPrestataireInput[];
    connectOrCreate?: Prisma.AbonnementCreateOrConnectWithoutPrestataireInput | Prisma.AbonnementCreateOrConnectWithoutPrestataireInput[];
    upsert?: Prisma.AbonnementUpsertWithWhereUniqueWithoutPrestataireInput | Prisma.AbonnementUpsertWithWhereUniqueWithoutPrestataireInput[];
    createMany?: Prisma.AbonnementCreateManyPrestataireInputEnvelope;
    set?: Prisma.AbonnementWhereUniqueInput | Prisma.AbonnementWhereUniqueInput[];
    disconnect?: Prisma.AbonnementWhereUniqueInput | Prisma.AbonnementWhereUniqueInput[];
    delete?: Prisma.AbonnementWhereUniqueInput | Prisma.AbonnementWhereUniqueInput[];
    connect?: Prisma.AbonnementWhereUniqueInput | Prisma.AbonnementWhereUniqueInput[];
    update?: Prisma.AbonnementUpdateWithWhereUniqueWithoutPrestataireInput | Prisma.AbonnementUpdateWithWhereUniqueWithoutPrestataireInput[];
    updateMany?: Prisma.AbonnementUpdateManyWithWhereWithoutPrestataireInput | Prisma.AbonnementUpdateManyWithWhereWithoutPrestataireInput[];
    deleteMany?: Prisma.AbonnementScalarWhereInput | Prisma.AbonnementScalarWhereInput[];
};
export type AbonnementCreateNestedManyWithoutOffreInput = {
    create?: Prisma.XOR<Prisma.AbonnementCreateWithoutOffreInput, Prisma.AbonnementUncheckedCreateWithoutOffreInput> | Prisma.AbonnementCreateWithoutOffreInput[] | Prisma.AbonnementUncheckedCreateWithoutOffreInput[];
    connectOrCreate?: Prisma.AbonnementCreateOrConnectWithoutOffreInput | Prisma.AbonnementCreateOrConnectWithoutOffreInput[];
    createMany?: Prisma.AbonnementCreateManyOffreInputEnvelope;
    connect?: Prisma.AbonnementWhereUniqueInput | Prisma.AbonnementWhereUniqueInput[];
};
export type AbonnementUncheckedCreateNestedManyWithoutOffreInput = {
    create?: Prisma.XOR<Prisma.AbonnementCreateWithoutOffreInput, Prisma.AbonnementUncheckedCreateWithoutOffreInput> | Prisma.AbonnementCreateWithoutOffreInput[] | Prisma.AbonnementUncheckedCreateWithoutOffreInput[];
    connectOrCreate?: Prisma.AbonnementCreateOrConnectWithoutOffreInput | Prisma.AbonnementCreateOrConnectWithoutOffreInput[];
    createMany?: Prisma.AbonnementCreateManyOffreInputEnvelope;
    connect?: Prisma.AbonnementWhereUniqueInput | Prisma.AbonnementWhereUniqueInput[];
};
export type AbonnementUpdateManyWithoutOffreNestedInput = {
    create?: Prisma.XOR<Prisma.AbonnementCreateWithoutOffreInput, Prisma.AbonnementUncheckedCreateWithoutOffreInput> | Prisma.AbonnementCreateWithoutOffreInput[] | Prisma.AbonnementUncheckedCreateWithoutOffreInput[];
    connectOrCreate?: Prisma.AbonnementCreateOrConnectWithoutOffreInput | Prisma.AbonnementCreateOrConnectWithoutOffreInput[];
    upsert?: Prisma.AbonnementUpsertWithWhereUniqueWithoutOffreInput | Prisma.AbonnementUpsertWithWhereUniqueWithoutOffreInput[];
    createMany?: Prisma.AbonnementCreateManyOffreInputEnvelope;
    set?: Prisma.AbonnementWhereUniqueInput | Prisma.AbonnementWhereUniqueInput[];
    disconnect?: Prisma.AbonnementWhereUniqueInput | Prisma.AbonnementWhereUniqueInput[];
    delete?: Prisma.AbonnementWhereUniqueInput | Prisma.AbonnementWhereUniqueInput[];
    connect?: Prisma.AbonnementWhereUniqueInput | Prisma.AbonnementWhereUniqueInput[];
    update?: Prisma.AbonnementUpdateWithWhereUniqueWithoutOffreInput | Prisma.AbonnementUpdateWithWhereUniqueWithoutOffreInput[];
    updateMany?: Prisma.AbonnementUpdateManyWithWhereWithoutOffreInput | Prisma.AbonnementUpdateManyWithWhereWithoutOffreInput[];
    deleteMany?: Prisma.AbonnementScalarWhereInput | Prisma.AbonnementScalarWhereInput[];
};
export type AbonnementUncheckedUpdateManyWithoutOffreNestedInput = {
    create?: Prisma.XOR<Prisma.AbonnementCreateWithoutOffreInput, Prisma.AbonnementUncheckedCreateWithoutOffreInput> | Prisma.AbonnementCreateWithoutOffreInput[] | Prisma.AbonnementUncheckedCreateWithoutOffreInput[];
    connectOrCreate?: Prisma.AbonnementCreateOrConnectWithoutOffreInput | Prisma.AbonnementCreateOrConnectWithoutOffreInput[];
    upsert?: Prisma.AbonnementUpsertWithWhereUniqueWithoutOffreInput | Prisma.AbonnementUpsertWithWhereUniqueWithoutOffreInput[];
    createMany?: Prisma.AbonnementCreateManyOffreInputEnvelope;
    set?: Prisma.AbonnementWhereUniqueInput | Prisma.AbonnementWhereUniqueInput[];
    disconnect?: Prisma.AbonnementWhereUniqueInput | Prisma.AbonnementWhereUniqueInput[];
    delete?: Prisma.AbonnementWhereUniqueInput | Prisma.AbonnementWhereUniqueInput[];
    connect?: Prisma.AbonnementWhereUniqueInput | Prisma.AbonnementWhereUniqueInput[];
    update?: Prisma.AbonnementUpdateWithWhereUniqueWithoutOffreInput | Prisma.AbonnementUpdateWithWhereUniqueWithoutOffreInput[];
    updateMany?: Prisma.AbonnementUpdateManyWithWhereWithoutOffreInput | Prisma.AbonnementUpdateManyWithWhereWithoutOffreInput[];
    deleteMany?: Prisma.AbonnementScalarWhereInput | Prisma.AbonnementScalarWhereInput[];
};
export type EnumStatutAbonnementFieldUpdateOperationsInput = {
    set?: $Enums.StatutAbonnement;
};
export type AbonnementCreateNestedOneWithoutWalletTransactionsInput = {
    create?: Prisma.XOR<Prisma.AbonnementCreateWithoutWalletTransactionsInput, Prisma.AbonnementUncheckedCreateWithoutWalletTransactionsInput>;
    connectOrCreate?: Prisma.AbonnementCreateOrConnectWithoutWalletTransactionsInput;
    connect?: Prisma.AbonnementWhereUniqueInput;
};
export type AbonnementUpdateOneWithoutWalletTransactionsNestedInput = {
    create?: Prisma.XOR<Prisma.AbonnementCreateWithoutWalletTransactionsInput, Prisma.AbonnementUncheckedCreateWithoutWalletTransactionsInput>;
    connectOrCreate?: Prisma.AbonnementCreateOrConnectWithoutWalletTransactionsInput;
    upsert?: Prisma.AbonnementUpsertWithoutWalletTransactionsInput;
    disconnect?: Prisma.AbonnementWhereInput | boolean;
    delete?: Prisma.AbonnementWhereInput | boolean;
    connect?: Prisma.AbonnementWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.AbonnementUpdateToOneWithWhereWithoutWalletTransactionsInput, Prisma.AbonnementUpdateWithoutWalletTransactionsInput>, Prisma.AbonnementUncheckedUpdateWithoutWalletTransactionsInput>;
};
export type AbonnementCreateWithoutPrestataireInput = {
    id?: string;
    dateDebut: Date | string;
    dateFin: Date | string;
    statut?: $Enums.StatutAbonnement;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    offre: Prisma.OffreCreateNestedOneWithoutAbonnementsInput;
    walletTransactions?: Prisma.WalletTransactionCreateNestedManyWithoutAbonnementInput;
};
export type AbonnementUncheckedCreateWithoutPrestataireInput = {
    id?: string;
    offreId: string;
    dateDebut: Date | string;
    dateFin: Date | string;
    statut?: $Enums.StatutAbonnement;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    walletTransactions?: Prisma.WalletTransactionUncheckedCreateNestedManyWithoutAbonnementInput;
};
export type AbonnementCreateOrConnectWithoutPrestataireInput = {
    where: Prisma.AbonnementWhereUniqueInput;
    create: Prisma.XOR<Prisma.AbonnementCreateWithoutPrestataireInput, Prisma.AbonnementUncheckedCreateWithoutPrestataireInput>;
};
export type AbonnementCreateManyPrestataireInputEnvelope = {
    data: Prisma.AbonnementCreateManyPrestataireInput | Prisma.AbonnementCreateManyPrestataireInput[];
    skipDuplicates?: boolean;
};
export type AbonnementUpsertWithWhereUniqueWithoutPrestataireInput = {
    where: Prisma.AbonnementWhereUniqueInput;
    update: Prisma.XOR<Prisma.AbonnementUpdateWithoutPrestataireInput, Prisma.AbonnementUncheckedUpdateWithoutPrestataireInput>;
    create: Prisma.XOR<Prisma.AbonnementCreateWithoutPrestataireInput, Prisma.AbonnementUncheckedCreateWithoutPrestataireInput>;
};
export type AbonnementUpdateWithWhereUniqueWithoutPrestataireInput = {
    where: Prisma.AbonnementWhereUniqueInput;
    data: Prisma.XOR<Prisma.AbonnementUpdateWithoutPrestataireInput, Prisma.AbonnementUncheckedUpdateWithoutPrestataireInput>;
};
export type AbonnementUpdateManyWithWhereWithoutPrestataireInput = {
    where: Prisma.AbonnementScalarWhereInput;
    data: Prisma.XOR<Prisma.AbonnementUpdateManyMutationInput, Prisma.AbonnementUncheckedUpdateManyWithoutPrestataireInput>;
};
export type AbonnementScalarWhereInput = {
    AND?: Prisma.AbonnementScalarWhereInput | Prisma.AbonnementScalarWhereInput[];
    OR?: Prisma.AbonnementScalarWhereInput[];
    NOT?: Prisma.AbonnementScalarWhereInput | Prisma.AbonnementScalarWhereInput[];
    id?: Prisma.StringFilter<"Abonnement"> | string;
    prestataireId?: Prisma.StringFilter<"Abonnement"> | string;
    offreId?: Prisma.StringFilter<"Abonnement"> | string;
    dateDebut?: Prisma.DateTimeFilter<"Abonnement"> | Date | string;
    dateFin?: Prisma.DateTimeFilter<"Abonnement"> | Date | string;
    statut?: Prisma.EnumStatutAbonnementFilter<"Abonnement"> | $Enums.StatutAbonnement;
    createdAt?: Prisma.DateTimeFilter<"Abonnement"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Abonnement"> | Date | string;
};
export type AbonnementCreateWithoutOffreInput = {
    id?: string;
    dateDebut: Date | string;
    dateFin: Date | string;
    statut?: $Enums.StatutAbonnement;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    prestataire: Prisma.PrestataireCreateNestedOneWithoutAbonnementsInput;
    walletTransactions?: Prisma.WalletTransactionCreateNestedManyWithoutAbonnementInput;
};
export type AbonnementUncheckedCreateWithoutOffreInput = {
    id?: string;
    prestataireId: string;
    dateDebut: Date | string;
    dateFin: Date | string;
    statut?: $Enums.StatutAbonnement;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    walletTransactions?: Prisma.WalletTransactionUncheckedCreateNestedManyWithoutAbonnementInput;
};
export type AbonnementCreateOrConnectWithoutOffreInput = {
    where: Prisma.AbonnementWhereUniqueInput;
    create: Prisma.XOR<Prisma.AbonnementCreateWithoutOffreInput, Prisma.AbonnementUncheckedCreateWithoutOffreInput>;
};
export type AbonnementCreateManyOffreInputEnvelope = {
    data: Prisma.AbonnementCreateManyOffreInput | Prisma.AbonnementCreateManyOffreInput[];
    skipDuplicates?: boolean;
};
export type AbonnementUpsertWithWhereUniqueWithoutOffreInput = {
    where: Prisma.AbonnementWhereUniqueInput;
    update: Prisma.XOR<Prisma.AbonnementUpdateWithoutOffreInput, Prisma.AbonnementUncheckedUpdateWithoutOffreInput>;
    create: Prisma.XOR<Prisma.AbonnementCreateWithoutOffreInput, Prisma.AbonnementUncheckedCreateWithoutOffreInput>;
};
export type AbonnementUpdateWithWhereUniqueWithoutOffreInput = {
    where: Prisma.AbonnementWhereUniqueInput;
    data: Prisma.XOR<Prisma.AbonnementUpdateWithoutOffreInput, Prisma.AbonnementUncheckedUpdateWithoutOffreInput>;
};
export type AbonnementUpdateManyWithWhereWithoutOffreInput = {
    where: Prisma.AbonnementScalarWhereInput;
    data: Prisma.XOR<Prisma.AbonnementUpdateManyMutationInput, Prisma.AbonnementUncheckedUpdateManyWithoutOffreInput>;
};
export type AbonnementCreateWithoutWalletTransactionsInput = {
    id?: string;
    dateDebut: Date | string;
    dateFin: Date | string;
    statut?: $Enums.StatutAbonnement;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    prestataire: Prisma.PrestataireCreateNestedOneWithoutAbonnementsInput;
    offre: Prisma.OffreCreateNestedOneWithoutAbonnementsInput;
};
export type AbonnementUncheckedCreateWithoutWalletTransactionsInput = {
    id?: string;
    prestataireId: string;
    offreId: string;
    dateDebut: Date | string;
    dateFin: Date | string;
    statut?: $Enums.StatutAbonnement;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AbonnementCreateOrConnectWithoutWalletTransactionsInput = {
    where: Prisma.AbonnementWhereUniqueInput;
    create: Prisma.XOR<Prisma.AbonnementCreateWithoutWalletTransactionsInput, Prisma.AbonnementUncheckedCreateWithoutWalletTransactionsInput>;
};
export type AbonnementUpsertWithoutWalletTransactionsInput = {
    update: Prisma.XOR<Prisma.AbonnementUpdateWithoutWalletTransactionsInput, Prisma.AbonnementUncheckedUpdateWithoutWalletTransactionsInput>;
    create: Prisma.XOR<Prisma.AbonnementCreateWithoutWalletTransactionsInput, Prisma.AbonnementUncheckedCreateWithoutWalletTransactionsInput>;
    where?: Prisma.AbonnementWhereInput;
};
export type AbonnementUpdateToOneWithWhereWithoutWalletTransactionsInput = {
    where?: Prisma.AbonnementWhereInput;
    data: Prisma.XOR<Prisma.AbonnementUpdateWithoutWalletTransactionsInput, Prisma.AbonnementUncheckedUpdateWithoutWalletTransactionsInput>;
};
export type AbonnementUpdateWithoutWalletTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dateDebut?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dateFin?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    statut?: Prisma.EnumStatutAbonnementFieldUpdateOperationsInput | $Enums.StatutAbonnement;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    prestataire?: Prisma.PrestataireUpdateOneRequiredWithoutAbonnementsNestedInput;
    offre?: Prisma.OffreUpdateOneRequiredWithoutAbonnementsNestedInput;
};
export type AbonnementUncheckedUpdateWithoutWalletTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    prestataireId?: Prisma.StringFieldUpdateOperationsInput | string;
    offreId?: Prisma.StringFieldUpdateOperationsInput | string;
    dateDebut?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dateFin?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    statut?: Prisma.EnumStatutAbonnementFieldUpdateOperationsInput | $Enums.StatutAbonnement;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AbonnementCreateManyPrestataireInput = {
    id?: string;
    offreId: string;
    dateDebut: Date | string;
    dateFin: Date | string;
    statut?: $Enums.StatutAbonnement;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AbonnementUpdateWithoutPrestataireInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dateDebut?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dateFin?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    statut?: Prisma.EnumStatutAbonnementFieldUpdateOperationsInput | $Enums.StatutAbonnement;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    offre?: Prisma.OffreUpdateOneRequiredWithoutAbonnementsNestedInput;
    walletTransactions?: Prisma.WalletTransactionUpdateManyWithoutAbonnementNestedInput;
};
export type AbonnementUncheckedUpdateWithoutPrestataireInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    offreId?: Prisma.StringFieldUpdateOperationsInput | string;
    dateDebut?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dateFin?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    statut?: Prisma.EnumStatutAbonnementFieldUpdateOperationsInput | $Enums.StatutAbonnement;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    walletTransactions?: Prisma.WalletTransactionUncheckedUpdateManyWithoutAbonnementNestedInput;
};
export type AbonnementUncheckedUpdateManyWithoutPrestataireInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    offreId?: Prisma.StringFieldUpdateOperationsInput | string;
    dateDebut?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dateFin?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    statut?: Prisma.EnumStatutAbonnementFieldUpdateOperationsInput | $Enums.StatutAbonnement;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AbonnementCreateManyOffreInput = {
    id?: string;
    prestataireId: string;
    dateDebut: Date | string;
    dateFin: Date | string;
    statut?: $Enums.StatutAbonnement;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type AbonnementUpdateWithoutOffreInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    dateDebut?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dateFin?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    statut?: Prisma.EnumStatutAbonnementFieldUpdateOperationsInput | $Enums.StatutAbonnement;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    prestataire?: Prisma.PrestataireUpdateOneRequiredWithoutAbonnementsNestedInput;
    walletTransactions?: Prisma.WalletTransactionUpdateManyWithoutAbonnementNestedInput;
};
export type AbonnementUncheckedUpdateWithoutOffreInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    prestataireId?: Prisma.StringFieldUpdateOperationsInput | string;
    dateDebut?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dateFin?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    statut?: Prisma.EnumStatutAbonnementFieldUpdateOperationsInput | $Enums.StatutAbonnement;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    walletTransactions?: Prisma.WalletTransactionUncheckedUpdateManyWithoutAbonnementNestedInput;
};
export type AbonnementUncheckedUpdateManyWithoutOffreInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    prestataireId?: Prisma.StringFieldUpdateOperationsInput | string;
    dateDebut?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    dateFin?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    statut?: Prisma.EnumStatutAbonnementFieldUpdateOperationsInput | $Enums.StatutAbonnement;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AbonnementCountOutputType = {
    walletTransactions: number;
};
export type AbonnementCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    walletTransactions?: boolean | AbonnementCountOutputTypeCountWalletTransactionsArgs;
};
export type AbonnementCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AbonnementCountOutputTypeSelect<ExtArgs> | null;
};
export type AbonnementCountOutputTypeCountWalletTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WalletTransactionWhereInput;
};
export type AbonnementSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    prestataireId?: boolean;
    offreId?: boolean;
    dateDebut?: boolean;
    dateFin?: boolean;
    statut?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
    offre?: boolean | Prisma.OffreDefaultArgs<ExtArgs>;
    walletTransactions?: boolean | Prisma.Abonnement$walletTransactionsArgs<ExtArgs>;
    _count?: boolean | Prisma.AbonnementCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["abonnement"]>;
export type AbonnementSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    prestataireId?: boolean;
    offreId?: boolean;
    dateDebut?: boolean;
    dateFin?: boolean;
    statut?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
    offre?: boolean | Prisma.OffreDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["abonnement"]>;
export type AbonnementSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    prestataireId?: boolean;
    offreId?: boolean;
    dateDebut?: boolean;
    dateFin?: boolean;
    statut?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
    offre?: boolean | Prisma.OffreDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["abonnement"]>;
export type AbonnementSelectScalar = {
    id?: boolean;
    prestataireId?: boolean;
    offreId?: boolean;
    dateDebut?: boolean;
    dateFin?: boolean;
    statut?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type AbonnementOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "prestataireId" | "offreId" | "dateDebut" | "dateFin" | "statut" | "createdAt" | "updatedAt", ExtArgs["result"]["abonnement"]>;
export type AbonnementInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
    offre?: boolean | Prisma.OffreDefaultArgs<ExtArgs>;
    walletTransactions?: boolean | Prisma.Abonnement$walletTransactionsArgs<ExtArgs>;
    _count?: boolean | Prisma.AbonnementCountOutputTypeDefaultArgs<ExtArgs>;
};
export type AbonnementIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
    offre?: boolean | Prisma.OffreDefaultArgs<ExtArgs>;
};
export type AbonnementIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
    offre?: boolean | Prisma.OffreDefaultArgs<ExtArgs>;
};
export type $AbonnementPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Abonnement";
    objects: {
        prestataire: Prisma.$PrestatairePayload<ExtArgs>;
        offre: Prisma.$OffrePayload<ExtArgs>;
        walletTransactions: Prisma.$WalletTransactionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        prestataireId: string;
        offreId: string;
        dateDebut: Date;
        dateFin: Date;
        statut: $Enums.StatutAbonnement;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["abonnement"]>;
    composites: {};
};
export type AbonnementGetPayload<S extends boolean | null | undefined | AbonnementDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AbonnementPayload, S>;
export type AbonnementCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AbonnementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AbonnementCountAggregateInputType | true;
};
export interface AbonnementDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Abonnement'];
        meta: {
            name: 'Abonnement';
        };
    };
    findUnique<T extends AbonnementFindUniqueArgs>(args: Prisma.SelectSubset<T, AbonnementFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AbonnementClient<runtime.Types.Result.GetResult<Prisma.$AbonnementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AbonnementFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AbonnementFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AbonnementClient<runtime.Types.Result.GetResult<Prisma.$AbonnementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AbonnementFindFirstArgs>(args?: Prisma.SelectSubset<T, AbonnementFindFirstArgs<ExtArgs>>): Prisma.Prisma__AbonnementClient<runtime.Types.Result.GetResult<Prisma.$AbonnementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AbonnementFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AbonnementFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AbonnementClient<runtime.Types.Result.GetResult<Prisma.$AbonnementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AbonnementFindManyArgs>(args?: Prisma.SelectSubset<T, AbonnementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AbonnementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AbonnementCreateArgs>(args: Prisma.SelectSubset<T, AbonnementCreateArgs<ExtArgs>>): Prisma.Prisma__AbonnementClient<runtime.Types.Result.GetResult<Prisma.$AbonnementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AbonnementCreateManyArgs>(args?: Prisma.SelectSubset<T, AbonnementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AbonnementCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AbonnementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AbonnementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AbonnementDeleteArgs>(args: Prisma.SelectSubset<T, AbonnementDeleteArgs<ExtArgs>>): Prisma.Prisma__AbonnementClient<runtime.Types.Result.GetResult<Prisma.$AbonnementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AbonnementUpdateArgs>(args: Prisma.SelectSubset<T, AbonnementUpdateArgs<ExtArgs>>): Prisma.Prisma__AbonnementClient<runtime.Types.Result.GetResult<Prisma.$AbonnementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AbonnementDeleteManyArgs>(args?: Prisma.SelectSubset<T, AbonnementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AbonnementUpdateManyArgs>(args: Prisma.SelectSubset<T, AbonnementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AbonnementUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AbonnementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AbonnementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AbonnementUpsertArgs>(args: Prisma.SelectSubset<T, AbonnementUpsertArgs<ExtArgs>>): Prisma.Prisma__AbonnementClient<runtime.Types.Result.GetResult<Prisma.$AbonnementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AbonnementCountArgs>(args?: Prisma.Subset<T, AbonnementCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AbonnementCountAggregateOutputType> : number>;
    aggregate<T extends AbonnementAggregateArgs>(args: Prisma.Subset<T, AbonnementAggregateArgs>): Prisma.PrismaPromise<GetAbonnementAggregateType<T>>;
    groupBy<T extends AbonnementGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AbonnementGroupByArgs['orderBy'];
    } : {
        orderBy?: AbonnementGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AbonnementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAbonnementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AbonnementFieldRefs;
}
export interface Prisma__AbonnementClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    prestataire<T extends Prisma.PrestataireDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PrestataireDefaultArgs<ExtArgs>>): Prisma.Prisma__PrestataireClient<runtime.Types.Result.GetResult<Prisma.$PrestatairePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    offre<T extends Prisma.OffreDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.OffreDefaultArgs<ExtArgs>>): Prisma.Prisma__OffreClient<runtime.Types.Result.GetResult<Prisma.$OffrePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    walletTransactions<T extends Prisma.Abonnement$walletTransactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Abonnement$walletTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AbonnementFieldRefs {
    readonly id: Prisma.FieldRef<"Abonnement", 'String'>;
    readonly prestataireId: Prisma.FieldRef<"Abonnement", 'String'>;
    readonly offreId: Prisma.FieldRef<"Abonnement", 'String'>;
    readonly dateDebut: Prisma.FieldRef<"Abonnement", 'DateTime'>;
    readonly dateFin: Prisma.FieldRef<"Abonnement", 'DateTime'>;
    readonly statut: Prisma.FieldRef<"Abonnement", 'StatutAbonnement'>;
    readonly createdAt: Prisma.FieldRef<"Abonnement", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Abonnement", 'DateTime'>;
}
export type AbonnementFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AbonnementSelect<ExtArgs> | null;
    omit?: Prisma.AbonnementOmit<ExtArgs> | null;
    include?: Prisma.AbonnementInclude<ExtArgs> | null;
    where: Prisma.AbonnementWhereUniqueInput;
};
export type AbonnementFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AbonnementSelect<ExtArgs> | null;
    omit?: Prisma.AbonnementOmit<ExtArgs> | null;
    include?: Prisma.AbonnementInclude<ExtArgs> | null;
    where: Prisma.AbonnementWhereUniqueInput;
};
export type AbonnementFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AbonnementSelect<ExtArgs> | null;
    omit?: Prisma.AbonnementOmit<ExtArgs> | null;
    include?: Prisma.AbonnementInclude<ExtArgs> | null;
    where?: Prisma.AbonnementWhereInput;
    orderBy?: Prisma.AbonnementOrderByWithRelationInput | Prisma.AbonnementOrderByWithRelationInput[];
    cursor?: Prisma.AbonnementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AbonnementScalarFieldEnum | Prisma.AbonnementScalarFieldEnum[];
};
export type AbonnementFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AbonnementSelect<ExtArgs> | null;
    omit?: Prisma.AbonnementOmit<ExtArgs> | null;
    include?: Prisma.AbonnementInclude<ExtArgs> | null;
    where?: Prisma.AbonnementWhereInput;
    orderBy?: Prisma.AbonnementOrderByWithRelationInput | Prisma.AbonnementOrderByWithRelationInput[];
    cursor?: Prisma.AbonnementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AbonnementScalarFieldEnum | Prisma.AbonnementScalarFieldEnum[];
};
export type AbonnementFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AbonnementSelect<ExtArgs> | null;
    omit?: Prisma.AbonnementOmit<ExtArgs> | null;
    include?: Prisma.AbonnementInclude<ExtArgs> | null;
    where?: Prisma.AbonnementWhereInput;
    orderBy?: Prisma.AbonnementOrderByWithRelationInput | Prisma.AbonnementOrderByWithRelationInput[];
    cursor?: Prisma.AbonnementWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AbonnementScalarFieldEnum | Prisma.AbonnementScalarFieldEnum[];
};
export type AbonnementCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AbonnementSelect<ExtArgs> | null;
    omit?: Prisma.AbonnementOmit<ExtArgs> | null;
    include?: Prisma.AbonnementInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AbonnementCreateInput, Prisma.AbonnementUncheckedCreateInput>;
};
export type AbonnementCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AbonnementCreateManyInput | Prisma.AbonnementCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AbonnementCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AbonnementSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AbonnementOmit<ExtArgs> | null;
    data: Prisma.AbonnementCreateManyInput | Prisma.AbonnementCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AbonnementIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AbonnementUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AbonnementSelect<ExtArgs> | null;
    omit?: Prisma.AbonnementOmit<ExtArgs> | null;
    include?: Prisma.AbonnementInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AbonnementUpdateInput, Prisma.AbonnementUncheckedUpdateInput>;
    where: Prisma.AbonnementWhereUniqueInput;
};
export type AbonnementUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AbonnementUpdateManyMutationInput, Prisma.AbonnementUncheckedUpdateManyInput>;
    where?: Prisma.AbonnementWhereInput;
    limit?: number;
};
export type AbonnementUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AbonnementSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AbonnementOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AbonnementUpdateManyMutationInput, Prisma.AbonnementUncheckedUpdateManyInput>;
    where?: Prisma.AbonnementWhereInput;
    limit?: number;
    include?: Prisma.AbonnementIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AbonnementUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AbonnementSelect<ExtArgs> | null;
    omit?: Prisma.AbonnementOmit<ExtArgs> | null;
    include?: Prisma.AbonnementInclude<ExtArgs> | null;
    where: Prisma.AbonnementWhereUniqueInput;
    create: Prisma.XOR<Prisma.AbonnementCreateInput, Prisma.AbonnementUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AbonnementUpdateInput, Prisma.AbonnementUncheckedUpdateInput>;
};
export type AbonnementDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AbonnementSelect<ExtArgs> | null;
    omit?: Prisma.AbonnementOmit<ExtArgs> | null;
    include?: Prisma.AbonnementInclude<ExtArgs> | null;
    where: Prisma.AbonnementWhereUniqueInput;
};
export type AbonnementDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AbonnementWhereInput;
    limit?: number;
};
export type Abonnement$walletTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletTransactionSelect<ExtArgs> | null;
    omit?: Prisma.WalletTransactionOmit<ExtArgs> | null;
    include?: Prisma.WalletTransactionInclude<ExtArgs> | null;
    where?: Prisma.WalletTransactionWhereInput;
    orderBy?: Prisma.WalletTransactionOrderByWithRelationInput | Prisma.WalletTransactionOrderByWithRelationInput[];
    cursor?: Prisma.WalletTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WalletTransactionScalarFieldEnum | Prisma.WalletTransactionScalarFieldEnum[];
};
export type AbonnementDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AbonnementSelect<ExtArgs> | null;
    omit?: Prisma.AbonnementOmit<ExtArgs> | null;
    include?: Prisma.AbonnementInclude<ExtArgs> | null;
};
export {};
