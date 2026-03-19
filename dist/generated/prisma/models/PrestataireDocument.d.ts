import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
export type PrestataireDocumentModel = runtime.Types.Result.DefaultSelection<Prisma.$PrestataireDocumentPayload>;
export type AggregatePrestataireDocument = {
    _count: PrestataireDocumentCountAggregateOutputType | null;
    _min: PrestataireDocumentMinAggregateOutputType | null;
    _max: PrestataireDocumentMaxAggregateOutputType | null;
};
export type PrestataireDocumentMinAggregateOutputType = {
    id: string | null;
    prestataireId: string | null;
    typeDocumentId: string | null;
    fichierUrl: string | null;
    nomFichier: string | null;
    statut: $Enums.StatutDocument | null;
    validePar: string | null;
    valideAt: Date | null;
    motifRefus: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PrestataireDocumentMaxAggregateOutputType = {
    id: string | null;
    prestataireId: string | null;
    typeDocumentId: string | null;
    fichierUrl: string | null;
    nomFichier: string | null;
    statut: $Enums.StatutDocument | null;
    validePar: string | null;
    valideAt: Date | null;
    motifRefus: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PrestataireDocumentCountAggregateOutputType = {
    id: number;
    prestataireId: number;
    typeDocumentId: number;
    fichierUrl: number;
    nomFichier: number;
    statut: number;
    validePar: number;
    valideAt: number;
    motifRefus: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PrestataireDocumentMinAggregateInputType = {
    id?: true;
    prestataireId?: true;
    typeDocumentId?: true;
    fichierUrl?: true;
    nomFichier?: true;
    statut?: true;
    validePar?: true;
    valideAt?: true;
    motifRefus?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PrestataireDocumentMaxAggregateInputType = {
    id?: true;
    prestataireId?: true;
    typeDocumentId?: true;
    fichierUrl?: true;
    nomFichier?: true;
    statut?: true;
    validePar?: true;
    valideAt?: true;
    motifRefus?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PrestataireDocumentCountAggregateInputType = {
    id?: true;
    prestataireId?: true;
    typeDocumentId?: true;
    fichierUrl?: true;
    nomFichier?: true;
    statut?: true;
    validePar?: true;
    valideAt?: true;
    motifRefus?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PrestataireDocumentAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PrestataireDocumentWhereInput;
    orderBy?: Prisma.PrestataireDocumentOrderByWithRelationInput | Prisma.PrestataireDocumentOrderByWithRelationInput[];
    cursor?: Prisma.PrestataireDocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PrestataireDocumentCountAggregateInputType;
    _min?: PrestataireDocumentMinAggregateInputType;
    _max?: PrestataireDocumentMaxAggregateInputType;
};
export type GetPrestataireDocumentAggregateType<T extends PrestataireDocumentAggregateArgs> = {
    [P in keyof T & keyof AggregatePrestataireDocument]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePrestataireDocument[P]> : Prisma.GetScalarType<T[P], AggregatePrestataireDocument[P]>;
};
export type PrestataireDocumentGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PrestataireDocumentWhereInput;
    orderBy?: Prisma.PrestataireDocumentOrderByWithAggregationInput | Prisma.PrestataireDocumentOrderByWithAggregationInput[];
    by: Prisma.PrestataireDocumentScalarFieldEnum[] | Prisma.PrestataireDocumentScalarFieldEnum;
    having?: Prisma.PrestataireDocumentScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PrestataireDocumentCountAggregateInputType | true;
    _min?: PrestataireDocumentMinAggregateInputType;
    _max?: PrestataireDocumentMaxAggregateInputType;
};
export type PrestataireDocumentGroupByOutputType = {
    id: string;
    prestataireId: string;
    typeDocumentId: string;
    fichierUrl: string;
    nomFichier: string | null;
    statut: $Enums.StatutDocument;
    validePar: string | null;
    valideAt: Date | null;
    motifRefus: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: PrestataireDocumentCountAggregateOutputType | null;
    _min: PrestataireDocumentMinAggregateOutputType | null;
    _max: PrestataireDocumentMaxAggregateOutputType | null;
};
type GetPrestataireDocumentGroupByPayload<T extends PrestataireDocumentGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PrestataireDocumentGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PrestataireDocumentGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PrestataireDocumentGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PrestataireDocumentGroupByOutputType[P]>;
}>>;
export type PrestataireDocumentWhereInput = {
    AND?: Prisma.PrestataireDocumentWhereInput | Prisma.PrestataireDocumentWhereInput[];
    OR?: Prisma.PrestataireDocumentWhereInput[];
    NOT?: Prisma.PrestataireDocumentWhereInput | Prisma.PrestataireDocumentWhereInput[];
    id?: Prisma.StringFilter<"PrestataireDocument"> | string;
    prestataireId?: Prisma.StringFilter<"PrestataireDocument"> | string;
    typeDocumentId?: Prisma.StringFilter<"PrestataireDocument"> | string;
    fichierUrl?: Prisma.StringFilter<"PrestataireDocument"> | string;
    nomFichier?: Prisma.StringNullableFilter<"PrestataireDocument"> | string | null;
    statut?: Prisma.EnumStatutDocumentFilter<"PrestataireDocument"> | $Enums.StatutDocument;
    validePar?: Prisma.StringNullableFilter<"PrestataireDocument"> | string | null;
    valideAt?: Prisma.DateTimeNullableFilter<"PrestataireDocument"> | Date | string | null;
    motifRefus?: Prisma.StringNullableFilter<"PrestataireDocument"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"PrestataireDocument"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PrestataireDocument"> | Date | string;
    prestataire?: Prisma.XOR<Prisma.PrestataireScalarRelationFilter, Prisma.PrestataireWhereInput>;
    typeDocument?: Prisma.XOR<Prisma.TypeDocumentScalarRelationFilter, Prisma.TypeDocumentWhereInput>;
};
export type PrestataireDocumentOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    typeDocumentId?: Prisma.SortOrder;
    fichierUrl?: Prisma.SortOrder;
    nomFichier?: Prisma.SortOrderInput | Prisma.SortOrder;
    statut?: Prisma.SortOrder;
    validePar?: Prisma.SortOrderInput | Prisma.SortOrder;
    valideAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    motifRefus?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    prestataire?: Prisma.PrestataireOrderByWithRelationInput;
    typeDocument?: Prisma.TypeDocumentOrderByWithRelationInput;
};
export type PrestataireDocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    prestataireId_typeDocumentId?: Prisma.PrestataireDocumentPrestataireIdTypeDocumentIdCompoundUniqueInput;
    AND?: Prisma.PrestataireDocumentWhereInput | Prisma.PrestataireDocumentWhereInput[];
    OR?: Prisma.PrestataireDocumentWhereInput[];
    NOT?: Prisma.PrestataireDocumentWhereInput | Prisma.PrestataireDocumentWhereInput[];
    prestataireId?: Prisma.StringFilter<"PrestataireDocument"> | string;
    typeDocumentId?: Prisma.StringFilter<"PrestataireDocument"> | string;
    fichierUrl?: Prisma.StringFilter<"PrestataireDocument"> | string;
    nomFichier?: Prisma.StringNullableFilter<"PrestataireDocument"> | string | null;
    statut?: Prisma.EnumStatutDocumentFilter<"PrestataireDocument"> | $Enums.StatutDocument;
    validePar?: Prisma.StringNullableFilter<"PrestataireDocument"> | string | null;
    valideAt?: Prisma.DateTimeNullableFilter<"PrestataireDocument"> | Date | string | null;
    motifRefus?: Prisma.StringNullableFilter<"PrestataireDocument"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"PrestataireDocument"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PrestataireDocument"> | Date | string;
    prestataire?: Prisma.XOR<Prisma.PrestataireScalarRelationFilter, Prisma.PrestataireWhereInput>;
    typeDocument?: Prisma.XOR<Prisma.TypeDocumentScalarRelationFilter, Prisma.TypeDocumentWhereInput>;
}, "id" | "prestataireId_typeDocumentId">;
export type PrestataireDocumentOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    typeDocumentId?: Prisma.SortOrder;
    fichierUrl?: Prisma.SortOrder;
    nomFichier?: Prisma.SortOrderInput | Prisma.SortOrder;
    statut?: Prisma.SortOrder;
    validePar?: Prisma.SortOrderInput | Prisma.SortOrder;
    valideAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    motifRefus?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PrestataireDocumentCountOrderByAggregateInput;
    _max?: Prisma.PrestataireDocumentMaxOrderByAggregateInput;
    _min?: Prisma.PrestataireDocumentMinOrderByAggregateInput;
};
export type PrestataireDocumentScalarWhereWithAggregatesInput = {
    AND?: Prisma.PrestataireDocumentScalarWhereWithAggregatesInput | Prisma.PrestataireDocumentScalarWhereWithAggregatesInput[];
    OR?: Prisma.PrestataireDocumentScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PrestataireDocumentScalarWhereWithAggregatesInput | Prisma.PrestataireDocumentScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PrestataireDocument"> | string;
    prestataireId?: Prisma.StringWithAggregatesFilter<"PrestataireDocument"> | string;
    typeDocumentId?: Prisma.StringWithAggregatesFilter<"PrestataireDocument"> | string;
    fichierUrl?: Prisma.StringWithAggregatesFilter<"PrestataireDocument"> | string;
    nomFichier?: Prisma.StringNullableWithAggregatesFilter<"PrestataireDocument"> | string | null;
    statut?: Prisma.EnumStatutDocumentWithAggregatesFilter<"PrestataireDocument"> | $Enums.StatutDocument;
    validePar?: Prisma.StringNullableWithAggregatesFilter<"PrestataireDocument"> | string | null;
    valideAt?: Prisma.DateTimeNullableWithAggregatesFilter<"PrestataireDocument"> | Date | string | null;
    motifRefus?: Prisma.StringNullableWithAggregatesFilter<"PrestataireDocument"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PrestataireDocument"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"PrestataireDocument"> | Date | string;
};
export type PrestataireDocumentCreateInput = {
    id?: string;
    fichierUrl: string;
    nomFichier?: string | null;
    statut?: $Enums.StatutDocument;
    validePar?: string | null;
    valideAt?: Date | string | null;
    motifRefus?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    prestataire: Prisma.PrestataireCreateNestedOneWithoutDocumentsInput;
    typeDocument: Prisma.TypeDocumentCreateNestedOneWithoutDocumentsInput;
};
export type PrestataireDocumentUncheckedCreateInput = {
    id?: string;
    prestataireId: string;
    typeDocumentId: string;
    fichierUrl: string;
    nomFichier?: string | null;
    statut?: $Enums.StatutDocument;
    validePar?: string | null;
    valideAt?: Date | string | null;
    motifRefus?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PrestataireDocumentUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fichierUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    nomFichier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    statut?: Prisma.EnumStatutDocumentFieldUpdateOperationsInput | $Enums.StatutDocument;
    validePar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    valideAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    motifRefus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    prestataire?: Prisma.PrestataireUpdateOneRequiredWithoutDocumentsNestedInput;
    typeDocument?: Prisma.TypeDocumentUpdateOneRequiredWithoutDocumentsNestedInput;
};
export type PrestataireDocumentUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    prestataireId?: Prisma.StringFieldUpdateOperationsInput | string;
    typeDocumentId?: Prisma.StringFieldUpdateOperationsInput | string;
    fichierUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    nomFichier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    statut?: Prisma.EnumStatutDocumentFieldUpdateOperationsInput | $Enums.StatutDocument;
    validePar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    valideAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    motifRefus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PrestataireDocumentCreateManyInput = {
    id?: string;
    prestataireId: string;
    typeDocumentId: string;
    fichierUrl: string;
    nomFichier?: string | null;
    statut?: $Enums.StatutDocument;
    validePar?: string | null;
    valideAt?: Date | string | null;
    motifRefus?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PrestataireDocumentUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fichierUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    nomFichier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    statut?: Prisma.EnumStatutDocumentFieldUpdateOperationsInput | $Enums.StatutDocument;
    validePar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    valideAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    motifRefus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PrestataireDocumentUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    prestataireId?: Prisma.StringFieldUpdateOperationsInput | string;
    typeDocumentId?: Prisma.StringFieldUpdateOperationsInput | string;
    fichierUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    nomFichier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    statut?: Prisma.EnumStatutDocumentFieldUpdateOperationsInput | $Enums.StatutDocument;
    validePar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    valideAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    motifRefus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PrestataireDocumentListRelationFilter = {
    every?: Prisma.PrestataireDocumentWhereInput;
    some?: Prisma.PrestataireDocumentWhereInput;
    none?: Prisma.PrestataireDocumentWhereInput;
};
export type PrestataireDocumentOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PrestataireDocumentPrestataireIdTypeDocumentIdCompoundUniqueInput = {
    prestataireId: string;
    typeDocumentId: string;
};
export type PrestataireDocumentCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    typeDocumentId?: Prisma.SortOrder;
    fichierUrl?: Prisma.SortOrder;
    nomFichier?: Prisma.SortOrder;
    statut?: Prisma.SortOrder;
    validePar?: Prisma.SortOrder;
    valideAt?: Prisma.SortOrder;
    motifRefus?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PrestataireDocumentMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    typeDocumentId?: Prisma.SortOrder;
    fichierUrl?: Prisma.SortOrder;
    nomFichier?: Prisma.SortOrder;
    statut?: Prisma.SortOrder;
    validePar?: Prisma.SortOrder;
    valideAt?: Prisma.SortOrder;
    motifRefus?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PrestataireDocumentMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    prestataireId?: Prisma.SortOrder;
    typeDocumentId?: Prisma.SortOrder;
    fichierUrl?: Prisma.SortOrder;
    nomFichier?: Prisma.SortOrder;
    statut?: Prisma.SortOrder;
    validePar?: Prisma.SortOrder;
    valideAt?: Prisma.SortOrder;
    motifRefus?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PrestataireDocumentCreateNestedManyWithoutPrestataireInput = {
    create?: Prisma.XOR<Prisma.PrestataireDocumentCreateWithoutPrestataireInput, Prisma.PrestataireDocumentUncheckedCreateWithoutPrestataireInput> | Prisma.PrestataireDocumentCreateWithoutPrestataireInput[] | Prisma.PrestataireDocumentUncheckedCreateWithoutPrestataireInput[];
    connectOrCreate?: Prisma.PrestataireDocumentCreateOrConnectWithoutPrestataireInput | Prisma.PrestataireDocumentCreateOrConnectWithoutPrestataireInput[];
    createMany?: Prisma.PrestataireDocumentCreateManyPrestataireInputEnvelope;
    connect?: Prisma.PrestataireDocumentWhereUniqueInput | Prisma.PrestataireDocumentWhereUniqueInput[];
};
export type PrestataireDocumentUncheckedCreateNestedManyWithoutPrestataireInput = {
    create?: Prisma.XOR<Prisma.PrestataireDocumentCreateWithoutPrestataireInput, Prisma.PrestataireDocumentUncheckedCreateWithoutPrestataireInput> | Prisma.PrestataireDocumentCreateWithoutPrestataireInput[] | Prisma.PrestataireDocumentUncheckedCreateWithoutPrestataireInput[];
    connectOrCreate?: Prisma.PrestataireDocumentCreateOrConnectWithoutPrestataireInput | Prisma.PrestataireDocumentCreateOrConnectWithoutPrestataireInput[];
    createMany?: Prisma.PrestataireDocumentCreateManyPrestataireInputEnvelope;
    connect?: Prisma.PrestataireDocumentWhereUniqueInput | Prisma.PrestataireDocumentWhereUniqueInput[];
};
export type PrestataireDocumentUpdateManyWithoutPrestataireNestedInput = {
    create?: Prisma.XOR<Prisma.PrestataireDocumentCreateWithoutPrestataireInput, Prisma.PrestataireDocumentUncheckedCreateWithoutPrestataireInput> | Prisma.PrestataireDocumentCreateWithoutPrestataireInput[] | Prisma.PrestataireDocumentUncheckedCreateWithoutPrestataireInput[];
    connectOrCreate?: Prisma.PrestataireDocumentCreateOrConnectWithoutPrestataireInput | Prisma.PrestataireDocumentCreateOrConnectWithoutPrestataireInput[];
    upsert?: Prisma.PrestataireDocumentUpsertWithWhereUniqueWithoutPrestataireInput | Prisma.PrestataireDocumentUpsertWithWhereUniqueWithoutPrestataireInput[];
    createMany?: Prisma.PrestataireDocumentCreateManyPrestataireInputEnvelope;
    set?: Prisma.PrestataireDocumentWhereUniqueInput | Prisma.PrestataireDocumentWhereUniqueInput[];
    disconnect?: Prisma.PrestataireDocumentWhereUniqueInput | Prisma.PrestataireDocumentWhereUniqueInput[];
    delete?: Prisma.PrestataireDocumentWhereUniqueInput | Prisma.PrestataireDocumentWhereUniqueInput[];
    connect?: Prisma.PrestataireDocumentWhereUniqueInput | Prisma.PrestataireDocumentWhereUniqueInput[];
    update?: Prisma.PrestataireDocumentUpdateWithWhereUniqueWithoutPrestataireInput | Prisma.PrestataireDocumentUpdateWithWhereUniqueWithoutPrestataireInput[];
    updateMany?: Prisma.PrestataireDocumentUpdateManyWithWhereWithoutPrestataireInput | Prisma.PrestataireDocumentUpdateManyWithWhereWithoutPrestataireInput[];
    deleteMany?: Prisma.PrestataireDocumentScalarWhereInput | Prisma.PrestataireDocumentScalarWhereInput[];
};
export type PrestataireDocumentUncheckedUpdateManyWithoutPrestataireNestedInput = {
    create?: Prisma.XOR<Prisma.PrestataireDocumentCreateWithoutPrestataireInput, Prisma.PrestataireDocumentUncheckedCreateWithoutPrestataireInput> | Prisma.PrestataireDocumentCreateWithoutPrestataireInput[] | Prisma.PrestataireDocumentUncheckedCreateWithoutPrestataireInput[];
    connectOrCreate?: Prisma.PrestataireDocumentCreateOrConnectWithoutPrestataireInput | Prisma.PrestataireDocumentCreateOrConnectWithoutPrestataireInput[];
    upsert?: Prisma.PrestataireDocumentUpsertWithWhereUniqueWithoutPrestataireInput | Prisma.PrestataireDocumentUpsertWithWhereUniqueWithoutPrestataireInput[];
    createMany?: Prisma.PrestataireDocumentCreateManyPrestataireInputEnvelope;
    set?: Prisma.PrestataireDocumentWhereUniqueInput | Prisma.PrestataireDocumentWhereUniqueInput[];
    disconnect?: Prisma.PrestataireDocumentWhereUniqueInput | Prisma.PrestataireDocumentWhereUniqueInput[];
    delete?: Prisma.PrestataireDocumentWhereUniqueInput | Prisma.PrestataireDocumentWhereUniqueInput[];
    connect?: Prisma.PrestataireDocumentWhereUniqueInput | Prisma.PrestataireDocumentWhereUniqueInput[];
    update?: Prisma.PrestataireDocumentUpdateWithWhereUniqueWithoutPrestataireInput | Prisma.PrestataireDocumentUpdateWithWhereUniqueWithoutPrestataireInput[];
    updateMany?: Prisma.PrestataireDocumentUpdateManyWithWhereWithoutPrestataireInput | Prisma.PrestataireDocumentUpdateManyWithWhereWithoutPrestataireInput[];
    deleteMany?: Prisma.PrestataireDocumentScalarWhereInput | Prisma.PrestataireDocumentScalarWhereInput[];
};
export type PrestataireDocumentCreateNestedManyWithoutTypeDocumentInput = {
    create?: Prisma.XOR<Prisma.PrestataireDocumentCreateWithoutTypeDocumentInput, Prisma.PrestataireDocumentUncheckedCreateWithoutTypeDocumentInput> | Prisma.PrestataireDocumentCreateWithoutTypeDocumentInput[] | Prisma.PrestataireDocumentUncheckedCreateWithoutTypeDocumentInput[];
    connectOrCreate?: Prisma.PrestataireDocumentCreateOrConnectWithoutTypeDocumentInput | Prisma.PrestataireDocumentCreateOrConnectWithoutTypeDocumentInput[];
    createMany?: Prisma.PrestataireDocumentCreateManyTypeDocumentInputEnvelope;
    connect?: Prisma.PrestataireDocumentWhereUniqueInput | Prisma.PrestataireDocumentWhereUniqueInput[];
};
export type PrestataireDocumentUncheckedCreateNestedManyWithoutTypeDocumentInput = {
    create?: Prisma.XOR<Prisma.PrestataireDocumentCreateWithoutTypeDocumentInput, Prisma.PrestataireDocumentUncheckedCreateWithoutTypeDocumentInput> | Prisma.PrestataireDocumentCreateWithoutTypeDocumentInput[] | Prisma.PrestataireDocumentUncheckedCreateWithoutTypeDocumentInput[];
    connectOrCreate?: Prisma.PrestataireDocumentCreateOrConnectWithoutTypeDocumentInput | Prisma.PrestataireDocumentCreateOrConnectWithoutTypeDocumentInput[];
    createMany?: Prisma.PrestataireDocumentCreateManyTypeDocumentInputEnvelope;
    connect?: Prisma.PrestataireDocumentWhereUniqueInput | Prisma.PrestataireDocumentWhereUniqueInput[];
};
export type PrestataireDocumentUpdateManyWithoutTypeDocumentNestedInput = {
    create?: Prisma.XOR<Prisma.PrestataireDocumentCreateWithoutTypeDocumentInput, Prisma.PrestataireDocumentUncheckedCreateWithoutTypeDocumentInput> | Prisma.PrestataireDocumentCreateWithoutTypeDocumentInput[] | Prisma.PrestataireDocumentUncheckedCreateWithoutTypeDocumentInput[];
    connectOrCreate?: Prisma.PrestataireDocumentCreateOrConnectWithoutTypeDocumentInput | Prisma.PrestataireDocumentCreateOrConnectWithoutTypeDocumentInput[];
    upsert?: Prisma.PrestataireDocumentUpsertWithWhereUniqueWithoutTypeDocumentInput | Prisma.PrestataireDocumentUpsertWithWhereUniqueWithoutTypeDocumentInput[];
    createMany?: Prisma.PrestataireDocumentCreateManyTypeDocumentInputEnvelope;
    set?: Prisma.PrestataireDocumentWhereUniqueInput | Prisma.PrestataireDocumentWhereUniqueInput[];
    disconnect?: Prisma.PrestataireDocumentWhereUniqueInput | Prisma.PrestataireDocumentWhereUniqueInput[];
    delete?: Prisma.PrestataireDocumentWhereUniqueInput | Prisma.PrestataireDocumentWhereUniqueInput[];
    connect?: Prisma.PrestataireDocumentWhereUniqueInput | Prisma.PrestataireDocumentWhereUniqueInput[];
    update?: Prisma.PrestataireDocumentUpdateWithWhereUniqueWithoutTypeDocumentInput | Prisma.PrestataireDocumentUpdateWithWhereUniqueWithoutTypeDocumentInput[];
    updateMany?: Prisma.PrestataireDocumentUpdateManyWithWhereWithoutTypeDocumentInput | Prisma.PrestataireDocumentUpdateManyWithWhereWithoutTypeDocumentInput[];
    deleteMany?: Prisma.PrestataireDocumentScalarWhereInput | Prisma.PrestataireDocumentScalarWhereInput[];
};
export type PrestataireDocumentUncheckedUpdateManyWithoutTypeDocumentNestedInput = {
    create?: Prisma.XOR<Prisma.PrestataireDocumentCreateWithoutTypeDocumentInput, Prisma.PrestataireDocumentUncheckedCreateWithoutTypeDocumentInput> | Prisma.PrestataireDocumentCreateWithoutTypeDocumentInput[] | Prisma.PrestataireDocumentUncheckedCreateWithoutTypeDocumentInput[];
    connectOrCreate?: Prisma.PrestataireDocumentCreateOrConnectWithoutTypeDocumentInput | Prisma.PrestataireDocumentCreateOrConnectWithoutTypeDocumentInput[];
    upsert?: Prisma.PrestataireDocumentUpsertWithWhereUniqueWithoutTypeDocumentInput | Prisma.PrestataireDocumentUpsertWithWhereUniqueWithoutTypeDocumentInput[];
    createMany?: Prisma.PrestataireDocumentCreateManyTypeDocumentInputEnvelope;
    set?: Prisma.PrestataireDocumentWhereUniqueInput | Prisma.PrestataireDocumentWhereUniqueInput[];
    disconnect?: Prisma.PrestataireDocumentWhereUniqueInput | Prisma.PrestataireDocumentWhereUniqueInput[];
    delete?: Prisma.PrestataireDocumentWhereUniqueInput | Prisma.PrestataireDocumentWhereUniqueInput[];
    connect?: Prisma.PrestataireDocumentWhereUniqueInput | Prisma.PrestataireDocumentWhereUniqueInput[];
    update?: Prisma.PrestataireDocumentUpdateWithWhereUniqueWithoutTypeDocumentInput | Prisma.PrestataireDocumentUpdateWithWhereUniqueWithoutTypeDocumentInput[];
    updateMany?: Prisma.PrestataireDocumentUpdateManyWithWhereWithoutTypeDocumentInput | Prisma.PrestataireDocumentUpdateManyWithWhereWithoutTypeDocumentInput[];
    deleteMany?: Prisma.PrestataireDocumentScalarWhereInput | Prisma.PrestataireDocumentScalarWhereInput[];
};
export type EnumStatutDocumentFieldUpdateOperationsInput = {
    set?: $Enums.StatutDocument;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type PrestataireDocumentCreateWithoutPrestataireInput = {
    id?: string;
    fichierUrl: string;
    nomFichier?: string | null;
    statut?: $Enums.StatutDocument;
    validePar?: string | null;
    valideAt?: Date | string | null;
    motifRefus?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    typeDocument: Prisma.TypeDocumentCreateNestedOneWithoutDocumentsInput;
};
export type PrestataireDocumentUncheckedCreateWithoutPrestataireInput = {
    id?: string;
    typeDocumentId: string;
    fichierUrl: string;
    nomFichier?: string | null;
    statut?: $Enums.StatutDocument;
    validePar?: string | null;
    valideAt?: Date | string | null;
    motifRefus?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PrestataireDocumentCreateOrConnectWithoutPrestataireInput = {
    where: Prisma.PrestataireDocumentWhereUniqueInput;
    create: Prisma.XOR<Prisma.PrestataireDocumentCreateWithoutPrestataireInput, Prisma.PrestataireDocumentUncheckedCreateWithoutPrestataireInput>;
};
export type PrestataireDocumentCreateManyPrestataireInputEnvelope = {
    data: Prisma.PrestataireDocumentCreateManyPrestataireInput | Prisma.PrestataireDocumentCreateManyPrestataireInput[];
    skipDuplicates?: boolean;
};
export type PrestataireDocumentUpsertWithWhereUniqueWithoutPrestataireInput = {
    where: Prisma.PrestataireDocumentWhereUniqueInput;
    update: Prisma.XOR<Prisma.PrestataireDocumentUpdateWithoutPrestataireInput, Prisma.PrestataireDocumentUncheckedUpdateWithoutPrestataireInput>;
    create: Prisma.XOR<Prisma.PrestataireDocumentCreateWithoutPrestataireInput, Prisma.PrestataireDocumentUncheckedCreateWithoutPrestataireInput>;
};
export type PrestataireDocumentUpdateWithWhereUniqueWithoutPrestataireInput = {
    where: Prisma.PrestataireDocumentWhereUniqueInput;
    data: Prisma.XOR<Prisma.PrestataireDocumentUpdateWithoutPrestataireInput, Prisma.PrestataireDocumentUncheckedUpdateWithoutPrestataireInput>;
};
export type PrestataireDocumentUpdateManyWithWhereWithoutPrestataireInput = {
    where: Prisma.PrestataireDocumentScalarWhereInput;
    data: Prisma.XOR<Prisma.PrestataireDocumentUpdateManyMutationInput, Prisma.PrestataireDocumentUncheckedUpdateManyWithoutPrestataireInput>;
};
export type PrestataireDocumentScalarWhereInput = {
    AND?: Prisma.PrestataireDocumentScalarWhereInput | Prisma.PrestataireDocumentScalarWhereInput[];
    OR?: Prisma.PrestataireDocumentScalarWhereInput[];
    NOT?: Prisma.PrestataireDocumentScalarWhereInput | Prisma.PrestataireDocumentScalarWhereInput[];
    id?: Prisma.StringFilter<"PrestataireDocument"> | string;
    prestataireId?: Prisma.StringFilter<"PrestataireDocument"> | string;
    typeDocumentId?: Prisma.StringFilter<"PrestataireDocument"> | string;
    fichierUrl?: Prisma.StringFilter<"PrestataireDocument"> | string;
    nomFichier?: Prisma.StringNullableFilter<"PrestataireDocument"> | string | null;
    statut?: Prisma.EnumStatutDocumentFilter<"PrestataireDocument"> | $Enums.StatutDocument;
    validePar?: Prisma.StringNullableFilter<"PrestataireDocument"> | string | null;
    valideAt?: Prisma.DateTimeNullableFilter<"PrestataireDocument"> | Date | string | null;
    motifRefus?: Prisma.StringNullableFilter<"PrestataireDocument"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"PrestataireDocument"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PrestataireDocument"> | Date | string;
};
export type PrestataireDocumentCreateWithoutTypeDocumentInput = {
    id?: string;
    fichierUrl: string;
    nomFichier?: string | null;
    statut?: $Enums.StatutDocument;
    validePar?: string | null;
    valideAt?: Date | string | null;
    motifRefus?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    prestataire: Prisma.PrestataireCreateNestedOneWithoutDocumentsInput;
};
export type PrestataireDocumentUncheckedCreateWithoutTypeDocumentInput = {
    id?: string;
    prestataireId: string;
    fichierUrl: string;
    nomFichier?: string | null;
    statut?: $Enums.StatutDocument;
    validePar?: string | null;
    valideAt?: Date | string | null;
    motifRefus?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PrestataireDocumentCreateOrConnectWithoutTypeDocumentInput = {
    where: Prisma.PrestataireDocumentWhereUniqueInput;
    create: Prisma.XOR<Prisma.PrestataireDocumentCreateWithoutTypeDocumentInput, Prisma.PrestataireDocumentUncheckedCreateWithoutTypeDocumentInput>;
};
export type PrestataireDocumentCreateManyTypeDocumentInputEnvelope = {
    data: Prisma.PrestataireDocumentCreateManyTypeDocumentInput | Prisma.PrestataireDocumentCreateManyTypeDocumentInput[];
    skipDuplicates?: boolean;
};
export type PrestataireDocumentUpsertWithWhereUniqueWithoutTypeDocumentInput = {
    where: Prisma.PrestataireDocumentWhereUniqueInput;
    update: Prisma.XOR<Prisma.PrestataireDocumentUpdateWithoutTypeDocumentInput, Prisma.PrestataireDocumentUncheckedUpdateWithoutTypeDocumentInput>;
    create: Prisma.XOR<Prisma.PrestataireDocumentCreateWithoutTypeDocumentInput, Prisma.PrestataireDocumentUncheckedCreateWithoutTypeDocumentInput>;
};
export type PrestataireDocumentUpdateWithWhereUniqueWithoutTypeDocumentInput = {
    where: Prisma.PrestataireDocumentWhereUniqueInput;
    data: Prisma.XOR<Prisma.PrestataireDocumentUpdateWithoutTypeDocumentInput, Prisma.PrestataireDocumentUncheckedUpdateWithoutTypeDocumentInput>;
};
export type PrestataireDocumentUpdateManyWithWhereWithoutTypeDocumentInput = {
    where: Prisma.PrestataireDocumentScalarWhereInput;
    data: Prisma.XOR<Prisma.PrestataireDocumentUpdateManyMutationInput, Prisma.PrestataireDocumentUncheckedUpdateManyWithoutTypeDocumentInput>;
};
export type PrestataireDocumentCreateManyPrestataireInput = {
    id?: string;
    typeDocumentId: string;
    fichierUrl: string;
    nomFichier?: string | null;
    statut?: $Enums.StatutDocument;
    validePar?: string | null;
    valideAt?: Date | string | null;
    motifRefus?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PrestataireDocumentUpdateWithoutPrestataireInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fichierUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    nomFichier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    statut?: Prisma.EnumStatutDocumentFieldUpdateOperationsInput | $Enums.StatutDocument;
    validePar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    valideAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    motifRefus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    typeDocument?: Prisma.TypeDocumentUpdateOneRequiredWithoutDocumentsNestedInput;
};
export type PrestataireDocumentUncheckedUpdateWithoutPrestataireInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    typeDocumentId?: Prisma.StringFieldUpdateOperationsInput | string;
    fichierUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    nomFichier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    statut?: Prisma.EnumStatutDocumentFieldUpdateOperationsInput | $Enums.StatutDocument;
    validePar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    valideAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    motifRefus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PrestataireDocumentUncheckedUpdateManyWithoutPrestataireInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    typeDocumentId?: Prisma.StringFieldUpdateOperationsInput | string;
    fichierUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    nomFichier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    statut?: Prisma.EnumStatutDocumentFieldUpdateOperationsInput | $Enums.StatutDocument;
    validePar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    valideAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    motifRefus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PrestataireDocumentCreateManyTypeDocumentInput = {
    id?: string;
    prestataireId: string;
    fichierUrl: string;
    nomFichier?: string | null;
    statut?: $Enums.StatutDocument;
    validePar?: string | null;
    valideAt?: Date | string | null;
    motifRefus?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PrestataireDocumentUpdateWithoutTypeDocumentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fichierUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    nomFichier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    statut?: Prisma.EnumStatutDocumentFieldUpdateOperationsInput | $Enums.StatutDocument;
    validePar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    valideAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    motifRefus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    prestataire?: Prisma.PrestataireUpdateOneRequiredWithoutDocumentsNestedInput;
};
export type PrestataireDocumentUncheckedUpdateWithoutTypeDocumentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    prestataireId?: Prisma.StringFieldUpdateOperationsInput | string;
    fichierUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    nomFichier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    statut?: Prisma.EnumStatutDocumentFieldUpdateOperationsInput | $Enums.StatutDocument;
    validePar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    valideAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    motifRefus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PrestataireDocumentUncheckedUpdateManyWithoutTypeDocumentInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    prestataireId?: Prisma.StringFieldUpdateOperationsInput | string;
    fichierUrl?: Prisma.StringFieldUpdateOperationsInput | string;
    nomFichier?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    statut?: Prisma.EnumStatutDocumentFieldUpdateOperationsInput | $Enums.StatutDocument;
    validePar?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    valideAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    motifRefus?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PrestataireDocumentSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    prestataireId?: boolean;
    typeDocumentId?: boolean;
    fichierUrl?: boolean;
    nomFichier?: boolean;
    statut?: boolean;
    validePar?: boolean;
    valideAt?: boolean;
    motifRefus?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
    typeDocument?: boolean | Prisma.TypeDocumentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["prestataireDocument"]>;
export type PrestataireDocumentSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    prestataireId?: boolean;
    typeDocumentId?: boolean;
    fichierUrl?: boolean;
    nomFichier?: boolean;
    statut?: boolean;
    validePar?: boolean;
    valideAt?: boolean;
    motifRefus?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
    typeDocument?: boolean | Prisma.TypeDocumentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["prestataireDocument"]>;
export type PrestataireDocumentSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    prestataireId?: boolean;
    typeDocumentId?: boolean;
    fichierUrl?: boolean;
    nomFichier?: boolean;
    statut?: boolean;
    validePar?: boolean;
    valideAt?: boolean;
    motifRefus?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
    typeDocument?: boolean | Prisma.TypeDocumentDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["prestataireDocument"]>;
export type PrestataireDocumentSelectScalar = {
    id?: boolean;
    prestataireId?: boolean;
    typeDocumentId?: boolean;
    fichierUrl?: boolean;
    nomFichier?: boolean;
    statut?: boolean;
    validePar?: boolean;
    valideAt?: boolean;
    motifRefus?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PrestataireDocumentOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "prestataireId" | "typeDocumentId" | "fichierUrl" | "nomFichier" | "statut" | "validePar" | "valideAt" | "motifRefus" | "createdAt" | "updatedAt", ExtArgs["result"]["prestataireDocument"]>;
export type PrestataireDocumentInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
    typeDocument?: boolean | Prisma.TypeDocumentDefaultArgs<ExtArgs>;
};
export type PrestataireDocumentIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
    typeDocument?: boolean | Prisma.TypeDocumentDefaultArgs<ExtArgs>;
};
export type PrestataireDocumentIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    prestataire?: boolean | Prisma.PrestataireDefaultArgs<ExtArgs>;
    typeDocument?: boolean | Prisma.TypeDocumentDefaultArgs<ExtArgs>;
};
export type $PrestataireDocumentPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PrestataireDocument";
    objects: {
        prestataire: Prisma.$PrestatairePayload<ExtArgs>;
        typeDocument: Prisma.$TypeDocumentPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        prestataireId: string;
        typeDocumentId: string;
        fichierUrl: string;
        nomFichier: string | null;
        statut: $Enums.StatutDocument;
        validePar: string | null;
        valideAt: Date | null;
        motifRefus: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["prestataireDocument"]>;
    composites: {};
};
export type PrestataireDocumentGetPayload<S extends boolean | null | undefined | PrestataireDocumentDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PrestataireDocumentPayload, S>;
export type PrestataireDocumentCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PrestataireDocumentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PrestataireDocumentCountAggregateInputType | true;
};
export interface PrestataireDocumentDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PrestataireDocument'];
        meta: {
            name: 'PrestataireDocument';
        };
    };
    findUnique<T extends PrestataireDocumentFindUniqueArgs>(args: Prisma.SelectSubset<T, PrestataireDocumentFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PrestataireDocumentClient<runtime.Types.Result.GetResult<Prisma.$PrestataireDocumentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PrestataireDocumentFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PrestataireDocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PrestataireDocumentClient<runtime.Types.Result.GetResult<Prisma.$PrestataireDocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PrestataireDocumentFindFirstArgs>(args?: Prisma.SelectSubset<T, PrestataireDocumentFindFirstArgs<ExtArgs>>): Prisma.Prisma__PrestataireDocumentClient<runtime.Types.Result.GetResult<Prisma.$PrestataireDocumentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PrestataireDocumentFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PrestataireDocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PrestataireDocumentClient<runtime.Types.Result.GetResult<Prisma.$PrestataireDocumentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PrestataireDocumentFindManyArgs>(args?: Prisma.SelectSubset<T, PrestataireDocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PrestataireDocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PrestataireDocumentCreateArgs>(args: Prisma.SelectSubset<T, PrestataireDocumentCreateArgs<ExtArgs>>): Prisma.Prisma__PrestataireDocumentClient<runtime.Types.Result.GetResult<Prisma.$PrestataireDocumentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PrestataireDocumentCreateManyArgs>(args?: Prisma.SelectSubset<T, PrestataireDocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PrestataireDocumentCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PrestataireDocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PrestataireDocumentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PrestataireDocumentDeleteArgs>(args: Prisma.SelectSubset<T, PrestataireDocumentDeleteArgs<ExtArgs>>): Prisma.Prisma__PrestataireDocumentClient<runtime.Types.Result.GetResult<Prisma.$PrestataireDocumentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PrestataireDocumentUpdateArgs>(args: Prisma.SelectSubset<T, PrestataireDocumentUpdateArgs<ExtArgs>>): Prisma.Prisma__PrestataireDocumentClient<runtime.Types.Result.GetResult<Prisma.$PrestataireDocumentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PrestataireDocumentDeleteManyArgs>(args?: Prisma.SelectSubset<T, PrestataireDocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PrestataireDocumentUpdateManyArgs>(args: Prisma.SelectSubset<T, PrestataireDocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PrestataireDocumentUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PrestataireDocumentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PrestataireDocumentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PrestataireDocumentUpsertArgs>(args: Prisma.SelectSubset<T, PrestataireDocumentUpsertArgs<ExtArgs>>): Prisma.Prisma__PrestataireDocumentClient<runtime.Types.Result.GetResult<Prisma.$PrestataireDocumentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PrestataireDocumentCountArgs>(args?: Prisma.Subset<T, PrestataireDocumentCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PrestataireDocumentCountAggregateOutputType> : number>;
    aggregate<T extends PrestataireDocumentAggregateArgs>(args: Prisma.Subset<T, PrestataireDocumentAggregateArgs>): Prisma.PrismaPromise<GetPrestataireDocumentAggregateType<T>>;
    groupBy<T extends PrestataireDocumentGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PrestataireDocumentGroupByArgs['orderBy'];
    } : {
        orderBy?: PrestataireDocumentGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PrestataireDocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrestataireDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PrestataireDocumentFieldRefs;
}
export interface Prisma__PrestataireDocumentClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    prestataire<T extends Prisma.PrestataireDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.PrestataireDefaultArgs<ExtArgs>>): Prisma.Prisma__PrestataireClient<runtime.Types.Result.GetResult<Prisma.$PrestatairePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    typeDocument<T extends Prisma.TypeDocumentDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TypeDocumentDefaultArgs<ExtArgs>>): Prisma.Prisma__TypeDocumentClient<runtime.Types.Result.GetResult<Prisma.$TypeDocumentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PrestataireDocumentFieldRefs {
    readonly id: Prisma.FieldRef<"PrestataireDocument", 'String'>;
    readonly prestataireId: Prisma.FieldRef<"PrestataireDocument", 'String'>;
    readonly typeDocumentId: Prisma.FieldRef<"PrestataireDocument", 'String'>;
    readonly fichierUrl: Prisma.FieldRef<"PrestataireDocument", 'String'>;
    readonly nomFichier: Prisma.FieldRef<"PrestataireDocument", 'String'>;
    readonly statut: Prisma.FieldRef<"PrestataireDocument", 'StatutDocument'>;
    readonly validePar: Prisma.FieldRef<"PrestataireDocument", 'String'>;
    readonly valideAt: Prisma.FieldRef<"PrestataireDocument", 'DateTime'>;
    readonly motifRefus: Prisma.FieldRef<"PrestataireDocument", 'String'>;
    readonly createdAt: Prisma.FieldRef<"PrestataireDocument", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"PrestataireDocument", 'DateTime'>;
}
export type PrestataireDocumentFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestataireDocumentSelect<ExtArgs> | null;
    omit?: Prisma.PrestataireDocumentOmit<ExtArgs> | null;
    include?: Prisma.PrestataireDocumentInclude<ExtArgs> | null;
    where: Prisma.PrestataireDocumentWhereUniqueInput;
};
export type PrestataireDocumentFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestataireDocumentSelect<ExtArgs> | null;
    omit?: Prisma.PrestataireDocumentOmit<ExtArgs> | null;
    include?: Prisma.PrestataireDocumentInclude<ExtArgs> | null;
    where: Prisma.PrestataireDocumentWhereUniqueInput;
};
export type PrestataireDocumentFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PrestataireDocumentFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PrestataireDocumentFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type PrestataireDocumentCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestataireDocumentSelect<ExtArgs> | null;
    omit?: Prisma.PrestataireDocumentOmit<ExtArgs> | null;
    include?: Prisma.PrestataireDocumentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PrestataireDocumentCreateInput, Prisma.PrestataireDocumentUncheckedCreateInput>;
};
export type PrestataireDocumentCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PrestataireDocumentCreateManyInput | Prisma.PrestataireDocumentCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PrestataireDocumentCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestataireDocumentSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PrestataireDocumentOmit<ExtArgs> | null;
    data: Prisma.PrestataireDocumentCreateManyInput | Prisma.PrestataireDocumentCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.PrestataireDocumentIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type PrestataireDocumentUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestataireDocumentSelect<ExtArgs> | null;
    omit?: Prisma.PrestataireDocumentOmit<ExtArgs> | null;
    include?: Prisma.PrestataireDocumentInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PrestataireDocumentUpdateInput, Prisma.PrestataireDocumentUncheckedUpdateInput>;
    where: Prisma.PrestataireDocumentWhereUniqueInput;
};
export type PrestataireDocumentUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PrestataireDocumentUpdateManyMutationInput, Prisma.PrestataireDocumentUncheckedUpdateManyInput>;
    where?: Prisma.PrestataireDocumentWhereInput;
    limit?: number;
};
export type PrestataireDocumentUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestataireDocumentSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PrestataireDocumentOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PrestataireDocumentUpdateManyMutationInput, Prisma.PrestataireDocumentUncheckedUpdateManyInput>;
    where?: Prisma.PrestataireDocumentWhereInput;
    limit?: number;
    include?: Prisma.PrestataireDocumentIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type PrestataireDocumentUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestataireDocumentSelect<ExtArgs> | null;
    omit?: Prisma.PrestataireDocumentOmit<ExtArgs> | null;
    include?: Prisma.PrestataireDocumentInclude<ExtArgs> | null;
    where: Prisma.PrestataireDocumentWhereUniqueInput;
    create: Prisma.XOR<Prisma.PrestataireDocumentCreateInput, Prisma.PrestataireDocumentUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PrestataireDocumentUpdateInput, Prisma.PrestataireDocumentUncheckedUpdateInput>;
};
export type PrestataireDocumentDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestataireDocumentSelect<ExtArgs> | null;
    omit?: Prisma.PrestataireDocumentOmit<ExtArgs> | null;
    include?: Prisma.PrestataireDocumentInclude<ExtArgs> | null;
    where: Prisma.PrestataireDocumentWhereUniqueInput;
};
export type PrestataireDocumentDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PrestataireDocumentWhereInput;
    limit?: number;
};
export type PrestataireDocumentDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PrestataireDocumentSelect<ExtArgs> | null;
    omit?: Prisma.PrestataireDocumentOmit<ExtArgs> | null;
    include?: Prisma.PrestataireDocumentInclude<ExtArgs> | null;
};
export {};
