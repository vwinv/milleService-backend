import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
export type TypeDocumentModel = runtime.Types.Result.DefaultSelection<Prisma.$TypeDocumentPayload>;
export type AggregateTypeDocument = {
    _count: TypeDocumentCountAggregateOutputType | null;
    _avg: TypeDocumentAvgAggregateOutputType | null;
    _sum: TypeDocumentSumAggregateOutputType | null;
    _min: TypeDocumentMinAggregateOutputType | null;
    _max: TypeDocumentMaxAggregateOutputType | null;
};
export type TypeDocumentAvgAggregateOutputType = {
    ordre: number | null;
};
export type TypeDocumentSumAggregateOutputType = {
    ordre: number | null;
};
export type TypeDocumentMinAggregateOutputType = {
    id: string | null;
    code: string | null;
    libelle: string | null;
    description: string | null;
    obligatoire: boolean | null;
    ordre: number | null;
    actif: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TypeDocumentMaxAggregateOutputType = {
    id: string | null;
    code: string | null;
    libelle: string | null;
    description: string | null;
    obligatoire: boolean | null;
    ordre: number | null;
    actif: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type TypeDocumentCountAggregateOutputType = {
    id: number;
    code: number;
    libelle: number;
    description: number;
    obligatoire: number;
    ordre: number;
    actif: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type TypeDocumentAvgAggregateInputType = {
    ordre?: true;
};
export type TypeDocumentSumAggregateInputType = {
    ordre?: true;
};
export type TypeDocumentMinAggregateInputType = {
    id?: true;
    code?: true;
    libelle?: true;
    description?: true;
    obligatoire?: true;
    ordre?: true;
    actif?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TypeDocumentMaxAggregateInputType = {
    id?: true;
    code?: true;
    libelle?: true;
    description?: true;
    obligatoire?: true;
    ordre?: true;
    actif?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type TypeDocumentCountAggregateInputType = {
    id?: true;
    code?: true;
    libelle?: true;
    description?: true;
    obligatoire?: true;
    ordre?: true;
    actif?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type TypeDocumentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TypeDocumentWhereInput;
    orderBy?: Prisma.TypeDocumentOrderByWithRelationInput | Prisma.TypeDocumentOrderByWithRelationInput[];
    cursor?: Prisma.TypeDocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | TypeDocumentCountAggregateInputType;
    _avg?: TypeDocumentAvgAggregateInputType;
    _sum?: TypeDocumentSumAggregateInputType;
    _min?: TypeDocumentMinAggregateInputType;
    _max?: TypeDocumentMaxAggregateInputType;
};
export type GetTypeDocumentAggregateType<T extends TypeDocumentAggregateArgs> = {
    [P in keyof T & keyof AggregateTypeDocument]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateTypeDocument[P]> : Prisma.GetScalarType<T[P], AggregateTypeDocument[P]>;
};
export type TypeDocumentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TypeDocumentWhereInput;
    orderBy?: Prisma.TypeDocumentOrderByWithAggregationInput | Prisma.TypeDocumentOrderByWithAggregationInput[];
    by: Prisma.TypeDocumentScalarFieldEnum[] | Prisma.TypeDocumentScalarFieldEnum;
    having?: Prisma.TypeDocumentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: TypeDocumentCountAggregateInputType | true;
    _avg?: TypeDocumentAvgAggregateInputType;
    _sum?: TypeDocumentSumAggregateInputType;
    _min?: TypeDocumentMinAggregateInputType;
    _max?: TypeDocumentMaxAggregateInputType;
};
export type TypeDocumentGroupByOutputType = {
    id: string;
    code: string;
    libelle: string;
    description: string | null;
    obligatoire: boolean;
    ordre: number;
    actif: boolean;
    createdAt: Date;
    updatedAt: Date;
    _count: TypeDocumentCountAggregateOutputType | null;
    _avg: TypeDocumentAvgAggregateOutputType | null;
    _sum: TypeDocumentSumAggregateOutputType | null;
    _min: TypeDocumentMinAggregateOutputType | null;
    _max: TypeDocumentMaxAggregateOutputType | null;
};
type GetTypeDocumentGroupByPayload<T extends TypeDocumentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<TypeDocumentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof TypeDocumentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], TypeDocumentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], TypeDocumentGroupByOutputType[P]>;
}>>;
export type TypeDocumentWhereInput = {
    AND?: Prisma.TypeDocumentWhereInput | Prisma.TypeDocumentWhereInput[];
    OR?: Prisma.TypeDocumentWhereInput[];
    NOT?: Prisma.TypeDocumentWhereInput | Prisma.TypeDocumentWhereInput[];
    id?: Prisma.StringFilter<"TypeDocument"> | string;
    code?: Prisma.StringFilter<"TypeDocument"> | string;
    libelle?: Prisma.StringFilter<"TypeDocument"> | string;
    description?: Prisma.StringNullableFilter<"TypeDocument"> | string | null;
    obligatoire?: Prisma.BoolFilter<"TypeDocument"> | boolean;
    ordre?: Prisma.IntFilter<"TypeDocument"> | number;
    actif?: Prisma.BoolFilter<"TypeDocument"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"TypeDocument"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"TypeDocument"> | Date | string;
    documents?: Prisma.PrestataireDocumentListRelationFilter;
};
export type TypeDocumentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    libelle?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    obligatoire?: Prisma.SortOrder;
    ordre?: Prisma.SortOrder;
    actif?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    documents?: Prisma.PrestataireDocumentOrderByRelationAggregateInput;
};
export type TypeDocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    code?: string;
    AND?: Prisma.TypeDocumentWhereInput | Prisma.TypeDocumentWhereInput[];
    OR?: Prisma.TypeDocumentWhereInput[];
    NOT?: Prisma.TypeDocumentWhereInput | Prisma.TypeDocumentWhereInput[];
    libelle?: Prisma.StringFilter<"TypeDocument"> | string;
    description?: Prisma.StringNullableFilter<"TypeDocument"> | string | null;
    obligatoire?: Prisma.BoolFilter<"TypeDocument"> | boolean;
    ordre?: Prisma.IntFilter<"TypeDocument"> | number;
    actif?: Prisma.BoolFilter<"TypeDocument"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"TypeDocument"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"TypeDocument"> | Date | string;
    documents?: Prisma.PrestataireDocumentListRelationFilter;
}, "id" | "code">;
export type TypeDocumentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    libelle?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    obligatoire?: Prisma.SortOrder;
    ordre?: Prisma.SortOrder;
    actif?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.TypeDocumentCountOrderByAggregateInput;
    _avg?: Prisma.TypeDocumentAvgOrderByAggregateInput;
    _max?: Prisma.TypeDocumentMaxOrderByAggregateInput;
    _min?: Prisma.TypeDocumentMinOrderByAggregateInput;
    _sum?: Prisma.TypeDocumentSumOrderByAggregateInput;
};
export type TypeDocumentScalarWhereWithAggregatesInput = {
    AND?: Prisma.TypeDocumentScalarWhereWithAggregatesInput | Prisma.TypeDocumentScalarWhereWithAggregatesInput[];
    OR?: Prisma.TypeDocumentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.TypeDocumentScalarWhereWithAggregatesInput | Prisma.TypeDocumentScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"TypeDocument"> | string;
    code?: Prisma.StringWithAggregatesFilter<"TypeDocument"> | string;
    libelle?: Prisma.StringWithAggregatesFilter<"TypeDocument"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"TypeDocument"> | string | null;
    obligatoire?: Prisma.BoolWithAggregatesFilter<"TypeDocument"> | boolean;
    ordre?: Prisma.IntWithAggregatesFilter<"TypeDocument"> | number;
    actif?: Prisma.BoolWithAggregatesFilter<"TypeDocument"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"TypeDocument"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"TypeDocument"> | Date | string;
};
export type TypeDocumentCreateInput = {
    id?: string;
    code: string;
    libelle: string;
    description?: string | null;
    obligatoire?: boolean;
    ordre?: number;
    actif?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    documents?: Prisma.PrestataireDocumentCreateNestedManyWithoutTypeDocumentInput;
};
export type TypeDocumentUncheckedCreateInput = {
    id?: string;
    code: string;
    libelle: string;
    description?: string | null;
    obligatoire?: boolean;
    ordre?: number;
    actif?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    documents?: Prisma.PrestataireDocumentUncheckedCreateNestedManyWithoutTypeDocumentInput;
};
export type TypeDocumentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    libelle?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    obligatoire?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ordre?: Prisma.IntFieldUpdateOperationsInput | number;
    actif?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    documents?: Prisma.PrestataireDocumentUpdateManyWithoutTypeDocumentNestedInput;
};
export type TypeDocumentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    libelle?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    obligatoire?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ordre?: Prisma.IntFieldUpdateOperationsInput | number;
    actif?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    documents?: Prisma.PrestataireDocumentUncheckedUpdateManyWithoutTypeDocumentNestedInput;
};
export type TypeDocumentCreateManyInput = {
    id?: string;
    code: string;
    libelle: string;
    description?: string | null;
    obligatoire?: boolean;
    ordre?: number;
    actif?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TypeDocumentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    libelle?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    obligatoire?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ordre?: Prisma.IntFieldUpdateOperationsInput | number;
    actif?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TypeDocumentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    libelle?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    obligatoire?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ordre?: Prisma.IntFieldUpdateOperationsInput | number;
    actif?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TypeDocumentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    libelle?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    obligatoire?: Prisma.SortOrder;
    ordre?: Prisma.SortOrder;
    actif?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TypeDocumentAvgOrderByAggregateInput = {
    ordre?: Prisma.SortOrder;
};
export type TypeDocumentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    libelle?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    obligatoire?: Prisma.SortOrder;
    ordre?: Prisma.SortOrder;
    actif?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TypeDocumentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    code?: Prisma.SortOrder;
    libelle?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    obligatoire?: Prisma.SortOrder;
    ordre?: Prisma.SortOrder;
    actif?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type TypeDocumentSumOrderByAggregateInput = {
    ordre?: Prisma.SortOrder;
};
export type TypeDocumentScalarRelationFilter = {
    is?: Prisma.TypeDocumentWhereInput;
    isNot?: Prisma.TypeDocumentWhereInput;
};
export type TypeDocumentCreateNestedOneWithoutDocumentsInput = {
    create?: Prisma.XOR<Prisma.TypeDocumentCreateWithoutDocumentsInput, Prisma.TypeDocumentUncheckedCreateWithoutDocumentsInput>;
    connectOrCreate?: Prisma.TypeDocumentCreateOrConnectWithoutDocumentsInput;
    connect?: Prisma.TypeDocumentWhereUniqueInput;
};
export type TypeDocumentUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: Prisma.XOR<Prisma.TypeDocumentCreateWithoutDocumentsInput, Prisma.TypeDocumentUncheckedCreateWithoutDocumentsInput>;
    connectOrCreate?: Prisma.TypeDocumentCreateOrConnectWithoutDocumentsInput;
    upsert?: Prisma.TypeDocumentUpsertWithoutDocumentsInput;
    connect?: Prisma.TypeDocumentWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.TypeDocumentUpdateToOneWithWhereWithoutDocumentsInput, Prisma.TypeDocumentUpdateWithoutDocumentsInput>, Prisma.TypeDocumentUncheckedUpdateWithoutDocumentsInput>;
};
export type TypeDocumentCreateWithoutDocumentsInput = {
    id?: string;
    code: string;
    libelle: string;
    description?: string | null;
    obligatoire?: boolean;
    ordre?: number;
    actif?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TypeDocumentUncheckedCreateWithoutDocumentsInput = {
    id?: string;
    code: string;
    libelle: string;
    description?: string | null;
    obligatoire?: boolean;
    ordre?: number;
    actif?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type TypeDocumentCreateOrConnectWithoutDocumentsInput = {
    where: Prisma.TypeDocumentWhereUniqueInput;
    create: Prisma.XOR<Prisma.TypeDocumentCreateWithoutDocumentsInput, Prisma.TypeDocumentUncheckedCreateWithoutDocumentsInput>;
};
export type TypeDocumentUpsertWithoutDocumentsInput = {
    update: Prisma.XOR<Prisma.TypeDocumentUpdateWithoutDocumentsInput, Prisma.TypeDocumentUncheckedUpdateWithoutDocumentsInput>;
    create: Prisma.XOR<Prisma.TypeDocumentCreateWithoutDocumentsInput, Prisma.TypeDocumentUncheckedCreateWithoutDocumentsInput>;
    where?: Prisma.TypeDocumentWhereInput;
};
export type TypeDocumentUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: Prisma.TypeDocumentWhereInput;
    data: Prisma.XOR<Prisma.TypeDocumentUpdateWithoutDocumentsInput, Prisma.TypeDocumentUncheckedUpdateWithoutDocumentsInput>;
};
export type TypeDocumentUpdateWithoutDocumentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    libelle?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    obligatoire?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ordre?: Prisma.IntFieldUpdateOperationsInput | number;
    actif?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TypeDocumentUncheckedUpdateWithoutDocumentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    code?: Prisma.StringFieldUpdateOperationsInput | string;
    libelle?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    obligatoire?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    ordre?: Prisma.IntFieldUpdateOperationsInput | number;
    actif?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type TypeDocumentCountOutputType = {
    documents: number;
};
export type TypeDocumentCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    documents?: boolean | TypeDocumentCountOutputTypeCountDocumentsArgs;
};
export type TypeDocumentCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TypeDocumentCountOutputTypeSelect<ExtArgs> | null;
};
export type TypeDocumentCountOutputTypeCountDocumentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PrestataireDocumentWhereInput;
};
export type TypeDocumentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    libelle?: boolean;
    description?: boolean;
    obligatoire?: boolean;
    ordre?: boolean;
    actif?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    documents?: boolean | Prisma.TypeDocument$documentsArgs<ExtArgs>;
    _count?: boolean | Prisma.TypeDocumentCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["typeDocument"]>;
