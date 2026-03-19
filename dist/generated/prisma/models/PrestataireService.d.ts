import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type PrestataireServiceModel = runtime.Types.Result.DefaultSelection<Prisma.$PrestataireServicePayload>;
export type AggregatePrestataireService = {
    _count: PrestataireServiceCountAggregateOutputType | null;
    _avg: PrestataireServiceAvgAggregateOutputType | null;
    _sum: PrestataireServiceSumAggregateOutputType | null;
    _min: PrestataireServiceMinAggregateOutputType | null;
    _max: PrestataireServiceMaxAggregateOutputType | null;
};
export type PrestataireServiceAvgAggregateOutputType = {
    tarifHoraire: runtime.Decimal | null;
    dureeDefautMin: number | null;
};
export type PrestataireServiceSumAggregateOutputType = {
    tarifHoraire: runtime.Decimal | null;
    dureeDefautMin: number | null;
};
export type PrestataireServiceMinAggregateOutputType = {
    id: string | null;
    prestataireId: string | null;
    serviceId: string | null;
    tarifHoraire: runtime.Decimal | null;
    dureeDefautMin: number | null;
    description: string | null;
    actif: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PrestataireServiceMaxAggregateOutputType = {
    id: string | null;
    prestataireId: string | null;
    serviceId: string | null;
    tarifHoraire: runtime.Decimal | null;
    dureeDefautMin: number | null;
    description: string | null;
    actif: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PrestataireServiceCountAggregateOutputType = {
    id: number;
    prestataireId: number;
    serviceId: number;
    tarifHoraire: number;
    dureeDefautMin: number;
    description: number;
    actif: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PrestataireServiceAvgAggregateInputType = {
    tarifHoraire?: true;
    dureeDefautMin?: true;
};
export type PrestataireServiceSumAggregateInputType = {
    tarifHoraire?: true;
    dureeDefautMin?: true;
};
export type PrestataireServiceMinAggregateInputType = {
    id?: true;
    prestataireId?: true;
    serviceId?: true;
    tarifHoraire?: true;
    dureeDefautMin?: true;
    description?: true;
    actif?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PrestataireServiceMaxAggregateInputType = {
    id?: true;
    prestataireId?: true;
    serviceId?: true;
    tarifHoraire?: true;
    dureeDefautMin?: true;
    description?: true;
    actif?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PrestataireServiceCountAggregateInputType = {
    id?: true;
    prestataireId?: true;
    serviceId?: true;
    tarifHoraire?: true;
    dureeDefautMin?: true;
    description?: true;
    actif?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PrestataireServiceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PrestataireServiceWhereInput;
    orderBy?: Prisma.PrestataireServiceOrderByWithRelationInput | Prisma.PrestataireServiceOrderByWithRelationInput[];
    cursor?: Prisma.PrestataireServiceWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PrestataireServiceCountAggregateInputType;
    _avg?: PrestataireServiceAvgAggregateInputType;
    _sum?: PrestataireServiceSumAggregateInputType;
    _min?: PrestataireServiceMinAggregateInputType;
    _max?: PrestataireServiceMaxAggregateInputType;
};
export type GetPrestataireServiceAggregateType<T extends PrestataireServiceAggregateArgs> = {
    [P in keyof T & keyof AggregatePrestataireService]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePrestataireService[P]> : Prisma.GetScalarType<T[P], AggregatePrestataireService[P]>;
};
export type PrestataireServiceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PrestataireServiceWhereInput;
    orderBy?: Prisma.PrestataireServiceOrderByWithAggregationInput | Prisma.PrestataireServiceOrderByWithAggregationInput[];
    by: Prisma.PrestataireServiceScalarFieldEnum[] | Prisma.PrestataireServiceScalarFieldEnum;
    having?: Prisma.PrestataireServiceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PrestataireServiceCountAggregateInputType | true;
    _avg?: PrestataireServiceAvgAggregateInputType;
    _sum?: PrestataireServiceSumAggregateInputType;
    _min?: PrestataireServiceMinAggregateInputType;
    _max?: PrestataireServiceMaxAggregateInputType;
};
export type PrestataireServiceGroupByOutputType = {
    id: string;
    prestataireId: string;
    serviceId: string;
    tarifHoraire: runtime.Decimal | null;
    dureeDefautMin: number | null;
    description: string | null;
    actif: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: PrestataireServiceCountAggregateOutputType | null;
    _avg: PrestataireServiceAvgAggregateOutputType | null;
    _sum: PrestataireServiceSumAggregateOutputType | null;
    _min: PrestataireServiceMinAggregateOutputType | null;
    _max: PrestataireServiceMaxAggregateOutputType | null;
};
type GetPrestataireServiceGroupByPayload<T extends PrestataireServiceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PrestataireServiceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PrestataireServiceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PrestataireServiceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PrestataireServiceGroupByOutputType[P]>;
}>>;
export type PrestataireServiceWhereInput = {
    AND?: Prisma.PrestataireServiceWhereInput | Prisma.PrestataireServiceWhereInput[];
    OR?: Prisma.PrestataireServiceWhereInput[];
    NOT?: Prisma.PrestataireServiceWhereInput | Prisma.PrestataireServiceWhereInput[];
    id?: Prisma.StringFilter<"PrestataireService"> | string;
    prestataireId?: Prisma.StringFilter<"PrestataireService"> | string;
    serviceId?: Prisma.StringFilter<"PrestataireService"> | string;
    tarifHoraire?: Prisma.DecimalNullableFilter<"PrestataireService"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    dureeDefautMin?: Prisma.IntNullableFilter<"PrestataireService"> | number | null;
    description?: Prisma.StringNullableFilter<"PrestataireService"> | string | null;
    actif?: Prisma.BoolFilter<"PrestataireService"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"PrestataireService"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PrestataireService"> | Date | string;
    prestataire?: Prisma.XOR<Prisma.PrestataireScalarRelationFilter, Prisma.PrestataireWhereInput>;
    service?: Prisma.XOR<Prisma.ServiceScalarRelationFilter, Prisma.ServiceWhereInput>;
    prestations?: Prisma.PrestationListRelationFilter;
};
export type PrestataireServiceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    serviceId?: Prisma.SortOrder;
    tarifHoraire?: Prisma.SortOrderInput | Prisma.SortOrder;
    dureeDefautMin?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    actif?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    prestataire?: Prisma.PrestataireOrderByWithRelationInput;
    service?: Prisma.ServiceOrderByWithRelationInput;
    prestations?: Prisma.PrestationOrderByRelationAggregateInput;
};
export type PrestataireServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    prestataireId_serviceId?: Prisma.PrestataireServicePrestataireIdServiceIdCompoundUniqueInput;
    AND?: Prisma.PrestataireServiceWhereInput | Prisma.PrestataireServiceWhereInput[];
    OR?: Prisma.PrestataireServiceWhereInput[];
    NOT?: Prisma.PrestataireServiceWhereInput | Prisma.PrestataireServiceWhereInput[];
    prestataireId?: Prisma.StringFilter<"PrestataireService"> | string;
    serviceId?: Prisma.StringFilter<"PrestataireService"> | string;
    tarifHoraire?: Prisma.DecimalNullableFilter<"PrestataireService"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    dureeDefautMin?: Prisma.IntNullableFilter<"PrestataireService"> | number | null;
    description?: Prisma.StringNullableFilter<"PrestataireService"> | string | null;
    actif?: Prisma.BoolFilter<"PrestataireService"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"PrestataireService"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PrestataireService"> | Date | string;
    prestataire?: Prisma.XOR<Prisma.PrestataireScalarRelationFilter, Prisma.PrestataireWhereInput>;
    service?: Prisma.XOR<Prisma.ServiceScalarRelationFilter, Prisma.ServiceWhereInput>;
    prestations?: Prisma.PrestationListRelationFilter;
}, "id" | "prestataireId_serviceId">;
export type PrestataireServiceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    serviceId?: Prisma.SortOrder;
    tarifHoraire?: Prisma.SortOrderInput | Prisma.SortOrder;
    dureeDefautMin?: Prisma.SortOrderInput | Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    actif?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PrestataireServiceCountOrderByAggregateInput;
    _avg?: Prisma.PrestataireServiceAvgOrderByAggregateInput;
    _max?: Prisma.PrestataireServiceMaxOrderByAggregateInput;
    _min?: Prisma.PrestataireServiceMinOrderByAggregateInput;
    _sum?: Prisma.PrestataireServiceSumOrderByAggregateInput;
};
export type PrestataireServiceScalarWhereWithAggregatesInput = {
    AND?: Prisma.PrestataireServiceScalarWhereWithAggregatesInput | Prisma.PrestataireServiceScalarWhereWithAggregatesInput[];
    OR?: Prisma.PrestataireServiceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PrestataireServiceScalarWhereWithAggregatesInput | Prisma.PrestataireServiceScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PrestataireService"> | string;
    prestataireId?: Prisma.StringWithAggregatesFilter<"PrestataireService"> | string;
    serviceId?: Prisma.StringWithAggregatesFilter<"PrestataireService"> | string;
    tarifHoraire?: Prisma.DecimalNullableWithAggregatesFilter<"PrestataireService"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    dureeDefautMin?: Prisma.IntNullableWithAggregatesFilter<"PrestataireService"> | number | null;
    description?: Prisma.StringNullableWithAggregatesFilter<"PrestataireService"> | string | null;
    actif?: Prisma.BoolWithAggregatesFilter<"PrestataireService"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PrestataireService"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"PrestataireService"> | Date | string;
};
export type PrestataireServiceCreateInput = {
    id?: string;
    tarifHoraire?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    dureeDefautMin?: number | null;
    description?: string | null;
    actif?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    prestataire: Prisma.PrestataireCreateNestedOneWithoutServicesProposesInput;
    service: Prisma.ServiceCreateNestedOneWithoutPrestatairesInput;
    prestations?: Prisma.PrestationCreateNestedManyWithoutPrestataireServiceInput;
};
export type PrestataireServiceUncheckedCreateInput = {
    id?: string;
    prestataireId: string;
    serviceId: string;
    tarifHoraire?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    dureeDefautMin?: number | null;
    description?: string | null;
    actif?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    prestations?: Prisma.PrestationUncheckedCreateNestedManyWithoutPrestataireServiceInput;
};
export type PrestataireServiceUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tarifHoraire?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    dureeDefautMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    actif?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    prestataire?: Prisma.PrestataireUpdateOneRequiredWithoutServicesProposesNestedInput;
    service?: Prisma.ServiceUpdateOneRequiredWithoutPrestatairesNestedInput;
    prestations?: Prisma.PrestationUpdateManyWithoutPrestataireServiceNestedInput;
};
export type PrestataireServiceUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    prestataireId?: Prisma.StringFieldUpdateOperationsInput | string;
    serviceId?: Prisma.StringFieldUpdateOperationsInput | string;
    tarifHoraire?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    dureeDefautMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    actif?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    prestations?: Prisma.PrestationUncheckedUpdateManyWithoutPrestataireServiceNestedInput;
};
export type PrestataireServiceCreateManyInput = {
    id?: string;
    prestataireId: string;
    serviceId: string;
    tarifHoraire?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    dureeDefautMin?: number | null;
    description?: string | null;
    actif?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PrestataireServiceUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tarifHoraire?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    dureeDefautMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    actif?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PrestataireServiceUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    prestataireId?: Prisma.StringFieldUpdateOperationsInput | string;
    serviceId?: Prisma.StringFieldUpdateOperationsInput | string;
    tarifHoraire?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    dureeDefautMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    actif?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PrestataireServiceListRelationFilter = {
    every?: Prisma.PrestataireServiceWhereInput;
    some?: Prisma.PrestataireServiceWhereInput;
    none?: Prisma.PrestataireServiceWhereInput;
};
export type PrestataireServiceOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PrestataireServicePrestataireIdServiceIdCompoundUniqueInput = {
    prestataireId: string;
    serviceId: string;
};
export type PrestataireServiceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    serviceId?: Prisma.SortOrder;
    tarifHoraire?: Prisma.SortOrder;
    dureeDefautMin?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    actif?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PrestataireServiceAvgOrderByAggregateInput = {
    tarifHoraire?: Prisma.SortOrder;
    dureeDefautMin?: Prisma.SortOrder;
};
export type PrestataireServiceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    serviceId?: Prisma.SortOrder;
    tarifHoraire?: Prisma.SortOrder;
    dureeDefautMin?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    actif?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PrestataireServiceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    serviceId?: Prisma.SortOrder;
    tarifHoraire?: Prisma.SortOrder;
    dureeDefautMin?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    actif?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PrestataireServiceSumOrderByAggregateInput = {
    tarifHoraire?: Prisma.SortOrder;
    dureeDefautMin?: Prisma.SortOrder;
};
export type PrestataireServiceScalarRelationFilter = {
    is?: Prisma.PrestataireServiceWhereInput;
    isNot?: Prisma.PrestataireServiceWhereInput;
};
export type PrestataireServiceCreateNestedManyWithoutPrestataireInput = {
    create?: Prisma.XOR<Prisma.PrestataireServiceCreateWithoutPrestataireInput, Prisma.PrestataireServiceUncheckedCreateWithoutPrestataireInput> | Prisma.PrestataireServiceCreateWithoutPrestataireInput[] | Prisma.PrestataireServiceUncheckedCreateWithoutPrestataireInput[];
    connectOrCreate?: Prisma.PrestataireServiceCreateOrConnectWithoutPrestataireInput | Prisma.PrestataireServiceCreateOrConnectWithoutPrestataireInput[];
    createMany?: Prisma.PrestataireServiceCreateManyPrestataireInputEnvelope;
    connect?: Prisma.PrestataireServiceWhereUniqueInput | Prisma.PrestataireServiceWhereUniqueInput[];
};
export type PrestataireServiceUncheckedCreateNestedManyWithoutPrestataireInput = {
    create?: Prisma.XOR<Prisma.PrestataireServiceCreateWithoutPrestataireInput, Prisma.PrestataireServiceUncheckedCreateWithoutPrestataireInput> | Prisma.PrestataireServiceCreateWithoutPrestataireInput[] | Prisma.PrestataireServiceUncheckedCreateWithoutPrestataireInput[];
    connectOrCreate?: Prisma.PrestataireServiceCreateOrConnectWithoutPrestataireInput | Prisma.PrestataireServiceCreateOrConnectWithoutPrestataireInput[];
    createMany?: Prisma.PrestataireServiceCreateManyPrestataireInputEnvelope;
    connect?: Prisma.PrestataireServiceWhereUniqueInput | Prisma.PrestataireServiceWhereUniqueInput[];
};
export type PrestataireServiceUpdateManyWithoutPrestataireNestedInput = {
    create?: Prisma.XOR<Prisma.PrestataireServiceCreateWithoutPrestataireInput, Prisma.PrestataireServiceUncheckedCreateWithoutPrestataireInput> | Prisma.PrestataireServiceCreateWithoutPrestataireInput[] | Prisma.PrestataireServiceUncheckedCreateWithoutPrestataireInput[];
    connectOrCreate?: Prisma.PrestataireServiceCreateOrConnectWithoutPrestataireInput | Prisma.PrestataireServiceCreateOrConnectWithoutPrestataireInput[];
    upsert?: Prisma.PrestataireServiceUpsertWithWhereUniqueWithoutPrestataireInput | Prisma.PrestataireServiceUpsertWithWhereUniqueWithoutPrestataireInput[];
    createMany?: Prisma.PrestataireServiceCreateManyPrestataireInputEnvelope;
    set?: Prisma.PrestataireServiceWhereUniqueInput | Prisma.PrestataireServiceWhereUniqueInput[];
    disconnect?: Prisma.PrestataireServiceWhereUniqueInput | Prisma.PrestataireServiceWhereUniqueInput[];
    delete?: Prisma.PrestataireServiceWhereUniqueInput | Prisma.PrestataireServiceWhereUniqueInput[];
    connect?: Prisma.PrestataireServiceWhereUniqueInput | Prisma.PrestataireServiceWhereUniqueInput[];
    update?: Prisma.PrestataireServiceUpdateWithWhereUniqueWithoutPrestataireInput | Prisma.PrestataireServiceUpdateWithWhereUniqueWithoutPrestataireInput[];
    updateMany?: Prisma.PrestataireServiceUpdateManyWithWhereWithoutPrestataireInput | Prisma.PrestataireServiceUpdateManyWithWhereWithoutPrestataireInput[];
    deleteMany?: Prisma.PrestataireServiceScalarWhereInput | Prisma.PrestataireServiceScalarWhereInput[];
};
export type PrestataireServiceUncheckedUpdateManyWithoutPrestataireNestedInput = {
    create?: Prisma.XOR<Prisma.PrestataireServiceCreateWithoutPrestataireInput, Prisma.PrestataireServiceUncheckedCreateWithoutPrestataireInput> | Prisma.PrestataireServiceCreateWithoutPrestataireInput[] | Prisma.PrestataireServiceUncheckedCreateWithoutPrestataireInput[];
    connectOrCreate?: Prisma.PrestataireServiceCreateOrConnectWithoutPrestataireInput | Prisma.PrestataireServiceCreateOrConnectWithoutPrestataireInput[];
    upsert?: Prisma.PrestataireServiceUpsertWithWhereUniqueWithoutPrestataireInput | Prisma.PrestataireServiceUpsertWithWhereUniqueWithoutPrestataireInput[];
    createMany?: Prisma.PrestataireServiceCreateManyPrestataireInputEnvelope;
    set?: Prisma.PrestataireServiceWhereUniqueInput | Prisma.PrestataireServiceWhereUniqueInput[];
    disconnect?: Prisma.PrestataireServiceWhereUniqueInput | Prisma.PrestataireServiceWhereUniqueInput[];
    delete?: Prisma.PrestataireServiceWhereUniqueInput | Prisma.PrestataireServiceWhereUniqueInput[];
    connect?: Prisma.PrestataireServiceWhereUniqueInput | Prisma.PrestataireServiceWhereUniqueInput[];
    update?: Prisma.PrestataireServiceUpdateWithWhereUniqueWithoutPrestataireInput | Prisma.PrestataireServiceUpdateWithWhereUniqueWithoutPrestataireInput[];
    updateMany?: Prisma.PrestataireServiceUpdateManyWithWhereWithoutPrestataireInput | Prisma.PrestataireServiceUpdateManyWithWhereWithoutPrestataireInput[];
    deleteMany?: Prisma.PrestataireServiceScalarWhereInput | Prisma.PrestataireServiceScalarWhereInput[];
};
export type PrestataireServiceCreateNestedManyWithoutServiceInput = {
    create?: Prisma.XOR<Prisma.PrestataireServiceCreateWithoutServiceInput, Prisma.PrestataireServiceUncheckedCreateWithoutServiceInput> | Prisma.PrestataireServiceCreateWithoutServiceInput[] | Prisma.PrestataireServiceUncheckedCreateWithoutServiceInput[];
    connectOrCreate?: Prisma.PrestataireServiceCreateOrConnectWithoutServiceInput | Prisma.PrestataireServiceCreateOrConnectWithoutServiceInput[];
    createMany?: Prisma.PrestataireServiceCreateManyServiceInputEnvelope;
    connect?: Prisma.PrestataireServiceWhereUniqueInput | Prisma.PrestataireServiceWhereUniqueInput[];
};
export type PrestataireServiceUncheckedCreateNestedManyWithoutServiceInput = {
    create?: Prisma.XOR<Prisma.PrestataireServiceCreateWithoutServiceInput, Prisma.PrestataireServiceUncheckedCreateWithoutServiceInput> | Prisma.PrestataireServiceCreateWithoutServiceInput[] | Prisma.PrestataireServiceUncheckedCreateWithoutServiceInput[];
    connectOrCreate?: Prisma.PrestataireServiceCreateOrConnectWithoutServiceInput | Prisma.PrestataireServiceCreateOrConnectWithoutServiceInput[];
    createMany?: Prisma.PrestataireServiceCreateManyServiceInputEnvelope;
    connect?: Prisma.PrestataireServiceWhereUniqueInput | Prisma.PrestataireServiceWhereUniqueInput[];
};
export type PrestataireServiceUpdateManyWithoutServiceNestedInput = {
    create?: Prisma.XOR<Prisma.PrestataireServiceCreateWithoutServiceInput, Prisma.PrestataireServiceUncheckedCreateWithoutServiceInput> | Prisma.PrestataireServiceCreateWithoutServiceInput[] | Prisma.PrestataireServiceUncheckedCreateWithoutServiceInput[];
    connectOrCreate?: Prisma.PrestataireServiceCreateOrConnectWithoutServiceInput | Prisma.PrestataireServiceCreateOrConnectWithoutServiceInput[];
    upsert?: Prisma.PrestataireServiceUpsertWithWhereUniqueWithoutServiceInput | Prisma.PrestataireServiceUpsertWithWhereUniqueWithoutServiceInput[];
    createMany?: Prisma.PrestataireServiceCreateManyServiceInputEnvelope;
    set?: Prisma.PrestataireServiceWhereUniqueInput | Prisma.PrestataireServiceWhereUniqueInput[];
    disconnect?: Prisma.PrestataireServiceWhereUniqueInput | Prisma.PrestataireServiceWhereUniqueInput[];
    delete?: Prisma.PrestataireServiceWhereUniqueInput | Prisma.PrestataireServiceWhereUniqueInput[];
    connect?: Prisma.PrestataireServiceWhereUniqueInput | Prisma.PrestataireServiceWhereUniqueInput[];
    update?: Prisma.PrestataireServiceUpdateWithWhereUniqueWithoutServiceInput | Prisma.PrestataireServiceUpdateWithWhereUniqueWithoutServiceInput[];
    updateMany?: Prisma.PrestataireServiceUpdateManyWithWhereWithoutServiceInput | Prisma.PrestataireServiceUpdateManyWithWhereWithoutServiceInput[];
    deleteMany?: Prisma.PrestataireServiceScalarWhereInput | Prisma.PrestataireServiceScalarWhereInput[];
};
export type PrestataireServiceUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: Prisma.XOR<Prisma.PrestataireServiceCreateWithoutServiceInput, Prisma.PrestataireServiceUncheckedCreateWithoutServiceInput> | Prisma.PrestataireServiceCreateWithoutServiceInput[] | Prisma.PrestataireServiceUncheckedCreateWithoutServiceInput[];
    connectOrCreate?: Prisma.PrestataireServiceCreateOrConnectWithoutServiceInput | Prisma.PrestataireServiceCreateOrConnectWithoutServiceInput[];
    upsert?: Prisma.PrestataireServiceUpsertWithWhereUniqueWithoutServiceInput | Prisma.PrestataireServiceUpsertWithWhereUniqueWithoutServiceInput[];
    createMany?: Prisma.PrestataireServiceCreateManyServiceInputEnvelope;
    set?: Prisma.PrestataireServiceWhereUniqueInput | Prisma.PrestataireServiceWhereUniqueInput[];
    disconnect?: Prisma.PrestataireServiceWhereUniqueInput | Prisma.PrestataireServiceWhereUniqueInput[];
    delete?: Prisma.PrestataireServiceWhereUniqueInput | Prisma.PrestataireServiceWhereUniqueInput[];
    connect?: Prisma.PrestataireServiceWhereUniqueInput | Prisma.PrestataireServiceWhereUniqueInput[];
    update?: Prisma.PrestataireServiceUpdateWithWhereUniqueWithoutServiceInput | Prisma.PrestataireServiceUpdateWithWhereUniqueWithoutServiceInput[];
    updateMany?: Prisma.PrestataireServiceUpdateManyWithWhereWithoutServiceInput | Prisma.PrestataireServiceUpdateManyWithWhereWithoutServiceInput[];
    deleteMany?: Prisma.PrestataireServiceScalarWhereInput | Prisma.PrestataireServiceScalarWhereInput[];
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type PrestataireServiceCreateNestedOneWithoutPrestationsInput = {
    create?: Prisma.XOR<Prisma.PrestataireServiceCreateWithoutPrestationsInput, Prisma.PrestataireServiceUncheckedCreateWithoutPrestationsInput>;
    connectOrCreate?: Prisma.PrestataireServiceCreateOrConnectWithoutPrestationsInput;
    connect?: Prisma.PrestataireServiceWhereUniqueInput;
};
export type PrestataireServiceUpdateOneRequiredWithoutPrestationsNestedInput = {
    create?: Prisma.XOR<Prisma.PrestataireServiceCreateWithoutPrestationsInput, Prisma.PrestataireServiceUncheckedCreateWithoutPrestationsInput>;
    connectOrCreate?: Prisma.PrestataireServiceCreateOrConnectWithoutPrestationsInput;
    upsert?: Prisma.PrestataireServiceUpsertWithoutPrestationsInput;
    connect?: Prisma.PrestataireServiceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PrestataireServiceUpdateToOneWithWhereWithoutPrestationsInput, Prisma.PrestataireServiceUpdateWithoutPrestationsInput>, Prisma.PrestataireServiceUncheckedUpdateWithoutPrestationsInput>;
};
export type PrestataireServiceCreateWithoutPrestataireInput = {
    id?: string;
    tarifHoraire?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    dureeDefautMin?: number | null;
    description?: string | null;
    actif?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    service: Prisma.ServiceCreateNestedOneWithoutPrestatairesInput;
    prestations?: Prisma.PrestationCreateNestedManyWithoutPrestataireServiceInput;
};
export type PrestataireServiceUncheckedCreateWithoutPrestataireInput = {
    id?: string;
    serviceId: string;
    tarifHoraire?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    dureeDefautMin?: number | null;
    description?: string | null;
    actif?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    prestations?: Prisma.PrestationUncheckedCreateNestedManyWithoutPrestataireServiceInput;
};
export type PrestataireServiceCreateOrConnectWithoutPrestataireInput = {
    where: Prisma.PrestataireServiceWhereUniqueInput;
    create: Prisma.XOR<Prisma.PrestataireServiceCreateWithoutPrestataireInput, Prisma.PrestataireServiceUncheckedCreateWithoutPrestataireInput>;
};
export type PrestataireServiceCreateManyPrestataireInputEnvelope = {
    data: Prisma.PrestataireServiceCreateManyPrestataireInput | Prisma.PrestataireServiceCreateManyPrestataireInput[];
    skipDuplicates?: boolean;
};
export type PrestataireServiceUpsertWithWhereUniqueWithoutPrestataireInput = {
    where: Prisma.PrestataireServiceWhereUniqueInput;
    update: Prisma.XOR<Prisma.PrestataireServiceUpdateWithoutPrestataireInput, Prisma.PrestataireServiceUncheckedUpdateWithoutPrestataireInput>;
    create: Prisma.XOR<Prisma.PrestataireServiceCreateWithoutPrestataireInput, Prisma.PrestataireServiceUncheckedCreateWithoutPrestataireInput>;
};
export type PrestataireServiceUpdateWithWhereUniqueWithoutPrestataireInput = {
    where: Prisma.PrestataireServiceWhereUniqueInput;
    data: Prisma.XOR<Prisma.PrestataireServiceUpdateWithoutPrestataireInput, Prisma.PrestataireServiceUncheckedUpdateWithoutPrestataireInput>;
};
export type PrestataireServiceUpdateManyWithWhereWithoutPrestataireInput = {
    where: Prisma.PrestataireServiceScalarWhereInput;
    data: Prisma.XOR<Prisma.PrestataireServiceUpdateManyMutationInput, Prisma.PrestataireServiceUncheckedUpdateManyWithoutPrestataireInput>;
};
export type PrestataireServiceScalarWhereInput = {
    AND?: Prisma.PrestataireServiceScalarWhereInput | Prisma.PrestataireServiceScalarWhereInput[];
    OR?: Prisma.PrestataireServiceScalarWhereInput[];
    NOT?: Prisma.PrestataireServiceScalarWhereInput | Prisma.PrestataireServiceScalarWhereInput[];
    id?: Prisma.StringFilter<"PrestataireService"> | string;
    prestataireId?: Prisma.StringFilter<"PrestataireService"> | string;
    serviceId?: Prisma.StringFilter<"PrestataireService"> | string;
    tarifHoraire?: Prisma.DecimalNullableFilter<"PrestataireService"> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    dureeDefautMin?: Prisma.IntNullableFilter<"PrestataireService"> | number | null;
    description?: Prisma.StringNullableFilter<"PrestataireService"> | string | null;
    actif?: Prisma.BoolFilter<"PrestataireService"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"PrestataireService"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PrestataireService"> | Date | string;
};
export type PrestataireServiceCreateWithoutServiceInput = {
    id?: string;
    tarifHoraire?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    dureeDefautMin?: number | null;
    description?: string | null;
    actif?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    prestataire: Prisma.PrestataireCreateNestedOneWithoutServicesProposesInput;
    prestations?: Prisma.PrestationCreateNestedManyWithoutPrestataireServiceInput;
};
export type PrestataireServiceUncheckedCreateWithoutServiceInput = {
    id?: string;
    prestataireId: string;
    tarifHoraire?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    dureeDefautMin?: number | null;
    description?: string | null;
    actif?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    prestations?: Prisma.PrestationUncheckedCreateNestedManyWithoutPrestataireServiceInput;
};
export type PrestataireServiceCreateOrConnectWithoutServiceInput = {
    where: Prisma.PrestataireServiceWhereUniqueInput;
    create: Prisma.XOR<Prisma.PrestataireServiceCreateWithoutServiceInput, Prisma.PrestataireServiceUncheckedCreateWithoutServiceInput>;
};
export type PrestataireServiceCreateManyServiceInputEnvelope = {
    data: Prisma.PrestataireServiceCreateManyServiceInput | Prisma.PrestataireServiceCreateManyServiceInput[];
    skipDuplicates?: boolean;
};
export type PrestataireServiceUpsertWithWhereUniqueWithoutServiceInput = {
    where: Prisma.PrestataireServiceWhereUniqueInput;
    update: Prisma.XOR<Prisma.PrestataireServiceUpdateWithoutServiceInput, Prisma.PrestataireServiceUncheckedUpdateWithoutServiceInput>;
    create: Prisma.XOR<Prisma.PrestataireServiceCreateWithoutServiceInput, Prisma.PrestataireServiceUncheckedCreateWithoutServiceInput>;
};
export type PrestataireServiceUpdateWithWhereUniqueWithoutServiceInput = {
    where: Prisma.PrestataireServiceWhereUniqueInput;
    data: Prisma.XOR<Prisma.PrestataireServiceUpdateWithoutServiceInput, Prisma.PrestataireServiceUncheckedUpdateWithoutServiceInput>;
};
export type PrestataireServiceUpdateManyWithWhereWithoutServiceInput = {
    where: Prisma.PrestataireServiceScalarWhereInput;
    data: Prisma.XOR<Prisma.PrestataireServiceUpdateManyMutationInput, Prisma.PrestataireServiceUncheckedUpdateManyWithoutServiceInput>;
};
export type PrestataireServiceCreateWithoutPrestationsInput = {
    id?: string;
    tarifHoraire?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    dureeDefautMin?: number | null;
    description?: string | null;
    actif?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    prestataire: Prisma.PrestataireCreateNestedOneWithoutServicesProposesInput;
    service: Prisma.ServiceCreateNestedOneWithoutPrestatairesInput;
};
export type PrestataireServiceUncheckedCreateWithoutPrestationsInput = {
    id?: string;
    prestataireId: string;
    serviceId: string;
    tarifHoraire?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    dureeDefautMin?: number | null;
    description?: string | null;
    actif?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PrestataireServiceCreateOrConnectWithoutPrestationsInput = {
    where: Prisma.PrestataireServiceWhereUniqueInput;
    create: Prisma.XOR<Prisma.PrestataireServiceCreateWithoutPrestationsInput, Prisma.PrestataireServiceUncheckedCreateWithoutPrestationsInput>;
};
export type PrestataireServiceUpsertWithoutPrestationsInput = {
    update: Prisma.XOR<Prisma.PrestataireServiceUpdateWithoutPrestationsInput, Prisma.PrestataireServiceUncheckedUpdateWithoutPrestationsInput>;
    create: Prisma.XOR<Prisma.PrestataireServiceCreateWithoutPrestationsInput, Prisma.PrestataireServiceUncheckedCreateWithoutPrestationsInput>;
    where?: Prisma.PrestataireServiceWhereInput;
};
export type PrestataireServiceUpdateToOneWithWhereWithoutPrestationsInput = {
    where?: Prisma.PrestataireServiceWhereInput;
    data: Prisma.XOR<Prisma.PrestataireServiceUpdateWithoutPrestationsInput, Prisma.PrestataireServiceUncheckedUpdateWithoutPrestationsInput>;
};
export type PrestataireServiceUpdateWithoutPrestationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tarifHoraire?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    dureeDefautMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    actif?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    prestataire?: Prisma.PrestataireUpdateOneRequiredWithoutServicesProposesNestedInput;
    service?: Prisma.ServiceUpdateOneRequiredWithoutPrestatairesNestedInput;
};
export type PrestataireServiceUncheckedUpdateWithoutPrestationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    prestataireId?: Prisma.StringFieldUpdateOperationsInput | string;
    serviceId?: Prisma.StringFieldUpdateOperationsInput | string;
    tarifHoraire?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    dureeDefautMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    actif?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PrestataireServiceCreateManyPrestataireInput = {
    id?: string;
    serviceId: string;
    tarifHoraire?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    dureeDefautMin?: number | null;
    description?: string | null;
    actif?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PrestataireServiceUpdateWithoutPrestataireInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tarifHoraire?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    dureeDefautMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    actif?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    service?: Prisma.ServiceUpdateOneRequiredWithoutPrestatairesNestedInput;
    prestations?: Prisma.PrestationUpdateManyWithoutPrestataireServiceNestedInput;
};
export type PrestataireServiceUncheckedUpdateWithoutPrestataireInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serviceId?: Prisma.StringFieldUpdateOperationsInput | string;
    tarifHoraire?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    dureeDefautMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    actif?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    prestations?: Prisma.PrestationUncheckedUpdateManyWithoutPrestataireServiceNestedInput;
};
export type PrestataireServiceUncheckedUpdateManyWithoutPrestataireInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    serviceId?: Prisma.StringFieldUpdateOperationsInput | string;
    tarifHoraire?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    dureeDefautMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    actif?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PrestataireServiceCreateManyServiceInput = {
    id?: string;
    prestataireId: string;
    tarifHoraire?: runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    dureeDefautMin?: number | null;
    description?: string | null;
    actif?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PrestataireServiceUpdateWithoutServiceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    tarifHoraire?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    dureeDefautMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    actif?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    prestataire?: Prisma.PrestataireUpdateOneRequiredWithoutServicesProposesNestedInput;
    prestations?: Prisma.PrestationUpdateManyWithoutPrestataireServiceNestedInput;
};
export type PrestataireServiceUncheckedUpdateWithoutServiceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    prestataireId?: Prisma.StringFieldUpdateOperationsInput | string;
    tarifHoraire?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    dureeDefautMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    actif?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    prestations?: Prisma.PrestationUncheckedUpdateManyWithoutPrestataireServiceNestedInput;
};
export type PrestataireServiceUncheckedUpdateManyWithoutServiceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    prestataireId?: Prisma.StringFieldUpdateOperationsInput | string;
    tarifHoraire?: Prisma.NullableDecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    dureeDefautMin?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    actif?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PrestataireServiceCountOutputType = {
    prestations: number;
};
export type PrestataireServiceCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    prestations?: boolean | PrestataireServiceCountOutputTypeCountPrestationsArgs;
};
export type PrestataireServiceCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestataireServiceCountOutputTypeSelect<ExtArgs> | null;
};
export type PrestataireServiceCountOutputTypeCountPrestationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PrestationWhereInput;
};
export type PrestataireServiceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    prestataireId?: boolean;
    serviceId?: boolean;
    tarifHoraire?: boolean;
    dureeDefautMin?: boolean;
    description?: boolean;
    actif?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
    service?: boolean | Prisma.ServiceDefaultArgs<ExtArgs>;
    prestations?: boolean | Prisma.PrestataireService$prestationsArgs<ExtArgs>;
    _count?: boolean | Prisma.PrestataireServiceCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["prestataireService"]>;
