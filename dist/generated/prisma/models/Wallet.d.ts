import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type WalletModel = runtime.Types.Result.DefaultSelection<Prisma.$WalletPayload>;
export type AggregateWallet = {
    _count: WalletCountAggregateOutputType | null;
    _avg: WalletAvgAggregateOutputType | null;
    _sum: WalletSumAggregateOutputType | null;
    _min: WalletMinAggregateOutputType | null;
    _max: WalletMaxAggregateOutputType | null;
};
export type WalletAvgAggregateOutputType = {
    balance: runtime.Decimal | null;
    balancePlafond: runtime.Decimal | null;
};
export type WalletSumAggregateOutputType = {
    balance: runtime.Decimal | null;
    balancePlafond: runtime.Decimal | null;
};
export type WalletMinAggregateOutputType = {
    id: string | null;
    type: $Enums.WalletType | null;
    prestataireId: string | null;
    balance: runtime.Decimal | null;
    balancePlafond: runtime.Decimal | null;
    statutPrestataire: $Enums.PrestataireWalletStatut | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type WalletMaxAggregateOutputType = {
    id: string | null;
    type: $Enums.WalletType | null;
    prestataireId: string | null;
    balance: runtime.Decimal | null;
    balancePlafond: runtime.Decimal | null;
    statutPrestataire: $Enums.PrestataireWalletStatut | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type WalletCountAggregateOutputType = {
    id: number;
    type: number;
    prestataireId: number;
    balance: number;
    balancePlafond: number;
    statutPrestataire: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type WalletAvgAggregateInputType = {
    balance?: true;
    balancePlafond?: true;
};
export type WalletSumAggregateInputType = {
    balance?: true;
    balancePlafond?: true;
};
export type WalletMinAggregateInputType = {
    id?: true;
    type?: true;
    prestataireId?: true;
    balance?: true;
    balancePlafond?: true;
    statutPrestataire?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type WalletMaxAggregateInputType = {
    id?: true;
    type?: true;
    prestataireId?: true;
    balance?: true;
    balancePlafond?: true;
    statutPrestataire?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type WalletCountAggregateInputType = {
    id?: true;
    type?: true;
    prestataireId?: true;
    balance?: true;
    balancePlafond?: true;
    statutPrestataire?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type WalletAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WalletWhereInput;
    orderBy?: Prisma.WalletOrderByWithRelationInput | Prisma.WalletOrderByWithRelationInput[];
    cursor?: Prisma.WalletWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | WalletCountAggregateInputType;
    _avg?: WalletAvgAggregateInputType;
    _sum?: WalletSumAggregateInputType;
    _min?: WalletMinAggregateInputType;
    _max?: WalletMaxAggregateInputType;
};
export type GetWalletAggregateType<T extends WalletAggregateArgs> = {
    [P in keyof T & keyof AggregateWallet]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWallet[P]> : Prisma.GetScalarType<T[P], AggregateWallet[P]>;
};
export type WalletGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WalletWhereInput;
    orderBy?: Prisma.WalletOrderByWithAggregationInput | Prisma.WalletOrderByWithAggregationInput[];
    by: Prisma.WalletScalarFieldEnum[] | Prisma.WalletScalarFieldEnum;
    having?: Prisma.WalletScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WalletCountAggregateInputType | true;
    _avg?: WalletAvgAggregateInputType;
    _sum?: WalletSumAggregateInputType;
    _min?: WalletMinAggregateInputType;
    _max?: WalletMaxAggregateInputType;
};
export type WalletGroupByOutputType = {
    id: string;
    type: $Enums.WalletType;
    prestataireId: string | null;
    balance: runtime.Decimal;
    balancePlafond: runtime.Decimal | null;
    statutPrestataire: $Enums.PrestataireWalletStatut;
    createdAt: Date;
    updatedAt: Date;
    _count: WalletCountAggregateOutputType | null;
    _avg: WalletAvgAggregateOutputType | null;
    _sum: WalletSumAggregateOutputType | null;
    _min: WalletMinAggregateOutputType | null;
    _max: WalletMaxAggregateOutputType | null;
};
type GetWalletGroupByPayload<T extends WalletGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WalletGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WalletGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WalletGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WalletGroupByOutputType[P]>;
}>>;
export type WalletWhereInput = {
    AND?: Prisma.WalletWhereInput | Prisma.WalletWhereInput[];
    OR?: Prisma.WalletWhereInput[];
    NOT?: Prisma.WalletWhereInput | Prisma.WalletWhereInput[];
    id?: Prisma.StringFilter<"Wallet"> | string;
    type?: Prisma.EnumWalletTypeFilter<"Wallet"> | $Enums.WalletType;
    prestataireId?: Prisma.StringNullableFilter<"Wallet"> | string | null;
    balance?: Prisma.DecimalFilter<"Wallet"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    balancePlafond?: Prisma.DecimalNullableFilter<"Wallet"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    statutPrestataire?: Prisma.EnumPrestataireWalletStatutFilter<"Wallet"> | $Enums.PrestataireWalletStatut;
    createdAt?: Prisma.DateTimeFilter<"Wallet"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Wallet"> | Date | string;
    prestataire?: Prisma.XOR<Prisma.PrestataireNullableScalarRelationFilter, Prisma.PrestataireWhereInput> | null;
    transactions?: Prisma.WalletTransactionListRelationFilter;
};
export type WalletOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrderInput | Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    balancePlafond?: Prisma.SortOrderInput | Prisma.SortOrder;
    statutPrestataire?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    prestataire?: Prisma.PrestataireOrderByWithRelationInput;
    transactions?: Prisma.WalletTransactionOrderByRelationAggregateInput;
};
export type WalletWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    type?: $Enums.WalletType;
    prestataireId?: string;
    AND?: Prisma.WalletWhereInput | Prisma.WalletWhereInput[];
    OR?: Prisma.WalletWhereInput[];
    NOT?: Prisma.WalletWhereInput | Prisma.WalletWhereInput[];
    balance?: Prisma.DecimalFilter<"Wallet"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    balancePlafond?: Prisma.DecimalNullableFilter<"Wallet"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    statutPrestataire?: Prisma.EnumPrestataireWalletStatutFilter<"Wallet"> | $Enums.PrestataireWalletStatut;
    createdAt?: Prisma.DateTimeFilter<"Wallet"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Wallet"> | Date | string;
    prestataire?: Prisma.XOR<Prisma.PrestataireNullableScalarRelationFilter, Prisma.PrestataireWhereInput> | null;
    transactions?: Prisma.WalletTransactionListRelationFilter;
}, "id" | "prestataireId" | "type">;
export type WalletOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrderInput | Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    balancePlafond?: Prisma.SortOrderInput | Prisma.SortOrder;
    statutPrestataire?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.WalletCountOrderByAggregateInput;
    _avg?: Prisma.WalletAvgOrderByAggregateInput;
    _max?: Prisma.WalletMaxOrderByAggregateInput;
    _min?: Prisma.WalletMinOrderByAggregateInput;
    _sum?: Prisma.WalletSumOrderByAggregateInput;
};
export type WalletScalarWhereWithAggregatesInput = {
    AND?: Prisma.WalletScalarWhereWithAggregatesInput | Prisma.WalletScalarWhereWithAggregatesInput[];
    OR?: Prisma.WalletScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WalletScalarWhereWithAggregatesInput | Prisma.WalletScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Wallet"> | string;
    type?: Prisma.EnumWalletTypeWithAggregatesFilter<"Wallet"> | $Enums.WalletType;
    prestataireId?: Prisma.StringNullableWithAggregatesFilter<"Wallet"> | string | null;
    balance?: Prisma.DecimalWithAggregatesFilter<"Wallet"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    balancePlafond?: Prisma.DecimalNullableWithAggregatesFilter<"Wallet"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    statutPrestataire?: Prisma.EnumPrestataireWalletStatutWithAggregatesFilter<"Wallet"> | $Enums.PrestataireWalletStatut;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Wallet"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Wallet"> | Date | string;
};
export type WalletCreateInput = {
    id?: string;
    type: $Enums.WalletType;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    balancePlafond?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    statutPrestataire?: $Enums.PrestataireWalletStatut;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    prestataire?: Prisma.PrestataireCreateNestedOneWithoutWalletInput;
    transactions?: Prisma.WalletTransactionCreateNestedManyWithoutWalletInput;
};
export type WalletUncheckedCreateInput = {
    id?: string;
    type: $Enums.WalletType;
    prestataireId?: string | null;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    balancePlafond?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    statutPrestataire?: $Enums.PrestataireWalletStatut;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    transactions?: Prisma.WalletTransactionUncheckedCreateNestedManyWithoutWalletInput;
};
export type WalletUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    balancePlafond?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    statutPrestataire?: Prisma.EnumPrestataireWalletStatutFieldUpdateOperationsInput | $Enums.PrestataireWalletStatut;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    prestataire?: Prisma.PrestataireUpdateOneWithoutWalletNestedInput;
    transactions?: Prisma.WalletTransactionUpdateManyWithoutWalletNestedInput;
};
export type WalletUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType;
    prestataireId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    balancePlafond?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    statutPrestataire?: Prisma.EnumPrestataireWalletStatutFieldUpdateOperationsInput | $Enums.PrestataireWalletStatut;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.WalletTransactionUncheckedUpdateManyWithoutWalletNestedInput;
};
export type WalletCreateManyInput = {
    id?: string;
    type: $Enums.WalletType;
    prestataireId?: string | null;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    balancePlafond?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    statutPrestataire?: $Enums.PrestataireWalletStatut;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WalletUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    balancePlafond?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    statutPrestataire?: Prisma.EnumPrestataireWalletStatutFieldUpdateOperationsInput | $Enums.PrestataireWalletStatut;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WalletUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType;
    prestataireId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    balancePlafond?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    statutPrestataire?: Prisma.EnumPrestataireWalletStatutFieldUpdateOperationsInput | $Enums.PrestataireWalletStatut;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WalletNullableScalarRelationFilter = {
    is?: Prisma.WalletWhereInput | null;
    isNot?: Prisma.WalletWhereInput | null;
};
export type WalletCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    balancePlafond?: Prisma.SortOrder;
    statutPrestataire?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WalletAvgOrderByAggregateInput = {
    balance?: Prisma.SortOrder;
    balancePlafond?: Prisma.SortOrder;
};
export type WalletMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    balancePlafond?: Prisma.SortOrder;
    statutPrestataire?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WalletMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    balance?: Prisma.SortOrder;
    balancePlafond?: Prisma.SortOrder;
    statutPrestataire?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WalletSumOrderByAggregateInput = {
    balance?: Prisma.SortOrder;
    balancePlafond?: Prisma.SortOrder;
};
export type WalletScalarRelationFilter = {
    is?: Prisma.WalletWhereInput;
    isNot?: Prisma.WalletWhereInput;
};
export type WalletCreateNestedOneWithoutPrestataireInput = {
    create?: Prisma.XOR<Prisma.WalletCreateWithoutPrestataireInput, Prisma.WalletUncheckedCreateWithoutPrestataireInput>;
    connectOrCreate?: Prisma.WalletCreateOrConnectWithoutPrestataireInput;
    connect?: Prisma.WalletWhereUniqueInput;
};
export type WalletUncheckedCreateNestedOneWithoutPrestataireInput = {
    create?: Prisma.XOR<Prisma.WalletCreateWithoutPrestataireInput, Prisma.WalletUncheckedCreateWithoutPrestataireInput>;
    connectOrCreate?: Prisma.WalletCreateOrConnectWithoutPrestataireInput;
    connect?: Prisma.WalletWhereUniqueInput;
};
export type WalletUpdateOneWithoutPrestataireNestedInput = {
    create?: Prisma.XOR<Prisma.WalletCreateWithoutPrestataireInput, Prisma.WalletUncheckedCreateWithoutPrestataireInput>;
    connectOrCreate?: Prisma.WalletCreateOrConnectWithoutPrestataireInput;
    upsert?: Prisma.WalletUpsertWithoutPrestataireInput;
    disconnect?: Prisma.WalletWhereInput | boolean;
    delete?: Prisma.WalletWhereInput | boolean;
    connect?: Prisma.WalletWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WalletUpdateToOneWithWhereWithoutPrestataireInput, Prisma.WalletUpdateWithoutPrestataireInput>, Prisma.WalletUncheckedUpdateWithoutPrestataireInput>;
};
export type WalletUncheckedUpdateOneWithoutPrestataireNestedInput = {
    create?: Prisma.XOR<Prisma.WalletCreateWithoutPrestataireInput, Prisma.WalletUncheckedCreateWithoutPrestataireInput>;
    connectOrCreate?: Prisma.WalletCreateOrConnectWithoutPrestataireInput;
    upsert?: Prisma.WalletUpsertWithoutPrestataireInput;
    disconnect?: Prisma.WalletWhereInput | boolean;
    delete?: Prisma.WalletWhereInput | boolean;
    connect?: Prisma.WalletWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WalletUpdateToOneWithWhereWithoutPrestataireInput, Prisma.WalletUpdateWithoutPrestataireInput>, Prisma.WalletUncheckedUpdateWithoutPrestataireInput>;
};
export type EnumWalletTypeFieldUpdateOperationsInput = {
    set?: $Enums.WalletType;
};
export type EnumPrestataireWalletStatutFieldUpdateOperationsInput = {
    set?: $Enums.PrestataireWalletStatut;
};
export type WalletCreateNestedOneWithoutTransactionsInput = {
    create?: Prisma.XOR<Prisma.WalletCreateWithoutTransactionsInput, Prisma.WalletUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.WalletCreateOrConnectWithoutTransactionsInput;
    connect?: Prisma.WalletWhereUniqueInput;
};
export type WalletUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: Prisma.XOR<Prisma.WalletCreateWithoutTransactionsInput, Prisma.WalletUncheckedCreateWithoutTransactionsInput>;
    connectOrCreate?: Prisma.WalletCreateOrConnectWithoutTransactionsInput;
    upsert?: Prisma.WalletUpsertWithoutTransactionsInput;
    connect?: Prisma.WalletWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.WalletUpdateToOneWithWhereWithoutTransactionsInput, Prisma.WalletUpdateWithoutTransactionsInput>, Prisma.WalletUncheckedUpdateWithoutTransactionsInput>;
};
export type WalletCreateWithoutPrestataireInput = {
    id?: string;
    type: $Enums.WalletType;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    balancePlafond?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    statutPrestataire?: $Enums.PrestataireWalletStatut;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    transactions?: Prisma.WalletTransactionCreateNestedManyWithoutWalletInput;
};
export type WalletUncheckedCreateWithoutPrestataireInput = {
    id?: string;
    type: $Enums.WalletType;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    balancePlafond?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    statutPrestataire?: $Enums.PrestataireWalletStatut;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    transactions?: Prisma.WalletTransactionUncheckedCreateNestedManyWithoutWalletInput;
};
export type WalletCreateOrConnectWithoutPrestataireInput = {
    where: Prisma.WalletWhereUniqueInput;
    create: Prisma.XOR<Prisma.WalletCreateWithoutPrestataireInput, Prisma.WalletUncheckedCreateWithoutPrestataireInput>;
};
export type WalletUpsertWithoutPrestataireInput = {
    update: Prisma.XOR<Prisma.WalletUpdateWithoutPrestataireInput, Prisma.WalletUncheckedUpdateWithoutPrestataireInput>;
    create: Prisma.XOR<Prisma.WalletCreateWithoutPrestataireInput, Prisma.WalletUncheckedCreateWithoutPrestataireInput>;
    where?: Prisma.WalletWhereInput;
};
export type WalletUpdateToOneWithWhereWithoutPrestataireInput = {
    where?: Prisma.WalletWhereInput;
    data: Prisma.XOR<Prisma.WalletUpdateWithoutPrestataireInput, Prisma.WalletUncheckedUpdateWithoutPrestataireInput>;
};
export type WalletUpdateWithoutPrestataireInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    balancePlafond?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    statutPrestataire?: Prisma.EnumPrestataireWalletStatutFieldUpdateOperationsInput | $Enums.PrestataireWalletStatut;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.WalletTransactionUpdateManyWithoutWalletNestedInput;
};
export type WalletUncheckedUpdateWithoutPrestataireInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    balancePlafond?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    statutPrestataire?: Prisma.EnumPrestataireWalletStatutFieldUpdateOperationsInput | $Enums.PrestataireWalletStatut;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    transactions?: Prisma.WalletTransactionUncheckedUpdateManyWithoutWalletNestedInput;
};
export type WalletCreateWithoutTransactionsInput = {
    id?: string;
    type: $Enums.WalletType;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    balancePlafond?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    statutPrestataire?: $Enums.PrestataireWalletStatut;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    prestataire?: Prisma.PrestataireCreateNestedOneWithoutWalletInput;
};
export type WalletUncheckedCreateWithoutTransactionsInput = {
    id?: string;
    type: $Enums.WalletType;
    prestataireId?: string | null;
    balance?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    balancePlafond?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    statutPrestataire?: $Enums.PrestataireWalletStatut;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WalletCreateOrConnectWithoutTransactionsInput = {
    where: Prisma.WalletWhereUniqueInput;
    create: Prisma.XOR<Prisma.WalletCreateWithoutTransactionsInput, Prisma.WalletUncheckedCreateWithoutTransactionsInput>;
};
export type WalletUpsertWithoutTransactionsInput = {
    update: Prisma.XOR<Prisma.WalletUpdateWithoutTransactionsInput, Prisma.WalletUncheckedUpdateWithoutTransactionsInput>;
    create: Prisma.XOR<Prisma.WalletCreateWithoutTransactionsInput, Prisma.WalletUncheckedCreateWithoutTransactionsInput>;
    where?: Prisma.WalletWhereInput;
};
export type WalletUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: Prisma.WalletWhereInput;
    data: Prisma.XOR<Prisma.WalletUpdateWithoutTransactionsInput, Prisma.WalletUncheckedUpdateWithoutTransactionsInput>;
};
export type WalletUpdateWithoutTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    balancePlafond?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    statutPrestataire?: Prisma.EnumPrestataireWalletStatutFieldUpdateOperationsInput | $Enums.PrestataireWalletStatut;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    prestataire?: Prisma.PrestataireUpdateOneWithoutWalletNestedInput;
};
export type WalletUncheckedUpdateWithoutTransactionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    type?: Prisma.EnumWalletTypeFieldUpdateOperationsInput | $Enums.WalletType;
    prestataireId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    balance?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    balancePlafond?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    statutPrestataire?: Prisma.EnumPrestataireWalletStatutFieldUpdateOperationsInput | $Enums.PrestataireWalletStatut;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WalletCountOutputType = {
    transactions: number;
};
export type WalletCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    transactions?: boolean | WalletCountOutputTypeCountTransactionsArgs;
};
export type WalletCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletCountOutputTypeSelect<ExtArgs> | null;
};
export type WalletCountOutputTypeCountTransactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WalletTransactionWhereInput;
};
export type WalletSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    prestataireId?: boolean;
    balance?: boolean;
    balancePlafond?: boolean;
    statutPrestataire?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    prestataire?: boolean | Prisma.Wallet$prestataireArgs<ExtArgs>;
    transactions?: boolean | Prisma.Wallet$transactionsArgs<ExtArgs>;
    _count?: boolean | Prisma.WalletCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["wallet"]>;
