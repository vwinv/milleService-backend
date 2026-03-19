import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type PrestatairePhotoModel = runtime.Types.Result.DefaultSelection<Prisma.$PrestatairePhotoPayload>;
export type AggregatePrestatairePhoto = {
    _count: PrestatairePhotoCountAggregateOutputType | null;
    _avg: PrestatairePhotoAvgAggregateOutputType | null;
    _sum: PrestatairePhotoSumAggregateOutputType | null;
    _min: PrestatairePhotoMinAggregateOutputType | null;
    _max: PrestatairePhotoMaxAggregateOutputType | null;
};
export type PrestatairePhotoAvgAggregateOutputType = {
    ordre: number | null;
};
export type PrestatairePhotoSumAggregateOutputType = {
    ordre: number | null;
};
export type PrestatairePhotoMinAggregateOutputType = {
    id: string | null;
    prestataireId: string | null;
    url: string | null;
    titre: string | null;
    description: string | null;
    ordre: number | null;
    createdAt: Date | null;
};
export type PrestatairePhotoMaxAggregateOutputType = {
    id: string | null;
    prestataireId: string | null;
    url: string | null;
    titre: string | null;
    description: string | null;
    ordre: number | null;
    createdAt: Date | null;
};
export type PrestatairePhotoCountAggregateOutputType = {
    id: number;
    prestataireId: number;
    url: number;
    titre: number;
    description: number;
    ordre: number;
    createdAt: number;
    _all: number;
};
export type PrestatairePhotoAvgAggregateInputType = {
    ordre?: true;
};
export type PrestatairePhotoSumAggregateInputType = {
    ordre?: true;
};
export type PrestatairePhotoMinAggregateInputType = {
    id?: true;
    prestataireId?: true;
    url?: true;
    titre?: true;
    description?: true;
    ordre?: true;
    createdAt?: true;
};
export type PrestatairePhotoMaxAggregateInputType = {
    id?: true;
    prestataireId?: true;
    url?: true;
    titre?: true;
    description?: true;
    ordre?: true;
    createdAt?: true;
};
export type PrestatairePhotoCountAggregateInputType = {
    id?: true;
    prestataireId?: true;
    url?: true;
    titre?: true;
    description?: true;
    ordre?: true;
    createdAt?: true;
    _all?: true;
};
export type PrestatairePhotoAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PrestatairePhotoWhereInput;
    orderBy?: Prisma.PrestatairePhotoOrderByWithRelationInput | Prisma.PrestatairePhotoOrderByWithRelationInput[];
    cursor?: Prisma.PrestatairePhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PrestatairePhotoCountAggregateInputType;
    _avg?: PrestatairePhotoAvgAggregateInputType;
    _sum?: PrestatairePhotoSumAggregateInputType;
    _min?: PrestatairePhotoMinAggregateInputType;
    _max?: PrestatairePhotoMaxAggregateInputType;
};
export type GetPrestatairePhotoAggregateType<T extends PrestatairePhotoAggregateArgs> = {
    [P in keyof T & keyof AggregatePrestatairePhoto]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePrestatairePhoto[P]> : Prisma.GetScalarType<T[P], AggregatePrestatairePhoto[P]>;
};
export type PrestatairePhotoGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PrestatairePhotoWhereInput;
    orderBy?: Prisma.PrestatairePhotoOrderByWithAggregationInput | Prisma.PrestatairePhotoOrderByWithAggregationInput[];
    by: Prisma.PrestatairePhotoScalarFieldEnum[] | Prisma.PrestatairePhotoScalarFieldEnum;
    having?: Prisma.PrestatairePhotoScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PrestatairePhotoCountAggregateInputType | true;
    _avg?: PrestatairePhotoAvgAggregateInputType;
    _sum?: PrestatairePhotoSumAggregateInputType;
    _min?: PrestatairePhotoMinAggregateInputType;
    _max?: PrestatairePhotoMaxAggregateInputType;
};
export type PrestatairePhotoGroupByOutputType = {
    id: string;
    prestataireId: string;
    url: string;
    titre: string | null;
    description: string | null;
    ordre: number;
    createdAt: Date;
    _count: PrestatairePhotoCountAggregateOutputType | null;
    _avg: PrestatairePhotoAvgAggregateOutputType | null;
    _sum: PrestatairePhotoSumAggregateOutputType | null;
    _min: PrestatairePhotoMinAggregateOutputType | null;
    _max: PrestatairePhotoMaxAggregateOutputType | null;
};
type GetPrestatairePhotoGroupByPayload<T extends PrestatairePhotoGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PrestatairePhotoGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PrestatairePhotoGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PrestatairePhotoGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PrestatairePhotoGroupByOutputType[P]>;
}>>;
export type PrestatairePhotoWhereInput = {
    AND?: Prisma.PrestatairePhotoWhereInput | Prisma.PrestatairePhotoWhereInput[];
    OR?: Prisma.PrestatairePhotoWhereInput[];
    NOT?: Prisma.PrestatairePhotoWhereInput | Prisma.PrestatairePhotoWhereInput[];
    id?: Prisma.StringFilter<"PrestatairePhoto"> | string;
    prestataireId?: Prisma.StringFilter<"PrestatairePhoto"> | string;
    url?: Prisma.StringFilter<"PrestatairePhoto"> | string;
    titre?: Prisma.StringNullableFilter<"PrestatairePhoto"> | string | null;
    description?: Prisma.StringNullableFilter<"PrestatairePhoto"> | string | null;
    ordre?: Prisma.IntFilter<"PrestatairePhoto"> | number;
    createdAt?: Prisma.DateTimeFilter<"PrestatairePhoto"> | Date | string;
    prestataire?: Prisma.XOR<Prisma.PrestataireScalarRelationFilter, Prisma.PrestataireWhereInput>;
};
export type PrestatairePhotoOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    titre?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    ordre?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    prestataire?: Prisma.PrestataireOrderByWithRelationInput;
};
export type PrestatairePhotoWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PrestatairePhotoWhereInput | Prisma.PrestatairePhotoWhereInput[];
    OR?: Prisma.PrestatairePhotoWhereInput[];
    NOT?: Prisma.PrestatairePhotoWhereInput | Prisma.PrestatairePhotoWhereInput[];
    prestataireId?: Prisma.StringFilter<"PrestatairePhoto"> | string;
    url?: Prisma.StringFilter<"PrestatairePhoto"> | string;
    titre?: Prisma.StringNullableFilter<"PrestatairePhoto"> | string | null;
    description?: Prisma.StringNullableFilter<"PrestatairePhoto"> | string | null;
    ordre?: Prisma.IntFilter<"PrestatairePhoto"> | number;
    createdAt?: Prisma.DateTimeFilter<"PrestatairePhoto"> | Date | string;
    prestataire?: Prisma.XOR<Prisma.PrestataireScalarRelationFilter, Prisma.PrestataireWhereInput>;
}, "id">;
export type PrestatairePhotoOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    titre?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    ordre?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.PrestatairePhotoCountOrderByAggregateInput;
    _avg?: Prisma.PrestatairePhotoAvgOrderByAggregateInput;
    _max?: Prisma.PrestatairePhotoMaxOrderByAggregateInput;
    _min?: Prisma.PrestatairePhotoMinOrderByAggregateInput;
    _sum?: Prisma.PrestatairePhotoSumOrderByAggregateInput;
};
export type PrestatairePhotoScalarWhereWithAggregatesInput = {
    AND?: Prisma.PrestatairePhotoScalarWhereWithAggregatesInput | Prisma.PrestatairePhotoScalarWhereWithAggregatesInput[];
    OR?: Prisma.PrestatairePhotoScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PrestatairePhotoScalarWhereWithAggregatesInput | Prisma.PrestatairePhotoScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PrestatairePhoto"> | string;
    prestataireId?: Prisma.StringWithAggregatesFilter<"PrestatairePhoto"> | string;
    url?: Prisma.StringWithAggregatesFilter<"PrestatairePhoto"> | string;
    titre?: Prisma.StringNullableWithAggregatesFilter<"PrestatairePhoto"> | string | null;
    description?: Prisma.StringNullableWithAggregatesFilter<"PrestatairePhoto"> | string | null;
    ordre?: Prisma.IntWithAggregatesFilter<"PrestatairePhoto"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PrestatairePhoto"> | Date | string;
};
export type PrestatairePhotoCreateInput = {
    id?: string;
    url: string;
    titre?: string | null;
    description?: string | null;
    ordre?: number;
    createdAt?: Date | string;
    prestataire: Prisma.PrestataireCreateNestedOneWithoutPhotosInput;
};
export type PrestatairePhotoUncheckedCreateInput = {
    id?: string;
    prestataireId: string;
    url: string;
    titre?: string | null;
    description?: string | null;
    ordre?: number;
    createdAt?: Date | string;
};
export type PrestatairePhotoUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    titre?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ordre?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    prestataire?: Prisma.PrestataireUpdateOneRequiredWithoutPhotosNestedInput;
};
export type PrestatairePhotoUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    prestataireId?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    titre?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ordre?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PrestatairePhotoCreateManyInput = {
    id?: string;
    prestataireId: string;
    url: string;
    titre?: string | null;
    description?: string | null;
    ordre?: number;
    createdAt?: Date | string;
};
export type PrestatairePhotoUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    titre?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ordre?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PrestatairePhotoUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    prestataireId?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    titre?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ordre?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PrestatairePhotoListRelationFilter = {
    every?: Prisma.PrestatairePhotoWhereInput;
    some?: Prisma.PrestatairePhotoWhereInput;
    none?: Prisma.PrestatairePhotoWhereInput;
};
export type PrestatairePhotoOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PrestatairePhotoCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    titre?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    ordre?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PrestatairePhotoAvgOrderByAggregateInput = {
    ordre?: Prisma.SortOrder;
};
export type PrestatairePhotoMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    titre?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    ordre?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PrestatairePhotoMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    url?: Prisma.SortOrder;
    titre?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    ordre?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type PrestatairePhotoSumOrderByAggregateInput = {
    ordre?: Prisma.SortOrder;
};
export type PrestatairePhotoCreateNestedManyWithoutPrestataireInput = {
    create?: Prisma.XOR<Prisma.PrestatairePhotoCreateWithoutPrestataireInput, Prisma.PrestatairePhotoUncheckedCreateWithoutPrestataireInput> | Prisma.PrestatairePhotoCreateWithoutPrestataireInput[] | Prisma.PrestatairePhotoUncheckedCreateWithoutPrestataireInput[];
    connectOrCreate?: Prisma.PrestatairePhotoCreateOrConnectWithoutPrestataireInput | Prisma.PrestatairePhotoCreateOrConnectWithoutPrestataireInput[];
    createMany?: Prisma.PrestatairePhotoCreateManyPrestataireInputEnvelope;
    connect?: Prisma.PrestatairePhotoWhereUniqueInput | Prisma.PrestatairePhotoWhereUniqueInput[];
};
export type PrestatairePhotoUncheckedCreateNestedManyWithoutPrestataireInput = {
    create?: Prisma.XOR<Prisma.PrestatairePhotoCreateWithoutPrestataireInput, Prisma.PrestatairePhotoUncheckedCreateWithoutPrestataireInput> | Prisma.PrestatairePhotoCreateWithoutPrestataireInput[] | Prisma.PrestatairePhotoUncheckedCreateWithoutPrestataireInput[];
    connectOrCreate?: Prisma.PrestatairePhotoCreateOrConnectWithoutPrestataireInput | Prisma.PrestatairePhotoCreateOrConnectWithoutPrestataireInput[];
    createMany?: Prisma.PrestatairePhotoCreateManyPrestataireInputEnvelope;
    connect?: Prisma.PrestatairePhotoWhereUniqueInput | Prisma.PrestatairePhotoWhereUniqueInput[];
};
export type PrestatairePhotoUpdateManyWithoutPrestataireNestedInput = {
    create?: Prisma.XOR<Prisma.PrestatairePhotoCreateWithoutPrestataireInput, Prisma.PrestatairePhotoUncheckedCreateWithoutPrestataireInput> | Prisma.PrestatairePhotoCreateWithoutPrestataireInput[] | Prisma.PrestatairePhotoUncheckedCreateWithoutPrestataireInput[];
    connectOrCreate?: Prisma.PrestatairePhotoCreateOrConnectWithoutPrestataireInput | Prisma.PrestatairePhotoCreateOrConnectWithoutPrestataireInput[];
    upsert?: Prisma.PrestatairePhotoUpsertWithWhereUniqueWithoutPrestataireInput | Prisma.PrestatairePhotoUpsertWithWhereUniqueWithoutPrestataireInput[];
    createMany?: Prisma.PrestatairePhotoCreateManyPrestataireInputEnvelope;
    set?: Prisma.PrestatairePhotoWhereUniqueInput | Prisma.PrestatairePhotoWhereUniqueInput[];
    disconnect?: Prisma.PrestatairePhotoWhereUniqueInput | Prisma.PrestatairePhotoWhereUniqueInput[];
    delete?: Prisma.PrestatairePhotoWhereUniqueInput | Prisma.PrestatairePhotoWhereUniqueInput[];
    connect?: Prisma.PrestatairePhotoWhereUniqueInput | Prisma.PrestatairePhotoWhereUniqueInput[];
    update?: Prisma.PrestatairePhotoUpdateWithWhereUniqueWithoutPrestataireInput | Prisma.PrestatairePhotoUpdateWithWhereUniqueWithoutPrestataireInput[];
    updateMany?: Prisma.PrestatairePhotoUpdateManyWithWhereWithoutPrestataireInput | Prisma.PrestatairePhotoUpdateManyWithWhereWithoutPrestataireInput[];
    deleteMany?: Prisma.PrestatairePhotoScalarWhereInput | Prisma.PrestatairePhotoScalarWhereInput[];
};
export type PrestatairePhotoUncheckedUpdateManyWithoutPrestataireNestedInput = {
    create?: Prisma.XOR<Prisma.PrestatairePhotoCreateWithoutPrestataireInput, Prisma.PrestatairePhotoUncheckedCreateWithoutPrestataireInput> | Prisma.PrestatairePhotoCreateWithoutPrestataireInput[] | Prisma.PrestatairePhotoUncheckedCreateWithoutPrestataireInput[];
    connectOrCreate?: Prisma.PrestatairePhotoCreateOrConnectWithoutPrestataireInput | Prisma.PrestatairePhotoCreateOrConnectWithoutPrestataireInput[];
    upsert?: Prisma.PrestatairePhotoUpsertWithWhereUniqueWithoutPrestataireInput | Prisma.PrestatairePhotoUpsertWithWhereUniqueWithoutPrestataireInput[];
    createMany?: Prisma.PrestatairePhotoCreateManyPrestataireInputEnvelope;
    set?: Prisma.PrestatairePhotoWhereUniqueInput | Prisma.PrestatairePhotoWhereUniqueInput[];
    disconnect?: Prisma.PrestatairePhotoWhereUniqueInput | Prisma.PrestatairePhotoWhereUniqueInput[];
    delete?: Prisma.PrestatairePhotoWhereUniqueInput | Prisma.PrestatairePhotoWhereUniqueInput[];
    connect?: Prisma.PrestatairePhotoWhereUniqueInput | Prisma.PrestatairePhotoWhereUniqueInput[];
    update?: Prisma.PrestatairePhotoUpdateWithWhereUniqueWithoutPrestataireInput | Prisma.PrestatairePhotoUpdateWithWhereUniqueWithoutPrestataireInput[];
    updateMany?: Prisma.PrestatairePhotoUpdateManyWithWhereWithoutPrestataireInput | Prisma.PrestatairePhotoUpdateManyWithWhereWithoutPrestataireInput[];
    deleteMany?: Prisma.PrestatairePhotoScalarWhereInput | Prisma.PrestatairePhotoScalarWhereInput[];
};
export type PrestatairePhotoCreateWithoutPrestataireInput = {
    id?: string;
    url: string;
    titre?: string | null;
    description?: string | null;
    ordre?: number;
    createdAt?: Date | string;
};
export type PrestatairePhotoUncheckedCreateWithoutPrestataireInput = {
    id?: string;
    url: string;
    titre?: string | null;
    description?: string | null;
    ordre?: number;
    createdAt?: Date | string;
};
export type PrestatairePhotoCreateOrConnectWithoutPrestataireInput = {
    where: Prisma.PrestatairePhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.PrestatairePhotoCreateWithoutPrestataireInput, Prisma.PrestatairePhotoUncheckedCreateWithoutPrestataireInput>;
};
export type PrestatairePhotoCreateManyPrestataireInputEnvelope = {
    data: Prisma.PrestatairePhotoCreateManyPrestataireInput | Prisma.PrestatairePhotoCreateManyPrestataireInput[];
    skipDuplicates?: boolean;
};
export type PrestatairePhotoUpsertWithWhereUniqueWithoutPrestataireInput = {
    where: Prisma.PrestatairePhotoWhereUniqueInput;
    update: Prisma.XOR<Prisma.PrestatairePhotoUpdateWithoutPrestataireInput, Prisma.PrestatairePhotoUncheckedUpdateWithoutPrestataireInput>;
    create: Prisma.XOR<Prisma.PrestatairePhotoCreateWithoutPrestataireInput, Prisma.PrestatairePhotoUncheckedCreateWithoutPrestataireInput>;
};
export type PrestatairePhotoUpdateWithWhereUniqueWithoutPrestataireInput = {
    where: Prisma.PrestatairePhotoWhereUniqueInput;
    data: Prisma.XOR<Prisma.PrestatairePhotoUpdateWithoutPrestataireInput, Prisma.PrestatairePhotoUncheckedUpdateWithoutPrestataireInput>;
};
export type PrestatairePhotoUpdateManyWithWhereWithoutPrestataireInput = {
    where: Prisma.PrestatairePhotoScalarWhereInput;
    data: Prisma.XOR<Prisma.PrestatairePhotoUpdateManyMutationInput, Prisma.PrestatairePhotoUncheckedUpdateManyWithoutPrestataireInput>;
};
export type PrestatairePhotoScalarWhereInput = {
    AND?: Prisma.PrestatairePhotoScalarWhereInput | Prisma.PrestatairePhotoScalarWhereInput[];
    OR?: Prisma.PrestatairePhotoScalarWhereInput[];
    NOT?: Prisma.PrestatairePhotoScalarWhereInput | Prisma.PrestatairePhotoScalarWhereInput[];
    id?: Prisma.StringFilter<"PrestatairePhoto"> | string;
    prestataireId?: Prisma.StringFilter<"PrestatairePhoto"> | string;
    url?: Prisma.StringFilter<"PrestatairePhoto"> | string;
    titre?: Prisma.StringNullableFilter<"PrestatairePhoto"> | string | null;
    description?: Prisma.StringNullableFilter<"PrestatairePhoto"> | string | null;
    ordre?: Prisma.IntFilter<"PrestatairePhoto"> | number;
    createdAt?: Prisma.DateTimeFilter<"PrestatairePhoto"> | Date | string;
};
export type PrestatairePhotoCreateManyPrestataireInput = {
    id?: string;
    url: string;
    titre?: string | null;
    description?: string | null;
    ordre?: number;
    createdAt?: Date | string;
};
export type PrestatairePhotoUpdateWithoutPrestataireInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    titre?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ordre?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PrestatairePhotoUncheckedUpdateWithoutPrestataireInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    titre?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ordre?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PrestatairePhotoUncheckedUpdateManyWithoutPrestataireInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    url?: Prisma.StringFieldUpdateOperationsInput | string;
    titre?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ordre?: Prisma.IntFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PrestatairePhotoSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    prestataireId?: boolean;
    url?: boolean;
    titre?: boolean;
    description?: boolean;
    ordre?: boolean;
    createdAt?: boolean;
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["prestatairePhoto"]>;
export type PrestatairePhotoSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    prestataireId?: boolean;
    url?: boolean;
    titre?: boolean;
    description?: boolean;
    ordre?: boolean;
    createdAt?: boolean;
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["prestatairePhoto"]>;
export type PrestatairePhotoSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    prestataireId?: boolean;
    url?: boolean;
    titre?: boolean;
    description?: boolean;
    ordre?: boolean;
    createdAt?: boolean;
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["prestatairePhoto"]>;
export type PrestatairePhotoSelectScalar = {
    id?: boolean;
    prestataireId?: boolean;
    url?: boolean;
    titre?: boolean;
    description?: boolean;
    ordre?: boolean;
    createdAt?: boolean;
};
export type PrestatairePhotoOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "prestataireId" | "url" | "titre" | "description" | "ordre" | "createdAt", ExtArgs["result"]["prestatairePhoto"]>;
export type PrestatairePhotoInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
};
export type PrestatairePhotoIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
};
export type PrestatairePhotoIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
};
export type $PrestatairePhotoPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PrestatairePhoto";
    objects: {
        prestataire: Prisma.$PrestatairePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        prestataireId: string;
        url: string;
        titre: string | null;
        description: string | null;
        ordre: number;
        createdAt: Date;
    }, ExtArgs["result"]["prestatairePhoto"]>;
    composites: {};
};
export type PrestatairePhotoGetPayload<S extends boolean | null | undefined | PrestatairePhotoDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PrestatairePhotoPayload, S>;
export type PrestatairePhotoCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PrestatairePhotoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PrestatairePhotoCountAggregateInputType | true;
};
export interface PrestatairePhotoDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PrestatairePhoto'];
        meta: {
            name: 'PrestatairePhoto';
        };
    };
    findUnique<T extends PrestatairePhotoFindUniqueArgs>(args: Prisma.SelectSubset<T, PrestatairePhotoFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PrestatairePhotoClient<runtime.Types.Result.GetResult<Prisma.$PrestatairePhotoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PrestatairePhotoFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PrestatairePhotoFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PrestatairePhotoClient<runtime.Types.Result.GetResult<Prisma.$PrestatairePhotoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PrestatairePhotoFindFirstArgs>(args?: Prisma.SelectSubset<T, PrestatairePhotoFindFirstArgs<ExtArgs>>): Prisma.Prisma__PrestatairePhotoClient<runtime.Types.Result.GetResult<Prisma.$PrestatairePhotoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PrestatairePhotoFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PrestatairePhotoFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PrestatairePhotoClient<runtime.Types.Result.GetResult<Prisma.$PrestatairePhotoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PrestatairePhotoFindManyArgs>(args?: Prisma.SelectSubset<T, PrestatairePhotoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PrestatairePhotoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PrestatairePhotoCreateArgs>(args: Prisma.SelectSubset<T, PrestatairePhotoCreateArgs<ExtArgs>>): Prisma.Prisma__PrestatairePhotoClient<runtime.Types.Result.GetResult<Prisma.$PrestatairePhotoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PrestatairePhotoCreateManyArgs>(args?: Prisma.SelectSubset<T, PrestatairePhotoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PrestatairePhotoCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PrestatairePhotoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PrestatairePhotoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PrestatairePhotoDeleteArgs>(args: Prisma.SelectSubset<T, PrestatairePhotoDeleteArgs<ExtArgs>>): Prisma.Prisma__PrestatairePhotoClient<runtime.Types.Result.GetResult<Prisma.$PrestatairePhotoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PrestatairePhotoUpdateArgs>(args: Prisma.SelectSubset<T, PrestatairePhotoUpdateArgs<ExtArgs>>): Prisma.Prisma__PrestatairePhotoClient<runtime.Types.Result.GetResult<Prisma.$PrestatairePhotoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PrestatairePhotoDeleteManyArgs>(args?: Prisma.SelectSubset<T, PrestatairePhotoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PrestatairePhotoUpdateManyArgs>(args: Prisma.SelectSubset<T, PrestatairePhotoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PrestatairePhotoUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PrestatairePhotoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PrestatairePhotoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PrestatairePhotoUpsertArgs>(args: Prisma.SelectSubset<T, PrestatairePhotoUpsertArgs<ExtArgs>>): Prisma.Prisma__PrestatairePhotoClient<runtime.Types.Result.GetResult<Prisma.$PrestatairePhotoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PrestatairePhotoCountArgs>(args?: Prisma.Subset<T, PrestatairePhotoCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PrestatairePhotoCountAggregateOutputType> : number>;
    aggregate<T extends PrestatairePhotoAggregateArgs>(args: Prisma.Subset<T, PrestatairePhotoAggregateArgs>): Prisma.PrismaPromise<GetPrestatairePhotoAggregateType<T>>;
    groupBy<T extends PrestatairePhotoGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PrestatairePhotoGroupByArgs['orderBy'];
    } : {
        orderBy?: PrestatairePhotoGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PrestatairePhotoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrestatairePhotoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PrestatairePhotoFieldRefs;
}
export interface Prisma__PrestatairePhotoClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    prestataire<T extends Prisma.PrestataireDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PrestataireDefaultArgs<ExtArgs>>): Prisma.Prisma__PrestataireClient<runtime.Types.Result.GetResult<Prisma.$PrestatairePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PrestatairePhotoFieldRefs {
    readonly id: Prisma.FieldRef<"PrestatairePhoto", 'String'>;
    readonly prestataireId: Prisma.FieldRef<"PrestatairePhoto", 'String'>;
    readonly url: Prisma.FieldRef<"PrestatairePhoto", 'String'>;
    readonly titre: Prisma.FieldRef<"PrestatairePhoto", 'String'>;
    readonly description: Prisma.FieldRef<"PrestatairePhoto", 'String'>;
    readonly ordre: Prisma.FieldRef<"PrestatairePhoto", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"PrestatairePhoto", 'DateTime'>;
}
export type PrestatairePhotoFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestatairePhotoSelect<ExtArgs> | null;
    omit?: Prisma.PrestatairePhotoOmit<ExtArgs> | null;
    include?: Prisma.PrestatairePhotoInclude<ExtArgs> | null;
    where: Prisma.PrestatairePhotoWhereUniqueInput;
};
export type PrestatairePhotoFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestatairePhotoSelect<ExtArgs> | null;
    omit?: Prisma.PrestatairePhotoOmit<ExtArgs> | null;
    include?: Prisma.PrestatairePhotoInclude<ExtArgs> | null;
    where: Prisma.PrestatairePhotoWhereUniqueInput;
};
export type PrestatairePhotoFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestatairePhotoSelect<ExtArgs> | null;
    omit?: Prisma.PrestatairePhotoOmit<ExtArgs> | null;
    include?: Prisma.PrestatairePhotoInclude<ExtArgs> | null;
    where?: Prisma.PrestatairePhotoWhereInput;
    orderBy?: Prisma.PrestatairePhotoOrderByWithRelationInput | Prisma.PrestatairePhotoOrderByWithRelationInput[];
    cursor?: Prisma.PrestatairePhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PrestatairePhotoScalarFieldEnum | Prisma.PrestatairePhotoScalarFieldEnum[];
};
export type PrestatairePhotoFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestatairePhotoSelect<ExtArgs> | null;
    omit?: Prisma.PrestatairePhotoOmit<ExtArgs> | null;
    include?: Prisma.PrestatairePhotoInclude<ExtArgs> | null;
    where?: Prisma.PrestatairePhotoWhereInput;
    orderBy?: Prisma.PrestatairePhotoOrderByWithRelationInput | Prisma.PrestatairePhotoOrderByWithRelationInput[];
    cursor?: Prisma.PrestatairePhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PrestatairePhotoScalarFieldEnum | Prisma.PrestatairePhotoScalarFieldEnum[];
};
export type PrestatairePhotoFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestatairePhotoSelect<ExtArgs> | null;
    omit?: Prisma.PrestatairePhotoOmit<ExtArgs> | null;
    include?: Prisma.PrestatairePhotoInclude<ExtArgs> | null;
    where?: Prisma.PrestatairePhotoWhereInput;
    orderBy?: Prisma.PrestatairePhotoOrderByWithRelationInput | Prisma.PrestatairePhotoOrderByWithRelationInput[];
    cursor?: Prisma.PrestatairePhotoWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PrestatairePhotoScalarFieldEnum | Prisma.PrestatairePhotoScalarFieldEnum[];
};
export type PrestatairePhotoCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestatairePhotoSelect<ExtArgs> | null;
    omit?: Prisma.PrestatairePhotoOmit<ExtArgs> | null;
    include?: Prisma.PrestatairePhotoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PrestatairePhotoCreateInput, Prisma.PrestatairePhotoUncheckedCreateInput>;
};
export type PrestatairePhotoCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PrestatairePhotoCreateManyInput | Prisma.PrestatairePhotoCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PrestatairePhotoCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestatairePhotoSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PrestatairePhotoOmit<ExtArgs> | null;
    data: Prisma.PrestatairePhotoCreateManyInput | Prisma.PrestatairePhotoCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PrestatairePhotoIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PrestatairePhotoUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestatairePhotoSelect<ExtArgs> | null;
    omit?: Prisma.PrestatairePhotoOmit<ExtArgs> | null;
    include?: Prisma.PrestatairePhotoInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PrestatairePhotoUpdateInput, Prisma.PrestatairePhotoUncheckedUpdateInput>;
    where: Prisma.PrestatairePhotoWhereUniqueInput;
};
export type PrestatairePhotoUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PrestatairePhotoUpdateManyMutationInput, Prisma.PrestatairePhotoUncheckedUpdateManyInput>;
    where?: Prisma.PrestatairePhotoWhereInput;
    limit?: number;
};
export type PrestatairePhotoUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestatairePhotoSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PrestatairePhotoOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PrestatairePhotoUpdateManyMutationInput, Prisma.PrestatairePhotoUncheckedUpdateManyInput>;
    where?: Prisma.PrestatairePhotoWhereInput;
    limit?: number;
    include?: Prisma.PrestatairePhotoIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PrestatairePhotoUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestatairePhotoSelect<ExtArgs> | null;
    omit?: Prisma.PrestatairePhotoOmit<ExtArgs> | null;
    include?: Prisma.PrestatairePhotoInclude<ExtArgs> | null;
    where: Prisma.PrestatairePhotoWhereUniqueInput;
    create: Prisma.XOR<Prisma.PrestatairePhotoCreateInput, Prisma.PrestatairePhotoUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PrestatairePhotoUpdateInput, Prisma.PrestatairePhotoUncheckedUpdateInput>;
};
export type PrestatairePhotoDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestatairePhotoSelect<ExtArgs> | null;
    omit?: Prisma.PrestatairePhotoOmit<ExtArgs> | null;
    include?: Prisma.PrestatairePhotoInclude<ExtArgs> | null;
    where: Prisma.PrestatairePhotoWhereUniqueInput;
};
export type PrestatairePhotoDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PrestatairePhotoWhereInput;
    limit?: number;
};
export type PrestatairePhotoDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestatairePhotoSelect<ExtArgs> | null;
    omit?: Prisma.PrestatairePhotoOmit<ExtArgs> | null;
    include?: Prisma.PrestatairePhotoInclude<ExtArgs> | null;
};
export {};