export type PrestataireServiceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    prestataireId?: boolean;
    serviceId?: boolean;
    tarifHoraire?: boolean;
    dureeDefautMin?: boolean;
    description?: boolean;
    actif?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
    service?: boolean | Prisma.ServiceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["prestataireService"]>;
export type PrestataireServiceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    prestataireId?: boolean;
    serviceId?: boolean;
    tarifHoraire?: boolean;
    dureeDefautMin?: boolean;
    description?: boolean;
    actif?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
    service?: boolean | Prisma.ServiceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["prestataireService"]>;
export type PrestataireServiceSelectScalar = {
    id?: boolean;
    prestataireId?: boolean;
    serviceId?: boolean;
    tarifHoraire?: boolean;
    dureeDefautMin?: boolean;
    description?: boolean;
    actif?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PrestataireServiceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "prestataireId" | "serviceId" | "tarifHoraire" | "dureeDefautMin" | "description" | "actif" | "createdAt" | "updatedAt", ExtArgs["result"]["prestataireService"]>;
export type PrestataireServiceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
    service?: boolean | Prisma.ServiceDefaultArgs<ExtArgs>;
    prestations?: boolean | Prisma.PrestataireService$prestationsArgs<ExtArgs>;
    _count?: boolean | Prisma.PrestataireServiceCountOutputTypeDefaultArgs<ExtArgs>;
};
export type PrestataireServiceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
    service?: boolean | Prisma.ServiceDefaultArgs<ExtArgs>;
};
export type PrestataireServiceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
    service?: boolean | Prisma.ServiceDefaultArgs<ExtArgs>;
};
export type $PrestataireServicePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PrestataireService";
    objects: {
        prestataire: Prisma.$PrestatairePayload<ExtArgs>;
        service: Prisma.$ServicePayload<ExtArgs>;
        prestations: Prisma.$PrestationPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        prestataireId: string;
        serviceId: string;
        tarifHoraire: runtime.Decimal | null;
        dureeDefautMin: number | null;
        description: string | null;
        actif: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["prestataireService"]>;
    composites: {};
};
export type PrestataireServiceGetPayload<S extends boolean | null | undefined | PrestataireServiceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PrestataireServicePayload, S>;
export type PrestataireServiceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PrestataireServiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PrestataireServiceCountAggregateInputType | true;
};
export interface PrestataireServiceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PrestataireService'];
        meta: {
            name: 'PrestataireService';
        };
    };
    findUnique<T extends PrestataireServiceFindUniqueArgs>(args: Prisma.SelectSubset<T, PrestataireServiceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PrestataireServiceClient<runtime.Types.Result.GetResult<Prisma.$PrestataireServicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PrestataireServiceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PrestataireServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PrestataireServiceClient<runtime.Types.Result.GetResult<Prisma.$PrestataireServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PrestataireServiceFindFirstArgs>(args?: Prisma.SelectSubset<T, PrestataireServiceFindFirstArgs<ExtArgs>>): Prisma.Prisma__PrestataireServiceClient<runtime.Types.Result.GetResult<Prisma.$PrestataireServicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PrestataireServiceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PrestataireServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PrestataireServiceClient<runtime.Types.Result.GetResult<Prisma.$PrestataireServicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PrestataireServiceFindManyArgs>(args?: Prisma.SelectSubset<T, PrestataireServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PrestataireServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PrestataireServiceCreateArgs>(args: Prisma.SelectSubset<T, PrestataireServiceCreateArgs<ExtArgs>>): Prisma.Prisma__PrestataireServiceClient<runtime.Types.Result.GetResult<Prisma.$PrestataireServicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PrestataireServiceCreateManyArgs>(args?: Prisma.SelectSubset<T, PrestataireServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PrestataireServiceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PrestataireServiceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PrestataireServicePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PrestataireServiceDeleteArgs>(args: Prisma.SelectSubset<T, PrestataireServiceDeleteArgs<ExtArgs>>): Prisma.Prisma__PrestataireServiceClient<runtime.Types.Result.GetResult<Prisma.$PrestataireServicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PrestataireServiceUpdateArgs>(args: Prisma.SelectSubset<T, PrestataireServiceUpdateArgs<ExtArgs>>): Prisma.Prisma__PrestataireServiceClient<runtime.Types.Result.GetResult<Prisma.$PrestataireServicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PrestataireServiceDeleteManyArgs>(args?: Prisma.SelectSubset<T, PrestataireServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PrestataireServiceUpdateManyArgs>(args: Prisma.SelectSubset<T, PrestataireServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PrestataireServiceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PrestataireServiceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PrestataireServicePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PrestataireServiceUpsertArgs>(args: Prisma.SelectSubset<T, PrestataireServiceUpsertArgs<ExtArgs>>): Prisma.Prisma__PrestataireServiceClient<runtime.Types.Result.GetResult<Prisma.$PrestataireServicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PrestataireServiceCountArgs>(args?: Prisma.Subset<T, PrestataireServiceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PrestataireServiceCountAggregateOutputType> : number>;
    aggregate<T extends PrestataireServiceAggregateArgs>(args: Prisma.Subset<T, PrestataireServiceAggregateArgs>): Prisma.PrismaPromise<GetPrestataireServiceAggregateType<T>>;
    groupBy<T extends PrestataireServiceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PrestataireServiceGroupByArgs['orderBy'];
    } : {
        orderBy?: PrestataireServiceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PrestataireServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrestataireServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PrestataireServiceFieldRefs;
}
export interface Prisma__PrestataireServiceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    prestataire<T extends Prisma.PrestataireDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PrestataireDefaultArgs<ExtArgs>>): Prisma.Prisma__PrestataireClient<runtime.Types.Result.GetResult<Prisma.$PrestatairePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    service<T extends Prisma.ServiceDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ServiceDefaultArgs<ExtArgs>>): Prisma.Prisma__ServiceClient<runtime.Types.Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    prestations<T extends Prisma.PrestataireService$prestationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PrestataireService$prestationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PrestationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PrestataireServiceFieldRefs {
    readonly id: Prisma.FieldRef<"PrestataireService", 'String'>;
    readonly prestataireId: Prisma.FieldRef<"PrestataireService", 'String'>;
    readonly serviceId: Prisma.FieldRef<"PrestataireService", 'String'>;
    readonly tarifHoraire: Prisma.FieldRef<"PrestataireService", 'Decimal'>;
    readonly dureeDefautMin: Prisma.FieldRef<"PrestataireService", 'Int'>;
    readonly description: Prisma.FieldRef<"PrestataireService", 'String'>;
    readonly actif: Prisma.FieldRef<"PrestataireService", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"PrestataireService", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"PrestataireService", 'DateTime'>;
}
export type PrestataireServiceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestataireServiceSelect<ExtArgs> | null;
    omit?: Prisma.PrestataireServiceOmit<ExtArgs> | null;
    include?: Prisma.PrestataireServiceInclude<ExtArgs> | null;
    where: Prisma.PrestataireServiceWhereUniqueInput;
};
export type PrestataireServiceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestataireServiceSelect<ExtArgs> | null;
    omit?: Prisma.PrestataireServiceOmit<ExtArgs> | null;
    include?: Prisma.PrestataireServiceInclude<ExtArgs> | null;
    where: Prisma.PrestataireServiceWhereUniqueInput;
};
export type PrestataireServiceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestataireServiceSelect<ExtArgs> | null;
    omit?: Prisma.PrestataireServiceOmit<ExtArgs> | null;
    include?: Prisma.PrestataireServiceInclude<ExtArgs> | null;
    where?: Prisma.PrestataireServiceWhereInput;
    orderBy?: Prisma.PrestataireServiceOrderByWithRelationInput | Prisma.PrestataireServiceOrderByWithRelationInput[];
    cursor?: Prisma.PrestataireServiceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PrestataireServiceScalarFieldEnum | Prisma.PrestataireServiceScalarFieldEnum[];
};
export type PrestataireServiceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestataireServiceSelect<ExtArgs> | null;
    omit?: Prisma.PrestataireServiceOmit<ExtArgs> | null;
    include?: Prisma.PrestataireServiceInclude<ExtArgs> | null;
    where?: Prisma.PrestataireServiceWhereInput;
    orderBy?: Prisma.PrestataireServiceOrderByWithRelationInput | Prisma.PrestataireServiceOrderByWithRelationInput[];
    cursor?: Prisma.PrestataireServiceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PrestataireServiceScalarFieldEnum | Prisma.PrestataireServiceScalarFieldEnum[];
};
export type PrestataireServiceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestataireServiceSelect<ExtArgs> | null;
    omit?: Prisma.PrestataireServiceOmit<ExtArgs> | null;
    include?: Prisma.PrestataireServiceInclude<ExtArgs> | null;
    where?: Prisma.PrestataireServiceWhereInput;
    orderBy?: Prisma.PrestataireServiceOrderByWithRelationInput | Prisma.PrestataireServiceOrderByWithRelationInput[];
    cursor?: Prisma.PrestataireServiceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PrestataireServiceScalarFieldEnum | Prisma.PrestataireServiceScalarFieldEnum[];
};
export type PrestataireServiceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestataireServiceSelect<ExtArgs> | null;
    omit?: Prisma.PrestataireServiceOmit<ExtArgs> | null;
    include?: Prisma.PrestataireServiceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PrestataireServiceCreateInput, Prisma.PrestataireServiceUncheckedCreateInput>;
};
export type PrestataireServiceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PrestataireServiceCreateManyInput | Prisma.PrestataireServiceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PrestataireServiceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestataireServiceSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PrestataireServiceOmit<ExtArgs> | null;
    data: Prisma.PrestataireServiceCreateManyInput | Prisma.PrestataireServiceCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PrestataireServiceIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PrestataireServiceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestataireServiceSelect<ExtArgs> | null;
    omit?: Prisma.PrestataireServiceOmit<ExtArgs> | null;
    include?: Prisma.PrestataireServiceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PrestataireServiceUpdateInput, Prisma.PrestataireServiceUncheckedUpdateInput>;
    where: Prisma.PrestataireServiceWhereUniqueInput;
};
export type PrestataireServiceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PrestataireServiceUpdateManyMutationInput, Prisma.PrestataireServiceUncheckedUpdateManyInput>;
    where?: Prisma.PrestataireServiceWhereInput;
    limit?: number;
};
export type PrestataireServiceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestataireServiceSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PrestataireServiceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PrestataireServiceUpdateManyMutationInput, Prisma.PrestataireServiceUncheckedUpdateManyInput>;
    where?: Prisma.PrestataireServiceWhereInput;
    limit?: number;
    include?: Prisma.PrestataireServiceIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PrestataireServiceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestataireServiceSelect<ExtArgs> | null;
    omit?: Prisma.PrestataireServiceOmit<ExtArgs> | null;
    include?: Prisma.PrestataireServiceInclude<ExtArgs> | null;
    where: Prisma.PrestataireServiceWhereUniqueInput;
    create: Prisma.XOR<Prisma.PrestataireServiceCreateInput, Prisma.PrestataireServiceUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PrestataireServiceUpdateInput, Prisma.PrestataireServiceUncheckedUpdateInput>;
};
export type PrestataireServiceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestataireServiceSelect<ExtArgs> | null;
    omit?: Prisma.PrestataireServiceOmit<ExtArgs> | null;
    include?: Prisma.PrestataireServiceInclude<ExtArgs> | null;
    where: Prisma.PrestataireServiceWhereUniqueInput;
};
export type PrestataireServiceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PrestataireServiceWhereInput;
    limit?: number;
};
export type PrestataireService$prestationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PrestataireServiceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestataireServiceSelect<ExtArgs> | null;
    omit?: Prisma.PrestataireServiceOmit<ExtArgs> | null;
    include?: Prisma.PrestataireServiceInclude<ExtArgs> | null;
};
export {};