export type TypeDocumentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    libelle?: boolean;
    description?: boolean;
    obligatoire?: boolean;
    ordre?: boolean;
    actif?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["typeDocument"]>;
export type TypeDocumentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    code?: boolean;
    libelle?: boolean;
    description?: boolean;
    obligatoire?: boolean;
    ordre?: boolean;
    actif?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["typeDocument"]>;
export type TypeDocumentSelectScalar = {
    id?: boolean;
    code?: boolean;
    libelle?: boolean;
    description?: boolean;
    obligatoire?: boolean;
    ordre?: boolean;
    actif?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type TypeDocumentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "code" | "libelle" | "description" | "obligatoire" | "ordre" | "actif" | "createdAt" | "updatedAt", ExtArgs["result"]["typeDocument"]>;
export type TypeDocumentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    documents?: boolean | Prisma.TypeDocument$documentsArgs<ExtArgs>;
    _count?: boolean | Prisma.TypeDocumentCountOutputTypeDefaultArgs<ExtArgs>;
};
export type TypeDocumentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type TypeDocumentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $TypeDocumentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "TypeDocument";
    objects: {
        documents: Prisma.$PrestataireDocumentPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        code: string;
        libelle: string;
        description: string | null;
        obligatoire: boolean;
        ordre: number;
        actif: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["typeDocument"]>;
    composites: {};
};
export type TypeDocumentGetPayload<S extends boolean | null | undefined | TypeDocumentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$TypeDocumentPayload, S>;
export type TypeDocumentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<TypeDocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: TypeDocumentCountAggregateInputType | true;
};
export interface TypeDocumentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['TypeDocument'];
        meta: {
            name: 'TypeDocument';
        };
    };
    findUnique<T extends TypeDocumentFindUniqueArgs>(args: Prisma.SelectSubset<T, TypeDocumentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__TypeDocumentClient<runtime.Types.Result.GetResult<Prisma.$TypeDocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends TypeDocumentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, TypeDocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__TypeDocumentClient<runtime.Types.Result.GetResult<Prisma.$TypeDocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends TypeDocumentFindFirstArgs>(args?: Prisma.SelectSubset<T, TypeDocumentFindFirstArgs<ExtArgs>>): Prisma.Prisma__TypeDocumentClient<runtime.Types.Result.GetResult<Prisma.$TypeDocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends TypeDocumentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, TypeDocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__TypeDocumentClient<runtime.Types.Result.GetResult<Prisma.$TypeDocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends TypeDocumentFindManyArgs>(args?: Prisma.SelectSubset<T, TypeDocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TypeDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends TypeDocumentCreateArgs>(args: Prisma.SelectSubset<T, TypeDocumentCreateArgs<ExtArgs>>): Prisma.Prisma__TypeDocumentClient<runtime.Types.Result.GetResult<Prisma.$TypeDocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends TypeDocumentCreateManyArgs>(args?: Prisma.SelectSubset<T, TypeDocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends TypeDocumentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, TypeDocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TypeDocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends TypeDocumentDeleteArgs>(args: Prisma.SelectSubset<T, TypeDocumentDeleteArgs<ExtArgs>>): Prisma.Prisma__TypeDocumentClient<runtime.Types.Result.GetResult<Prisma.$TypeDocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends TypeDocumentUpdateArgs>(args: Prisma.SelectSubset<T, TypeDocumentUpdateArgs<ExtArgs>>): Prisma.Prisma__TypeDocumentClient<runtime.Types.Result.GetResult<Prisma.$TypeDocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends TypeDocumentDeleteManyArgs>(args?: Prisma.SelectSubset<T, TypeDocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends TypeDocumentUpdateManyArgs>(args: Prisma.SelectSubset<T, TypeDocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends TypeDocumentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, TypeDocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$TypeDocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends TypeDocumentUpsertArgs>(args: Prisma.SelectSubset<T, TypeDocumentUpsertArgs<ExtArgs>>): Prisma.Prisma__TypeDocumentClient<runtime.Types.Result.GetResult<Prisma.$TypeDocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends TypeDocumentCountArgs>(args?: Prisma.Subset<T, TypeDocumentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], TypeDocumentCountAggregateOutputType> : number>;
    aggregate<T extends TypeDocumentAggregateArgs>(args: Prisma.Subset<T, TypeDocumentAggregateArgs>): Prisma.PrismaPromise<GetTypeDocumentAggregateType<T>>;
    groupBy<T extends TypeDocumentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: TypeDocumentGroupByArgs['orderBy'];
    } : {
        orderBy?: TypeDocumentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, TypeDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTypeDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: TypeDocumentFieldRefs;
}
export interface Prisma__TypeDocumentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    documents<T extends Prisma.TypeDocument$documentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TypeDocument$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PrestataireDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface TypeDocumentFieldRefs {
    readonly id: Prisma.FieldRef<"TypeDocument", 'String'>;
    readonly code: Prisma.FieldRef<"TypeDocument", 'String'>;
    readonly libelle: Prisma.FieldRef<"TypeDocument", 'String'>;
    readonly description: Prisma.FieldRef<"TypeDocument", 'String'>;
    readonly obligatoire: Prisma.FieldRef<"TypeDocument", 'Boolean'>;
    readonly ordre: Prisma.FieldRef<"TypeDocument", 'Int'>;
    readonly actif: Prisma.FieldRef<"TypeDocument", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"TypeDocument", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"TypeDocument", 'DateTime'>;
}
export type TypeDocumentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TypeDocumentSelect<ExtArgs> | null;
    omit?: Prisma.TypeDocumentOmit<ExtArgs> | null;
    include?: Prisma.TypeDocumentInclude<ExtArgs> | null;
    where: Prisma.TypeDocumentWhereUniqueInput;
};
export type TypeDocumentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TypeDocumentSelect<ExtArgs> | null;
    omit?: Prisma.TypeDocumentOmit<ExtArgs> | null;
    include?: Prisma.TypeDocumentInclude<ExtArgs> | null;
    where: Prisma.TypeDocumentWhereUniqueInput;
};
export type TypeDocumentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TypeDocumentSelect<ExtArgs> | null;
    omit?: Prisma.TypeDocumentOmit<ExtArgs> | null;
    include?: Prisma.TypeDocumentInclude<ExtArgs> | null;
    where?: Prisma.TypeDocumentWhereInput;
    orderBy?: Prisma.TypeDocumentOrderByWithRelationInput | Prisma.TypeDocumentOrderByWithRelationInput[];
    cursor?: Prisma.TypeDocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TypeDocumentScalarFieldEnum | Prisma.TypeDocumentScalarFieldEnum[];
};
export type TypeDocumentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TypeDocumentSelect<ExtArgs> | null;
    omit?: Prisma.TypeDocumentOmit<ExtArgs> | null;
    include?: Prisma.TypeDocumentInclude<ExtArgs> | null;
    where?: Prisma.TypeDocumentWhereInput;
    orderBy?: Prisma.TypeDocumentOrderByWithRelationInput | Prisma.TypeDocumentOrderByWithRelationInput[];
    cursor?: Prisma.TypeDocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TypeDocumentScalarFieldEnum | Prisma.TypeDocumentScalarFieldEnum[];
};
export type TypeDocumentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TypeDocumentSelect<ExtArgs> | null;
    omit?: Prisma.TypeDocumentOmit<ExtArgs> | null;
    include?: Prisma.TypeDocumentInclude<ExtArgs> | null;
    where?: Prisma.TypeDocumentWhereInput;
    orderBy?: Prisma.TypeDocumentOrderByWithRelationInput | Prisma.TypeDocumentOrderByWithRelationInput[];
    cursor?: Prisma.TypeDocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.TypeDocumentScalarFieldEnum | Prisma.TypeDocumentScalarFieldEnum[];
};
export type TypeDocumentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TypeDocumentSelect<ExtArgs> | null;
    omit?: Prisma.TypeDocumentOmit<ExtArgs> | null;
    include?: Prisma.TypeDocumentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TypeDocumentCreateInput, Prisma.TypeDocumentUncheckedCreateInput>;
};
export type TypeDocumentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.TypeDocumentCreateManyInput | Prisma.TypeDocumentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TypeDocumentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TypeDocumentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TypeDocumentOmit<ExtArgs> | null;
    data: Prisma.TypeDocumentCreateManyInput | Prisma.TypeDocumentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type TypeDocumentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TypeDocumentSelect<ExtArgs> | null;
    omit?: Prisma.TypeDocumentOmit<ExtArgs> | null;
    include?: Prisma.TypeDocumentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TypeDocumentUpdateInput, Prisma.TypeDocumentUncheckedUpdateInput>;
    where: Prisma.TypeDocumentWhereUniqueInput;
};
export type TypeDocumentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.TypeDocumentUpdateManyMutationInput, Prisma.TypeDocumentUncheckedUpdateManyInput>;
    where?: Prisma.TypeDocumentWhereInput;
    limit?: number;
};
export type TypeDocumentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TypeDocumentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.TypeDocumentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.TypeDocumentUpdateManyMutationInput, Prisma.TypeDocumentUncheckedUpdateManyInput>;
    where?: Prisma.TypeDocumentWhereInput;
    limit?: number;
};
export type TypeDocumentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TypeDocumentSelect<ExtArgs> | null;
    omit?: Prisma.TypeDocumentOmit<ExtArgs> | null;
    include?: Prisma.TypeDocumentInclude<ExtArgs> | null;
    where: Prisma.TypeDocumentWhereUniqueInput;
    create: Prisma.XOR<Prisma.TypeDocumentCreateInput, Prisma.TypeDocumentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.TypeDocumentUpdateInput, Prisma.TypeDocumentUncheckedUpdateInput>;
};
export type TypeDocumentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TypeDocumentSelect<ExtArgs> | null;
    omit?: Prisma.TypeDocumentOmit<ExtArgs> | null;
    include?: Prisma.TypeDocumentInclude<ExtArgs> | null;
    where: Prisma.TypeDocumentWhereUniqueInput;
};
export type TypeDocumentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.TypeDocumentWhereInput;
    limit?: number;
};
export type TypeDocument$documentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestataireDocumentSelect<ExtArgs> | null;
    omit?: Prisma.PrestataireDocumentOmit<ExtArgs> | null;
    include?: Prisma.PrestataireDocumentInclude<ExtArgs> | null;
    where?: Prisma.PrestataireDocumentWhereInput;
    orderBy?: Prisma.PrestataireDocumentOrderByWithRelationInput | Prisma.PrestataireDocumentOrderByWithRelationInput[];
    cursor?: Prisma.PrestataireDocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PrestataireDocumentScalarFieldEnum | Prisma.PrestataireDocumentScalarFieldEnum[];
};
export type TypeDocumentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.TypeDocumentSelect<ExtArgs> | null;
    omit?: Prisma.TypeDocumentOmit<ExtArgs> | null;
    include?: Prisma.TypeDocumentInclude<ExtArgs> | null;
};
export {};
