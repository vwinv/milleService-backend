import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type WalletTransactionModel = runtime.Types.Result.DefaultSelection<Prisma.$WalletTransactionPayload>;
export type AggregateWalletTransaction = {
    _count: WalletTransactionCountAggregateOutputType | null;
    _avg: WalletTransactionAvgAggregateOutputType | null;
    _sum: WalletTransactionSumAggregateOutputType | null;
    _min: WalletTransactionMinAggregateOutputType | null;
    _max: WalletTransactionMaxAggregateOutputType | null;
};
export type WalletTransactionAvgAggregateOutputType = {
    amount: runtime.Decimal | null;
};
export type WalletTransactionSumAggregateOutputType = {
    amount: runtime.Decimal | null;
};
export type WalletTransactionMinAggregateOutputType = {
    id: string | null;
    walletId: string | null;
    type: $Enums.TransactionType | null;
    amount: runtime.Decimal | null;
    prestationId: string | null;
    abonnementId: string | null;
    offreId: string | null;
    createdByUserId: string | null;
    createdAt: Date | null;
};
export type WalletTransactionMaxAggregateOutputType = {
    id: string | null;
    walletId: string | null;
    type: $Enums.TransactionType | null;
    amount: runtime.Decimal | null;
    prestationId: string | null;
    abonnementId: string | null;
    offreId: string | null;
    createdByUserId: string | null;
    createdAt: Date | null;
};
export type WalletTransactionCountAggregateOutputType = {
    id: number;
    walletId: number;
    type: number;
    amount: number;
    prestationId: number;
    abonnementId: number;
    offreId: number;
    meta: number;
    createdByUserId: number;
    createdAt: number;
    _all: number;
};
export type WalletTransactionAvgAggregateInputType = {
    amount?: true;
};
export type WalletTransactionSumAggregateInputType = {
    amount?: true;
};
export type WalletTransactionMinAggregateInputType = {
    id?: true;
    walletId?: true;
    type?: true;
    amount?: true;
    prestationId?: true;
    abonnementId?: true;
    offreId?: true;
    createdByUserId?: true;
    createdAt?: true;
};
export type WalletTransactionMaxAggregateInputType = {
    id?: true;
    walletId?: true;
    type?: true;
    amount?: true;
    prestationId?: true;
    abonnementId?: true;
    offreId?: true;
    createdByUserId?: true;
    createdAt?: true;
};
export type WalletTransactionCountAggregateInputType = {
    id?: true;
    walletId?: true;
    type?: true;
    amount?: true;
    prestationId?: true;
    abonnementId?: true;
    offreId?: true;
    meta?: true;
    createdByUserId?: true;
    createdAt?: true;
    _all?: true;
};
export type WalletTransactionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WalletTransactionWhereInput;
    orderBy?: Prisma.WalletTransactionOrderByWithRelationInput | Prisma.WalletTransactionOrderByWithRelationInput[];
    cursor?: Prisma.WalletTransactionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | WalletTransactionCountAggregateInputType;
    _avg?: WalletTransactionAvgAggregateInputType;
    _sum?: WalletTransactionSumAggregateInputType;
    _min?: WalletTransactionMinAggregateInputType;
    _max?: WalletTransactionMaxAggregateInputType;
};
export type GetWalletTransactionAggregateType<T extends WalletTransactionAggregateArgs> = {
    [P in keyof T & keyof AggregateWalletTransaction]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWalletTransaction[P]> : Prisma.GetScalarType<T[P], AggregateWalletTransaction[P]>;
};
export type WalletTransactionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WalletTransactionWhereInput;
    orderBy?: Prisma.WalletTransactionOrderByWithAggregationInput | Prisma.WalletTransactionOrderByWithAggregationInput[];
    by: Prisma.WalletTransactionScalarFieldEnum[] | Prisma.WalletTransactionScalarFieldEnum;
    having?: Prisma.WalletTransactionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WalletTransactionCountAggregateInputType | true;
    _avg?: WalletTransactionAvgAggregateInputType;
    _sum?: WalletTransactionSumAggregateInputType;
    _min?: WalletTransactionMinAggregateInputType;
    _max?: WalletTransactionMaxAggregateInputType;
};
export type WalletTransactionGroupByOutputType = {
    id: string;
    walletId: string;
    type: $Enums.TransactionType;
    amount: runtime.Decimal;
    prestationId: string | null;
    abonnementId: string | null;
    offreId: string | null;
    meta: runtime.JsonValue | null;
    createdByUserId: string | null;
    createdAt: Date;
    _count: WalletTransactionCountAggregateOutputType | null;
    _avg: WalletTransactionAvgAggregateOutputType | null;
    _sum: WalletTransactionSumAggregateOutputType | null;
    _min: WalletTransactionMinAggregateOutputType | null;
    _max: WalletTransactionMaxAggregateOutputType | null;
};
type GetWalletTransactionGroupByPayload<T extends WalletTransactionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WalletTransactionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WalletTransactionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WalletTransactionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WalletTransactionGroupByOutputType[P]>;
}>>;
export type WalletTransactionWhereInput = {
    AND?: Prisma.WalletTransactionWhereInput | Prisma.WalletTransactionWhereInput[];
    OR?: Prisma.WalletTransactionWhereInput[];
    NOT?: Prisma.WalletTransactionWhereInput | Prisma.WalletTransactionWhereInput[];
    id?: Prisma.StringFilter<"WalletTransaction"> | string;
    walletId?: Prisma.StringFilter<"WalletTransaction"> | string;
    type?: Prisma.EnumTransactionTypeFilter<"WalletTransaction"> | $Enums.TransactionType;
    amount?: Prisma.DecimalFilter<"WalletTransaction"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    prestationId?: Prisma.StringNullableFilter<"WalletTransaction"> | string | null;
    abonnementId?: Prisma.StringNullableFilter<"WalletTransaction"> | string | null;
    offreId?: Prisma.StringNullableFilter<"WalletTransaction"> | string | null;
    meta?: Prisma.JsonNullableFilter<"WalletTransaction">;
    createdByUserId?: Prisma.StringNullableFilter<"WalletTransaction"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"WalletTransaction"> | Date | string;
    wallet?: Prisma.XOR<Prisma.WalletScalarRelationFilter, Prisma.WalletWhereInput>;
    prestation?: Prisma.XOR<Prisma.PrestationNullableScalarRelationFilter, Prisma.PrestationWhereInput> | null;
    abonnement?: Prisma.XOR<Prisma.AbonnementNullableScalarRelationFilter, Prisma.AbonnementWhereInput> | null;
    offre?: Prisma.XOR<Prisma.OffreNullableScalarRelationFilter, Prisma.OffreWhereInput> | null;
};
export type WalletTransactionOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    prestationId?: Prisma.SortOrderInput | Prisma.SortOrder;
    abonnementId?: Prisma.SortOrderInput | Prisma.SortOrder;
    offreId?: Prisma.SortOrderInput | Prisma.SortOrder;
    meta?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdByUserId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    wallet?: Prisma.WalletOrderByWithRelationInput;
    prestation?: Prisma.PrestationOrderByWithRelationInput;
    abonnement?: Prisma.AbonnementOrderByWithRelationInput;
    offre?: Prisma.OffreOrderByWithRelationInput;
};
export type WalletTransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    walletId_type_prestationId?: Prisma.WalletTransactionWalletIdTypePrestationIdCompoundUniqueInput;
    walletId_type_abonnementId?: Prisma.WalletTransactionWalletIdTypeAbonnementIdCompoundUniqueInput;
    AND?: Prisma.WalletTransactionWhereInput | Prisma.WalletTransactionWhereInput[];
    OR?: Prisma.WalletTransactionWhereInput[];
    NOT?: Prisma.WalletTransactionWhereInput | Prisma.WalletTransactionWhereInput[];
    walletId?: Prisma.StringFilter<"WalletTransaction"> | string;
    type?: Prisma.EnumTransactionTypeFilter<"WalletTransaction"> | $Enums.TransactionType;
    amount?: Prisma.DecimalFilter<"WalletTransaction"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    prestationId?: Prisma.StringNullableFilter<"WalletTransaction"> | string | null;
    abonnementId?: Prisma.StringNullableFilter<"WalletTransaction"> | string | null;
    offreId?: Prisma.StringNullableFilter<"WalletTransaction"> | string | null;
    meta?: Prisma.JsonNullableFilter<"WalletTransaction">;
    createdByUserId?: Prisma.StringNullableFilter<"WalletTransaction"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"WalletTransaction"> | Date | string;
    wallet?: Prisma.XOR<Prisma.WalletScalarRelationFilter, Prisma.WalletWhereInput>;
    prestation?: Prisma.XOR<Prisma.PrestationNullableScalarRelationFilter, Prisma.PrestationWhereInput> | null;
    abonnement?: Prisma.XOR<Prisma.AbonnementNullableScalarRelationFilter, Prisma.AbonnementWhereInput> | null;
    offre?: Prisma.XOR<Prisma.OffreNullableScalarRelationFilter, Prisma.OffreWhereInput> | null;
}, "id" | "walletId_type_prestationId" | "walletId_type_abonnementId">;
export type WalletTransactionOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    prestationId?: Prisma.SortOrderInput | Prisma.SortOrder;
    abonnementId?: Prisma.SortOrderInput | Prisma.SortOrder;
    offreId?: Prisma.SortOrderInput | Prisma.SortOrder;
    meta?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdByUserId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.WalletTransactionCountOrderByAggregateInput;
    _avg?: Prisma.WalletTransactionAvgOrderByAggregateInput;
    _max?: Prisma.WalletTransactionMaxOrderByAggregateInput;
    _min?: Prisma.WalletTransactionMinOrderByAggregateInput;
    _sum?: Prisma.WalletTransactionSumOrderByAggregateInput;
};
export type WalletTransactionScalarWhereWithAggregatesInput = {
    AND?: Prisma.WalletTransactionScalarWhereWithAggregatesInput | Prisma.WalletTransactionScalarWhereWithAggregatesInput[];
    OR?: Prisma.WalletTransactionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WalletTransactionScalarWhereWithAggregatesInput | Prisma.WalletTransactionScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"WalletTransaction"> | string;
    walletId?: Prisma.StringWithAggregatesFilter<"WalletTransaction"> | string;
    type?: Prisma.EnumTransactionTypeWithAggregatesFilter<"WalletTransaction"> | $Enums.TransactionType;
    amount?: Prisma.DecimalWithAggregatesFilter<"WalletTransaction"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    prestationId?: Prisma.StringNullableWithAggregatesFilter<"WalletTransaction"> | string | null;
    abonnementId?: Prisma.StringNullableWithAggregatesFilter<"WalletTransaction"> | string | null;
    offreId?: Prisma.StringNullableWithAggregatesFilter<"WalletTransaction"> | string | null;
    meta?: Prisma.JsonNullableWithAggregatesFilter<"WalletTransaction">;
    createdByUserId?: Prisma.StringNullableWithAggregatesFilter<"WalletTransaction"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"WalletTransaction"> | Date | string;
};
export type WalletTransactionCreateInput = {
    id?: string;
    type: $Enums.TransactionType;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: string | null;
    createdAt?: Date | string;
    wallet: Prisma.WalletCreateNestedOneWithoutTransactionsInput;
    prestation?: Prisma.PrestationCreateNestedOneWithoutWalletTransactionsInput;
    abonnement?: Prisma.AbonnementCreateNestedOneWithoutWalletTransactionsInput;
    offre?: Prisma.OffreCreateNestedOneWithoutWalletTransactionsInput;
};
export type WalletTransactionUncheckedCreateInput = {
    id?: string;
    walletId: string;
    type: $Enums.TransactionType;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    prestationId?: string | null;
    abonnementId?: string | null;
    offreId?: string | null;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: string | null;
    createdAt?: Date | string;
};
export type WalletTransactionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    wallet?: Prisma.WalletUpdateOneRequiredWithoutTransactionsNestedInput;
    prestation?: Prisma.PrestationUpdateOneWithoutWalletTransactionsNestedInput;
    abonnement?: Prisma.AbonnementUpdateOneWithoutWalletTransactionsNestedInput;
    offre?: Prisma.OffreUpdateOneWithoutWalletTransactionsNestedInput;
};
export type WalletTransactionUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    walletId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    prestationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    abonnementId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    offreId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WalletTransactionCreateManyInput = {
    id?: string;
    walletId: string;
    type: $Enums.TransactionType;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    prestationId?: string | null;
    abonnementId?: string | null;
    offreId?: string | null;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: string | null;
    createdAt?: Date | string;
};
export type WalletTransactionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WalletTransactionUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    walletId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    prestationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    abonnementId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    offreId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WalletTransactionListRelationFilter = {
    every?: Prisma.WalletTransactionWhereInput;
    some?: Prisma.WalletTransactionWhereInput;
    none?: Prisma.WalletTransactionWhereInput;
};
export type WalletTransactionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type WalletTransactionWalletIdTypePrestationIdCompoundUniqueInput = {
    walletId: string;
    type: $Enums.TransactionType;
    prestationId: string;
};
export type WalletTransactionWalletIdTypeAbonnementIdCompoundUniqueInput = {
    walletId: string;
    type: $Enums.TransactionType;
    abonnementId: string;
};
export type WalletTransactionCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    prestationId?: Prisma.SortOrder;
    abonnementId?: Prisma.SortOrder;
    offreId?: Prisma.SortOrder;
    meta?: Prisma.SortOrder;
    createdByUserId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type WalletTransactionAvgOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type WalletTransactionMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    prestationId?: Prisma.SortOrder;
    abonnementId?: Prisma.SortOrder;
    offreId?: Prisma.SortOrder;
    createdByUserId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type WalletTransactionMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    walletId?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    amount?: Prisma.SortOrder;
    prestationId?: Prisma.SortOrder;
    abonnementId?: Prisma.SortOrder;
    offreId?: Prisma.SortOrder;
    createdByUserId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type WalletTransactionSumOrderByAggregateInput = {
    amount?: Prisma.SortOrder;
};
export type WalletTransactionCreateNestedManyWithoutOffreInput = {
    create?: Prisma.XOR<Prisma.WalletTransactionCreateWithoutOffreInput, Prisma.WalletTransactionUncheckedCreateWithoutOffreInput> | Prisma.WalletTransactionCreateWithoutOffreInput[] | Prisma.WalletTransactionUncheckedCreateWithoutOffreInput[];
    connectOrCreate?: Prisma.WalletTransactionCreateOrConnectWithoutOffreInput | Prisma.WalletTransactionCreateOrConnectWithoutOffreInput[];
    createMany?: Prisma.WalletTransactionCreateManyOffreInputEnvelope;
    connect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
};
export type WalletTransactionUncheckedCreateNestedManyWithoutOffreInput = {
    create?: Prisma.XOR<Prisma.WalletTransactionCreateWithoutOffreInput, Prisma.WalletTransactionUncheckedCreateWithoutOffreInput> | Prisma.WalletTransactionCreateWithoutOffreInput[] | Prisma.WalletTransactionUncheckedCreateWithoutOffreInput[];
    connectOrCreate?: Prisma.WalletTransactionCreateOrConnectWithoutOffreInput | Prisma.WalletTransactionCreateOrConnectWithoutOffreInput[];
    createMany?: Prisma.WalletTransactionCreateManyOffreInputEnvelope;
    connect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
};
export type WalletTransactionUpdateManyWithoutOffreNestedInput = {
    create?: Prisma.XOR<Prisma.WalletTransactionCreateWithoutOffreInput, Prisma.WalletTransactionUncheckedCreateWithoutOffreInput> | Prisma.WalletTransactionCreateWithoutOffreInput[] | Prisma.WalletTransactionUncheckedCreateWithoutOffreInput[];
    connectOrCreate?: Prisma.WalletTransactionCreateOrConnectWithoutOffreInput | Prisma.WalletTransactionCreateOrConnectWithoutOffreInput[];
    upsert?: Prisma.WalletTransactionUpsertWithWhereUniqueWithoutOffreInput | Prisma.WalletTransactionUpsertWithWhereUniqueWithoutOffreInput[];
    createMany?: Prisma.WalletTransactionCreateManyOffreInputEnvelope;
    set?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    disconnect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    delete?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    connect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    update?: Prisma.WalletTransactionUpdateWithWhereUniqueWithoutOffreInput | Prisma.WalletTransactionUpdateWithWhereUniqueWithoutOffreInput[];
    updateMany?: Prisma.WalletTransactionUpdateManyWithWhereWithoutOffreInput | Prisma.WalletTransactionUpdateManyWithWhereWithoutOffreInput[];
    deleteMany?: Prisma.WalletTransactionScalarWhereInput | Prisma.WalletTransactionScalarWhereInput[];
};
export type WalletTransactionUncheckedUpdateManyWithoutOffreNestedInput = {
    create?: Prisma.XOR<Prisma.WalletTransactionCreateWithoutOffreInput, Prisma.WalletTransactionUncheckedCreateWithoutOffreInput> | Prisma.WalletTransactionCreateWithoutOffreInput[] | Prisma.WalletTransactionUncheckedCreateWithoutOffreInput[];
    connectOrCreate?: Prisma.WalletTransactionCreateOrConnectWithoutOffreInput | Prisma.WalletTransactionCreateOrConnectWithoutOffreInput[];
    upsert?: Prisma.WalletTransactionUpsertWithWhereUniqueWithoutOffreInput | Prisma.WalletTransactionUpsertWithWhereUniqueWithoutOffreInput[];
    createMany?: Prisma.WalletTransactionCreateManyOffreInputEnvelope;
    set?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    disconnect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    delete?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    connect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    update?: Prisma.WalletTransactionUpdateWithWhereUniqueWithoutOffreInput | Prisma.WalletTransactionUpdateWithWhereUniqueWithoutOffreInput[];
    updateMany?: Prisma.WalletTransactionUpdateManyWithWhereWithoutOffreInput | Prisma.WalletTransactionUpdateManyWithWhereWithoutOffreInput[];
    deleteMany?: Prisma.WalletTransactionScalarWhereInput | Prisma.WalletTransactionScalarWhereInput[];
};
export type WalletTransactionCreateNestedManyWithoutAbonnementInput = {
    create?: Prisma.XOR<Prisma.WalletTransactionCreateWithoutAbonnementInput, Prisma.WalletTransactionUncheckedCreateWithoutAbonnementInput> | Prisma.WalletTransactionCreateWithoutAbonnementInput[] | Prisma.WalletTransactionUncheckedCreateWithoutAbonnementInput[];
    connectOrCreate?: Prisma.WalletTransactionCreateOrConnectWithoutAbonnementInput | Prisma.WalletTransactionCreateOrConnectWithoutAbonnementInput[];
    createMany?: Prisma.WalletTransactionCreateManyAbonnementInputEnvelope;
    connect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
};
export type WalletTransactionUncheckedCreateNestedManyWithoutAbonnementInput = {
    create?: Prisma.XOR<Prisma.WalletTransactionCreateWithoutAbonnementInput, Prisma.WalletTransactionUncheckedCreateWithoutAbonnementInput> | Prisma.WalletTransactionCreateWithoutAbonnementInput[] | Prisma.WalletTransactionUncheckedCreateWithoutAbonnementInput[];
    connectOrCreate?: Prisma.WalletTransactionCreateOrConnectWithoutAbonnementInput | Prisma.WalletTransactionCreateOrConnectWithoutAbonnementInput[];
    createMany?: Prisma.WalletTransactionCreateManyAbonnementInputEnvelope;
    connect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
};
export type WalletTransactionUpdateManyWithoutAbonnementNestedInput = {
    create?: Prisma.XOR<Prisma.WalletTransactionCreateWithoutAbonnementInput, Prisma.WalletTransactionUncheckedCreateWithoutAbonnementInput> | Prisma.WalletTransactionCreateWithoutAbonnementInput[] | Prisma.WalletTransactionUncheckedCreateWithoutAbonnementInput[];
    connectOrCreate?: Prisma.WalletTransactionCreateOrConnectWithoutAbonnementInput | Prisma.WalletTransactionCreateOrConnectWithoutAbonnementInput[];
    upsert?: Prisma.WalletTransactionUpsertWithWhereUniqueWithoutAbonnementInput | Prisma.WalletTransactionUpsertWithWhereUniqueWithoutAbonnementInput[];
    createMany?: Prisma.WalletTransactionCreateManyAbonnementInputEnvelope;
    set?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    disconnect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    delete?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    connect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    update?: Prisma.WalletTransactionUpdateWithWhereUniqueWithoutAbonnementInput | Prisma.WalletTransactionUpdateWithWhereUniqueWithoutAbonnementInput[];
    updateMany?: Prisma.WalletTransactionUpdateManyWithWhereWithoutAbonnementInput | Prisma.WalletTransactionUpdateManyWithWhereWithoutAbonnementInput[];
    deleteMany?: Prisma.WalletTransactionScalarWhereInput | Prisma.WalletTransactionScalarWhereInput[];
};
export type WalletTransactionUncheckedUpdateManyWithoutAbonnementNestedInput = {
    create?: Prisma.XOR<Prisma.WalletTransactionCreateWithoutAbonnementInput, Prisma.WalletTransactionUncheckedCreateWithoutAbonnementInput> | Prisma.WalletTransactionCreateWithoutAbonnementInput[] | Prisma.WalletTransactionUncheckedCreateWithoutAbonnementInput[];
    connectOrCreate?: Prisma.WalletTransactionCreateOrConnectWithoutAbonnementInput | Prisma.WalletTransactionCreateOrConnectWithoutAbonnementInput[];
    upsert?: Prisma.WalletTransactionUpsertWithWhereUniqueWithoutAbonnementInput | Prisma.WalletTransactionUpsertWithWhereUniqueWithoutAbonnementInput[];
    createMany?: Prisma.WalletTransactionCreateManyAbonnementInputEnvelope;
    set?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    disconnect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    delete?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    connect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    update?: Prisma.WalletTransactionUpdateWithWhereUniqueWithoutAbonnementInput | Prisma.WalletTransactionUpdateWithWhereUniqueWithoutAbonnementInput[];
    updateMany?: Prisma.WalletTransactionUpdateManyWithWhereWithoutAbonnementInput | Prisma.WalletTransactionUpdateManyWithWhereWithoutAbonnementInput[];
    deleteMany?: Prisma.WalletTransactionScalarWhereInput | Prisma.WalletTransactionScalarWhereInput[];
};
export type WalletTransactionCreateNestedManyWithoutWalletInput = {
    create?: Prisma.XOR<Prisma.WalletTransactionCreateWithoutWalletInput, Prisma.WalletTransactionUncheckedCreateWithoutWalletInput> | Prisma.WalletTransactionCreateWithoutWalletInput[] | Prisma.WalletTransactionUncheckedCreateWithoutWalletInput[];
    connectOrCreate?: Prisma.WalletTransactionCreateOrConnectWithoutWalletInput | Prisma.WalletTransactionCreateOrConnectWithoutWalletInput[];
    createMany?: Prisma.WalletTransactionCreateManyWalletInputEnvelope;
    connect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
};
export type WalletTransactionUncheckedCreateNestedManyWithoutWalletInput = {
    create?: Prisma.XOR<Prisma.WalletTransactionCreateWithoutWalletInput, Prisma.WalletTransactionUncheckedCreateWithoutWalletInput> | Prisma.WalletTransactionCreateWithoutWalletInput[] | Prisma.WalletTransactionUncheckedCreateWithoutWalletInput[];
    connectOrCreate?: Prisma.WalletTransactionCreateOrConnectWithoutWalletInput | Prisma.WalletTransactionCreateOrConnectWithoutWalletInput[];
    createMany?: Prisma.WalletTransactionCreateManyWalletInputEnvelope;
    connect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
};
export type WalletTransactionUpdateManyWithoutWalletNestedInput = {
    create?: Prisma.XOR<Prisma.WalletTransactionCreateWithoutWalletInput, Prisma.WalletTransactionUncheckedCreateWithoutWalletInput> | Prisma.WalletTransactionCreateWithoutWalletInput[] | Prisma.WalletTransactionUncheckedCreateWithoutWalletInput[];
    connectOrCreate?: Prisma.WalletTransactionCreateOrConnectWithoutWalletInput | Prisma.WalletTransactionCreateOrConnectWithoutWalletInput[];
    upsert?: Prisma.WalletTransactionUpsertWithWhereUniqueWithoutWalletInput | Prisma.WalletTransactionUpsertWithWhereUniqueWithoutWalletInput[];
    createMany?: Prisma.WalletTransactionCreateManyWalletInputEnvelope;
    set?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    disconnect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    delete?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    connect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    update?: Prisma.WalletTransactionUpdateWithWhereUniqueWithoutWalletInput | Prisma.WalletTransactionUpdateWithWhereUniqueWithoutWalletInput[];
    updateMany?: Prisma.WalletTransactionUpdateManyWithWhereWithoutWalletInput | Prisma.WalletTransactionUpdateManyWithWhereWithoutWalletInput[];
    deleteMany?: Prisma.WalletTransactionScalarWhereInput | Prisma.WalletTransactionScalarWhereInput[];
};
export type WalletTransactionUncheckedUpdateManyWithoutWalletNestedInput = {
    create?: Prisma.XOR<Prisma.WalletTransactionCreateWithoutWalletInput, Prisma.WalletTransactionUncheckedCreateWithoutWalletInput> | Prisma.WalletTransactionCreateWithoutWalletInput[] | Prisma.WalletTransactionUncheckedCreateWithoutWalletInput[];
    connectOrCreate?: Prisma.WalletTransactionCreateOrConnectWithoutWalletInput | Prisma.WalletTransactionCreateOrConnectWithoutWalletInput[];
    upsert?: Prisma.WalletTransactionUpsertWithWhereUniqueWithoutWalletInput | Prisma.WalletTransactionUpsertWithWhereUniqueWithoutWalletInput[];
    createMany?: Prisma.WalletTransactionCreateManyWalletInputEnvelope;
    set?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    disconnect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    delete?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    connect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    update?: Prisma.WalletTransactionUpdateWithWhereUniqueWithoutWalletInput | Prisma.WalletTransactionUpdateWithWhereUniqueWithoutWalletInput[];
    updateMany?: Prisma.WalletTransactionUpdateManyWithWhereWithoutWalletInput | Prisma.WalletTransactionUpdateManyWithWhereWithoutWalletInput[];
    deleteMany?: Prisma.WalletTransactionScalarWhereInput | Prisma.WalletTransactionScalarWhereInput[];
};
export type EnumTransactionTypeFieldUpdateOperationsInput = {
    set?: $Enums.TransactionType;
};
export type WalletTransactionCreateNestedManyWithoutPrestationInput = {
    create?: Prisma.XOR<Prisma.WalletTransactionCreateWithoutPrestationInput, Prisma.WalletTransactionUncheckedCreateWithoutPrestationInput> | Prisma.WalletTransactionCreateWithoutPrestationInput[] | Prisma.WalletTransactionUncheckedCreateWithoutPrestationInput[];
    connectOrCreate?: Prisma.WalletTransactionCreateOrConnectWithoutPrestationInput | Prisma.WalletTransactionCreateOrConnectWithoutPrestationInput[];
    createMany?: Prisma.WalletTransactionCreateManyPrestationInputEnvelope;
    connect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
};
export type WalletTransactionUncheckedCreateNestedManyWithoutPrestationInput = {
    create?: Prisma.XOR<Prisma.WalletTransactionCreateWithoutPrestationInput, Prisma.WalletTransactionUncheckedCreateWithoutPrestationInput> | Prisma.WalletTransactionCreateWithoutPrestationInput[] | Prisma.WalletTransactionUncheckedCreateWithoutPrestationInput[];
    connectOrCreate?: Prisma.WalletTransactionCreateOrConnectWithoutPrestationInput | Prisma.WalletTransactionCreateOrConnectWithoutPrestationInput[];
    createMany?: Prisma.WalletTransactionCreateManyPrestationInputEnvelope;
    connect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
};
export type WalletTransactionUpdateManyWithoutPrestationNestedInput = {
    create?: Prisma.XOR<Prisma.WalletTransactionCreateWithoutPrestationInput, Prisma.WalletTransactionUncheckedCreateWithoutPrestationInput> | Prisma.WalletTransactionCreateWithoutPrestationInput[] | Prisma.WalletTransactionUncheckedCreateWithoutPrestationInput[];
    connectOrCreate?: Prisma.WalletTransactionCreateOrConnectWithoutPrestationInput | Prisma.WalletTransactionCreateOrConnectWithoutPrestationInput[];
    upsert?: Prisma.WalletTransactionUpsertWithWhereUniqueWithoutPrestationInput | Prisma.WalletTransactionUpsertWithWhereUniqueWithoutPrestationInput[];
    createMany?: Prisma.WalletTransactionCreateManyPrestationInputEnvelope;
    set?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    disconnect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    delete?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    connect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    update?: Prisma.WalletTransactionUpdateWithWhereUniqueWithoutPrestationInput | Prisma.WalletTransactionUpdateWithWhereUniqueWithoutPrestationInput[];
    updateMany?: Prisma.WalletTransactionUpdateManyWithWhereWithoutPrestationInput | Prisma.WalletTransactionUpdateManyWithWhereWithoutPrestationInput[];
    deleteMany?: Prisma.WalletTransactionScalarWhereInput | Prisma.WalletTransactionScalarWhereInput[];
};
export type WalletTransactionUncheckedUpdateManyWithoutPrestationNestedInput = {
    create?: Prisma.XOR<Prisma.WalletTransactionCreateWithoutPrestationInput, Prisma.WalletTransactionUncheckedCreateWithoutPrestationInput> | Prisma.WalletTransactionCreateWithoutPrestationInput[] | Prisma.WalletTransactionUncheckedCreateWithoutPrestationInput[];
    connectOrCreate?: Prisma.WalletTransactionCreateOrConnectWithoutPrestationInput | Prisma.WalletTransactionCreateOrConnectWithoutPrestationInput[];
    upsert?: Prisma.WalletTransactionUpsertWithWhereUniqueWithoutPrestationInput | Prisma.WalletTransactionUpsertWithWhereUniqueWithoutPrestationInput[];
    createMany?: Prisma.WalletTransactionCreateManyPrestationInputEnvelope;
    set?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    disconnect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    delete?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    connect?: Prisma.WalletTransactionWhereUniqueInput | Prisma.WalletTransactionWhereUniqueInput[];
    update?: Prisma.WalletTransactionUpdateWithWhereUniqueWithoutPrestationInput | Prisma.WalletTransactionUpdateWithWhereUniqueWithoutPrestationInput[];
    updateMany?: Prisma.WalletTransactionUpdateManyWithWhereWithoutPrestationInput | Prisma.WalletTransactionUpdateManyWithWhereWithoutPrestationInput[];
    deleteMany?: Prisma.WalletTransactionScalarWhereInput | Prisma.WalletTransactionScalarWhereInput[];
};
export type WalletTransactionCreateWithoutOffreInput = {
    id?: string;
    type: $Enums.TransactionType;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: string | null;
    createdAt?: Date | string;
    wallet: Prisma.WalletCreateNestedOneWithoutTransactionsInput;
    prestation?: Prisma.PrestationCreateNestedOneWithoutWalletTransactionsInput;
    abonnement?: Prisma.AbonnementCreateNestedOneWithoutWalletTransactionsInput;
};
export type WalletTransactionUncheckedCreateWithoutOffreInput = {
    id?: string;
    walletId: string;
    type: $Enums.TransactionType;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    prestationId?: string | null;
    abonnementId?: string | null;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: string | null;
    createdAt?: Date | string;
};
export type WalletTransactionCreateOrConnectWithoutOffreInput = {
    where: Prisma.WalletTransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.WalletTransactionCreateWithoutOffreInput, Prisma.WalletTransactionUncheckedCreateWithoutOffreInput>;
};
export type WalletTransactionCreateManyOffreInputEnvelope = {
    data: Prisma.WalletTransactionCreateManyOffreInput | Prisma.WalletTransactionCreateManyOffreInput[];
    skipDuplicates?: boolean;
};
export type WalletTransactionUpsertWithWhereUniqueWithoutOffreInput = {
    where: Prisma.WalletTransactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.WalletTransactionUpdateWithoutOffreInput, Prisma.WalletTransactionUncheckedUpdateWithoutOffreInput>;
    create: Prisma.XOR<Prisma.WalletTransactionCreateWithoutOffreInput, Prisma.WalletTransactionUncheckedCreateWithoutOffreInput>;
};
export type WalletTransactionUpdateWithWhereUniqueWithoutOffreInput = {
    where: Prisma.WalletTransactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.WalletTransactionUpdateWithoutOffreInput, Prisma.WalletTransactionUncheckedUpdateWithoutOffreInput>;
};
export type WalletTransactionUpdateManyWithWhereWithoutOffreInput = {
    where: Prisma.WalletTransactionScalarWhereInput;
    data: Prisma.XOR<Prisma.WalletTransactionUpdateManyMutationInput, Prisma.WalletTransactionUncheckedUpdateManyWithoutOffreInput>;
};
export type WalletTransactionScalarWhereInput = {
    AND?: Prisma.WalletTransactionScalarWhereInput | Prisma.WalletTransactionScalarWhereInput[];
    OR?: Prisma.WalletTransactionScalarWhereInput[];
    NOT?: Prisma.WalletTransactionScalarWhereInput | Prisma.WalletTransactionScalarWhereInput[];
    id?: Prisma.StringFilter<"WalletTransaction"> | string;
    walletId?: Prisma.StringFilter<"WalletTransaction"> | string;
    type?: Prisma.EnumTransactionTypeFilter<"WalletTransaction"> | $Enums.TransactionType;
    amount?: Prisma.DecimalFilter<"WalletTransaction"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    prestationId?: Prisma.StringNullableFilter<"WalletTransaction"> | string | null;
    abonnementId?: Prisma.StringNullableFilter<"WalletTransaction"> | string | null;
    offreId?: Prisma.StringNullableFilter<"WalletTransaction"> | string | null;
    meta?: Prisma.JsonNullableFilter<"WalletTransaction">;
    createdByUserId?: Prisma.StringNullableFilter<"WalletTransaction"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"WalletTransaction"> | Date | string;
};
export type WalletTransactionCreateWithoutAbonnementInput = {
    id?: string;
    type: $Enums.TransactionType;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: string | null;
    createdAt?: Date | string;
    wallet: Prisma.WalletCreateNestedOneWithoutTransactionsInput;
    prestation?: Prisma.PrestationCreateNestedOneWithoutWalletTransactionsInput;
    offre?: Prisma.OffreCreateNestedOneWithoutWalletTransactionsInput;
};
export type WalletTransactionUncheckedCreateWithoutAbonnementInput = {
    id?: string;
    walletId: string;
    type: $Enums.TransactionType;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    prestationId?: string | null;
    offreId?: string | null;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: string | null;
    createdAt?: Date | string;
};
export type WalletTransactionCreateOrConnectWithoutAbonnementInput = {
    where: Prisma.WalletTransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.WalletTransactionCreateWithoutAbonnementInput, Prisma.WalletTransactionUncheckedCreateWithoutAbonnementInput>;
};
export type WalletTransactionCreateManyAbonnementInputEnvelope = {
    data: Prisma.WalletTransactionCreateManyAbonnementInput | Prisma.WalletTransactionCreateManyAbonnementInput[];
    skipDuplicates?: boolean;
};
export type WalletTransactionUpsertWithWhereUniqueWithoutAbonnementInput = {
    where: Prisma.WalletTransactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.WalletTransactionUpdateWithoutAbonnementInput, Prisma.WalletTransactionUncheckedUpdateWithoutAbonnementInput>;
    create: Prisma.XOR<Prisma.WalletTransactionCreateWithoutAbonnementInput, Prisma.WalletTransactionUncheckedCreateWithoutAbonnementInput>;
};
export type WalletTransactionUpdateWithWhereUniqueWithoutAbonnementInput = {
    where: Prisma.WalletTransactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.WalletTransactionUpdateWithoutAbonnementInput, Prisma.WalletTransactionUncheckedUpdateWithoutAbonnementInput>;
};
export type WalletTransactionUpdateManyWithWhereWithoutAbonnementInput = {
    where: Prisma.WalletTransactionScalarWhereInput;
    data: Prisma.XOR<Prisma.WalletTransactionUpdateManyMutationInput, Prisma.WalletTransactionUncheckedUpdateManyWithoutAbonnementInput>;
};
export type WalletTransactionCreateWithoutWalletInput = {
    id?: string;
    type: $Enums.TransactionType;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: string | null;
    createdAt?: Date | string;
    prestation?: Prisma.PrestationCreateNestedOneWithoutWalletTransactionsInput;
    abonnement?: Prisma.AbonnementCreateNestedOneWithoutWalletTransactionsInput;
    offre?: Prisma.OffreCreateNestedOneWithoutWalletTransactionsInput;
};
export type WalletTransactionUncheckedCreateWithoutWalletInput = {
    id?: string;
    type: $Enums.TransactionType;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    prestationId?: string | null;
    abonnementId?: string | null;
    offreId?: string | null;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: string | null;
    createdAt?: Date | string;
};
export type WalletTransactionCreateOrConnectWithoutWalletInput = {
    where: Prisma.WalletTransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.WalletTransactionCreateWithoutWalletInput, Prisma.WalletTransactionUncheckedCreateWithoutWalletInput>;
};
export type WalletTransactionCreateManyWalletInputEnvelope = {
    data: Prisma.WalletTransactionCreateManyWalletInput | Prisma.WalletTransactionCreateManyWalletInput[];
    skipDuplicates?: boolean;
};
export type WalletTransactionUpsertWithWhereUniqueWithoutWalletInput = {
    where: Prisma.WalletTransactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.WalletTransactionUpdateWithoutWalletInput, Prisma.WalletTransactionUncheckedUpdateWithoutWalletInput>;
    create: Prisma.XOR<Prisma.WalletTransactionCreateWithoutWalletInput, Prisma.WalletTransactionUncheckedCreateWithoutWalletInput>;
};
export type WalletTransactionUpdateWithWhereUniqueWithoutWalletInput = {
    where: Prisma.WalletTransactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.WalletTransactionUpdateWithoutWalletInput, Prisma.WalletTransactionUncheckedUpdateWithoutWalletInput>;
};
export type WalletTransactionUpdateManyWithWhereWithoutWalletInput = {
    where: Prisma.WalletTransactionScalarWhereInput;
    data: Prisma.XOR<Prisma.WalletTransactionUpdateManyMutationInput, Prisma.WalletTransactionUncheckedUpdateManyWithoutWalletInput>;
};
export type WalletTransactionCreateWithoutPrestationInput = {
    id?: string;
    type: $Enums.TransactionType;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: string | null;
    createdAt?: Date | string;
    wallet: Prisma.WalletCreateNestedOneWithoutTransactionsInput;
    abonnement?: Prisma.AbonnementCreateNestedOneWithoutWalletTransactionsInput;
    offre?: Prisma.OffreCreateNestedOneWithoutWalletTransactionsInput;
};
export type WalletTransactionUncheckedCreateWithoutPrestationInput = {
    id?: string;
    walletId: string;
    type: $Enums.TransactionType;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    abonnementId?: string | null;
    offreId?: string | null;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: string | null;
    createdAt?: Date | string;
};
export type WalletTransactionCreateOrConnectWithoutPrestationInput = {
    where: Prisma.WalletTransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.WalletTransactionCreateWithoutPrestationInput, Prisma.WalletTransactionUncheckedCreateWithoutPrestationInput>;
};
export type WalletTransactionCreateManyPrestationInputEnvelope = {
    data: Prisma.WalletTransactionCreateManyPrestationInput | Prisma.WalletTransactionCreateManyPrestationInput[];
    skipDuplicates?: boolean;
};
export type WalletTransactionUpsertWithWhereUniqueWithoutPrestationInput = {
    where: Prisma.WalletTransactionWhereUniqueInput;
    update: Prisma.XOR<Prisma.WalletTransactionUpdateWithoutPrestationInput, Prisma.WalletTransactionUncheckedUpdateWithoutPrestationInput>;
    create: Prisma.XOR<Prisma.WalletTransactionCreateWithoutPrestationInput, Prisma.WalletTransactionUncheckedCreateWithoutPrestationInput>;
};
export type WalletTransactionUpdateWithWhereUniqueWithoutPrestationInput = {
    where: Prisma.WalletTransactionWhereUniqueInput;
    data: Prisma.XOR<Prisma.WalletTransactionUpdateWithoutPrestationInput, Prisma.WalletTransactionUncheckedUpdateWithoutPrestationInput>;
};
export type WalletTransactionUpdateManyWithWhereWithoutPrestationInput = {
    where: Prisma.WalletTransactionScalarWhereInput;
    data: Prisma.XOR<Prisma.WalletTransactionUpdateManyMutationInput, Prisma.WalletTransactionUncheckedUpdateManyWithoutPrestationInput>;
};
export type WalletTransactionCreateManyOffreInput = {
    id?: string;
    walletId: string;
    type: $Enums.TransactionType;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    prestationId?: string | null;
    abonnementId?: string | null;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: string | null;
    createdAt?: Date | string;
};
export type WalletTransactionUpdateWithoutOffreInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    wallet?: Prisma.WalletUpdateOneRequiredWithoutTransactionsNestedInput;
    prestation?: Prisma.PrestationUpdateOneWithoutWalletTransactionsNestedInput;
    abonnement?: Prisma.AbonnementUpdateOneWithoutWalletTransactionsNestedInput;
};
export type WalletTransactionUncheckedUpdateWithoutOffreInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    walletId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    prestationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    abonnementId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WalletTransactionUncheckedUpdateManyWithoutOffreInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    walletId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    prestationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    abonnementId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WalletTransactionCreateManyAbonnementInput = {
    id?: string;
    walletId: string;
    type: $Enums.TransactionType;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    prestationId?: string | null;
    offreId?: string | null;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: string | null;
    createdAt?: Date | string;
};
export type WalletTransactionUpdateWithoutAbonnementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    wallet?: Prisma.WalletUpdateOneRequiredWithoutTransactionsNestedInput;
    prestation?: Prisma.PrestationUpdateOneWithoutWalletTransactionsNestedInput;
    offre?: Prisma.OffreUpdateOneWithoutWalletTransactionsNestedInput;
};
export type WalletTransactionUncheckedUpdateWithoutAbonnementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    walletId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    prestationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    offreId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WalletTransactionUncheckedUpdateManyWithoutAbonnementInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    walletId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    prestationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    offreId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WalletTransactionCreateManyWalletInput = {
    id?: string;
    type: $Enums.TransactionType;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    prestationId?: string | null;
    abonnementId?: string | null;
    offreId?: string | null;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: string | null;
    createdAt?: Date | string;
};
export type WalletTransactionUpdateWithoutWalletInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    prestation?: Prisma.PrestationUpdateOneWithoutWalletTransactionsNestedInput;
    abonnement?: Prisma.AbonnementUpdateOneWithoutWalletTransactionsNestedInput;
    offre?: Prisma.OffreUpdateOneWithoutWalletTransactionsNestedInput;
};
export type WalletTransactionUncheckedUpdateWithoutWalletInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    prestationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    abonnementId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    offreId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WalletTransactionUncheckedUpdateManyWithoutWalletInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    prestationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    abonnementId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    offreId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WalletTransactionCreateManyPrestationInput = {
    id?: string;
    walletId: string;
    type: $Enums.TransactionType;
    amount: runtime.Decimal | runtime.DecimalJsLike | number | string;
    abonnementId?: string | null;
    offreId?: string | null;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: string | null;
    createdAt?: Date | string;
};
export type WalletTransactionUpdateWithoutPrestationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    wallet?: Prisma.WalletUpdateOneRequiredWithoutTransactionsNestedInput;
    abonnement?: Prisma.AbonnementUpdateOneWithoutWalletTransactionsNestedInput;
    offre?: Prisma.OffreUpdateOneWithoutWalletTransactionsNestedInput;
};
export type WalletTransactionUncheckedUpdateWithoutPrestationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    walletId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    abonnementId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    offreId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WalletTransactionUncheckedUpdateManyWithoutPrestationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    walletId?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumTransactionTypeFieldUpdateOperationsInput | $Enums.TransactionType;
    amount?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    abonnementId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    offreId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdByUserId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WalletTransactionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    walletId?: boolean;
    type?: boolean;
    amount?: boolean;
    prestationId?: boolean;
    abonnementId?: boolean;
    offreId?: boolean;
    meta?: boolean;
    createdByUserId?: boolean;
    createdAt?: boolean;
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
    prestation?: boolean | Prisma.WalletTransaction$prestationArgs<ExtArgs>;
    abonnement?: boolean | Prisma.WalletTransaction$abonnementArgs<ExtArgs>;
    offre?: boolean | Prisma.WalletTransaction$offreArgs<ExtArgs>;
}, ExtArgs["result"]["walletTransaction"]>;
export type WalletTransactionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    walletId?: boolean;
    type?: boolean;
    amount?: boolean;
    prestationId?: boolean;
    abonnementId?: boolean;
    offreId?: boolean;
    meta?: boolean;
    createdByUserId?: boolean;
    createdAt?: boolean;
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
    prestation?: boolean | Prisma.WalletTransaction$prestationArgs<ExtArgs>;
    abonnement?: boolean | Prisma.WalletTransaction$abonnementArgs<ExtArgs>;
    offre?: boolean | Prisma.WalletTransaction$offreArgs<ExtArgs>;
}, ExtArgs["result"]["walletTransaction"]>;
export type WalletTransactionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    walletId?: boolean;
    type?: boolean;
    amount?: boolean;
    prestationId?: boolean;
    abonnementId?: boolean;
    offreId?: boolean;
    meta?: boolean;
    createdByUserId?: boolean;
    createdAt?: boolean;
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
    prestation?: boolean | Prisma.WalletTransaction$prestationArgs<ExtArgs>;
    abonnement?: boolean | Prisma.WalletTransaction$abonnementArgs<ExtArgs>;
    offre?: boolean | Prisma.WalletTransaction$offreArgs<ExtArgs>;
}, ExtArgs["result"]["walletTransaction"]>;
export type WalletTransactionSelectScalar = {
    id?: boolean;
    walletId?: boolean;
    type?: boolean;
    amount?: boolean;
    prestationId?: boolean;
    abonnementId?: boolean;
    offreId?: boolean;
    meta?: boolean;
    createdByUserId?: boolean;
    createdAt?: boolean;
};
export type WalletTransactionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "walletId" | "type" | "amount" | "prestationId" | "abonnementId" | "offreId" | "meta" | "createdByUserId" | "createdAt", ExtArgs["result"]["walletTransaction"]>;
export type WalletTransactionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
    prestation?: boolean | Prisma.WalletTransaction$prestationArgs<ExtArgs>;
    abonnement?: boolean | Prisma.WalletTransaction$abonnementArgs<ExtArgs>;
    offre?: boolean | Prisma.WalletTransaction$offreArgs<ExtArgs>;
};
export type WalletTransactionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
    prestation?: boolean | Prisma.WalletTransaction$prestationArgs<ExtArgs>;
    abonnement?: boolean | Prisma.WalletTransaction$abonnementArgs<ExtArgs>;
    offre?: boolean | Prisma.WalletTransaction$offreArgs<ExtArgs>;
};
export type WalletTransactionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    wallet?: boolean | Prisma.WalletDefaultArgs<ExtArgs>;
    prestation?: boolean | Prisma.WalletTransaction$prestationArgs<ExtArgs>;
    abonnement?: boolean | Prisma.WalletTransaction$abonnementArgs<ExtArgs>;
    offre?: boolean | Prisma.WalletTransaction$offreArgs<ExtArgs>;
};
export type $WalletTransactionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "WalletTransaction";
    objects: {
        wallet: Prisma.$WalletPayload<ExtArgs>;
        prestation: Prisma.$PrestationPayload<ExtArgs> | null;
        abonnement: Prisma.$AbonnementPayload<ExtArgs> | null;
        offre: Prisma.$OffrePayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        walletId: string;
        type: $Enums.TransactionType;
        amount: runtime.Decimal;
        prestationId: string | null;
        abonnementId: string | null;
        offreId: string | null;
        meta: runtime.JsonValue | null;
        createdByUserId: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["walletTransaction"]>;
    composites: {};
};
export type WalletTransactionGetPayload<S extends boolean | null | undefined | WalletTransactionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WalletTransactionPayload, S>;
export type WalletTransactionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WalletTransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WalletTransactionCountAggregateInputType | true;
};
export interface WalletTransactionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['WalletTransaction'];
        meta: {
            name: 'WalletTransaction';
        };
    };
    findUnique<T extends WalletTransactionFindUniqueArgs>(args: Prisma.SelectSubset<T, WalletTransactionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WalletTransactionClient<runtime.Types.Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends WalletTransactionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WalletTransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WalletTransactionClient<runtime.Types.Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends WalletTransactionFindFirstArgs>(args?: Prisma.SelectSubset<T, WalletTransactionFindFirstArgs<ExtArgs>>): Prisma.Prisma__WalletTransactionClient<runtime.Types.Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends WalletTransactionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WalletTransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WalletTransactionClient<runtime.Types.Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends WalletTransactionFindManyArgs>(args?: Prisma.SelectSubset<T, WalletTransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends WalletTransactionCreateArgs>(args: Prisma.SelectSubset<T, WalletTransactionCreateArgs<ExtArgs>>): Prisma.Prisma__WalletTransactionClient<runtime.Types.Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends WalletTransactionCreateManyArgs>(args?: Prisma.SelectSubset<T, WalletTransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends WalletTransactionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WalletTransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends WalletTransactionDeleteArgs>(args: Prisma.SelectSubset<T, WalletTransactionDeleteArgs<ExtArgs>>): Prisma.Prisma__WalletTransactionClient<runtime.Types.Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends WalletTransactionUpdateArgs>(args: Prisma.SelectSubset<T, WalletTransactionUpdateArgs<ExtArgs>>): Prisma.Prisma__WalletTransactionClient<runtime.Types.Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends WalletTransactionDeleteManyArgs>(args?: Prisma.SelectSubset<T, WalletTransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends WalletTransactionUpdateManyArgs>(args: Prisma.SelectSubset<T, WalletTransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends WalletTransactionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WalletTransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends WalletTransactionUpsertArgs>(args: Prisma.SelectSubset<T, WalletTransactionUpsertArgs<ExtArgs>>): Prisma.Prisma__WalletTransactionClient<runtime.Types.Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends WalletTransactionCountArgs>(args?: Prisma.Subset<T, WalletTransactionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WalletTransactionCountAggregateOutputType> : number>;
    aggregate<T extends WalletTransactionAggregateArgs>(args: Prisma.Subset<T, WalletTransactionAggregateArgs>): Prisma.PrismaPromise<GetWalletTransactionAggregateType<T>>;
    groupBy<T extends WalletTransactionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WalletTransactionGroupByArgs['orderBy'];
    } : {
        orderBy?: WalletTransactionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WalletTransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWalletTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: WalletTransactionFieldRefs;
}
export interface Prisma__WalletTransactionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    wallet<T extends Prisma.WalletDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WalletDefaultArgs<ExtArgs>>): Prisma.Prisma__WalletClient<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    prestation<T extends Prisma.WalletTransaction$prestationArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WalletTransaction$prestationArgs<ExtArgs>>): Prisma.Prisma__PrestationClient<runtime.Types.Result.GetResult<Prisma.$PrestationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    abonnement<T extends Prisma.WalletTransaction$abonnementArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WalletTransaction$abonnementArgs<ExtArgs>>): Prisma.Prisma__AbonnementClient<runtime.Types.Result.GetResult<Prisma.$AbonnementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    offre<T extends Prisma.WalletTransaction$offreArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.WalletTransaction$offreArgs<ExtArgs>>): Prisma.Prisma__OffreClient<runtime.Types.Result.GetResult<Prisma.$OffrePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface WalletTransactionFieldRefs {
    readonly id: Prisma.FieldRef<"WalletTransaction", 'String'>;
    readonly walletId: Prisma.FieldRef<"WalletTransaction", 'String'>;
    readonly type: Prisma.FieldRef<"WalletTransaction", 'TransactionType'>;
    readonly amount: Prisma.FieldRef<"WalletTransaction", 'Decimal'>;
    readonly prestationId: Prisma.FieldRef<"WalletTransaction", 'String'>;
    readonly abonnementId: Prisma.FieldRef<"WalletTransaction", 'String'>;
    readonly offreId: Prisma.FieldRef<"WalletTransaction", 'String'>;
    readonly meta: Prisma.FieldRef<"WalletTransaction", 'Json'>;
    readonly createdByUserId: Prisma.FieldRef<"WalletTransaction", 'String'>;
    readonly createdAt: Prisma.FieldRef<"WalletTransaction", 'DateTime'>;
}
export type WalletTransactionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletTransactionSelect<ExtArgs> | null;
    omit?: Prisma.WalletTransactionOmit<ExtArgs> | null;
    include?: Prisma.WalletTransactionInclude<ExtArgs> | null;
    where: Prisma.WalletTransactionWhereUniqueInput;
};
export type WalletTransactionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletTransactionSelect<ExtArgs> | null;
    omit?: Prisma.WalletTransactionOmit<ExtArgs> | null;
    include?: Prisma.WalletTransactionInclude<ExtArgs> | null;
    where: Prisma.WalletTransactionWhereUniqueInput;
};
export type WalletTransactionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type WalletTransactionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type WalletTransactionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type WalletTransactionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletTransactionSelect<ExtArgs> | null;
    omit?: Prisma.WalletTransactionOmit<ExtArgs> | null;
    include?: Prisma.WalletTransactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WalletTransactionCreateInput, Prisma.WalletTransactionUncheckedCreateInput>;
};
export type WalletTransactionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.WalletTransactionCreateManyInput | Prisma.WalletTransactionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type WalletTransactionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletTransactionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WalletTransactionOmit<ExtArgs> | null;
    data: Prisma.WalletTransactionCreateManyInput | Prisma.WalletTransactionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.WalletTransactionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type WalletTransactionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletTransactionSelect<ExtArgs> | null;
    omit?: Prisma.WalletTransactionOmit<ExtArgs> | null;
    include?: Prisma.WalletTransactionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WalletTransactionUpdateInput, Prisma.WalletTransactionUncheckedUpdateInput>;
    where: Prisma.WalletTransactionWhereUniqueInput;
};
export type WalletTransactionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.WalletTransactionUpdateManyMutationInput, Prisma.WalletTransactionUncheckedUpdateManyInput>;
    where?: Prisma.WalletTransactionWhereInput;
    limit?: number;
};
export type WalletTransactionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletTransactionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WalletTransactionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WalletTransactionUpdateManyMutationInput, Prisma.WalletTransactionUncheckedUpdateManyInput>;
    where?: Prisma.WalletTransactionWhereInput;
    limit?: number;
    include?: Prisma.WalletTransactionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type WalletTransactionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletTransactionSelect<ExtArgs> | null;
    omit?: Prisma.WalletTransactionOmit<ExtArgs> | null;
    include?: Prisma.WalletTransactionInclude<ExtArgs> | null;
    where: Prisma.WalletTransactionWhereUniqueInput;
    create: Prisma.XOR<Prisma.WalletTransactionCreateInput, Prisma.WalletTransactionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.WalletTransactionUpdateInput, Prisma.WalletTransactionUncheckedUpdateInput>;
};
export type WalletTransactionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletTransactionSelect<ExtArgs> | null;
    omit?: Prisma.WalletTransactionOmit<ExtArgs> | null;
    include?: Prisma.WalletTransactionInclude<ExtArgs> | null;
    where: Prisma.WalletTransactionWhereUniqueInput;
};
export type WalletTransactionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WalletTransactionWhereInput;
    limit?: number;
};
export type WalletTransaction$prestationArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestationSelect<ExtArgs> | null;
    omit?: Prisma.PrestationOmit<ExtArgs> | null;
    include?: Prisma.PrestationInclude<ExtArgs> | null;
    where?: Prisma.PrestationWhereInput;
};
export type WalletTransaction$abonnementArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AbonnementSelect<ExtArgs> | null;
    omit?: Prisma.AbonnementOmit<ExtArgs> | null;
    include?: Prisma.AbonnementInclude<ExtArgs> | null;
    where?: Prisma.AbonnementWhereInput;
};
export type WalletTransaction$offreArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OffreSelect<ExtArgs> | null;
    omit?: Prisma.OffreOmit<ExtArgs> | null;
    include?: Prisma.OffreInclude<ExtArgs> | null;
    where?: Prisma.OffreWhereInput;
};
export type WalletTransactionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletTransactionSelect<ExtArgs> | null;
    omit?: Prisma.WalletTransactionOmit<ExtArgs> | null;
    include?: Prisma.WalletTransactionInclude<ExtArgs> | null;
};
export {};