export type WalletSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    prestataireId?: boolean;
    balance?: boolean;
    balancePlafond?: boolean;
    statutPrestataire?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    prestataire?: boolean | Prisma.Wallet$prestataireArgs<ExtArgs>;
}, ExtArgs["result"]["wallet"]>;
export type WalletSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    type?: boolean;
    prestataireId?: boolean;
    balance?: boolean;
    balancePlafond?: boolean;
    statutPrestataire?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    prestataire?: boolean | Prisma.Wallet$prestataireArgs<ExtArgs>;
}, ExtArgs["result"]["wallet"]>;
export type WalletSelectScalar = {
    id?: boolean;
    type?: boolean;
    prestataireId?: boolean;
    balance?: boolean;
    balancePlafond?: boolean;
    statutPrestataire?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type WalletOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "type" | "prestataireId" | "balance" | "balancePlafond" | "statutPrestataire" | "createdAt" | "updatedAt", ExtArgs["result"]["wallet"]>;
export type WalletInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    prestataire?: boolean | Prisma.Wallet$prestataireArgs<ExtArgs>;
    transactions?: boolean | Prisma.Wallet$transactionsArgs<ExtArgs>;
    _count?: boolean | Prisma.WalletCountOutputTypeDefaultArgs<ExtArgs>;
};
export type WalletIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    prestataire?: boolean | Prisma.Wallet$prestataireArgs<ExtArgs>;
};
export type WalletIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    prestataire?: boolean | Prisma.Wallet$prestataireArgs<ExtArgs>;
};
export type $WalletPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Wallet";
    objects: {
        prestataire: Prisma.$PrestatairePayload<ExtArgs> | null;
        transactions: Prisma.$WalletTransactionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        type: $Enums.WalletType;
        prestataireId: string | null;
        balance: runtime.Decimal;
        balancePlafond: runtime.Decimal | null;
        statutPrestataire: $Enums.PrestataireWalletStatut;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["wallet"]>;
    composites: {};
};
export type WalletGetPayload<S extends boolean | null | undefined | WalletDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WalletPayload, S>;
export type WalletCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WalletFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WalletCountAggregateInputType | true;
};
export interface WalletDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Wallet'];
        meta: {
            name: 'Wallet';
        };
    };
    findUnique<T extends WalletFindUniqueArgs>(args: Prisma.SelectSubset<T, WalletFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WalletClient<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends WalletFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WalletFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WalletClient<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends WalletFindFirstArgs>(args?: Prisma.SelectSubset<T, WalletFindFirstArgs<ExtArgs>>): Prisma.Prisma__WalletClient<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends WalletFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WalletFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WalletClient<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends WalletFindManyArgs>(args?: Prisma.SelectSubset<T, WalletFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends WalletCreateArgs>(args: Prisma.SelectSubset<T, WalletCreateArgs<ExtArgs>>): Prisma.Prisma__WalletClient<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends WalletCreateManyArgs>(args?: Prisma.SelectSubset<T, WalletCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends WalletCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WalletCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends WalletDeleteArgs>(args: Prisma.SelectSubset<T, WalletDeleteArgs<ExtArgs>>): Prisma.Prisma__WalletClient<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends WalletUpdateArgs>(args: Prisma.SelectSubset<T, WalletUpdateArgs<ExtArgs>>): Prisma.Prisma__WalletClient<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends WalletDeleteManyArgs>(args?: Prisma.SelectSubset<T, WalletDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends WalletUpdateManyArgs>(args: Prisma.SelectSubset<T, WalletUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends WalletUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WalletUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends WalletUpsertArgs>(args: Prisma.SelectSubset<T, WalletUpsertArgs<ExtArgs>>): Prisma.Prisma__WalletClient<runtime.Types.Result.GetResult<Prisma.$WalletPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends WalletCountArgs>(args?: Prisma.Subset<T, WalletCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WalletCountAggregateOutputType> : number>;
    aggregate<T extends WalletAggregateArgs>(args: Prisma.Subset<T, WalletAggregateArgs>): Prisma.PrismaPromise<GetWalletAggregateType<T>>;
    groupBy<T extends WalletGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WalletGroupByArgs['orderBy'];
    } : {
        orderBy?: WalletGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WalletGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWalletGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: WalletFieldRefs;
}
export interface Prisma__WalletClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    prestataire<T extends Prisma.Wallet$prestataireArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Wallet$prestataireArgs<ExtArgs>>): Prisma.Prisma__PrestataireClient<runtime.Types.Result.GetResult<Prisma.$PrestatairePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    transactions<T extends Prisma.Wallet$transactionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Wallet$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WalletTransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface WalletFieldRefs {
    readonly id: Prisma.FieldRef<"Wallet", 'String'>;
    readonly type: Prisma.FieldRef<"Wallet", 'WalletType'>;
    readonly prestataireId: Prisma.FieldRef<"Wallet", 'String'>;
    readonly balance: Prisma.FieldRef<"Wallet", 'Decimal'>;
    readonly balancePlafond: Prisma.FieldRef<"Wallet", 'Decimal'>;
    readonly statutPrestataire: Prisma.FieldRef<"Wallet", 'PrestataireWalletStatut'>;
    readonly createdAt: Prisma.FieldRef<"Wallet", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Wallet", 'DateTime'>;
}
export type WalletFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletSelect<ExtArgs> | null;
    omit?: Prisma.WalletOmit<ExtArgs> | null;
    include?: Prisma.WalletInclude<ExtArgs> | null;
    where: Prisma.WalletWhereUniqueInput;
};
export type WalletFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletSelect<ExtArgs> | null;
    omit?: Prisma.WalletOmit<ExtArgs> | null;
    include?: Prisma.WalletInclude<ExtArgs> | null;
    where: Prisma.WalletWhereUniqueInput;
};
export type WalletFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletSelect<ExtArgs> | null;
    omit?: Prisma.WalletOmit<ExtArgs> | null;
    include?: Prisma.WalletInclude<ExtArgs> | null;
    where?: Prisma.WalletWhereInput;
    orderBy?: Prisma.WalletOrderByWithRelationInput | Prisma.WalletOrderByWithRelationInput[];
    cursor?: Prisma.WalletWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WalletScalarFieldEnum | Prisma.WalletScalarFieldEnum[];
};
export type WalletFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletSelect<ExtArgs> | null;
    omit?: Prisma.WalletOmit<ExtArgs> | null;
    include?: Prisma.WalletInclude<ExtArgs> | null;
    where?: Prisma.WalletWhereInput;
    orderBy?: Prisma.WalletOrderByWithRelationInput | Prisma.WalletOrderByWithRelationInput[];
    cursor?: Prisma.WalletWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WalletScalarFieldEnum | Prisma.WalletScalarFieldEnum[];
};
export type WalletFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletSelect<ExtArgs> | null;
    omit?: Prisma.WalletOmit<ExtArgs> | null;
    include?: Prisma.WalletInclude<ExtArgs> | null;
    where?: Prisma.WalletWhereInput;
    orderBy?: Prisma.WalletOrderByWithRelationInput | Prisma.WalletOrderByWithRelationInput[];
    cursor?: Prisma.WalletWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WalletScalarFieldEnum | Prisma.WalletScalarFieldEnum[];
};
export type WalletCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletSelect<ExtArgs> | null;
    omit?: Prisma.WalletOmit<ExtArgs> | null;
    include?: Prisma.WalletInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WalletCreateInput, Prisma.WalletUncheckedCreateInput>;
};
export type WalletCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.WalletCreateManyInput | Prisma.WalletCreateManyInput[];
    skipDuplicates?: boolean;
};
export type WalletCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WalletOmit<ExtArgs> | null;
    data: Prisma.WalletCreateManyInput | Prisma.WalletCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.WalletIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type WalletUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletSelect<ExtArgs> | null;
    omit?: Prisma.WalletOmit<ExtArgs> | null;
    include?: Prisma.WalletInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WalletUpdateInput, Prisma.WalletUncheckedUpdateInput>;
    where: Prisma.WalletWhereUniqueInput;
};
export type WalletUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.WalletUpdateManyMutationInput, Prisma.WalletUncheckedUpdateManyInput>;
    where?: Prisma.WalletWhereInput;
    limit?: number;
};
export type WalletUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WalletOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WalletUpdateManyMutationInput, Prisma.WalletUncheckedUpdateManyInput>;
    where?: Prisma.WalletWhereInput;
    limit?: number;
    include?: Prisma.WalletIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type WalletUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletSelect<ExtArgs> | null;
    omit?: Prisma.WalletOmit<ExtArgs> | null;
    include?: Prisma.WalletInclude<ExtArgs> | null;
    where: Prisma.WalletWhereUniqueInput;
    create: Prisma.XOR<Prisma.WalletCreateInput, Prisma.WalletUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.WalletUpdateInput, Prisma.WalletUncheckedUpdateInput>;
};
export type WalletDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletSelect<ExtArgs> | null;
    omit?: Prisma.WalletOmit<ExtArgs> | null;
    include?: Prisma.WalletInclude<ExtArgs> | null;
    where: Prisma.WalletWhereUniqueInput;
};
export type WalletDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WalletWhereInput;
    limit?: number;
};
export type Wallet$prestataireArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestataireSelect<ExtArgs> | null;
    omit?: Prisma.PrestataireOmit<ExtArgs> | null;
    include?: Prisma.PrestataireInclude<ExtArgs> | null;
    where?: Prisma.PrestataireWhereInput;
};
export type Wallet$transactionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type WalletDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WalletSelect<ExtArgs> | null;
    omit?: Prisma.WalletOmit<ExtArgs> | null;
    include?: Prisma.WalletInclude<ExtArgs> | null;
};
export {};
