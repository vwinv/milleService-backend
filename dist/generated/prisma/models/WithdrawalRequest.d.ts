import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type WithdrawalRequestModel = runtime.Types.Result.DefaultSelection<Prisma.$WithdrawalRequestPayload>;
export type AggregateWithdrawalRequest = {
    _count: WithdrawalRequestCountAggregateOutputType | null;
    _min: WithdrawalRequestMinAggregateOutputType | null;
    _max: WithdrawalRequestMaxAggregateOutputType | null;
};
export type WithdrawalRequestMinAggregateOutputType = {
    id: string | null;
    prestataireId: string | null;
    method: $Enums.WithdrawalMethod | null;
    status: $Enums.WithdrawalStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type WithdrawalRequestMaxAggregateOutputType = {
    id: string | null;
    prestataireId: string | null;
    method: $Enums.WithdrawalMethod | null;
    status: $Enums.WithdrawalStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type WithdrawalRequestCountAggregateOutputType = {
    id: number;
    prestataireId: number;
    method: number;
    status: number;
    meta: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type WithdrawalRequestMinAggregateInputType = {
    id?: true;
    prestataireId?: true;
    method?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type WithdrawalRequestMaxAggregateInputType = {
    id?: true;
    prestataireId?: true;
    method?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type WithdrawalRequestCountAggregateInputType = {
    id?: true;
    prestataireId?: true;
    method?: true;
    status?: true;
    meta?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type WithdrawalRequestAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WithdrawalRequestWhereInput;
    orderBy?: Prisma.WithdrawalRequestOrderByWithRelationInput | Prisma.WithdrawalRequestOrderByWithRelationInput[];
    cursor?: Prisma.WithdrawalRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | WithdrawalRequestCountAggregateInputType;
    _min?: WithdrawalRequestMinAggregateInputType;
    _max?: WithdrawalRequestMaxAggregateInputType;
};
export type GetWithdrawalRequestAggregateType<T extends WithdrawalRequestAggregateArgs> = {
    [P in keyof T & keyof AggregateWithdrawalRequest]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateWithdrawalRequest[P]> : Prisma.GetScalarType<T[P], AggregateWithdrawalRequest[P]>;
};
export type WithdrawalRequestGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WithdrawalRequestWhereInput;
    orderBy?: Prisma.WithdrawalRequestOrderByWithAggregationInput | Prisma.WithdrawalRequestOrderByWithAggregationInput[];
    by: Prisma.WithdrawalRequestScalarFieldEnum[] | Prisma.WithdrawalRequestScalarFieldEnum;
    having?: Prisma.WithdrawalRequestScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: WithdrawalRequestCountAggregateInputType | true;
    _min?: WithdrawalRequestMinAggregateInputType;
    _max?: WithdrawalRequestMaxAggregateInputType;
};
export type WithdrawalRequestGroupByOutputType = {
    id: string;
    prestataireId: string;
    method: $Enums.WithdrawalMethod;
    status: $Enums.WithdrawalStatus;
    meta: runtime.JsonValue | null;
    createdAt: Date;
    updatedAt: Date;
    _count: WithdrawalRequestCountAggregateOutputType | null;
    _min: WithdrawalRequestMinAggregateOutputType | null;
    _max: WithdrawalRequestMaxAggregateOutputType | null;
};
type GetWithdrawalRequestGroupByPayload<T extends WithdrawalRequestGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<WithdrawalRequestGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof WithdrawalRequestGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], WithdrawalRequestGroupByOutputType[P]> : Prisma.GetScalarType<T[P], WithdrawalRequestGroupByOutputType[P]>;
}>>;
export type WithdrawalRequestWhereInput = {
    AND?: Prisma.WithdrawalRequestWhereInput | Prisma.WithdrawalRequestWhereInput[];
    OR?: Prisma.WithdrawalRequestWhereInput[];
    NOT?: Prisma.WithdrawalRequestWhereInput | Prisma.WithdrawalRequestWhereInput[];
    id?: Prisma.StringFilter<"WithdrawalRequest"> | string;
    prestataireId?: Prisma.StringFilter<"WithdrawalRequest"> | string;
    method?: Prisma.EnumWithdrawalMethodFilter<"WithdrawalRequest"> | $Enums.WithdrawalMethod;
    status?: Prisma.EnumWithdrawalStatusFilter<"WithdrawalRequest"> | $Enums.WithdrawalStatus;
    meta?: Prisma.JsonNullableFilter<"WithdrawalRequest">;
    createdAt?: Prisma.DateTimeFilter<"WithdrawalRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WithdrawalRequest"> | Date | string;
    prestataire?: Prisma.XOR<Prisma.PrestataireScalarRelationFilter, Prisma.PrestataireWhereInput>;
};
export type WithdrawalRequestOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    meta?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    prestataire?: Prisma.PrestataireOrderByWithRelationInput;
};
export type WithdrawalRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.WithdrawalRequestWhereInput | Prisma.WithdrawalRequestWhereInput[];
    OR?: Prisma.WithdrawalRequestWhereInput[];
    NOT?: Prisma.WithdrawalRequestWhereInput | Prisma.WithdrawalRequestWhereInput[];
    prestataireId?: Prisma.StringFilter<"WithdrawalRequest"> | string;
    method?: Prisma.EnumWithdrawalMethodFilter<"WithdrawalRequest"> | $Enums.WithdrawalMethod;
    status?: Prisma.EnumWithdrawalStatusFilter<"WithdrawalRequest"> | $Enums.WithdrawalStatus;
    meta?: Prisma.JsonNullableFilter<"WithdrawalRequest">;
    createdAt?: Prisma.DateTimeFilter<"WithdrawalRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WithdrawalRequest"> | Date | string;
    prestataire?: Prisma.XOR<Prisma.PrestataireScalarRelationFilter, Prisma.PrestataireWhereInput>;
}, "id">;
export type WithdrawalRequestOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    meta?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.WithdrawalRequestCountOrderByAggregateInput;
    _max?: Prisma.WithdrawalRequestMaxOrderByAggregateInput;
    _min?: Prisma.WithdrawalRequestMinOrderByAggregateInput;
};
export type WithdrawalRequestScalarWhereWithAggregatesInput = {
    AND?: Prisma.WithdrawalRequestScalarWhereWithAggregatesInput | Prisma.WithdrawalRequestScalarWhereWithAggregatesInput[];
    OR?: Prisma.WithdrawalRequestScalarWhereWithAggregatesInput[];
    NOT?: Prisma.WithdrawalRequestScalarWhereWithAggregatesInput | Prisma.WithdrawalRequestScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"WithdrawalRequest"> | string;
    prestataireId?: Prisma.StringWithAggregatesFilter<"WithdrawalRequest"> | string;
    method?: Prisma.EnumWithdrawalMethodWithAggregatesFilter<"WithdrawalRequest"> | $Enums.WithdrawalMethod;
    status?: Prisma.EnumWithdrawalStatusWithAggregatesFilter<"WithdrawalRequest"> | $Enums.WithdrawalStatus;
    meta?: Prisma.JsonNullableWithAggregatesFilter<"WithdrawalRequest">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"WithdrawalRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"WithdrawalRequest"> | Date | string;
};
export type WithdrawalRequestCreateInput = {
    id?: string;
    method: $Enums.WithdrawalMethod;
    status?: $Enums.WithdrawalStatus;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    prestataire: Prisma.PrestataireCreateNestedOneWithoutWithdrawalRequestsInput;
};
export type WithdrawalRequestUncheckedCreateInput = {
    id?: string;
    prestataireId: string;
    method: $Enums.WithdrawalMethod;
    status?: $Enums.WithdrawalStatus;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WithdrawalRequestUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    method?: Prisma.EnumWithdrawalMethodFieldUpdateOperationsInput | $Enums.WithdrawalMethod;
    status?: Prisma.EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    prestataire?: Prisma.PrestataireUpdateOneRequiredWithoutWithdrawalRequestsNestedInput;
};
export type WithdrawalRequestUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    prestataireId?: Prisma.StringFieldUpdateOperationsInput | string;
    method?: Prisma.EnumWithdrawalMethodFieldUpdateOperationsInput | $Enums.WithdrawalMethod;
    status?: Prisma.EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WithdrawalRequestCreateManyInput = {
    id?: string;
    prestataireId: string;
    method: $Enums.WithdrawalMethod;
    status?: $Enums.WithdrawalStatus;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WithdrawalRequestUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    method?: Prisma.EnumWithdrawalMethodFieldUpdateOperationsInput | $Enums.WithdrawalMethod;
    status?: Prisma.EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WithdrawalRequestUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    prestataireId?: Prisma.StringFieldUpdateOperationsInput | string;
    method?: Prisma.EnumWithdrawalMethodFieldUpdateOperationsInput | $Enums.WithdrawalMethod;
    status?: Prisma.EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WithdrawalRequestListRelationFilter = {
    every?: Prisma.WithdrawalRequestWhereInput;
    some?: Prisma.WithdrawalRequestWhereInput;
    none?: Prisma.WithdrawalRequestWhereInput;
};
export type WithdrawalRequestOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type WithdrawalRequestCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    meta?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WithdrawalRequestMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WithdrawalRequestMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    method?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type WithdrawalRequestCreateNestedManyWithoutPrestataireInput = {
    create?: Prisma.XOR<Prisma.WithdrawalRequestCreateWithoutPrestataireInput, Prisma.WithdrawalRequestUncheckedCreateWithoutPrestataireInput> | Prisma.WithdrawalRequestCreateWithoutPrestataireInput[] | Prisma.WithdrawalRequestUncheckedCreateWithoutPrestataireInput[];
    connectOrCreate?: Prisma.WithdrawalRequestCreateOrConnectWithoutPrestataireInput | Prisma.WithdrawalRequestCreateOrConnectWithoutPrestataireInput[];
    createMany?: Prisma.WithdrawalRequestCreateManyPrestataireInputEnvelope;
    connect?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
};
export type WithdrawalRequestUncheckedCreateNestedManyWithoutPrestataireInput = {
    create?: Prisma.XOR<Prisma.WithdrawalRequestCreateWithoutPrestataireInput, Prisma.WithdrawalRequestUncheckedCreateWithoutPrestataireInput> | Prisma.WithdrawalRequestCreateWithoutPrestataireInput[] | Prisma.WithdrawalRequestUncheckedCreateWithoutPrestataireInput[];
    connectOrCreate?: Prisma.WithdrawalRequestCreateOrConnectWithoutPrestataireInput | Prisma.WithdrawalRequestCreateOrConnectWithoutPrestataireInput[];
    createMany?: Prisma.WithdrawalRequestCreateManyPrestataireInputEnvelope;
    connect?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
};
export type WithdrawalRequestUpdateManyWithoutPrestataireNestedInput = {
    create?: Prisma.XOR<Prisma.WithdrawalRequestCreateWithoutPrestataireInput, Prisma.WithdrawalRequestUncheckedCreateWithoutPrestataireInput> | Prisma.WithdrawalRequestCreateWithoutPrestataireInput[] | Prisma.WithdrawalRequestUncheckedCreateWithoutPrestataireInput[];
    connectOrCreate?: Prisma.WithdrawalRequestCreateOrConnectWithoutPrestataireInput | Prisma.WithdrawalRequestCreateOrConnectWithoutPrestataireInput[];
    upsert?: Prisma.WithdrawalRequestUpsertWithWhereUniqueWithoutPrestataireInput | Prisma.WithdrawalRequestUpsertWithWhereUniqueWithoutPrestataireInput[];
    createMany?: Prisma.WithdrawalRequestCreateManyPrestataireInputEnvelope;
    set?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
    disconnect?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
    delete?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
    connect?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
    update?: Prisma.WithdrawalRequestUpdateWithWhereUniqueWithoutPrestataireInput | Prisma.WithdrawalRequestUpdateWithWhereUniqueWithoutPrestataireInput[];
    updateMany?: Prisma.WithdrawalRequestUpdateManyWithWhereWithoutPrestataireInput | Prisma.WithdrawalRequestUpdateManyWithWhereWithoutPrestataireInput[];
    deleteMany?: Prisma.WithdrawalRequestScalarWhereInput | Prisma.WithdrawalRequestScalarWhereInput[];
};
export type WithdrawalRequestUncheckedUpdateManyWithoutPrestataireNestedInput = {
    create?: Prisma.XOR<Prisma.WithdrawalRequestCreateWithoutPrestataireInput, Prisma.WithdrawalRequestUncheckedCreateWithoutPrestataireInput> | Prisma.WithdrawalRequestCreateWithoutPrestataireInput[] | Prisma.WithdrawalRequestUncheckedCreateWithoutPrestataireInput[];
    connectOrCreate?: Prisma.WithdrawalRequestCreateOrConnectWithoutPrestataireInput | Prisma.WithdrawalRequestCreateOrConnectWithoutPrestataireInput[];
    upsert?: Prisma.WithdrawalRequestUpsertWithWhereUniqueWithoutPrestataireInput | Prisma.WithdrawalRequestUpsertWithWhereUniqueWithoutPrestataireInput[];
    createMany?: Prisma.WithdrawalRequestCreateManyPrestataireInputEnvelope;
    set?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
    disconnect?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
    delete?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
    connect?: Prisma.WithdrawalRequestWhereUniqueInput | Prisma.WithdrawalRequestWhereUniqueInput[];
    update?: Prisma.WithdrawalRequestUpdateWithWhereUniqueWithoutPrestataireInput | Prisma.WithdrawalRequestUpdateWithWhereUniqueWithoutPrestataireInput[];
    updateMany?: Prisma.WithdrawalRequestUpdateManyWithWhereWithoutPrestataireInput | Prisma.WithdrawalRequestUpdateManyWithWhereWithoutPrestataireInput[];
    deleteMany?: Prisma.WithdrawalRequestScalarWhereInput | Prisma.WithdrawalRequestScalarWhereInput[];
};
export type EnumWithdrawalMethodFieldUpdateOperationsInput = {
    set?: $Enums.WithdrawalMethod;
};
export type EnumWithdrawalStatusFieldUpdateOperationsInput = {
    set?: $Enums.WithdrawalStatus;
};
export type WithdrawalRequestCreateWithoutPrestataireInput = {
    id?: string;
    method: $Enums.WithdrawalMethod;
    status?: $Enums.WithdrawalStatus;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WithdrawalRequestUncheckedCreateWithoutPrestataireInput = {
    id?: string;
    method: $Enums.WithdrawalMethod;
    status?: $Enums.WithdrawalStatus;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WithdrawalRequestCreateOrConnectWithoutPrestataireInput = {
    where: Prisma.WithdrawalRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.WithdrawalRequestCreateWithoutPrestataireInput, Prisma.WithdrawalRequestUncheckedCreateWithoutPrestataireInput>;
};
export type WithdrawalRequestCreateManyPrestataireInputEnvelope = {
    data: Prisma.WithdrawalRequestCreateManyPrestataireInput | Prisma.WithdrawalRequestCreateManyPrestataireInput[];
    skipDuplicates?: boolean;
};
export type WithdrawalRequestUpsertWithWhereUniqueWithoutPrestataireInput = {
    where: Prisma.WithdrawalRequestWhereUniqueInput;
    update: Prisma.XOR<Prisma.WithdrawalRequestUpdateWithoutPrestataireInput, Prisma.WithdrawalRequestUncheckedUpdateWithoutPrestataireInput>;
    create: Prisma.XOR<Prisma.WithdrawalRequestCreateWithoutPrestataireInput, Prisma.WithdrawalRequestUncheckedCreateWithoutPrestataireInput>;
};
export type WithdrawalRequestUpdateWithWhereUniqueWithoutPrestataireInput = {
    where: Prisma.WithdrawalRequestWhereUniqueInput;
    data: Prisma.XOR<Prisma.WithdrawalRequestUpdateWithoutPrestataireInput, Prisma.WithdrawalRequestUncheckedUpdateWithoutPrestataireInput>;
};
export type WithdrawalRequestUpdateManyWithWhereWithoutPrestataireInput = {
    where: Prisma.WithdrawalRequestScalarWhereInput;
    data: Prisma.XOR<Prisma.WithdrawalRequestUpdateManyMutationInput, Prisma.WithdrawalRequestUncheckedUpdateManyWithoutPrestataireInput>;
};
export type WithdrawalRequestScalarWhereInput = {
    AND?: Prisma.WithdrawalRequestScalarWhereInput | Prisma.WithdrawalRequestScalarWhereInput[];
    OR?: Prisma.WithdrawalRequestScalarWhereInput[];
    NOT?: Prisma.WithdrawalRequestScalarWhereInput | Prisma.WithdrawalRequestScalarWhereInput[];
    id?: Prisma.StringFilter<"WithdrawalRequest"> | string;
    prestataireId?: Prisma.StringFilter<"WithdrawalRequest"> | string;
    method?: Prisma.EnumWithdrawalMethodFilter<"WithdrawalRequest"> | $Enums.WithdrawalMethod;
    status?: Prisma.EnumWithdrawalStatusFilter<"WithdrawalRequest"> | $Enums.WithdrawalStatus;
    meta?: Prisma.JsonNullableFilter<"WithdrawalRequest">;
    createdAt?: Prisma.DateTimeFilter<"WithdrawalRequest"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"WithdrawalRequest"> | Date | string;
};
export type WithdrawalRequestCreateManyPrestataireInput = {
    id?: string;
    method: $Enums.WithdrawalMethod;
    status?: $Enums.WithdrawalStatus;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type WithdrawalRequestUpdateWithoutPrestataireInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    method?: Prisma.EnumWithdrawalMethodFieldUpdateOperationsInput | $Enums.WithdrawalMethod;
    status?: Prisma.EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WithdrawalRequestUncheckedUpdateWithoutPrestataireInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    method?: Prisma.EnumWithdrawalMethodFieldUpdateOperationsInput | $Enums.WithdrawalMethod;
    status?: Prisma.EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WithdrawalRequestUncheckedUpdateManyWithoutPrestataireInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    method?: Prisma.EnumWithdrawalMethodFieldUpdateOperationsInput | $Enums.WithdrawalMethod;
    status?: Prisma.EnumWithdrawalStatusFieldUpdateOperationsInput | $Enums.WithdrawalStatus;
    meta?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type WithdrawalRequestSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    prestataireId?: boolean;
    method?: boolean;
    status?: boolean;
    meta?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["withdrawalRequest"]>;
export type WithdrawalRequestSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    prestataireId?: boolean;
    method?: boolean;
    status?: boolean;
    meta?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["withdrawalRequest"]>;
export type WithdrawalRequestSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    prestataireId?: boolean;
    method?: boolean;
    status?: boolean;
    meta?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["withdrawalRequest"]>;
export type WithdrawalRequestSelectScalar = {
    id?: boolean;
    prestataireId?: boolean;
    method?: boolean;
    status?: boolean;
    meta?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type WithdrawalRequestOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "prestataireId" | "method" | "status" | "meta" | "createdAt" | "updatedAt", ExtArgs["result"]["withdrawalRequest"]>;
export type WithdrawalRequestInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
};
export type WithdrawalRequestIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
};
export type WithdrawalRequestIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
};
export type $WithdrawalRequestPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "WithdrawalRequest";
    objects: {
        prestataire: Prisma.$PrestatairePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        prestataireId: string;
        method: $Enums.WithdrawalMethod;
        status: $Enums.WithdrawalStatus;
        meta: runtime.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["withdrawalRequest"]>;
    composites: {};
};
export type WithdrawalRequestGetPayload<S extends boolean | null | undefined | WithdrawalRequestDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$WithdrawalRequestPayload, S>;
export type WithdrawalRequestCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<WithdrawalRequestFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: WithdrawalRequestCountAggregateInputType | true;
};
export interface WithdrawalRequestDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['WithdrawalRequest'];
        meta: {
            name: 'WithdrawalRequest';
        };
    };
    findUnique<T extends WithdrawalRequestFindUniqueArgs>(args: Prisma.SelectSubset<T, WithdrawalRequestFindUniqueArgs<ExtArgs>>): Prisma.Prisma__WithdrawalRequestClient<runtime.Types.Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends WithdrawalRequestFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, WithdrawalRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__WithdrawalRequestClient<runtime.Types.Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends WithdrawalRequestFindFirstArgs>(args?: Prisma.SelectSubset<T, WithdrawalRequestFindFirstArgs<ExtArgs>>): Prisma.Prisma__WithdrawalRequestClient<runtime.Types.Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends WithdrawalRequestFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, WithdrawalRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__WithdrawalRequestClient<runtime.Types.Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends WithdrawalRequestFindManyArgs>(args?: Prisma.SelectSubset<T, WithdrawalRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends WithdrawalRequestCreateArgs>(args: Prisma.SelectSubset<T, WithdrawalRequestCreateArgs<ExtArgs>>): Prisma.Prisma__WithdrawalRequestClient<runtime.Types.Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends WithdrawalRequestCreateManyArgs>(args?: Prisma.SelectSubset<T, WithdrawalRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends WithdrawalRequestCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, WithdrawalRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends WithdrawalRequestDeleteArgs>(args: Prisma.SelectSubset<T, WithdrawalRequestDeleteArgs<ExtArgs>>): Prisma.Prisma__WithdrawalRequestClient<runtime.Types.Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends WithdrawalRequestUpdateArgs>(args: Prisma.SelectSubset<T, WithdrawalRequestUpdateArgs<ExtArgs>>): Prisma.Prisma__WithdrawalRequestClient<runtime.Types.Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends WithdrawalRequestDeleteManyArgs>(args?: Prisma.SelectSubset<T, WithdrawalRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends WithdrawalRequestUpdateManyArgs>(args: Prisma.SelectSubset<T, WithdrawalRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends WithdrawalRequestUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, WithdrawalRequestUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends WithdrawalRequestUpsertArgs>(args: Prisma.SelectSubset<T, WithdrawalRequestUpsertArgs<ExtArgs>>): Prisma.Prisma__WithdrawalRequestClient<runtime.Types.Result.GetResult<Prisma.$WithdrawalRequestPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends WithdrawalRequestCountArgs>(args?: Prisma.Subset<T, WithdrawalRequestCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], WithdrawalRequestCountAggregateOutputType> : number>;
    aggregate<T extends WithdrawalRequestAggregateArgs>(args: Prisma.Subset<T, WithdrawalRequestAggregateArgs>): Prisma.PrismaPromise<GetWithdrawalRequestAggregateType<T>>;
    groupBy<T extends WithdrawalRequestGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: WithdrawalRequestGroupByArgs['orderBy'];
    } : {
        orderBy?: WithdrawalRequestGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, WithdrawalRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWithdrawalRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: WithdrawalRequestFieldRefs;
}
export interface Prisma__WithdrawalRequestClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    prestataire<T extends Prisma.PrestataireDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PrestataireDefaultArgs<ExtArgs>>): Prisma.Prisma__PrestataireClient<runtime.Types.Result.GetResult<Prisma.$PrestatairePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface WithdrawalRequestFieldRefs {
    readonly id: Prisma.FieldRef<"WithdrawalRequest", 'String'>;
    readonly prestataireId: Prisma.FieldRef<"WithdrawalRequest", 'String'>;
    readonly method: Prisma.FieldRef<"WithdrawalRequest", 'WithdrawalMethod'>;
    readonly status: Prisma.FieldRef<"WithdrawalRequest", 'WithdrawalStatus'>;
    readonly meta: Prisma.FieldRef<"WithdrawalRequest", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"WithdrawalRequest", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"WithdrawalRequest", 'DateTime'>;
}
export type WithdrawalRequestFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WithdrawalRequestSelect<ExtArgs> | null;
    omit?: Prisma.WithdrawalRequestOmit<ExtArgs> | null;
    include?: Prisma.WithdrawalRequestInclude<ExtArgs> | null;
    where: Prisma.WithdrawalRequestWhereUniqueInput;
};
export type WithdrawalRequestFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WithdrawalRequestSelect<ExtArgs> | null;
    omit?: Prisma.WithdrawalRequestOmit<ExtArgs> | null;
    include?: Prisma.WithdrawalRequestInclude<ExtArgs> | null;
    where: Prisma.WithdrawalRequestWhereUniqueInput;
};
export type WithdrawalRequestFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WithdrawalRequestSelect<ExtArgs> | null;
    omit?: Prisma.WithdrawalRequestOmit<ExtArgs> | null;
    include?: Prisma.WithdrawalRequestInclude<ExtArgs> | null;
    where?: Prisma.WithdrawalRequestWhereInput;
    orderBy?: Prisma.WithdrawalRequestOrderByWithRelationInput | Prisma.WithdrawalRequestOrderByWithRelationInput[];
    cursor?: Prisma.WithdrawalRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WithdrawalRequestScalarFieldEnum | Prisma.WithdrawalRequestScalarFieldEnum[];
};
export type WithdrawalRequestFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WithdrawalRequestSelect<ExtArgs> | null;
    omit?: Prisma.WithdrawalRequestOmit<ExtArgs> | null;
    include?: Prisma.WithdrawalRequestInclude<ExtArgs> | null;
    where?: Prisma.WithdrawalRequestWhereInput;
    orderBy?: Prisma.WithdrawalRequestOrderByWithRelationInput | Prisma.WithdrawalRequestOrderByWithRelationInput[];
    cursor?: Prisma.WithdrawalRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WithdrawalRequestScalarFieldEnum | Prisma.WithdrawalRequestScalarFieldEnum[];
};
export type WithdrawalRequestFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WithdrawalRequestSelect<ExtArgs> | null;
    omit?: Prisma.WithdrawalRequestOmit<ExtArgs> | null;
    include?: Prisma.WithdrawalRequestInclude<ExtArgs> | null;
    where?: Prisma.WithdrawalRequestWhereInput;
    orderBy?: Prisma.WithdrawalRequestOrderByWithRelationInput | Prisma.WithdrawalRequestOrderByWithRelationInput[];
    cursor?: Prisma.WithdrawalRequestWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WithdrawalRequestScalarFieldEnum | Prisma.WithdrawalRequestScalarFieldEnum[];
};
export type WithdrawalRequestCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WithdrawalRequestSelect<ExtArgs> | null;
    omit?: Prisma.WithdrawalRequestOmit<ExtArgs> | null;
    include?: Prisma.WithdrawalRequestInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WithdrawalRequestCreateInput, Prisma.WithdrawalRequestUncheckedCreateInput>;
};
export type WithdrawalRequestCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.WithdrawalRequestCreateManyInput | Prisma.WithdrawalRequestCreateManyInput[];
    skipDuplicates?: boolean;
};
export type WithdrawalRequestCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WithdrawalRequestSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WithdrawalRequestOmit<ExtArgs> | null;
    data: Prisma.WithdrawalRequestCreateManyInput | Prisma.WithdrawalRequestCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.WithdrawalRequestIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type WithdrawalRequestUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WithdrawalRequestSelect<ExtArgs> | null;
    omit?: Prisma.WithdrawalRequestOmit<ExtArgs> | null;
    include?: Prisma.WithdrawalRequestInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WithdrawalRequestUpdateInput, Prisma.WithdrawalRequestUncheckedUpdateInput>;
    where: Prisma.WithdrawalRequestWhereUniqueInput;
};
export type WithdrawalRequestUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.WithdrawalRequestUpdateManyMutationInput, Prisma.WithdrawalRequestUncheckedUpdateManyInput>;
    where?: Prisma.WithdrawalRequestWhereInput;
    limit?: number;
};
export type WithdrawalRequestUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WithdrawalRequestSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.WithdrawalRequestOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.WithdrawalRequestUpdateManyMutationInput, Prisma.WithdrawalRequestUncheckedUpdateManyInput>;
    where?: Prisma.WithdrawalRequestWhereInput;
    limit?: number;
    include?: Prisma.WithdrawalRequestIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type WithdrawalRequestUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WithdrawalRequestSelect<ExtArgs> | null;
    omit?: Prisma.WithdrawalRequestOmit<ExtArgs> | null;
    include?: Prisma.WithdrawalRequestInclude<ExtArgs> | null;
    where: Prisma.WithdrawalRequestWhereUniqueInput;
    create: Prisma.XOR<Prisma.WithdrawalRequestCreateInput, Prisma.WithdrawalRequestUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.WithdrawalRequestUpdateInput, Prisma.WithdrawalRequestUncheckedUpdateInput>;
};
export type WithdrawalRequestDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WithdrawalRequestSelect<ExtArgs> | null;
    omit?: Prisma.WithdrawalRequestOmit<ExtArgs> | null;
    include?: Prisma.WithdrawalRequestInclude<ExtArgs> | null;
    where: Prisma.WithdrawalRequestWhereUniqueInput;
};
export type WithdrawalRequestDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WithdrawalRequestWhereInput;
    limit?: number;
};
export type WithdrawalRequestDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.WithdrawalRequestSelect<ExtArgs> | null;
    omit?: Prisma.WithdrawalRequestOmit<ExtArgs> | null;
    include?: Prisma.WithdrawalRequestInclude<ExtArgs> | null;
};
export {};
