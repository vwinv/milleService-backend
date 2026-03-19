import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type AvisPrestataireModel = runtime.Types.Result.DefaultSelection<Prisma.$AvisPrestatairePayload>;
export type AggregateAvisPrestataire = {
    _count: AvisPrestataireCountAggregateOutputType | null;
    _avg: AvisPrestataireAvgAggregateOutputType | null;
    _sum: AvisPrestataireSumAggregateOutputType | null;
    _min: AvisPrestataireMinAggregateOutputType | null;
    _max: AvisPrestataireMaxAggregateOutputType | null;
};
export type AvisPrestataireAvgAggregateOutputType = {
    note: number | null;
};
export type AvisPrestataireSumAggregateOutputType = {
    note: number | null;
};
export type AvisPrestataireMinAggregateOutputType = {
    id: string | null;
    particulierId: string | null;
    prestataireId: string | null;
    note: number | null;
    commentaire: string | null;
    createdAt: Date | null;
};
export type AvisPrestataireMaxAggregateOutputType = {
    id: string | null;
    particulierId: string | null;
    prestataireId: string | null;
    note: number | null;
    commentaire: string | null;
    createdAt: Date | null;
};
export type AvisPrestataireCountAggregateOutputType = {
    id: number;
    particulierId: number;
    prestataireId: number;
    note: number;
    commentaire: number;
    createdAt: number;
    _all: number;
};
export type AvisPrestataireAvgAggregateInputType = {
    note?: true;
};
export type AvisPrestataireSumAggregateInputType = {
    note?: true;
};
export type AvisPrestataireMinAggregateInputType = {
    id?: true;
    particulierId?: true;
    prestataireId?: true;
    note?: true;
    commentaire?: true;
    createdAt?: true;
};
export type AvisPrestataireMaxAggregateInputType = {
    id?: true;
    particulierId?: true;
    prestataireId?: true;
    note?: true;
    commentaire?: true;
    createdAt?: true;
};
export type AvisPrestataireCountAggregateInputType = {
    id?: true;
    particulierId?: true;
    prestataireId?: true;
    note?: true;
    commentaire?: true;
    createdAt?: true;
    _all?: true;
};
export type AvisPrestataireAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AvisPrestataireWhereInput;
    orderBy?: Prisma.AvisPrestataireOrderByWithRelationInput | Prisma.AvisPrestataireOrderByWithRelationInput[];
    cursor?: Prisma.AvisPrestataireWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | AvisPrestataireCountAggregateInputType;
    _avg?: AvisPrestataireAvgAggregateInputType;
    _sum?: AvisPrestataireSumAggregateInputType;
    _min?: AvisPrestataireMinAggregateInputType;
    _max?: AvisPrestataireMaxAggregateInputType;
};
export type GetAvisPrestataireAggregateType<T extends AvisPrestataireAggregateArgs> = {
    [P in keyof T & keyof AggregateAvisPrestataire]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateAvisPrestataire[P]> : Prisma.GetScalarType<T[P], AggregateAvisPrestataire[P]>;
};
export type AvisPrestataireGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AvisPrestataireWhereInput;
    orderBy?: Prisma.AvisPrestataireOrderByWithAggregationInput | Prisma.AvisPrestataireOrderByWithAggregationInput[];
    by: Prisma.AvisPrestataireScalarFieldEnum[] | Prisma.AvisPrestataireScalarFieldEnum;
    having?: Prisma.AvisPrestataireScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AvisPrestataireCountAggregateInputType | true;
    _avg?: AvisPrestataireAvgAggregateInputType;
    _sum?: AvisPrestataireSumAggregateInputType;
    _min?: AvisPrestataireMinAggregateInputType;
    _max?: AvisPrestataireMaxAggregateInputType;
};
export type AvisPrestataireGroupByOutputType = {
    id: string;
    particulierId: string;
    prestataireId: string;
    note: number;
    commentaire: string | null;
    createdAt: Date;
    _count: AvisPrestataireCountAggregateOutputType | null;
    _avg: AvisPrestataireAvgAggregateOutputType | null;
    _sum: AvisPrestataireSumAggregateOutputType | null;
    _min: AvisPrestataireMinAggregateOutputType | null;
    _max: AvisPrestataireMaxAggregateOutputType | null;
};
type GetAvisPrestataireGroupByPayload<T extends AvisPrestataireGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<AvisPrestataireGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof AvisPrestataireGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], AvisPrestataireGroupByOutputType[P]> : Prisma.GetScalarType<T[P], AvisPrestataireGroupByOutputType[P]>;
}>>;
export type AvisPrestataireWhereInput = {
    AND?: Prisma.AvisPrestataireWhereInput | Prisma.AvisPrestataireWhereInput[];
    OR?: Prisma.AvisPrestataireWhereInput[];
    NOT?: Prisma.AvisPrestataireWhereInput | Prisma.AvisPrestataireWhereInput[];
    id?: Prisma.StringFilter<"AvisPrestataire"> | string;
    particulierId?: Prisma.StringFilter<"AvisPrestataire"> | string;
    prestataireId?: Prisma.StringFilter<"AvisPrestataire"> | string;
    note?: Prisma.IntFilter<"AvisPrestataire"> | number;
    commentaire?: Prisma.StringNullableFilter<"AvisPrestataire"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AvisPrestataire"> | Date | string;
    particulier?: Prisma.XOR<Prisma.ParticulierScalarRelationFilter, Prisma.ParticulierWhereInput>;
    prestataire?: Prisma.XOR<Prisma.PrestataireScalarRelationFilter, Prisma.PrestataireWhereInput>;
};
export type AvisPrestataireOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    particulierId?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    commentaire?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    particulier?: Prisma.ParticulierOrderByWithRelationInput;
    prestataire?: Prisma.PrestataireOrderByWithRelationInput;
};
export type AvisPrestataireWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    particulierId_prestataireId?: Prisma.AvisPrestataireParticulierIdPrestataireIdCompoundUniqueInput;
    AND?: Prisma.AvisPrestataireWhereInput | Prisma.AvisPrestataireWhereInput[];
    OR?: Prisma.AvisPrestataireWhereInput[];
    NOT?: Prisma.AvisPrestataireWhereInput | Prisma.AvisPrestataireWhereInput[];
    particulierId?: Prisma.StringFilter<"AvisPrestataire"> | string;
    prestataireId?: Prisma.StringFilter<"AvisPrestataire"> | string;
    note?: Prisma.IntFilter<"AvisPrestataire"> | number;
    commentaire?: Prisma.StringNullableFilter<"AvisPrestataire"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AvisPrestataire"> | Date | string;
    particulier?: Prisma.XOR<Prisma.ParticulierScalarRelationFilter, Prisma.ParticulierWhereInput>;
    prestataire?: Prisma.XOR<Prisma.PrestataireScalarRelationFilter, Prisma.PrestataireWhereInput>;
}, "id" | "particulierId_prestataireId">;
export type AvisPrestataireOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    particulierId?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    commentaire?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.AvisPrestataireCountOrderByAggregateInput;
    _avg?: Prisma.AvisPrestataireAvgOrderByAggregateInput;
    _max?: Prisma.AvisPrestataireMaxOrderByAggregateInput;
    _min?: Prisma.AvisPrestataireMinOrderByAggregateInput;
    _sum?: Prisma.AvisPrestataireSumOrderByAggregateInput;
};
export type AvisPrestataireScalarWhereWithAggregatesInput = {
    AND?: Prisma.AvisPrestataireScalarWhereWithAggregatesInput | Prisma.AvisPrestataireScalarWhereWithAggregatesInput[];
    OR?: Prisma.AvisPrestataireScalarWhereWithAggregatesInput[];
    NOT?: Prisma.AvisPrestataireScalarWhereWithAggregatesInput | Prisma.AvisPrestataireScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"AvisPrestataire"> | string;
    particulierId?: Prisma.StringWithAggregatesFilter<"AvisPrestataire"> | string;
    prestataireId?: Prisma.StringWithAggregatesFilter<"AvisPrestataire"> | string;
    note?: Prisma.IntWithAggregatesFilter<"AvisPrestataire"> | number;
    commentaire?: Prisma.StringNullableWithAggregatesFilter<"AvisPrestataire"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"AvisPrestataire"> | Date | string;
};
export type AvisPrestataireCreateInput = {
    id?: string;
    note: number;
    commentaire?: string | null;
    createdAt?: Date | string;
    particulier: Prisma.ParticulierCreateNestedOneWithoutAvisInput;
    prestataire: Prisma.PrestataireCreateNestedOneWithoutAvisInput;
};
export type AvisPrestataireUncheckedCreateInput = {
    id?: string;
    particulierId: string;
    prestataireId: string;
    note: number;
    commentaire?: string | null;
    createdAt?: Date | string;
};
export type AvisPrestataireUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.IntFieldUpdateOperationsInput | number;
    commentaire?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    particulier?: Prisma.ParticulierUpdateOneRequiredWithoutAvisNestedInput;
    prestataire?: Prisma.PrestataireUpdateOneRequiredWithoutAvisNestedInput;
};
export type AvisPrestataireUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    particulierId?: Prisma.StringFieldUpdateOperationsInput | string;
    prestataireId?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.IntFieldUpdateOperationsInput | number;
    commentaire?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AvisPrestataireCreateManyInput = {
    id?: string;
    particulierId: string;
    prestataireId: string;
    note: number;
    commentaire?: string | null;
    createdAt?: Date | string;
};
export type AvisPrestataireUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.IntFieldUpdateOperationsInput | number;
    commentaire?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AvisPrestataireUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    particulierId?: Prisma.StringFieldUpdateOperationsInput | string;
    prestataireId?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.IntFieldUpdateOperationsInput | number;
    commentaire?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AvisPrestataireListRelationFilter = {
    every?: Prisma.AvisPrestataireWhereInput;
    some?: Prisma.AvisPrestataireWhereInput;
    none?: Prisma.AvisPrestataireWhereInput;
};
export type AvisPrestataireOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type AvisPrestataireParticulierIdPrestataireIdCompoundUniqueInput = {
    particulierId: string;
    prestataireId: string;
};
export type AvisPrestataireCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    particulierId?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    commentaire?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AvisPrestataireAvgOrderByAggregateInput = {
    note?: Prisma.SortOrder;
};
export type AvisPrestataireMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    particulierId?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    commentaire?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AvisPrestataireMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    particulierId?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    note?: Prisma.SortOrder;
    commentaire?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type AvisPrestataireSumOrderByAggregateInput = {
    note?: Prisma.SortOrder;
};
export type AvisPrestataireCreateNestedManyWithoutParticulierInput = {
    create?: Prisma.XOR<Prisma.AvisPrestataireCreateWithoutParticulierInput, Prisma.AvisPrestataireUncheckedCreateWithoutParticulierInput> | Prisma.AvisPrestataireCreateWithoutParticulierInput[] | Prisma.AvisPrestataireUncheckedCreateWithoutParticulierInput[];
    connectOrCreate?: Prisma.AvisPrestataireCreateOrConnectWithoutParticulierInput | Prisma.AvisPrestataireCreateOrConnectWithoutParticulierInput[];
    createMany?: Prisma.AvisPrestataireCreateManyParticulierInputEnvelope;
    connect?: Prisma.AvisPrestataireWhereUniqueInput | Prisma.AvisPrestataireWhereUniqueInput[];
};
export type AvisPrestataireUncheckedCreateNestedManyWithoutParticulierInput = {
    create?: Prisma.XOR<Prisma.AvisPrestataireCreateWithoutParticulierInput, Prisma.AvisPrestataireUncheckedCreateWithoutParticulierInput> | Prisma.AvisPrestataireCreateWithoutParticulierInput[] | Prisma.AvisPrestataireUncheckedCreateWithoutParticulierInput[];
    connectOrCreate?: Prisma.AvisPrestataireCreateOrConnectWithoutParticulierInput | Prisma.AvisPrestataireCreateOrConnectWithoutParticulierInput[];
    createMany?: Prisma.AvisPrestataireCreateManyParticulierInputEnvelope;
    connect?: Prisma.AvisPrestataireWhereUniqueInput | Prisma.AvisPrestataireWhereUniqueInput[];
};
export type AvisPrestataireUpdateManyWithoutParticulierNestedInput = {
    create?: Prisma.XOR<Prisma.AvisPrestataireCreateWithoutParticulierInput, Prisma.AvisPrestataireUncheckedCreateWithoutParticulierInput> | Prisma.AvisPrestataireCreateWithoutParticulierInput[] | Prisma.AvisPrestataireUncheckedCreateWithoutParticulierInput[];
    connectOrCreate?: Prisma.AvisPrestataireCreateOrConnectWithoutParticulierInput | Prisma.AvisPrestataireCreateOrConnectWithoutParticulierInput[];
    upsert?: Prisma.AvisPrestataireUpsertWithWhereUniqueWithoutParticulierInput | Prisma.AvisPrestataireUpsertWithWhereUniqueWithoutParticulierInput[];
    createMany?: Prisma.AvisPrestataireCreateManyParticulierInputEnvelope;
    set?: Prisma.AvisPrestataireWhereUniqueInput | Prisma.AvisPrestataireWhereUniqueInput[];
    disconnect?: Prisma.AvisPrestataireWhereUniqueInput | Prisma.AvisPrestataireWhereUniqueInput[];
    delete?: Prisma.AvisPrestataireWhereUniqueInput | Prisma.AvisPrestataireWhereUniqueInput[];
    connect?: Prisma.AvisPrestataireWhereUniqueInput | Prisma.AvisPrestataireWhereUniqueInput[];
    update?: Prisma.AvisPrestataireUpdateWithWhereUniqueWithoutParticulierInput | Prisma.AvisPrestataireUpdateWithWhereUniqueWithoutParticulierInput[];
    updateMany?: Prisma.AvisPrestataireUpdateManyWithWhereWithoutParticulierInput | Prisma.AvisPrestataireUpdateManyWithWhereWithoutParticulierInput[];
    deleteMany?: Prisma.AvisPrestataireScalarWhereInput | Prisma.AvisPrestataireScalarWhereInput[];
};
export type AvisPrestataireUncheckedUpdateManyWithoutParticulierNestedInput = {
    create?: Prisma.XOR<Prisma.AvisPrestataireCreateWithoutParticulierInput, Prisma.AvisPrestataireUncheckedCreateWithoutParticulierInput> | Prisma.AvisPrestataireCreateWithoutParticulierInput[] | Prisma.AvisPrestataireUncheckedCreateWithoutParticulierInput[];
    connectOrCreate?: Prisma.AvisPrestataireCreateOrConnectWithoutParticulierInput | Prisma.AvisPrestataireCreateOrConnectWithoutParticulierInput[];
    upsert?: Prisma.AvisPrestataireUpsertWithWhereUniqueWithoutParticulierInput | Prisma.AvisPrestataireUpsertWithWhereUniqueWithoutParticulierInput[];
    createMany?: Prisma.AvisPrestataireCreateManyParticulierInputEnvelope;
    set?: Prisma.AvisPrestataireWhereUniqueInput | Prisma.AvisPrestataireWhereUniqueInput[];
    disconnect?: Prisma.AvisPrestataireWhereUniqueInput | Prisma.AvisPrestataireWhereUniqueInput[];
    delete?: Prisma.AvisPrestataireWhereUniqueInput | Prisma.AvisPrestataireWhereUniqueInput[];
    connect?: Prisma.AvisPrestataireWhereUniqueInput | Prisma.AvisPrestataireWhereUniqueInput[];
    update?: Prisma.AvisPrestataireUpdateWithWhereUniqueWithoutParticulierInput | Prisma.AvisPrestataireUpdateWithWhereUniqueWithoutParticulierInput[];
    updateMany?: Prisma.AvisPrestataireUpdateManyWithWhereWithoutParticulierInput | Prisma.AvisPrestataireUpdateManyWithWhereWithoutParticulierInput[];
    deleteMany?: Prisma.AvisPrestataireScalarWhereInput | Prisma.AvisPrestataireScalarWhereInput[];
};
export type AvisPrestataireCreateNestedManyWithoutPrestataireInput = {
    create?: Prisma.XOR<Prisma.AvisPrestataireCreateWithoutPrestataireInput, Prisma.AvisPrestataireUncheckedCreateWithoutPrestataireInput> | Prisma.AvisPrestataireCreateWithoutPrestataireInput[] | Prisma.AvisPrestataireUncheckedCreateWithoutPrestataireInput[];
    connectOrCreate?: Prisma.AvisPrestataireCreateOrConnectWithoutPrestataireInput | Prisma.AvisPrestataireCreateOrConnectWithoutPrestataireInput[];
    createMany?: Prisma.AvisPrestataireCreateManyPrestataireInputEnvelope;
    connect?: Prisma.AvisPrestataireWhereUniqueInput | Prisma.AvisPrestataireWhereUniqueInput[];
};
export type AvisPrestataireUncheckedCreateNestedManyWithoutPrestataireInput = {
    create?: Prisma.XOR<Prisma.AvisPrestataireCreateWithoutPrestataireInput, Prisma.AvisPrestataireUncheckedCreateWithoutPrestataireInput> | Prisma.AvisPrestataireCreateWithoutPrestataireInput[] | Prisma.AvisPrestataireUncheckedCreateWithoutPrestataireInput[];
    connectOrCreate?: Prisma.AvisPrestataireCreateOrConnectWithoutPrestataireInput | Prisma.AvisPrestataireCreateOrConnectWithoutPrestataireInput[];
    createMany?: Prisma.AvisPrestataireCreateManyPrestataireInputEnvelope;
    connect?: Prisma.AvisPrestataireWhereUniqueInput | Prisma.AvisPrestataireWhereUniqueInput[];
};
export type AvisPrestataireUpdateManyWithoutPrestataireNestedInput = {
    create?: Prisma.XOR<Prisma.AvisPrestataireCreateWithoutPrestataireInput, Prisma.AvisPrestataireUncheckedCreateWithoutPrestataireInput> | Prisma.AvisPrestataireCreateWithoutPrestataireInput[] | Prisma.AvisPrestataireUncheckedCreateWithoutPrestataireInput[];
    connectOrCreate?: Prisma.AvisPrestataireCreateOrConnectWithoutPrestataireInput | Prisma.AvisPrestataireCreateOrConnectWithoutPrestataireInput[];
    upsert?: Prisma.AvisPrestataireUpsertWithWhereUniqueWithoutPrestataireInput | Prisma.AvisPrestataireUpsertWithWhereUniqueWithoutPrestataireInput[];
    createMany?: Prisma.AvisPrestataireCreateManyPrestataireInputEnvelope;
    set?: Prisma.AvisPrestataireWhereUniqueInput | Prisma.AvisPrestataireWhereUniqueInput[];
    disconnect?: Prisma.AvisPrestataireWhereUniqueInput | Prisma.AvisPrestataireWhereUniqueInput[];
    delete?: Prisma.AvisPrestataireWhereUniqueInput | Prisma.AvisPrestataireWhereUniqueInput[];
    connect?: Prisma.AvisPrestataireWhereUniqueInput | Prisma.AvisPrestataireWhereUniqueInput[];
    update?: Prisma.AvisPrestataireUpdateWithWhereUniqueWithoutPrestataireInput | Prisma.AvisPrestataireUpdateWithWhereUniqueWithoutPrestataireInput[];
    updateMany?: Prisma.AvisPrestataireUpdateManyWithWhereWithoutPrestataireInput | Prisma.AvisPrestataireUpdateManyWithWhereWithoutPrestataireInput[];
    deleteMany?: Prisma.AvisPrestataireScalarWhereInput | Prisma.AvisPrestataireScalarWhereInput[];
};
export type AvisPrestataireUncheckedUpdateManyWithoutPrestataireNestedInput = {
    create?: Prisma.XOR<Prisma.AvisPrestataireCreateWithoutPrestataireInput, Prisma.AvisPrestataireUncheckedCreateWithoutPrestataireInput> | Prisma.AvisPrestataireCreateWithoutPrestataireInput[] | Prisma.AvisPrestataireUncheckedCreateWithoutPrestataireInput[];
    connectOrCreate?: Prisma.AvisPrestataireCreateOrConnectWithoutPrestataireInput | Prisma.AvisPrestataireCreateOrConnectWithoutPrestataireInput[];
    upsert?: Prisma.AvisPrestataireUpsertWithWhereUniqueWithoutPrestataireInput | Prisma.AvisPrestataireUpsertWithWhereUniqueWithoutPrestataireInput[];
    createMany?: Prisma.AvisPrestataireCreateManyPrestataireInputEnvelope;
    set?: Prisma.AvisPrestataireWhereUniqueInput | Prisma.AvisPrestataireWhereUniqueInput[];
    disconnect?: Prisma.AvisPrestataireWhereUniqueInput | Prisma.AvisPrestataireWhereUniqueInput[];
    delete?: Prisma.AvisPrestataireWhereUniqueInput | Prisma.AvisPrestataireWhereUniqueInput[];
    connect?: Prisma.AvisPrestataireWhereUniqueInput | Prisma.AvisPrestataireWhereUniqueInput[];
    update?: Prisma.AvisPrestataireUpdateWithWhereUniqueWithoutPrestataireInput | Prisma.AvisPrestataireUpdateWithWhereUniqueWithoutPrestataireInput[];
    updateMany?: Prisma.AvisPrestataireUpdateManyWithWhereWithoutPrestataireInput | Prisma.AvisPrestataireUpdateManyWithWhereWithoutPrestataireInput[];
    deleteMany?: Prisma.AvisPrestataireScalarWhereInput | Prisma.AvisPrestataireScalarWhereInput[];
};
export type AvisPrestataireCreateWithoutParticulierInput = {
    id?: string;
    note: number;
    commentaire?: string | null;
    createdAt?: Date | string;
    prestataire: Prisma.PrestataireCreateNestedOneWithoutAvisInput;
};
export type AvisPrestataireUncheckedCreateWithoutParticulierInput = {
    id?: string;
    prestataireId: string;
    note: number;
    commentaire?: string | null;
    createdAt?: Date | string;
};
export type AvisPrestataireCreateOrConnectWithoutParticulierInput = {
    where: Prisma.AvisPrestataireWhereUniqueInput;
    create: Prisma.XOR<Prisma.AvisPrestataireCreateWithoutParticulierInput, Prisma.AvisPrestataireUncheckedCreateWithoutParticulierInput>;
};
export type AvisPrestataireCreateManyParticulierInputEnvelope = {
    data: Prisma.AvisPrestataireCreateManyParticulierInput | Prisma.AvisPrestataireCreateManyParticulierInput[];
    skipDuplicates?: boolean;
};
export type AvisPrestataireUpsertWithWhereUniqueWithoutParticulierInput = {
    where: Prisma.AvisPrestataireWhereUniqueInput;
    update: Prisma.XOR<Prisma.AvisPrestataireUpdateWithoutParticulierInput, Prisma.AvisPrestataireUncheckedUpdateWithoutParticulierInput>;
    create: Prisma.XOR<Prisma.AvisPrestataireCreateWithoutParticulierInput, Prisma.AvisPrestataireUncheckedCreateWithoutParticulierInput>;
};
export type AvisPrestataireUpdateWithWhereUniqueWithoutParticulierInput = {
    where: Prisma.AvisPrestataireWhereUniqueInput;
    data: Prisma.XOR<Prisma.AvisPrestataireUpdateWithoutParticulierInput, Prisma.AvisPrestataireUncheckedUpdateWithoutParticulierInput>;
};
export type AvisPrestataireUpdateManyWithWhereWithoutParticulierInput = {
    where: Prisma.AvisPrestataireScalarWhereInput;
    data: Prisma.XOR<Prisma.AvisPrestataireUpdateManyMutationInput, Prisma.AvisPrestataireUncheckedUpdateManyWithoutParticulierInput>;
};
export type AvisPrestataireScalarWhereInput = {
    AND?: Prisma.AvisPrestataireScalarWhereInput | Prisma.AvisPrestataireScalarWhereInput[];
    OR?: Prisma.AvisPrestataireScalarWhereInput[];
    NOT?: Prisma.AvisPrestataireScalarWhereInput | Prisma.AvisPrestataireScalarWhereInput[];
    id?: Prisma.StringFilter<"AvisPrestataire"> | string;
    particulierId?: Prisma.StringFilter<"AvisPrestataire"> | string;
    prestataireId?: Prisma.StringFilter<"AvisPrestataire"> | string;
    note?: Prisma.IntFilter<"AvisPrestataire"> | number;
    commentaire?: Prisma.StringNullableFilter<"AvisPrestataire"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"AvisPrestataire"> | Date | string;
};
export type AvisPrestataireCreateWithoutPrestataireInput = {
    id?: string;
    note: number;
    commentaire?: string | null;
    createdAt?: Date | string;
    particulier: Prisma.ParticulierCreateNestedOneWithoutAvisInput;
};
export type AvisPrestataireUncheckedCreateWithoutPrestataireInput = {
    id?: string;
    particulierId: string;
    note: number;
    commentaire?: string | null;
    createdAt?: Date | string;
};
export type AvisPrestataireCreateOrConnectWithoutPrestataireInput = {
    where: Prisma.AvisPrestataireWhereUniqueInput;
    create: Prisma.XOR<Prisma.AvisPrestataireCreateWithoutPrestataireInput, Prisma.AvisPrestataireUncheckedCreateWithoutPrestataireInput>;
};
export type AvisPrestataireCreateManyPrestataireInputEnvelope = {
    data: Prisma.AvisPrestataireCreateManyPrestataireInput | Prisma.AvisPrestataireCreateManyPrestataireInput[];
    skipDuplicates?: boolean;
};
export type AvisPrestataireUpsertWithWhereUniqueWithoutPrestataireInput = {
    where: Prisma.AvisPrestataireWhereUniqueInput;
    update: Prisma.XOR<Prisma.AvisPrestataireUpdateWithoutPrestataireInput, Prisma.AvisPrestataireUncheckedUpdateWithoutPrestataireInput>;
    create: Prisma.XOR<Prisma.AvisPrestataireCreateWithoutPrestataireInput, Prisma.AvisPrestataireUncheckedCreateWithoutPrestataireInput>;
};
export type AvisPrestataireUpdateWithWhereUniqueWithoutPrestataireInput = {
    where: Prisma.AvisPrestataireWhereUniqueInput;
    data: Prisma.XOR<Prisma.AvisPrestataireUpdateWithoutPrestataireInput, Prisma.AvisPrestataireUncheckedUpdateWithoutPrestataireInput>;
};
export type AvisPrestataireUpdateManyWithWhereWithoutPrestataireInput = {
    where: Prisma.AvisPrestataireScalarWhereInput;
    data: Prisma.XOR<Prisma.AvisPrestataireUpdateManyMutationInput, Prisma.AvisPrestataireUncheckedUpdateManyWithoutPrestataireInput>;
};
export type AvisPrestataireCreateManyParticulierInput = {
    id?: string;
    prestataireId: string;
    note: number;
    commentaire?: string | null;
    createdAt?: Date | string;
};
export type AvisPrestataireUpdateWithoutParticulierInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.IntFieldUpdateOperationsInput | number;
    commentaire?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    prestataire?: Prisma.PrestataireUpdateOneRequiredWithoutAvisNestedInput;
};
export type AvisPrestataireUncheckedUpdateWithoutParticulierInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    prestataireId?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.IntFieldUpdateOperationsInput | number;
    commentaire?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AvisPrestataireUncheckedUpdateManyWithoutParticulierInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    prestataireId?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.IntFieldUpdateOperationsInput | number;
    commentaire?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AvisPrestataireCreateManyPrestataireInput = {
    id?: string;
    particulierId: string;
    note: number;
    commentaire?: string | null;
    createdAt?: Date | string;
};
export type AvisPrestataireUpdateWithoutPrestataireInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.IntFieldUpdateOperationsInput | number;
    commentaire?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    particulier?: Prisma.ParticulierUpdateOneRequiredWithoutAvisNestedInput;
};
export type AvisPrestataireUncheckedUpdateWithoutPrestataireInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    particulierId?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.IntFieldUpdateOperationsInput | number;
    commentaire?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AvisPrestataireUncheckedUpdateManyWithoutPrestataireInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    particulierId?: Prisma.StringFieldUpdateOperationsInput | string;
    note?: Prisma.IntFieldUpdateOperationsInput | number;
    commentaire?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type AvisPrestataireSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    particulierId?: boolean;
    prestataireId?: boolean;
    note?: boolean;
    commentaire?: boolean;
    createdAt?: boolean;
    particulier?: boolean | Prisma.ParticulierDefaultArgs<ExtArgs>;
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["avisPrestataire"]>;
export type AvisPrestataireSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    particulierId?: boolean;
    prestataireId?: boolean;
    note?: boolean;
    commentaire?: boolean;
    createdAt?: boolean;
    particulier?: boolean | Prisma.ParticulierDefaultArgs<ExtArgs>;
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["avisPrestataire"]>;
export type AvisPrestataireSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    particulierId?: boolean;
    prestataireId?: boolean;
    note?: boolean;
    commentaire?: boolean;
    createdAt?: boolean;
    particulier?: boolean | Prisma.ParticulierDefaultArgs<ExtArgs>;
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["avisPrestataire"]>;
export type AvisPrestataireSelectScalar = {
    id?: boolean;
    particulierId?: boolean;
    prestataireId?: boolean;
    note?: boolean;
    commentaire?: boolean;
    createdAt?: boolean;
};
export type AvisPrestataireOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "particulierId" | "prestataireId" | "note" | "commentaire" | "createdAt", ExtArgs["result"]["avisPrestataire"]>;
export type AvisPrestataireInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    particulier?: boolean | Prisma.ParticulierDefaultArgs<ExtArgs>;
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
};
export type AvisPrestataireIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    particulier?: boolean | Prisma.ParticulierDefaultArgs<ExtArgs>;
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
};
export type AvisPrestataireIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    particulier?: boolean | Prisma.ParticulierDefaultArgs<ExtArgs>;
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
};
export type $AvisPrestatairePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "AvisPrestataire";
    objects: {
        particulier: Prisma.$ParticulierPayload<ExtArgs>;
        prestataire: Prisma.$PrestatairePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        particulierId: string;
        prestataireId: string;
        note: number;
        commentaire: string | null;
        createdAt: Date;
    }, ExtArgs["result"]["avisPrestataire"]>;
    composites: {};
};
export type AvisPrestataireGetPayload<S extends boolean | null | undefined | AvisPrestataireDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$AvisPrestatairePayload, S>;
export type AvisPrestataireCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<AvisPrestataireFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: AvisPrestataireCountAggregateInputType | true;
};
export interface AvisPrestataireDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['AvisPrestataire'];
        meta: {
            name: 'AvisPrestataire';
        };
    };
    findUnique<T extends AvisPrestataireFindUniqueArgs>(args: Prisma.SelectSubset<T, AvisPrestataireFindUniqueArgs<ExtArgs>>): Prisma.Prisma__AvisPrestataireClient<runtime.Types.Result.GetResult<Prisma.$AvisPrestatairePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends AvisPrestataireFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, AvisPrestataireFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__AvisPrestataireClient<runtime.Types.Result.GetResult<Prisma.$AvisPrestatairePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends AvisPrestataireFindFirstArgs>(args?: Prisma.SelectSubset<T, AvisPrestataireFindFirstArgs<ExtArgs>>): Prisma.Prisma__AvisPrestataireClient<runtime.Types.Result.GetResult<Prisma.$AvisPrestatairePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends AvisPrestataireFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, AvisPrestataireFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__AvisPrestataireClient<runtime.Types.Result.GetResult<Prisma.$AvisPrestatairePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends AvisPrestataireFindManyArgs>(args?: Prisma.SelectSubset<T, AvisPrestataireFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AvisPrestatairePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends AvisPrestataireCreateArgs>(args: Prisma.SelectSubset<T, AvisPrestataireCreateArgs<ExtArgs>>): Prisma.Prisma__AvisPrestataireClient<runtime.Types.Result.GetResult<Prisma.$AvisPrestatairePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends AvisPrestataireCreateManyArgs>(args?: Prisma.SelectSubset<T, AvisPrestataireCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends AvisPrestataireCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, AvisPrestataireCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AvisPrestatairePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends AvisPrestataireDeleteArgs>(args: Prisma.SelectSubset<T, AvisPrestataireDeleteArgs<ExtArgs>>): Prisma.Prisma__AvisPrestataireClient<runtime.Types.Result.GetResult<Prisma.$AvisPrestatairePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends AvisPrestataireUpdateArgs>(args: Prisma.SelectSubset<T, AvisPrestataireUpdateArgs<ExtArgs>>): Prisma.Prisma__AvisPrestataireClient<runtime.Types.Result.GetResult<Prisma.$AvisPrestatairePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends AvisPrestataireDeleteManyArgs>(args?: Prisma.SelectSubset<T, AvisPrestataireDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends AvisPrestataireUpdateManyArgs>(args: Prisma.SelectSubset<T, AvisPrestataireUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends AvisPrestataireUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, AvisPrestataireUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$AvisPrestatairePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends AvisPrestataireUpsertArgs>(args: Prisma.SelectSubset<T, AvisPrestataireUpsertArgs<ExtArgs>>): Prisma.Prisma__AvisPrestataireClient<runtime.Types.Result.GetResult<Prisma.$AvisPrestatairePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends AvisPrestataireCountArgs>(args?: Prisma.Subset<T, AvisPrestataireCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], AvisPrestataireCountAggregateOutputType> : number>;
    aggregate<T extends AvisPrestataireAggregateArgs>(args: Prisma.Subset<T, AvisPrestataireAggregateArgs>): Prisma.PrismaPromise<GetAvisPrestataireAggregateType<T>>;
    groupBy<T extends AvisPrestataireGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: AvisPrestataireGroupByArgs['orderBy'];
    } : {
        orderBy?: AvisPrestataireGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, AvisPrestataireGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAvisPrestataireGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: AvisPrestataireFieldRefs;
}
export interface Prisma__AvisPrestataireClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    particulier<T extends Prisma.ParticulierDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ParticulierDefaultArgs<ExtArgs>>): Prisma.Prisma__ParticulierClient<runtime.Types.Result.GetResult<Prisma.$ParticulierPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    prestataire<T extends Prisma.PrestataireDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PrestataireDefaultArgs<ExtArgs>>): Prisma.Prisma__PrestataireClient<runtime.Types.Result.GetResult<Prisma.$PrestatairePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface AvisPrestataireFieldRefs {
    readonly id: Prisma.FieldRef<"AvisPrestataire", 'String'>;
    readonly particulierId: Prisma.FieldRef<"AvisPrestataire", 'String'>;
    readonly prestataireId: Prisma.FieldRef<"AvisPrestataire", 'String'>;
    readonly note: Prisma.FieldRef<"AvisPrestataire", 'Int'>;
    readonly commentaire: Prisma.FieldRef<"AvisPrestataire", 'String'>;
    readonly createdAt: Prisma.FieldRef<"AvisPrestataire", 'DateTime'>;
}
export type AvisPrestataireFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvisPrestataireSelect<ExtArgs> | null;
    omit?: Prisma.AvisPrestataireOmit<ExtArgs> | null;
    include?: Prisma.AvisPrestataireInclude<ExtArgs> | null;
    where: Prisma.AvisPrestataireWhereUniqueInput;
};
export type AvisPrestataireFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvisPrestataireSelect<ExtArgs> | null;
    omit?: Prisma.AvisPrestataireOmit<ExtArgs> | null;
    include?: Prisma.AvisPrestataireInclude<ExtArgs> | null;
    where: Prisma.AvisPrestataireWhereUniqueInput;
};
export type AvisPrestataireFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AvisPrestataireFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AvisPrestataireFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type AvisPrestataireCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvisPrestataireSelect<ExtArgs> | null;
    omit?: Prisma.AvisPrestataireOmit<ExtArgs> | null;
    include?: Prisma.AvisPrestataireInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AvisPrestataireCreateInput, Prisma.AvisPrestataireUncheckedCreateInput>;
};
export type AvisPrestataireCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.AvisPrestataireCreateManyInput | Prisma.AvisPrestataireCreateManyInput[];
    skipDuplicates?: boolean;
};
export type AvisPrestataireCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvisPrestataireSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AvisPrestataireOmit<ExtArgs> | null;
    data: Prisma.AvisPrestataireCreateManyInput | Prisma.AvisPrestataireCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.AvisPrestataireIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type AvisPrestataireUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvisPrestataireSelect<ExtArgs> | null;
    omit?: Prisma.AvisPrestataireOmit<ExtArgs> | null;
    include?: Prisma.AvisPrestataireInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AvisPrestataireUpdateInput, Prisma.AvisPrestataireUncheckedUpdateInput>;
    where: Prisma.AvisPrestataireWhereUniqueInput;
};
export type AvisPrestataireUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.AvisPrestataireUpdateManyMutationInput, Prisma.AvisPrestataireUncheckedUpdateManyInput>;
    where?: Prisma.AvisPrestataireWhereInput;
    limit?: number;
};
export type AvisPrestataireUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvisPrestataireSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.AvisPrestataireOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.AvisPrestataireUpdateManyMutationInput, Prisma.AvisPrestataireUncheckedUpdateManyInput>;
    where?: Prisma.AvisPrestataireWhereInput;
    limit?: number;
    include?: Prisma.AvisPrestataireIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type AvisPrestataireUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvisPrestataireSelect<ExtArgs> | null;
    omit?: Prisma.AvisPrestataireOmit<ExtArgs> | null;
    include?: Prisma.AvisPrestataireInclude<ExtArgs> | null;
    where: Prisma.AvisPrestataireWhereUniqueInput;
    create: Prisma.XOR<Prisma.AvisPrestataireCreateInput, Prisma.AvisPrestataireUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.AvisPrestataireUpdateInput, Prisma.AvisPrestataireUncheckedUpdateInput>;
};
export type AvisPrestataireDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvisPrestataireSelect<ExtArgs> | null;
    omit?: Prisma.AvisPrestataireOmit<ExtArgs> | null;
    include?: Prisma.AvisPrestataireInclude<ExtArgs> | null;
    where: Prisma.AvisPrestataireWhereUniqueInput;
};
export type AvisPrestataireDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.AvisPrestataireWhereInput;
    limit?: number;
};
export type AvisPrestataireDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.AvisPrestataireSelect<ExtArgs> | null;
    omit?: Prisma.AvisPrestataireOmit<ExtArgs> | null;
    include?: Prisma.AvisPrestataireInclude<ExtArgs> | null;
};
export {};
