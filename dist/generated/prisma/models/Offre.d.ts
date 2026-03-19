import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type OffreModel = runtime.Types.Result.DefaultSelection<Prisma.$OffrePayload>;
export type AggregateOffre = {
    _count: OffreCountAggregateOutputType | null;
    _avg: OffreAvgAggregateOutputType | null;
    _sum: OffreSumAggregateOutputType | null;
    _min: OffreMinAggregateOutputType | null;
    _max: OffreMaxAggregateOutputType | null;
};
export type OffreAvgAggregateOutputType = {
    prix: runtime.Decimal | null;
    dureeMois: number | null;
    ordre: number | null;
};
export type OffreSumAggregateOutputType = {
    prix: runtime.Decimal | null;
    dureeMois: number | null;
    ordre: number | null;
};
export type OffreMinAggregateOutputType = {
    id: string | null;
    code: string | null;
    libelle: string | null;
    description: string | null;
    prix: runtime.Decimal | null;
    dureeMois: number | null;
    actif: boolean | null;
    ordre: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OffreMaxAggregateOutputType = {
    id: string | null;
    code: string | null;
    libelle: string | null;
    description: string | null;
    prix: runtime.Decimal | null;
    dureeMois: number | null;
    actif: boolean | null;
    ordre: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type OffreCountAggregateOutputType = {
    id: number;
    code: number;
    libelle: number;
    description: number;
    prix: number;
    dureeMois: number;
    actif: number;
    ordre: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type OffreAvgAggregateInputType = {
    prix?: true;
    dureeMois?: true;
    ordre?: true;
};
export type OffreSumAggregateInputType = {
    prix?: true;
    dureeMois?: true;
    ordre?: true;
};
export type OffreMinAggregateInputType = {
    id?: true;
    code?: true;
    libelle?: true;
    description?: true;
    prix?: true;
    dureeMois?: true;
    actif?: true;
    ordre?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OffreMaxAggregateInputType = {
    id?: true;
    code?: true;
    libelle?: true;
    description?: true;
    prix?: true;
    dureeMois?: true;
    actif?: true;
    ordre?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type OffreCountAggregateInputType = {
    id?: true;
    code?: true;
    libelle?: true;
    description?: true;
    prix?: true;
    dureeMois?: true;
    actif?: true;
    ordre?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type OffreAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OffreWhereInput;
    orderBy?: Prisma.OffreOrderByWithRelationInput | Prisma.OffreOrderByWithRelationInput[];
    cursor?: Prisma.OffreWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OffreCountAggregateInputType;
    _avg?: OffreAvgAggregateInputType;
    _sum?: OffreSumAggregateInputType;
    _min?: OffreMinAggregateInputType;
    _max?: OffreMaxAggregateInputType;
};
export type GetOffreAggregateType<T extends OffreAggregateArgs> = {
    [P in keyof T & keyof AggregateOffre]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOffre[P]> : Prisma.GetScalarType<T[P], AggregateOffre[P]>;
};
export type OffreGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OffreWhereInput;
    orderBy?: Prisma.OffreOrderByWithAggregationInput | Prisma.OffreOrderByWithAggregationInput[];
    by: Prisma.OffreScalarFieldEnum[] | Prisma.OffreScalarFieldEnum;
    having?: Prisma.OffreScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OffreCountAggregateInputType | true;
    _avg?: OffreAvgAggregateInputType;
    _sum?: OffreSumAggregateInputType;
    _min?: OffreMinAggregateInputType;
    _max?: OffreMaxAggregateInputType;
};
export type OffreGroupByOutputType = {
    id: string;
    code: string;
    libelle: string;
    description: string | null;
    prix: runtime.Decimal;
    dureeMois: number;
    actif: boolean;
    ordre: number;
    createdAt: Date;
    updatedAt: Date;
    _count: OffreCountAggregateOutputType | null;
    _avg: OffreAvgAggregateOutputType | null;
    _sum: OffreSumAggregateOutputType | null;
    _min: OffreMinAggregateOutputType | null;
    _max: OffreMaxAggregateOutputType | null;
};
type GetOffreGroupByPayload<T extends OffreGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OffreGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OffreGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OffreGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OffreGroupByOutputType[P]>;
}>>;
export type OffreWhereInput = {
    AND?: Prisma.OffreWhereInput | Prisma.OffreWhereInput[];
    OR?: Prisma.OffreWhereInput[];
    NOT?: Prisma.OffreWhereInput | Prisma.OffreWhereInput[];
    id?: Prisma.StringFilter<"Offre"> | string;
    code?: Prisma.StringFilter<"Offre"> | string;
    libelle?: Prisma.StringFilter<"Offre"> | string;
    description?: Prisma.StringNullableFilter<"Offre"> | string | null;
    prix?: Prisma.DecimalFilter<"Offre"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dureeMois?: Prisma.IntFilter<"Offre"> | number;
    actif?: Prisma.BoolFilter<"Offre"> | boolean;
    ordre?: Prisma.IntFilter<"Offre"> | number;
    createdAt?: Prisma.DateTimeFilter<"Offre"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Offre"> | Date | string;
    abonnements?: Prisma.AbonnementListRelationFilter;
    walletTransactions?: Prisma.WalletTransactionListRelationFilter;
};
export type OffreOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    libelle?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    prix?: Prisma.SortOrder;
    dureeMois?: Prisma.SortOrder;
    actif?: Prisma.SortOrder;
    ordre?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    abonnements?: Prisma.AbonnementOrderByRelationAggregateInput;
    walletTransactions?: Prisma.WalletTransactionOrderByRelationAggregateInput;
};
export type OffreWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    code?: string;
    AND?: Prisma.OffreWhereInput | Prisma.OffreWhereInput[];
    OR?: Prisma.OffreWhereInput[];
    NOT?: Prisma.OffreWhereInput | Prisma.OffreWhereInput[];
    libelle?: Prisma.StringFilter<"Offre"> | string;
    description?: Prisma.StringNullableFilter<"Offre"> | string | null;
    prix?: Prisma.DecimalFilter<"Offre"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dureeMois?: Prisma.IntFilter<"Offre"> | number;
    actif?: Prisma.BoolFilter<"Offre"> | boolean;
    ordre?: Prisma.IntFilter<"Offre"> | number;
    createdAt?: Prisma.DateTimeFilter<"Offre"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Offre"> | Date | string;
    abonnements?: Prisma.AbonnementListRelationFilter;
    walletTransactions?: Prisma.WalletTransactionListRelationFilter;
}, "id" | "code">;
export type OffreOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    libelle?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    prix?: Prisma.SortOrder;
    dureeMois?: Prisma.SortOrder;
    actif?: Prisma.SortOrder;
    ordre?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.OffreCountOrderByAggregateInput;
    _avg?: Prisma.OffreAvgOrderByAggregateInput;
    _max?: Prisma.OffreMaxOrderByAggregateInput;
    _min?: Prisma.OffreMinOrderByAggregateInput;
    _sum?: Prisma.OffreSumOrderByAggregateInput;
};
export type OffreScalarWhereWithAggregatesInput = {
    AND?: Prisma.OffreScalarWhereWithAggregatesInput | Prisma.OffreScalarWhereWithAggregatesInput[];
    OR?: Prisma.OffreScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OffreScalarWhereWithAggregatesInput | Prisma.OffreScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Offre"> | string;
    code?: Prisma.StringWithAggregatesFilter<"Offre"> | string;
    libelle?: Prisma.StringWithAggregatesFilter<"Offre"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Offre"> | string | null;
    prix?: Prisma.DecimalWithAggregatesFilter<"Offre"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dureeMois?: Prisma.IntWithAggregatesFilter<"Offre"> | number;
    actif?: Prisma.BoolWithAggregatesFilter<"Offre"> | boolean;
    ordre?: Prisma.IntWithAggregatesFilter<"Offre"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Offre"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Offre"> | Date | string;
};
export type OffreCreateInput = {
    id?: string;
    code: string;
    libelle: string;
    description?: string | null;
    prix: runtime.Decimal | runtime.DecimalJsLike | number | string;
    dureeMois: number;
    actif?: boolean;
    ordre?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    abonnements?: Prisma.AbonnementCreateNestedManyWithoutOffreInput;
    walletTransactions?: Prisma.WalletTransactionCreateNestedManyWithoutOffreInput;
};
export type OffreUncheckedCreateInput = {
    id?: string;
    code: string;
    libelle: string;
    description?: string | null;
    prix: runtime.Decimal | runtime.DecimalJsLike | number | string;
    dureeMois: number;
    actif?: boolean;
    ordre?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    abonnements?: Prisma.AbonnementUncheckedCreateNestedManyWithoutOffreInput;
    walletTransactions?: Prisma.WalletTransactionUncheckedCreateNestedManyWithoutOffreInput;
};
export type OffreUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    libelle?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    prix?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dureeMois?: Prisma.IntFieldUpdateOperationsInput | number;
    actif?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ordre?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    abonnements?: Prisma.AbonnementUpdateManyWithoutOffreNestedInput;
    walletTransactions?: Prisma.WalletTransactionUpdateManyWithoutOffreNestedInput;
};
export type OffreUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    libelle?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    prix?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dureeMois?: Prisma.IntFieldUpdateOperationsInput | number;
    actif?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ordre?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    abonnements?: Prisma.AbonnementUncheckedUpdateManyWithoutOffreNestedInput;
    walletTransactions?: Prisma.WalletTransactionUncheckedUpdateManyWithoutOffreNestedInput;
};
export type OffreCreateManyInput = {
    id?: string;
    code: string;
    libelle: string;
    description?: string | null;
    prix: runtime.Decimal | runtime.DecimalJsLike | number | string;
    dureeMois: number;
    actif?: boolean;
    ordre?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OffreUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    libelle?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    prix?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dureeMois?: Prisma.IntFieldUpdateOperationsInput | number;
    actif?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ordre?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OffreUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    libelle?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    prix?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dureeMois?: Prisma.IntFieldUpdateOperationsInput | number;
    actif?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ordre?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OffreCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    libelle?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    prix?: Prisma.SortOrder;
    dureeMois?: Prisma.SortOrder;
    actif?: Prisma.SortOrder;
    ordre?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OffreAvgOrderByAggregateInput = {
    prix?: Prisma.SortOrder;
    dureeMois?: Prisma.SortOrder;
    ordre?: Prisma.SortOrder;
};
export type OffreMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    libelle?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    prix?: Prisma.SortOrder;
    dureeMois?: Prisma.SortOrder;
    actif?: Prisma.SortOrder;
    ordre?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OffreMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    libelle?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    prix?: Prisma.SortOrder;
    dureeMois?: Prisma.SortOrder;
    actif?: Prisma.SortOrder;
    ordre?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type OffreSumOrderByAggregateInput = {
    prix?: Prisma.SortOrder;
    dureeMois?: Prisma.SortOrder;
    ordre?: Prisma.SortOrder;
};
export type OffreScalarRelationFilter = {
    is?: Prisma.OffreWhereInput;
    isNot?: Prisma.OffreWhereInput;
};
export type OffreNullableScalarRelationFilter = {
    is?: Prisma.OffreWhereInput | null;
    isNot?: Prisma.OffreWhereInput | null;
};
export type DecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type OffreCreateNestedOneWithoutAbonnementsInput = {
    create?: Prisma.XOR<Prisma.OffreCreateWithoutAbonnementsInput, Prisma.OffreUncheckedCreateWithoutAbonnementsInput>;
    connectOrCreate?: Prisma.OffreCreateOrConnectWithoutAbonnementsInput;
    connect?: Prisma.OffreWhereUniqueInput;
};
export type OffreUpdateOneRequiredWithoutAbonnementsNestedInput = {
    create?: Prisma.XOR<Prisma.OffreCreateWithoutAbonnementsInput, Prisma.OffreUncheckedCreateWithoutAbonnementsInput>;
    connectOrCreate?: Prisma.OffreCreateOrConnectWithoutAbonnementsInput;
    upsert?: Prisma.OffreUpsertWithoutAbonnementsInput;
    connect?: Prisma.OffreWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OffreUpdateToOneWithWhereWithoutAbonnementsInput, Prisma.OffreUpdateWithoutAbonnementsInput>, Prisma.OffreUncheckedUpdateWithoutAbonnementsInput>;
};
export type OffreCreateNestedOneWithoutWalletTransactionsInput = {
    create?: Prisma.XOR<Prisma.OffreCreateWithoutWalletTransactionsInput, Prisma.OffreUncheckedCreateWithoutWalletTransactionsInput>;
    connectOrCreate?: Prisma.OffreCreateOrConnectWithoutWalletTransactionsInput;
    connect?: Prisma.OffreWhereUniqueInput;
};
export type OffreUpdateOneWithoutWalletTransactionsNestedInput = {
    create?: Prisma.XOR<Prisma.OffreCreateWithoutWalletTransactionsInput, Prisma.OffreUncheckedCreateWithoutWalletTransactionsInput>;
    connectOrCreate?: Prisma.OffreCreateOrConnectWithoutWalletTransactionsInput;
    upsert?: Prisma.OffreUpsertWithoutWalletTransactionsInput;
    disconnect?: Prisma.OffreWhereInput | boolean;
    delete?: Prisma.OffreWhereInput | boolean;
    connect?: Prisma.OffreWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.OffreUpdateToOneWithWhereWithoutWalletTransactionsInput, Prisma.OffreUpdateWithoutWalletTransactionsInput>, Prisma.OffreUncheckedUpdateWithoutWalletTransactionsInput>;
};
export type OffreCreateWithoutAbonnementsInput = {
    id?: string;
    code: string;
    libelle: string;
    description?: string | null;
    prix: runtime.Decimal | runtime.DecimalJsLike | number | string;
    dureeMois: number;
    actif?: boolean;
    ordre?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    walletTransactions?: Prisma.WalletTransactionCreateNestedManyWithoutOffreInput;
};
export type OffreUncheckedCreateWithoutAbonnementsInput = {
    id?: string;
    code: string;
    libelle: string;
    description?: string | null;
    prix: runtime.Decimal | runtime.DecimalJsLike | number | string;
    dureeMois: number;
    actif?: boolean;
    ordre?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    walletTransactions?: Prisma.WalletTransactionUncheckedCreateNestedManyWithoutOffreInput;
};
export type OffreCreateOrConnectWithoutAbonnementsInput = {
    where: Prisma.OffreWhereUniqueInput;
    create: Prisma.XOR<Prisma.OffreCreateWithoutAbonnementsInput, Prisma.OffreUncheckedCreateWithoutAbonnementsInput>;
};
export type OffreUpsertWithoutAbonnementsInput = {
    update: Prisma.XOR<Prisma.OffreUpdateWithoutAbonnementsInput, Prisma.OffreUncheckedUpdateWithoutAbonnementsInput>;
    create: Prisma.XOR<Prisma.OffreCreateWithoutAbonnementsInput, Prisma.OffreUncheckedCreateWithoutAbonnementsInput>;
    where?: Prisma.OffreWhereInput;
};
export type OffreUpdateToOneWithWhereWithoutAbonnementsInput = {
    where?: Prisma.OffreWhereInput;
    data: Prisma.XOR<Prisma.OffreUpdateWithoutAbonnementsInput, Prisma.OffreUncheckedUpdateWithoutAbonnementsInput>;
};
export type OffreUpdateWithoutAbonnementsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    libelle?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    prix?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dureeMois?: Prisma.IntFieldUpdateOperationsInput | number;
    actif?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ordre?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    walletTransactions?: Prisma.WalletTransactionUpdateManyWithoutOffreNestedInput;
};
export type OffreUncheckedUpdateWithoutAbonnementsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    libelle?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    prix?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dureeMois?: Prisma.IntFieldUpdateOperationsInput | number;
    actif?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ordre?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    walletTransactions?: Prisma.WalletTransactionUncheckedUpdateManyWithoutOffreNestedInput;
};
export type OffreCreateWithoutWalletTransactionsInput = {
    id?: string;
    code: string;
    libelle: string;
    description?: string | null;
    prix: runtime.Decimal | runtime.DecimalJsLike | number | string;
    dureeMois: number;
    actif?: boolean;
    ordre?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    abonnements?: Prisma.AbonnementCreateNestedManyWithoutOffreInput;
};
export type OffreUncheckedCreateWithoutWalletTransactionsInput = {
    id?: string;
    code: string;
    libelle: string;
    description?: string | null;
    prix: runtime.Decimal | runtime.DecimalJsLike | number | string;
    dureeMois: number;
    actif?: boolean;
    ordre?: number;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    abonnements?: Prisma.AbonnementUncheckedCreateNestedManyWithoutOffreInput;
};
export type OffreCreateOrConnectWithoutWalletTransactionsInput = {
    where: Prisma.OffreWhereUniqueInput;
    create: Prisma.XOR<Prisma.OffreCreateWithoutWalletTransactionsInput, Prisma.OffreUncheckedCreateWithoutWalletTransactionsInput>;
};
export type OffreUpsertWithoutWalletTransactionsInput = {
    update: Prisma.XOR<Prisma.OffreUpdateWithoutWalletTransactionsInput, Prisma.OffreUncheckedUpdateWithoutWalletTransactionsInput>;
    create: Prisma.XOR<Prisma.OffreCreateWithoutWalletTransactionsInput, Prisma.OffreUncheckedCreateWithoutWalletTransactionsInput>;
    where?: Prisma.OffreWhereInput;
};
export type OffreUpdateToOneWithWhereWithoutWalletTransactionsInput = {
    where?: Prisma.OffreWhereInput;
    data: Prisma.XOR<Prisma.OffreUpdateWithoutWalletTransactionsInput, Prisma.OffreUncheckedUpdateWithoutWalletTransactionsInput>;
};
export type OffreUpdateWithoutWalletTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    libelle?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    prix?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dureeMois?: Prisma.IntFieldUpdateOperationsInput | number;
    actif?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ordre?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    abonnements?: Prisma.AbonnementUpdateManyWithoutOffreNestedInput;
};
export type OffreUncheckedUpdateWithoutWalletTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    libelle?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    prix?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    dureeMois?: Prisma.IntFieldUpdateOperationsInput | number;
    actif?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ordre?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    abonnements?: Prisma.AbonnementUncheckedUpdateManyWithoutOffreNestedInput;
};
export type OffreCountOutputType = {
    abonnements: number;
    walletTransactions: number;
};
export type OffreCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    abonnements?: boolean | OffreCountOutputTypeCountAbonnementsArgs;
    walletTransactions?: boolean | OffreCountOutputTypeCountWalletTransactionsArgs;
};
export type OffreCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OffreCountOutputTypeSelect<ExtArgs> | null;
};
export type OffreCountOutputTypeCountAbonnementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AbonnementWhereInput;
};
export type OffreCountOutputTypeCountWalletTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WalletTransactionWhereInput;
};
export type OffreSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    libelle?: boolean;
    description?: boolean;
    prix?: boolean;
    dureeMois?: boolean;
    actif?: boolean;
    ordre?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    abonnements?: boolean | Prisma.Offre$abonnementsArgs<ExtArgs>;
    walletTransactions?: boolean | Prisma.Offre$walletTransactionsArgs<ExtArgs>;
    _count?: boolean | Prisma.OffreCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["offre"]>;
