import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type ParticulierModel = runtime.Types.Result.DefaultSelection<Prisma.$ParticulierPayload>;
export type AggregateParticulier = {
    _count: ParticulierCountAggregateOutputType | null;
    _avg: ParticulierAvgAggregateOutputType | null;
    _sum: ParticulierSumAggregateOutputType | null;
    _min: ParticulierMinAggregateOutputType | null;
    _max: ParticulierMaxAggregateOutputType | null;
};
export type ParticulierAvgAggregateOutputType = {
    latitude: runtime.Decimal | null;
    longitude: runtime.Decimal | null;
};
export type ParticulierSumAggregateOutputType = {
    latitude: runtime.Decimal | null;
    longitude: runtime.Decimal | null;
};
export type ParticulierMinAggregateOutputType = {
    id: string | null;
    userId: string | null;
    nom: string | null;
    prenom: string | null;
    telephone: string | null;
    adresse: string | null;
    latitude: runtime.Decimal | null;
    longitude: runtime.Decimal | null;
    avatarUrl: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ParticulierMaxAggregateOutputType = {
    id: string | null;
    userId: string | null;
    nom: string | null;
    prenom: string | null;
    telephone: string | null;
    adresse: string | null;
    latitude: runtime.Decimal | null;
    longitude: runtime.Decimal | null;
    avatarUrl: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ParticulierCountAggregateOutputType = {
    id: number;
    userId: number;
    nom: number;
    prenom: number;
    telephone: number;
    adresse: number;
    latitude: number;
    longitude: number;
    avatarUrl: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ParticulierAvgAggregateInputType = {
    latitude?: true;
    longitude?: true;
};
export type ParticulierSumAggregateInputType = {
    latitude?: true;
    longitude?: true;
};
export type ParticulierMinAggregateInputType = {
    id?: true;
    userId?: true;
    nom?: true;
    prenom?: true;
    telephone?: true;
    adresse?: true;
    latitude?: true;
    longitude?: true;
    avatarUrl?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ParticulierMaxAggregateInputType = {
    id?: true;
    userId?: true;
    nom?: true;
    prenom?: true;
    telephone?: true;
    adresse?: true;
    latitude?: true;
    longitude?: true;
    avatarUrl?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ParticulierCountAggregateInputType = {
    id?: true;
    userId?: true;
    nom?: true;
    prenom?: true;
    telephone?: true;
    adresse?: true;
    latitude?: true;
    longitude?: true;
    avatarUrl?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ParticulierAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ParticulierWhereInput;
    orderBy?: Prisma.ParticulierOrderByWithRelationInput | Prisma.ParticulierOrderByWithRelationInput[];
    cursor?: Prisma.ParticulierWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ParticulierCountAggregateInputType;
    _avg?: ParticulierAvgAggregateInputType;
    _sum?: ParticulierSumAggregateInputType;
    _min?: ParticulierMinAggregateInputType;
    _max?: ParticulierMaxAggregateInputType;
};
export type GetParticulierAggregateType<T extends ParticulierAggregateArgs> = {
    [P in keyof T & keyof AggregateParticulier]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateParticulier[P]> : Prisma.GetScalarType<T[P], AggregateParticulier[P]>;
};
export type ParticulierGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ParticulierWhereInput;
    orderBy?: Prisma.ParticulierOrderByWithAggregationInput | Prisma.ParticulierOrderByWithAggregationInput[];
    by: Prisma.ParticulierScalarFieldEnum[] | Prisma.ParticulierScalarFieldEnum;
    having?: Prisma.ParticulierScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ParticulierCountAggregateInputType | true;
    _avg?: ParticulierAvgAggregateInputType;
    _sum?: ParticulierSumAggregateInputType;
    _min?: ParticulierMinAggregateInputType;
    _max?: ParticulierMaxAggregateInputType;
};
export type ParticulierGroupByOutputType = {
    id: string;
    userId: string;
    nom: string;
    prenom: string;
    telephone: string | null;
    adresse: string | null;
    latitude: runtime.Decimal | null;
    longitude: runtime.Decimal | null;
    avatarUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: ParticulierCountAggregateOutputType | null;
    _avg: ParticulierAvgAggregateOutputType | null;
    _sum: ParticulierSumAggregateOutputType | null;
    _min: ParticulierMinAggregateOutputType | null;
    _max: ParticulierMaxAggregateOutputType | null;
};
type GetParticulierGroupByPayload<T extends ParticulierGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ParticulierGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ParticulierGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ParticulierGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ParticulierGroupByOutputType[P]>;
}>>;
export type ParticulierWhereInput = {
    AND?: Prisma.ParticulierWhereInput | Prisma.ParticulierWhereInput[];
    OR?: Prisma.ParticulierWhereInput[];
    NOT?: Prisma.ParticulierWhereInput | Prisma.ParticulierWhereInput[];
    id?: Prisma.StringFilter<"Particulier"> | string;
    userId?: Prisma.StringFilter<"Particulier"> | string;
    nom?: Prisma.StringFilter<"Particulier"> | string;
    prenom?: Prisma.StringFilter<"Particulier"> | string;
    telephone?: Prisma.StringNullableFilter<"Particulier"> | string | null;
    adresse?: Prisma.StringNullableFilter<"Particulier"> | string | null;
    latitude?: Prisma.DecimalNullableFilter<"Particulier"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.DecimalNullableFilter<"Particulier"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    avatarUrl?: Prisma.StringNullableFilter<"Particulier"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Particulier"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Particulier"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    prestations?: Prisma.PrestationListRelationFilter;
    avis?: Prisma.AvisPrestataireListRelationFilter;
};
export type ParticulierOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    nom?: Prisma.SortOrder;
    prenom?: Prisma.SortOrder;
    telephone?: Prisma.SortOrderInput | Prisma.SortOrder;
    adresse?: Prisma.SortOrderInput | Prisma.SortOrder;
    latitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    longitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    prestations?: Prisma.PrestationOrderByRelationAggregateInput;
    avis?: Prisma.AvisPrestataireOrderByRelationAggregateInput;
};
export type ParticulierWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    userId?: string;
    AND?: Prisma.ParticulierWhereInput | Prisma.ParticulierWhereInput[];
    OR?: Prisma.ParticulierWhereInput[];
    NOT?: Prisma.ParticulierWhereInput | Prisma.ParticulierWhereInput[];
    nom?: Prisma.StringFilter<"Particulier"> | string;
    prenom?: Prisma.StringFilter<"Particulier"> | string;
    telephone?: Prisma.StringNullableFilter<"Particulier"> | string | null;
    adresse?: Prisma.StringNullableFilter<"Particulier"> | string | null;
    latitude?: Prisma.DecimalNullableFilter<"Particulier"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.DecimalNullableFilter<"Particulier"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    avatarUrl?: Prisma.StringNullableFilter<"Particulier"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"Particulier"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Particulier"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    prestations?: Prisma.PrestationListRelationFilter;
    avis?: Prisma.AvisPrestataireListRelationFilter;
}, "id" | "userId">;
export type ParticulierOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    nom?: Prisma.SortOrder;
    prenom?: Prisma.SortOrder;
    telephone?: Prisma.SortOrderInput | Prisma.SortOrder;
    adresse?: Prisma.SortOrderInput | Prisma.SortOrder;
    latitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    longitude?: Prisma.SortOrderInput | Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ParticulierCountOrderByAggregateInput;
    _avg?: Prisma.ParticulierAvgOrderByAggregateInput;
    _max?: Prisma.ParticulierMaxOrderByAggregateInput;
    _min?: Prisma.ParticulierMinOrderByAggregateInput;
    _sum?: Prisma.ParticulierSumOrderByAggregateInput;
};
export type ParticulierScalarWhereWithAggregatesInput = {
    AND?: Prisma.ParticulierScalarWhereWithAggregatesInput | Prisma.ParticulierScalarWhereWithAggregatesInput[];
    OR?: Prisma.ParticulierScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ParticulierScalarWhereWithAggregatesInput | Prisma.ParticulierScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Particulier"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Particulier"> | string;
    nom?: Prisma.StringWithAggregatesFilter<"Particulier"> | string;
    prenom?: Prisma.StringWithAggregatesFilter<"Particulier"> | string;
    telephone?: Prisma.StringNullableWithAggregatesFilter<"Particulier"> | string | null;
    adresse?: Prisma.StringNullableWithAggregatesFilter<"Particulier"> | string | null;
    latitude?: Prisma.DecimalNullableWithAggregatesFilter<"Particulier"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.DecimalNullableWithAggregatesFilter<"Particulier"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    avatarUrl?: Prisma.StringNullableWithAggregatesFilter<"Particulier"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Particulier"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Particulier"> | Date | string;
};
export type ParticulierCreateInput = {
    id?: string;
    nom: string;
    prenom: string;
    telephone?: string | null;
    adresse?: string | null;
    latitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    avatarUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutParticulierInput;
    prestations?: Prisma.PrestationCreateNestedManyWithoutParticulierInput;
    avis?: Prisma.AvisPrestataireCreateNestedManyWithoutParticulierInput;
};
export type ParticulierUncheckedCreateInput = {
    id?: string;
    userId: string;
    nom: string;
    prenom: string;
    telephone?: string | null;
    adresse?: string | null;
    latitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    avatarUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    prestations?: Prisma.PrestationUncheckedCreateNestedManyWithoutParticulierInput;
    avis?: Prisma.AvisPrestataireUncheckedCreateNestedManyWithoutParticulierInput;
};
export type ParticulierUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nom?: Prisma.StringFieldUpdateOperationsInput | string;
    prenom?: Prisma.StringFieldUpdateOperationsInput | string;
    telephone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adresse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutParticulierNestedInput;
    prestations?: Prisma.PrestationUpdateManyWithoutParticulierNestedInput;
    avis?: Prisma.AvisPrestataireUpdateManyWithoutParticulierNestedInput;
};
export type ParticulierUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    nom?: Prisma.StringFieldUpdateOperationsInput | string;
    prenom?: Prisma.StringFieldUpdateOperationsInput | string;
    telephone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adresse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    prestations?: Prisma.PrestationUncheckedUpdateManyWithoutParticulierNestedInput;
    avis?: Prisma.AvisPrestataireUncheckedUpdateManyWithoutParticulierNestedInput;
};
export type ParticulierCreateManyInput = {
    id?: string;
    userId: string;
    nom: string;
    prenom: string;
    telephone?: string | null;
    adresse?: string | null;
    latitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    avatarUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ParticulierUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nom?: Prisma.StringFieldUpdateOperationsInput | string;
    prenom?: Prisma.StringFieldUpdateOperationsInput | string;
    telephone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adresse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ParticulierUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    nom?: Prisma.StringFieldUpdateOperationsInput | string;
    prenom?: Prisma.StringFieldUpdateOperationsInput | string;
    telephone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adresse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ParticulierNullableScalarRelationFilter = {
    is?: Prisma.ParticulierWhereInput | null;
    isNot?: Prisma.ParticulierWhereInput | null;
};
export type ParticulierCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    nom?: Prisma.SortOrder;
    prenom?: Prisma.SortOrder;
    telephone?: Prisma.SortOrder;
    adresse?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ParticulierAvgOrderByAggregateInput = {
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
};
export type ParticulierMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    nom?: Prisma.SortOrder;
    prenom?: Prisma.SortOrder;
    telephone?: Prisma.SortOrder;
    adresse?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ParticulierMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    nom?: Prisma.SortOrder;
    prenom?: Prisma.SortOrder;
    telephone?: Prisma.SortOrder;
    adresse?: Prisma.SortOrder;
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
    avatarUrl?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ParticulierSumOrderByAggregateInput = {
    latitude?: Prisma.SortOrder;
    longitude?: Prisma.SortOrder;
};
export type ParticulierScalarRelationFilter = {
    is?: Prisma.ParticulierWhereInput;
    isNot?: Prisma.ParticulierWhereInput;
};
export type ParticulierCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ParticulierCreateWithoutUserInput, Prisma.ParticulierUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.ParticulierCreateOrConnectWithoutUserInput;
    connect?: Prisma.ParticulierWhereUniqueInput;
};
export type ParticulierUncheckedCreateNestedOneWithoutUserInput = {
    create?: Prisma.XOR<Prisma.ParticulierCreateWithoutUserInput, Prisma.ParticulierUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.ParticulierCreateOrConnectWithoutUserInput;
    connect?: Prisma.ParticulierWhereUniqueInput;
};
export type ParticulierUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ParticulierCreateWithoutUserInput, Prisma.ParticulierUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.ParticulierCreateOrConnectWithoutUserInput;
    upsert?: Prisma.ParticulierUpsertWithoutUserInput;
    disconnect?: Prisma.ParticulierWhereInput | boolean;
    delete?: Prisma.ParticulierWhereInput | boolean;
    connect?: Prisma.ParticulierWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ParticulierUpdateToOneWithWhereWithoutUserInput, Prisma.ParticulierUpdateWithoutUserInput>, Prisma.ParticulierUncheckedUpdateWithoutUserInput>;
};
export type ParticulierUncheckedUpdateOneWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.ParticulierCreateWithoutUserInput, Prisma.ParticulierUncheckedCreateWithoutUserInput>;
    connectOrCreate?: Prisma.ParticulierCreateOrConnectWithoutUserInput;
    upsert?: Prisma.ParticulierUpsertWithoutUserInput;
    disconnect?: Prisma.ParticulierWhereInput | boolean;
    delete?: Prisma.ParticulierWhereInput | boolean;
    connect?: Prisma.ParticulierWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ParticulierUpdateToOneWithWhereWithoutUserInput, Prisma.ParticulierUpdateWithoutUserInput>, Prisma.ParticulierUncheckedUpdateWithoutUserInput>;
};
export type NullableDecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type ParticulierCreateNestedOneWithoutPrestationsInput = {
    create?: Prisma.XOR<Prisma.ParticulierCreateWithoutPrestationsInput, Prisma.ParticulierUncheckedCreateWithoutPrestationsInput>;
    connectOrCreate?: Prisma.ParticulierCreateOrConnectWithoutPrestationsInput;
    connect?: Prisma.ParticulierWhereUniqueInput;
};
export type ParticulierUpdateOneRequiredWithoutPrestationsNestedInput = {
    create?: Prisma.XOR<Prisma.ParticulierCreateWithoutPrestationsInput, Prisma.ParticulierUncheckedCreateWithoutPrestationsInput>;
    connectOrCreate?: Prisma.ParticulierCreateOrConnectWithoutPrestationsInput;
    upsert?: Prisma.ParticulierUpsertWithoutPrestationsInput;
    connect?: Prisma.ParticulierWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ParticulierUpdateToOneWithWhereWithoutPrestationsInput, Prisma.ParticulierUpdateWithoutPrestationsInput>, Prisma.ParticulierUncheckedUpdateWithoutPrestationsInput>;
};
export type ParticulierCreateNestedOneWithoutAvisInput = {
    create?: Prisma.XOR<Prisma.ParticulierCreateWithoutAvisInput, Prisma.ParticulierUncheckedCreateWithoutAvisInput>;
    connectOrCreate?: Prisma.ParticulierCreateOrConnectWithoutAvisInput;
    connect?: Prisma.ParticulierWhereUniqueInput;
};
export type ParticulierUpdateOneRequiredWithoutAvisNestedInput = {
    create?: Prisma.XOR<Prisma.ParticulierCreateWithoutAvisInput, Prisma.ParticulierUncheckedCreateWithoutAvisInput>;
    connectOrCreate?: Prisma.ParticulierCreateOrConnectWithoutAvisInput;
    upsert?: Prisma.ParticulierUpsertWithoutAvisInput;
    connect?: Prisma.ParticulierWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ParticulierUpdateToOneWithWhereWithoutAvisInput, Prisma.ParticulierUpdateWithoutAvisInput>, Prisma.ParticulierUncheckedUpdateWithoutAvisInput>;
};
export type ParticulierCreateWithoutUserInput = {
    id?: string;
    nom: string;
    prenom: string;
    telephone?: string | null;
    adresse?: string | null;
    latitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    avatarUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    prestations?: Prisma.PrestationCreateNestedManyWithoutParticulierInput;
    avis?: Prisma.AvisPrestataireCreateNestedManyWithoutParticulierInput;
};
export type ParticulierUncheckedCreateWithoutUserInput = {
    id?: string;
    nom: string;
    prenom: string;
    telephone?: string | null;
    adresse?: string | null;
    latitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    avatarUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    prestations?: Prisma.PrestationUncheckedCreateNestedManyWithoutParticulierInput;
    avis?: Prisma.AvisPrestataireUncheckedCreateNestedManyWithoutParticulierInput;
};
export type ParticulierCreateOrConnectWithoutUserInput = {
    where: Prisma.ParticulierWhereUniqueInput;
    create: Prisma.XOR<Prisma.ParticulierCreateWithoutUserInput, Prisma.ParticulierUncheckedCreateWithoutUserInput>;
};
export type ParticulierUpsertWithoutUserInput = {
    update: Prisma.XOR<Prisma.ParticulierUpdateWithoutUserInput, Prisma.ParticulierUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.ParticulierCreateWithoutUserInput, Prisma.ParticulierUncheckedCreateWithoutUserInput>;
    where?: Prisma.ParticulierWhereInput;
};
export type ParticulierUpdateToOneWithWhereWithoutUserInput = {
    where?: Prisma.ParticulierWhereInput;
    data: Prisma.XOR<Prisma.ParticulierUpdateWithoutUserInput, Prisma.ParticulierUncheckedUpdateWithoutUserInput>;
};
export type ParticulierUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nom?: Prisma.StringFieldUpdateOperationsInput | string;
    prenom?: Prisma.StringFieldUpdateOperationsInput | string;
    telephone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adresse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    prestations?: Prisma.PrestationUpdateManyWithoutParticulierNestedInput;
    avis?: Prisma.AvisPrestataireUpdateManyWithoutParticulierNestedInput;
};
export type ParticulierUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nom?: Prisma.StringFieldUpdateOperationsInput | string;
    prenom?: Prisma.StringFieldUpdateOperationsInput | string;
    telephone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adresse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    prestations?: Prisma.PrestationUncheckedUpdateManyWithoutParticulierNestedInput;
    avis?: Prisma.AvisPrestataireUncheckedUpdateManyWithoutParticulierNestedInput;
};
export type ParticulierCreateWithoutPrestationsInput = {
    id?: string;
    nom: string;
    prenom: string;
    telephone?: string | null;
    adresse?: string | null;
    latitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    avatarUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutParticulierInput;
    avis?: Prisma.AvisPrestataireCreateNestedManyWithoutParticulierInput;
};
export type ParticulierUncheckedCreateWithoutPrestationsInput = {
    id?: string;
    userId: string;
    nom: string;
    prenom: string;
    telephone?: string | null;
    adresse?: string | null;
    latitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    avatarUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    avis?: Prisma.AvisPrestataireUncheckedCreateNestedManyWithoutParticulierInput;
};
export type ParticulierCreateOrConnectWithoutPrestationsInput = {
    where: Prisma.ParticulierWhereUniqueInput;
    create: Prisma.XOR<Prisma.ParticulierCreateWithoutPrestationsInput, Prisma.ParticulierUncheckedCreateWithoutPrestationsInput>;
};
export type ParticulierUpsertWithoutPrestationsInput = {
    update: Prisma.XOR<Prisma.ParticulierUpdateWithoutPrestationsInput, Prisma.ParticulierUncheckedUpdateWithoutPrestationsInput>;
    create: Prisma.XOR<Prisma.ParticulierCreateWithoutPrestationsInput, Prisma.ParticulierUncheckedCreateWithoutPrestationsInput>;
    where?: Prisma.ParticulierWhereInput;
};
export type ParticulierUpdateToOneWithWhereWithoutPrestationsInput = {
    where?: Prisma.ParticulierWhereInput;
    data: Prisma.XOR<Prisma.ParticulierUpdateWithoutPrestationsInput, Prisma.ParticulierUncheckedUpdateWithoutPrestationsInput>;
};
export type ParticulierUpdateWithoutPrestationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nom?: Prisma.StringFieldUpdateOperationsInput | string;
    prenom?: Prisma.StringFieldUpdateOperationsInput | string;
    telephone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adresse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutParticulierNestedInput;
    avis?: Prisma.AvisPrestataireUpdateManyWithoutParticulierNestedInput;
};
export type ParticulierUncheckedUpdateWithoutPrestationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    nom?: Prisma.StringFieldUpdateOperationsInput | string;
    prenom?: Prisma.StringFieldUpdateOperationsInput | string;
    telephone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adresse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    avis?: Prisma.AvisPrestataireUncheckedUpdateManyWithoutParticulierNestedInput;
};
export type ParticulierCreateWithoutAvisInput = {
    id?: string;
    nom: string;
    prenom: string;
    telephone?: string | null;
    adresse?: string | null;
    latitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    avatarUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutParticulierInput;
    prestations?: Prisma.PrestationCreateNestedManyWithoutParticulierInput;
};
export type ParticulierUncheckedCreateWithoutAvisInput = {
    id?: string;
    userId: string;
    nom: string;
    prenom: string;
    telephone?: string | null;
    adresse?: string | null;
    latitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    avatarUrl?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    prestations?: Prisma.PrestationUncheckedCreateNestedManyWithoutParticulierInput;
};
export type ParticulierCreateOrConnectWithoutAvisInput = {
    where: Prisma.ParticulierWhereUniqueInput;
    create: Prisma.XOR<Prisma.ParticulierCreateWithoutAvisInput, Prisma.ParticulierUncheckedCreateWithoutAvisInput>;
};
export type ParticulierUpsertWithoutAvisInput = {
    update: Prisma.XOR<Prisma.ParticulierUpdateWithoutAvisInput, Prisma.ParticulierUncheckedUpdateWithoutAvisInput>;
    create: Prisma.XOR<Prisma.ParticulierCreateWithoutAvisInput, Prisma.ParticulierUncheckedCreateWithoutAvisInput>;
    where?: Prisma.ParticulierWhereInput;
};
export type ParticulierUpdateToOneWithWhereWithoutAvisInput = {
    where?: Prisma.ParticulierWhereInput;
    data: Prisma.XOR<Prisma.ParticulierUpdateWithoutAvisInput, Prisma.ParticulierUncheckedUpdateWithoutAvisInput>;
};
export type ParticulierUpdateWithoutAvisInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    nom?: Prisma.StringFieldUpdateOperationsInput | string;
    prenom?: Prisma.StringFieldUpdateOperationsInput | string;
    telephone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adresse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutParticulierNestedInput;
    prestations?: Prisma.PrestationUpdateManyWithoutParticulierNestedInput;
};
export type ParticulierUncheckedUpdateWithoutAvisInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    nom?: Prisma.StringFieldUpdateOperationsInput | string;
    prenom?: Prisma.StringFieldUpdateOperationsInput | string;
    telephone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adresse?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    latitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    longitude?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    avatarUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    prestations?: Prisma.PrestationUncheckedUpdateManyWithoutParticulierNestedInput;
};
export type ParticulierCountOutputType = {
    prestations: number;
    avis: number;
};
export type ParticulierCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    prestations?: boolean | ParticulierCountOutputTypeCountPrestationsArgs;
    avis?: boolean | ParticulierCountOutputTypeCountAvisArgs;
};
export type ParticulierCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParticulierCountOutputTypeSelect<ExtArgs> | null;
};
export type ParticulierCountOutputTypeCountPrestationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PrestationWhereInput;
};
export type ParticulierCountOutputTypeCountAvisArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AvisPrestataireWhereInput;
};
export type ParticulierSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    nom?: boolean;
    prenom?: boolean;
    telephone?: boolean;
    adresse?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    avatarUrl?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    prestations?: boolean | Prisma.Particulier$prestationsArgs<ExtArgs>;
    avis?: boolean | Prisma.Particulier$avisArgs<ExtArgs>;
    _count?: boolean | Prisma.ParticulierCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["particulier"]>;