export type OffreSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    libelle?: boolean;
    description?: boolean;
    prix?: boolean;
    dureeMois?: boolean;
    actif?: boolean;
    ordre?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["offre"]>;
export type OffreSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    libelle?: boolean;
    description?: boolean;
    prix?: boolean;
    dureeMois?: boolean;
    actif?: boolean;
    ordre?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["offre"]>;
export type OffreSelectScalar = {
    id?: boolean;
    code?: boolean;
    libelle?: boolean;
    description?: boolean;
    prix?: boolean;
    dureeMois?: boolean;
    actif?: boolean;
    ordre?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type OffreOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "code" | "libelle" | "description" | "prix" | "dureeMois" | "actif" | "ordre" | "createdAt" | "updatedAt", ExtArgs["result"]["offre"]>;
export type OffreInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    abonnements?: boolean | Prisma.Offre$abonnementsArgs<ExtArgs>;
    walletTransactions?: boolean | Prisma.Offre$walletTransactionsArgs<ExtArgs>;
    _count?: boolean | Prisma.OffreCountOutputTypeDefaultArgs<ExtArgs>;
};
export type OffreIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type OffreIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $OffrePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Offre";
    objects: {
        abonnements: Prisma.$AbonnementPayload<ExtArgs>[];
        walletTransactions: Prisma.$WalletTransactionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        code: string;
        libelle: string;
        description: string | null;
        prix: runtime.Decimal;
        dureeMois: number;
        actif: boolean;
        ordre: number;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["offre"]>;
    composites: {};
};
export type OffreGetPayload<S extends boolean | null | undefined | OffreDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OffrePayload, S>;
export type OffreCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OffreFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OffreCountAggregateInputType | true;
};
export interface OffreDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Offre'];
        meta: {
            name: 'Offre';
        };
    };
    findUnique<T extends OffreFindUniqueArgs>(args: Prisma.SelectSubset<T, OffreFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OffreClient<runtime.Types.Result.GetResult<Prisma.$OffrePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OffreFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OffreFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OffreClient<runtime.Types.Result.GetResult<Prisma.$OffrePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OffreFindFirstArgs>(args?: Prisma.SelectSubset<T, OffreFindFirstArgs<ExtArgs>>): Prisma.Prisma__OffreClient<runtime.Types.Result.GetResult<Prisma.$OffrePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OffreFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OffreFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OffreClient<runtime.Types.Result.GetResult<Prisma.$OffrePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OffreFindManyArgs>(args?: Prisma.SelectSubset<T, OffreFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OffrePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OffreCreateArgs>(args: Prisma.SelectSubset<T, OffreCreateArgs<ExtArgs>>): Prisma.Prisma__OffreClient<runtime.Types.Result.GetResult<Prisma.$OffrePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OffreCreateManyArgs>(args?: Prisma.SelectSubset<T, OffreCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends OffreCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OffreCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OffrePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends OffreDeleteArgs>(args: Prisma.SelectSubset<T, OffreDeleteArgs<ExtArgs>>): Prisma.Prisma__OffreClient<runtime.Types.Result.GetResult<Prisma.$OffrePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OffreUpdateArgs>(args: Prisma.SelectSubset<T, OffreUpdateArgs<ExtArgs>>): Prisma.Prisma__OffreClient<runtime.Types.Result.GetResult<Prisma.$OffrePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OffreDeleteManyArgs>(args?: Prisma.SelectSubset<T, OffreDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OffreUpdateManyArgs>(args: Prisma.SelectSubset<T, OffreUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends OffreUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OffreUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OffrePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends OffreUpsertArgs>(args: Prisma.SelectSubset<T, OffreUpsertArgs<ExtArgs>>): Prisma.Prisma__OffreClient<runtime.Types.Result.GetResult<Prisma.$OffrePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OffreCountArgs>(args?: Prisma.Subset<T, OffreCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OffreCountAggregateOutputType> : number>;
    aggregate<T extends OffreAggregateArgs>(args: Prisma.Subset<T, OffreAggregateArgs>): Prisma.PrismaPromise<GetOffreAggregateType<T>>;
    groupBy<T extends OffreGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OffreGroupByArgs['orderBy'];
    } : {
        orderBy?: OffreGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OffreGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOffreGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OffreFieldRefs;
}
export interface Prisma__OffreClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    abonnements<T extends Prisma.Offre$abonnementsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Offre$abonnementsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AbonnementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    walletTransactions<T extends Prisma.Offre$walletTransactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Offre$walletTransactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OffreFieldRefs {
    readonly id: Prisma.FieldRef<"Offre", 'String'>;
    readonly code: Prisma.FieldRef<"Offre", 'String'>;
    readonly libelle: Prisma.FieldRef<"Offre", 'String'>;
    readonly description: Prisma.FieldRef<"Offre", 'String'>;
    readonly prix: Prisma.FieldRef<"Offre", 'Decimal'>;
    readonly dureeMois: Prisma.FieldRef<"Offre", 'Int'>;
    readonly actif: Prisma.FieldRef<"Offre", 'Boolean'>;
    readonly ordre: Prisma.FieldRef<"Offre", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"Offre", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Offre", 'DateTime'>;
}
export type OffreFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OffreSelect<ExtArgs> | null;
    omit?: Prisma.OffreOmit<ExtArgs> | null;
    include?: Prisma.OffreInclude<ExtArgs> | null;
    where: Prisma.OffreWhereUniqueInput;
};
export type OffreFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OffreSelect<ExtArgs> | null;
    omit?: Prisma.OffreOmit<ExtArgs> | null;
    include?: Prisma.OffreInclude<ExtArgs> | null;
    where: Prisma.OffreWhereUniqueInput;
};
export type OffreFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OffreSelect<ExtArgs> | null;
    omit?: Prisma.OffreOmit<ExtArgs> | null;
    include?: Prisma.OffreInclude<ExtArgs> | null;
    where?: Prisma.OffreWhereInput;
    orderBy?: Prisma.OffreOrderByWithRelationInput | Prisma.OffreOrderByWithRelationInput[];
    cursor?: Prisma.OffreWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OffreScalarFieldEnum | Prisma.OffreScalarFieldEnum[];
};
export type OffreFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OffreSelect<ExtArgs> | null;
    omit?: Prisma.OffreOmit<ExtArgs> | null;
    include?: Prisma.OffreInclude<ExtArgs> | null;
    where?: Prisma.OffreWhereInput;
    orderBy?: Prisma.OffreOrderByWithRelationInput | Prisma.OffreOrderByWithRelationInput[];
    cursor?: Prisma.OffreWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OffreScalarFieldEnum | Prisma.OffreScalarFieldEnum[];
};
export type OffreFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OffreSelect<ExtArgs> | null;
    omit?: Prisma.OffreOmit<ExtArgs> | null;
    include?: Prisma.OffreInclude<ExtArgs> | null;
    where?: Prisma.OffreWhereInput;
    orderBy?: Prisma.OffreOrderByWithRelationInput | Prisma.OffreOrderByWithRelationInput[];
    cursor?: Prisma.OffreWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OffreScalarFieldEnum | Prisma.OffreScalarFieldEnum[];
};
export type OffreCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OffreSelect<ExtArgs> | null;
    omit?: Prisma.OffreOmit<ExtArgs> | null;
    include?: Prisma.OffreInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OffreCreateInput, Prisma.OffreUncheckedCreateInput>;
};
export type OffreCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OffreCreateManyInput | Prisma.OffreCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OffreCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OffreSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OffreOmit<ExtArgs> | null;
    data: Prisma.OffreCreateManyInput | Prisma.OffreCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OffreUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OffreSelect<ExtArgs> | null;
    omit?: Prisma.OffreOmit<ExtArgs> | null;
    include?: Prisma.OffreInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OffreUpdateInput, Prisma.OffreUncheckedUpdateInput>;
    where: Prisma.OffreWhereUniqueInput;
};
export type OffreUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OffreUpdateManyMutationInput, Prisma.OffreUncheckedUpdateManyInput>;
    where?: Prisma.OffreWhereInput;
    limit?: number;
};
export type OffreUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OffreSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OffreOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OffreUpdateManyMutationInput, Prisma.OffreUncheckedUpdateManyInput>;
    where?: Prisma.OffreWhereInput;
    limit?: number;
};
export type OffreUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OffreSelect<ExtArgs> | null;
    omit?: Prisma.OffreOmit<ExtArgs> | null;
    include?: Prisma.OffreInclude<ExtArgs> | null;
    where: Prisma.OffreWhereUniqueInput;
    create: Prisma.XOR<Prisma.OffreCreateInput, Prisma.OffreUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OffreUpdateInput, Prisma.OffreUncheckedUpdateInput>;
};
export type OffreDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OffreSelect<ExtArgs> | null;
    omit?: Prisma.OffreOmit<ExtArgs> | null;
    include?: Prisma.OffreInclude<ExtArgs> | null;
    where: Prisma.OffreWhereUniqueInput;
};
export type OffreDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OffreWhereInput;
    limit?: number;
};
export type Offre$abonnementsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Offre$walletTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OffreDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OffreSelect<ExtArgs> | null;
    omit?: Prisma.OffreOmit<ExtArgs> | null;
    include?: Prisma.OffreInclude<ExtArgs> | null;
};
export {};