export type ParticulierSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    nom?: boolean;
    prenom?: boolean;
    telephone?: boolean;
    adresse?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    avatarUrl?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["particulier"]>;
export type ParticulierSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    userId?: boolean;
    nom?: boolean;
    prenom?: boolean;
    telephone?: boolean;
    adresse?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    avatarUrl?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["particulier"]>;
export type ParticulierSelectScalar = {
    id?: boolean;
    userId?: boolean;
    nom?: boolean;
    prenom?: boolean;
    telephone?: boolean;
    adresse?: boolean;
    latitude?: boolean;
    longitude?: boolean;
    avatarUrl?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ParticulierOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "userId" | "nom" | "prenom" | "telephone" | "adresse" | "latitude" | "longitude" | "avatarUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["particulier"]>;
export type ParticulierInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    prestations?: boolean | Prisma.Particulier$prestationsArgs<ExtArgs>;
    avis?: boolean | Prisma.Particulier$avisArgs<ExtArgs>;
    _count?: boolean | Prisma.ParticulierCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ParticulierIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type ParticulierIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $ParticulierPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Particulier";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        prestations: Prisma.$PrestationPayload<ExtArgs>[];
        avis: Prisma.$AvisPrestatairePayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        userId: string;
        nom: string;
        prenom: string;
        telephone: string | null;
        adresse: string | null;
        latitude: runtime.Decimal | null;
        longitude: runtime.Decimal | null;
        avatarUrl: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["particulier"]>;
    composites: {};
};
export type ParticulierGetPayload<S extends boolean | null | undefined | ParticulierDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ParticulierPayload, S>;
export type ParticulierCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ParticulierFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ParticulierCountAggregateInputType | true;
};
export interface ParticulierDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Particulier'];
        meta: {
            name: 'Particulier';
        };
    };
    findUnique<T extends ParticulierFindUniqueArgs>(args: Prisma.SelectSubset<T, ParticulierFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ParticulierClient<runtime.Types.Result.GetResult<Prisma.$ParticulierPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ParticulierFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ParticulierFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ParticulierClient<runtime.Types.Result.GetResult<Prisma.$ParticulierPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ParticulierFindFirstArgs>(args?: Prisma.SelectSubset<T, ParticulierFindFirstArgs<ExtArgs>>): Prisma.Prisma__ParticulierClient<runtime.Types.Result.GetResult<Prisma.$ParticulierPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ParticulierFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ParticulierFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ParticulierClient<runtime.Types.Result.GetResult<Prisma.$ParticulierPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ParticulierFindManyArgs>(args?: Prisma.SelectSubset<T, ParticulierFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParticulierPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ParticulierCreateArgs>(args: Prisma.SelectSubset<T, ParticulierCreateArgs<ExtArgs>>): Prisma.Prisma__ParticulierClient<runtime.Types.Result.GetResult<Prisma.$ParticulierPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ParticulierCreateManyArgs>(args?: Prisma.SelectSubset<T, ParticulierCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ParticulierCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ParticulierCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParticulierPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ParticulierDeleteArgs>(args: Prisma.SelectSubset<T, ParticulierDeleteArgs<ExtArgs>>): Prisma.Prisma__ParticulierClient<runtime.Types.Result.GetResult<Prisma.$ParticulierPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ParticulierUpdateArgs>(args: Prisma.SelectSubset<T, ParticulierUpdateArgs<ExtArgs>>): Prisma.Prisma__ParticulierClient<runtime.Types.Result.GetResult<Prisma.$ParticulierPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ParticulierDeleteManyArgs>(args?: Prisma.SelectSubset<T, ParticulierDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ParticulierUpdateManyArgs>(args: Prisma.SelectSubset<T, ParticulierUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ParticulierUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ParticulierUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParticulierPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ParticulierUpsertArgs>(args: Prisma.SelectSubset<T, ParticulierUpsertArgs<ExtArgs>>): Prisma.Prisma__ParticulierClient<runtime.Types.Result.GetResult<Prisma.$ParticulierPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ParticulierCountArgs>(args?: Prisma.Subset<T, ParticulierCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ParticulierCountAggregateOutputType> : number>;
    aggregate<T extends ParticulierAggregateArgs>(args: Prisma.Subset<T, ParticulierAggregateArgs>): Prisma.PrismaPromise<GetParticulierAggregateType<T>>;
    groupBy<T extends ParticulierGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ParticulierGroupByArgs['orderBy'];
    } : {
        orderBy?: ParticulierGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ParticulierGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParticulierGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ParticulierFieldRefs;
}
export interface Prisma__ParticulierClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    prestations<T extends Prisma.Particulier$prestationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Particulier$prestationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PrestationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    avis<T extends Prisma.Particulier$avisArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Particulier$avisArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AvisPrestatairePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ParticulierFieldRefs {
    readonly id: Prisma.FieldRef<"Particulier", 'String'>;
    readonly userId: Prisma.FieldRef<"Particulier", 'String'>;
    readonly nom: Prisma.FieldRef<"Particulier", 'String'>;
    readonly prenom: Prisma.FieldRef<"Particulier", 'String'>;
    readonly telephone: Prisma.FieldRef<"Particulier", 'String'>;
    readonly adresse: Prisma.FieldRef<"Particulier", 'String'>;
    readonly latitude: Prisma.FieldRef<"Particulier", 'Decimal'>;
    readonly longitude: Prisma.FieldRef<"Particulier", 'Decimal'>;
    readonly avatarUrl: Prisma.FieldRef<"Particulier", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Particulier", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Particulier", 'DateTime'>;
}
export type ParticulierFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParticulierSelect<ExtArgs> | null;
    omit?: Prisma.ParticulierOmit<ExtArgs> | null;
    include?: Prisma.ParticulierInclude<ExtArgs> | null;
    where: Prisma.ParticulierWhereUniqueInput;
};
export type ParticulierFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParticulierSelect<ExtArgs> | null;
    omit?: Prisma.ParticulierOmit<ExtArgs> | null;
    include?: Prisma.ParticulierInclude<ExtArgs> | null;
    where: Prisma.ParticulierWhereUniqueInput;
};
export type ParticulierFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParticulierSelect<ExtArgs> | null;
    omit?: Prisma.ParticulierOmit<ExtArgs> | null;
    include?: Prisma.ParticulierInclude<ExtArgs> | null;
    where?: Prisma.ParticulierWhereInput;
    orderBy?: Prisma.ParticulierOrderByWithRelationInput | Prisma.ParticulierOrderByWithRelationInput[];
    cursor?: Prisma.ParticulierWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ParticulierScalarFieldEnum | Prisma.ParticulierScalarFieldEnum[];
};
export type ParticulierFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParticulierSelect<ExtArgs> | null;
    omit?: Prisma.ParticulierOmit<ExtArgs> | null;
    include?: Prisma.ParticulierInclude<ExtArgs> | null;
    where?: Prisma.ParticulierWhereInput;
    orderBy?: Prisma.ParticulierOrderByWithRelationInput | Prisma.ParticulierOrderByWithRelationInput[];
    cursor?: Prisma.ParticulierWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ParticulierScalarFieldEnum | Prisma.ParticulierScalarFieldEnum[];
};
export type ParticulierFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParticulierSelect<ExtArgs> | null;
    omit?: Prisma.ParticulierOmit<ExtArgs> | null;
    include?: Prisma.ParticulierInclude<ExtArgs> | null;
    where?: Prisma.ParticulierWhereInput;
    orderBy?: Prisma.ParticulierOrderByWithRelationInput | Prisma.ParticulierOrderByWithRelationInput[];
    cursor?: Prisma.ParticulierWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ParticulierScalarFieldEnum | Prisma.ParticulierScalarFieldEnum[];
};
export type ParticulierCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParticulierSelect<ExtArgs> | null;
    omit?: Prisma.ParticulierOmit<ExtArgs> | null;
    include?: Prisma.ParticulierInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ParticulierCreateInput, Prisma.ParticulierUncheckedCreateInput>;
};
export type ParticulierCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ParticulierCreateManyInput | Prisma.ParticulierCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ParticulierCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParticulierSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ParticulierOmit<ExtArgs> | null;
    data: Prisma.ParticulierCreateManyInput | Prisma.ParticulierCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ParticulierIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ParticulierUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParticulierSelect<ExtArgs> | null;
    omit?: Prisma.ParticulierOmit<ExtArgs> | null;
    include?: Prisma.ParticulierInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ParticulierUpdateInput, Prisma.ParticulierUncheckedUpdateInput>;
    where: Prisma.ParticulierWhereUniqueInput;
};
export type ParticulierUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ParticulierUpdateManyMutationInput, Prisma.ParticulierUncheckedUpdateManyInput>;
    where?: Prisma.ParticulierWhereInput;
    limit?: number;
};
export type ParticulierUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParticulierSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ParticulierOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ParticulierUpdateManyMutationInput, Prisma.ParticulierUncheckedUpdateManyInput>;
    where?: Prisma.ParticulierWhereInput;
    limit?: number;
    include?: Prisma.ParticulierIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ParticulierUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParticulierSelect<ExtArgs> | null;
    omit?: Prisma.ParticulierOmit<ExtArgs> | null;
    include?: Prisma.ParticulierInclude<ExtArgs> | null;
    where: Prisma.ParticulierWhereUniqueInput;
    create: Prisma.XOR<Prisma.ParticulierCreateInput, Prisma.ParticulierUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ParticulierUpdateInput, Prisma.ParticulierUncheckedUpdateInput>;
};
export type ParticulierDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParticulierSelect<ExtArgs> | null;
    omit?: Prisma.ParticulierOmit<ExtArgs> | null;
    include?: Prisma.ParticulierInclude<ExtArgs> | null;
    where: Prisma.ParticulierWhereUniqueInput;
};
export type ParticulierDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ParticulierWhereInput;
    limit?: number;
};
export type Particulier$prestationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestationSelect<ExtArgs> | null;
    omit?: Prisma.PrestationOmit<ExtArgs> | null;
    include?: Prisma.PrestationInclude<ExtArgs> | null;
    where?: Prisma.PrestationWhereInput;
    orderBy?: Prisma.PrestationOrderByWithRelationInput | Prisma.PrestationOrderByWithRelationInput[];
    cursor?: Prisma.PrestationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PrestationScalarFieldEnum | Prisma.PrestationScalarFieldEnum[];
};
export type Particulier$avisArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvisPrestataireSelect<ExtArgs> | null;
    omit?: Prisma.AvisPrestataireOmit<ExtArgs> | null;
    include?: Prisma.AvisPrestataireInclude<ExtArgs> | null;
    where?: Prisma.AvisPrestataireWhereInput;
    orderBy?: Prisma.AvisPrestataireOrderByWithRelationInput | Prisma.AvisPrestataireOrderByWithRelationInput[];
    cursor?: Prisma.AvisPrestataireWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AvisPrestataireScalarFieldEnum | Prisma.AvisPrestataireScalarFieldEnum[];
};
export type ParticulierDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParticulierSelect<ExtArgs> | null;
    omit?: Prisma.ParticulierOmit<ExtArgs> | null;
    include?: Prisma.ParticulierInclude<ExtArgs> | null;
};
export {};
