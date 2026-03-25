import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models";
import { type PrismaClient } from "./class";
export type * from '../models';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
export declare const prismaVersion: PrismaVersion;
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
export declare const DbNull: runtime.DbNullClass;
export declare const JsonNull: runtime.JsonNullClass;
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
export declare const ModelName: {
    readonly User: "User";
    readonly Particulier: "Particulier";
    readonly Prestataire: "Prestataire";
    readonly Offre: "Offre";
    readonly Abonnement: "Abonnement";
    readonly TypeDocument: "TypeDocument";
    readonly PrestataireDocument: "PrestataireDocument";
    readonly PrestatairePhoto: "PrestatairePhoto";
    readonly Service: "Service";
    readonly PrestataireService: "PrestataireService";
    readonly Wallet: "Wallet";
    readonly WalletTransaction: "WalletTransaction";
    readonly WithdrawalRequest: "WithdrawalRequest";
    readonly Prestation: "Prestation";
    readonly Notification: "Notification";
    readonly AvisPrestataire: "AvisPrestataire";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "user" | "particulier" | "prestataire" | "offre" | "abonnement" | "typeDocument" | "prestataireDocument" | "prestatairePhoto" | "service" | "prestataireService" | "wallet" | "walletTransaction" | "withdrawalRequest" | "prestation" | "notification" | "avisPrestataire";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        User: {
            payload: Prisma.$UserPayload<ExtArgs>;
            fields: Prisma.UserFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.UserFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findFirst: {
                    args: Prisma.UserFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                findMany: {
                    args: Prisma.UserFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                create: {
                    args: Prisma.UserCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                createMany: {
                    args: Prisma.UserCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                delete: {
                    args: Prisma.UserDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                update: {
                    args: Prisma.UserUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                deleteMany: {
                    args: Prisma.UserDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.UserUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>[];
                };
                upsert: {
                    args: Prisma.UserUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$UserPayload>;
                };
                aggregate: {
                    args: Prisma.UserAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateUser>;
                };
                groupBy: {
                    args: Prisma.UserGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserGroupByOutputType>[];
                };
                count: {
                    args: Prisma.UserCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.UserCountAggregateOutputType> | number;
                };
            };
        };
        Particulier: {
            payload: Prisma.$ParticulierPayload<ExtArgs>;
            fields: Prisma.ParticulierFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ParticulierFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ParticulierPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ParticulierFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ParticulierPayload>;
                };
                findFirst: {
                    args: Prisma.ParticulierFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ParticulierPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ParticulierFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ParticulierPayload>;
                };
                findMany: {
                    args: Prisma.ParticulierFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ParticulierPayload>[];
                };
                create: {
                    args: Prisma.ParticulierCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ParticulierPayload>;
                };
                createMany: {
                    args: Prisma.ParticulierCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ParticulierCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ParticulierPayload>[];
                };
                delete: {
                    args: Prisma.ParticulierDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ParticulierPayload>;
                };
                update: {
                    args: Prisma.ParticulierUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ParticulierPayload>;
                };
                deleteMany: {
                    args: Prisma.ParticulierDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ParticulierUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ParticulierUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ParticulierPayload>[];
                };
                upsert: {
                    args: Prisma.ParticulierUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ParticulierPayload>;
                };
                aggregate: {
                    args: Prisma.ParticulierAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateParticulier>;
                };
                groupBy: {
                    args: Prisma.ParticulierGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ParticulierGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ParticulierCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ParticulierCountAggregateOutputType> | number;
                };
            };
        };
        Prestataire: {
            payload: Prisma.$PrestatairePayload<ExtArgs>;
            fields: Prisma.PrestataireFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PrestataireFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestatairePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PrestataireFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestatairePayload>;
                };
                findFirst: {
                    args: Prisma.PrestataireFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestatairePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PrestataireFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestatairePayload>;
                };
                findMany: {
                    args: Prisma.PrestataireFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestatairePayload>[];
                };
                create: {
                    args: Prisma.PrestataireCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestatairePayload>;
                };
                createMany: {
                    args: Prisma.PrestataireCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PrestataireCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestatairePayload>[];
                };
                delete: {
                    args: Prisma.PrestataireDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestatairePayload>;
                };
                update: {
                    args: Prisma.PrestataireUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestatairePayload>;
                };
                deleteMany: {
                    args: Prisma.PrestataireDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PrestataireUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PrestataireUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestatairePayload>[];
                };
                upsert: {
                    args: Prisma.PrestataireUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestatairePayload>;
                };
                aggregate: {
                    args: Prisma.PrestataireAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePrestataire>;
                };
                groupBy: {
                    args: Prisma.PrestataireGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PrestataireGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PrestataireCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PrestataireCountAggregateOutputType> | number;
                };
            };
        };
        Offre: {
            payload: Prisma.$OffrePayload<ExtArgs>;
            fields: Prisma.OffreFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.OffreFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OffrePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.OffreFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OffrePayload>;
                };
                findFirst: {
                    args: Prisma.OffreFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OffrePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.OffreFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OffrePayload>;
                };
                findMany: {
                    args: Prisma.OffreFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OffrePayload>[];
                };
                create: {
                    args: Prisma.OffreCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OffrePayload>;
                };
                createMany: {
                    args: Prisma.OffreCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.OffreCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OffrePayload>[];
                };
                delete: {
                    args: Prisma.OffreDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OffrePayload>;
                };
                update: {
                    args: Prisma.OffreUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OffrePayload>;
                };
                deleteMany: {
                    args: Prisma.OffreDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.OffreUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.OffreUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OffrePayload>[];
                };
                upsert: {
                    args: Prisma.OffreUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$OffrePayload>;
                };
                aggregate: {
                    args: Prisma.OffreAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateOffre>;
                };
                groupBy: {
                    args: Prisma.OffreGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OffreGroupByOutputType>[];
                };
                count: {
                    args: Prisma.OffreCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.OffreCountAggregateOutputType> | number;
                };
            };
        };
        Abonnement: {
            payload: Prisma.$AbonnementPayload<ExtArgs>;
            fields: Prisma.AbonnementFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AbonnementFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AbonnementPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AbonnementFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AbonnementPayload>;
                };
                findFirst: {
                    args: Prisma.AbonnementFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AbonnementPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AbonnementFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AbonnementPayload>;
                };
                findMany: {
                    args: Prisma.AbonnementFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AbonnementPayload>[];
                };
                create: {
                    args: Prisma.AbonnementCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AbonnementPayload>;
                };
                createMany: {
                    args: Prisma.AbonnementCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AbonnementCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AbonnementPayload>[];
                };
                delete: {
                    args: Prisma.AbonnementDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AbonnementPayload>;
                };
                update: {
                    args: Prisma.AbonnementUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AbonnementPayload>;
                };
                deleteMany: {
                    args: Prisma.AbonnementDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AbonnementUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AbonnementUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AbonnementPayload>[];
                };
                upsert: {
                    args: Prisma.AbonnementUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AbonnementPayload>;
                };
                aggregate: {
                    args: Prisma.AbonnementAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAbonnement>;
                };
                groupBy: {
                    args: Prisma.AbonnementGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AbonnementGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AbonnementCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AbonnementCountAggregateOutputType> | number;
                };
            };
        };
        TypeDocument: {
            payload: Prisma.$TypeDocumentPayload<ExtArgs>;
            fields: Prisma.TypeDocumentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.TypeDocumentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TypeDocumentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.TypeDocumentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TypeDocumentPayload>;
                };
                findFirst: {
                    args: Prisma.TypeDocumentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TypeDocumentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.TypeDocumentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TypeDocumentPayload>;
                };
                findMany: {
                    args: Prisma.TypeDocumentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TypeDocumentPayload>[];
                };
                create: {
                    args: Prisma.TypeDocumentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TypeDocumentPayload>;
                };
                createMany: {
                    args: Prisma.TypeDocumentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.TypeDocumentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TypeDocumentPayload>[];
                };
                delete: {
                    args: Prisma.TypeDocumentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TypeDocumentPayload>;
                };
                update: {
                    args: Prisma.TypeDocumentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TypeDocumentPayload>;
                };
                deleteMany: {
                    args: Prisma.TypeDocumentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.TypeDocumentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.TypeDocumentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TypeDocumentPayload>[];
                };
                upsert: {
                    args: Prisma.TypeDocumentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$TypeDocumentPayload>;
                };
                aggregate: {
                    args: Prisma.TypeDocumentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateTypeDocument>;
                };
                groupBy: {
                    args: Prisma.TypeDocumentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TypeDocumentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.TypeDocumentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.TypeDocumentCountAggregateOutputType> | number;
                };
            };
        };
        PrestataireDocument: {
            payload: Prisma.$PrestataireDocumentPayload<ExtArgs>;
            fields: Prisma.PrestataireDocumentFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PrestataireDocumentFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestataireDocumentPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PrestataireDocumentFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestataireDocumentPayload>;
                };
                findFirst: {
                    args: Prisma.PrestataireDocumentFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestataireDocumentPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PrestataireDocumentFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestataireDocumentPayload>;
                };
                findMany: {
                    args: Prisma.PrestataireDocumentFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestataireDocumentPayload>[];
                };
                create: {
                    args: Prisma.PrestataireDocumentCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestataireDocumentPayload>;
                };
                createMany: {
                    args: Prisma.PrestataireDocumentCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PrestataireDocumentCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestataireDocumentPayload>[];
                };
                delete: {
                    args: Prisma.PrestataireDocumentDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestataireDocumentPayload>;
                };
                update: {
                    args: Prisma.PrestataireDocumentUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestataireDocumentPayload>;
                };
                deleteMany: {
                    args: Prisma.PrestataireDocumentDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PrestataireDocumentUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PrestataireDocumentUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestataireDocumentPayload>[];
                };
                upsert: {
                    args: Prisma.PrestataireDocumentUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestataireDocumentPayload>;
                };
                aggregate: {
                    args: Prisma.PrestataireDocumentAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePrestataireDocument>;
                };
                groupBy: {
                    args: Prisma.PrestataireDocumentGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PrestataireDocumentGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PrestataireDocumentCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PrestataireDocumentCountAggregateOutputType> | number;
                };
            };
        };
        PrestatairePhoto: {
            payload: Prisma.$PrestatairePhotoPayload<ExtArgs>;
            fields: Prisma.PrestatairePhotoFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PrestatairePhotoFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestatairePhotoPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PrestatairePhotoFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestatairePhotoPayload>;
                };
                findFirst: {
                    args: Prisma.PrestatairePhotoFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestatairePhotoPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PrestatairePhotoFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestatairePhotoPayload>;
                };
                findMany: {
                    args: Prisma.PrestatairePhotoFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestatairePhotoPayload>[];
                };
                create: {
                    args: Prisma.PrestatairePhotoCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestatairePhotoPayload>;
                };
                createMany: {
                    args: Prisma.PrestatairePhotoCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PrestatairePhotoCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestatairePhotoPayload>[];
                };
                delete: {
                    args: Prisma.PrestatairePhotoDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestatairePhotoPayload>;
                };
                update: {
                    args: Prisma.PrestatairePhotoUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestatairePhotoPayload>;
                };
                deleteMany: {
                    args: Prisma.PrestatairePhotoDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PrestatairePhotoUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PrestatairePhotoUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestatairePhotoPayload>[];
                };
                upsert: {
                    args: Prisma.PrestatairePhotoUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestatairePhotoPayload>;
                };
                aggregate: {
                    args: Prisma.PrestatairePhotoAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePrestatairePhoto>;
                };
                groupBy: {
                    args: Prisma.PrestatairePhotoGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PrestatairePhotoGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PrestatairePhotoCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PrestatairePhotoCountAggregateOutputType> | number;
                };
            };
        };
        Service: {
            payload: Prisma.$ServicePayload<ExtArgs>;
            fields: Prisma.ServiceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.ServiceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.ServiceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload>;
                };
                findFirst: {
                    args: Prisma.ServiceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.ServiceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload>;
                };
                findMany: {
                    args: Prisma.ServiceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload>[];
                };
                create: {
                    args: Prisma.ServiceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload>;
                };
                createMany: {
                    args: Prisma.ServiceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.ServiceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload>[];
                };
                delete: {
                    args: Prisma.ServiceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload>;
                };
                update: {
                    args: Prisma.ServiceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload>;
                };
                deleteMany: {
                    args: Prisma.ServiceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.ServiceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.ServiceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload>[];
                };
                upsert: {
                    args: Prisma.ServiceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$ServicePayload>;
                };
                aggregate: {
                    args: Prisma.ServiceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateService>;
                };
                groupBy: {
                    args: Prisma.ServiceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ServiceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.ServiceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.ServiceCountAggregateOutputType> | number;
                };
            };
        };
        PrestataireService: {
            payload: Prisma.$PrestataireServicePayload<ExtArgs>;
            fields: Prisma.PrestataireServiceFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PrestataireServiceFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestataireServicePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PrestataireServiceFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestataireServicePayload>;
                };
                findFirst: {
                    args: Prisma.PrestataireServiceFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestataireServicePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PrestataireServiceFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestataireServicePayload>;
                };
                findMany: {
                    args: Prisma.PrestataireServiceFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestataireServicePayload>[];
                };
                create: {
                    args: Prisma.PrestataireServiceCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestataireServicePayload>;
                };
                createMany: {
                    args: Prisma.PrestataireServiceCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PrestataireServiceCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestataireServicePayload>[];
                };
                delete: {
                    args: Prisma.PrestataireServiceDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestataireServicePayload>;
                };
                update: {
                    args: Prisma.PrestataireServiceUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestataireServicePayload>;
                };
                deleteMany: {
                    args: Prisma.PrestataireServiceDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PrestataireServiceUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PrestataireServiceUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestataireServicePayload>[];
                };
                upsert: {
                    args: Prisma.PrestataireServiceUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestataireServicePayload>;
                };
                aggregate: {
                    args: Prisma.PrestataireServiceAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePrestataireService>;
                };
                groupBy: {
                    args: Prisma.PrestataireServiceGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PrestataireServiceGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PrestataireServiceCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PrestataireServiceCountAggregateOutputType> | number;
                };
            };
        };
        Wallet: {
            payload: Prisma.$WalletPayload<ExtArgs>;
            fields: Prisma.WalletFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WalletFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WalletFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload>;
                };
                findFirst: {
                    args: Prisma.WalletFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WalletFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload>;
                };
                findMany: {
                    args: Prisma.WalletFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload>[];
                };
                create: {
                    args: Prisma.WalletCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload>;
                };
                createMany: {
                    args: Prisma.WalletCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WalletCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload>[];
                };
                delete: {
                    args: Prisma.WalletDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload>;
                };
                update: {
                    args: Prisma.WalletUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload>;
                };
                deleteMany: {
                    args: Prisma.WalletDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WalletUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WalletUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload>[];
                };
                upsert: {
                    args: Prisma.WalletUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletPayload>;
                };
                aggregate: {
                    args: Prisma.WalletAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWallet>;
                };
                groupBy: {
                    args: Prisma.WalletGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WalletGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WalletCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WalletCountAggregateOutputType> | number;
                };
            };
        };
        WalletTransaction: {
            payload: Prisma.$WalletTransactionPayload<ExtArgs>;
            fields: Prisma.WalletTransactionFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WalletTransactionFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WalletTransactionFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload>;
                };
                findFirst: {
                    args: Prisma.WalletTransactionFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WalletTransactionFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload>;
                };
                findMany: {
                    args: Prisma.WalletTransactionFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload>[];
                };
                create: {
                    args: Prisma.WalletTransactionCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload>;
                };
                createMany: {
                    args: Prisma.WalletTransactionCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WalletTransactionCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload>[];
                };
                delete: {
                    args: Prisma.WalletTransactionDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload>;
                };
                update: {
                    args: Prisma.WalletTransactionUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload>;
                };
                deleteMany: {
                    args: Prisma.WalletTransactionDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WalletTransactionUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WalletTransactionUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload>[];
                };
                upsert: {
                    args: Prisma.WalletTransactionUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WalletTransactionPayload>;
                };
                aggregate: {
                    args: Prisma.WalletTransactionAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWalletTransaction>;
                };
                groupBy: {
                    args: Prisma.WalletTransactionGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WalletTransactionGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WalletTransactionCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WalletTransactionCountAggregateOutputType> | number;
                };
            };
        };
        WithdrawalRequest: {
            payload: Prisma.$WithdrawalRequestPayload<ExtArgs>;
            fields: Prisma.WithdrawalRequestFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.WithdrawalRequestFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.WithdrawalRequestFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload>;
                };
                findFirst: {
                    args: Prisma.WithdrawalRequestFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.WithdrawalRequestFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload>;
                };
                findMany: {
                    args: Prisma.WithdrawalRequestFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload>[];
                };
                create: {
                    args: Prisma.WithdrawalRequestCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload>;
                };
                createMany: {
                    args: Prisma.WithdrawalRequestCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.WithdrawalRequestCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload>[];
                };
                delete: {
                    args: Prisma.WithdrawalRequestDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload>;
                };
                update: {
                    args: Prisma.WithdrawalRequestUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload>;
                };
                deleteMany: {
                    args: Prisma.WithdrawalRequestDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.WithdrawalRequestUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.WithdrawalRequestUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload>[];
                };
                upsert: {
                    args: Prisma.WithdrawalRequestUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$WithdrawalRequestPayload>;
                };
                aggregate: {
                    args: Prisma.WithdrawalRequestAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateWithdrawalRequest>;
                };
                groupBy: {
                    args: Prisma.WithdrawalRequestGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WithdrawalRequestGroupByOutputType>[];
                };
                count: {
                    args: Prisma.WithdrawalRequestCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.WithdrawalRequestCountAggregateOutputType> | number;
                };
            };
        };
        Prestation: {
            payload: Prisma.$PrestationPayload<ExtArgs>;
            fields: Prisma.PrestationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.PrestationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.PrestationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestationPayload>;
                };
                findFirst: {
                    args: Prisma.PrestationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.PrestationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestationPayload>;
                };
                findMany: {
                    args: Prisma.PrestationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestationPayload>[];
                };
                create: {
                    args: Prisma.PrestationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestationPayload>;
                };
                createMany: {
                    args: Prisma.PrestationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.PrestationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestationPayload>[];
                };
                delete: {
                    args: Prisma.PrestationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestationPayload>;
                };
                update: {
                    args: Prisma.PrestationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestationPayload>;
                };
                deleteMany: {
                    args: Prisma.PrestationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.PrestationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.PrestationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestationPayload>[];
                };
                upsert: {
                    args: Prisma.PrestationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$PrestationPayload>;
                };
                aggregate: {
                    args: Prisma.PrestationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregatePrestation>;
                };
                groupBy: {
                    args: Prisma.PrestationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PrestationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.PrestationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.PrestationCountAggregateOutputType> | number;
                };
            };
        };
        Notification: {
            payload: Prisma.$NotificationPayload<ExtArgs>;
            fields: Prisma.NotificationFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.NotificationFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.NotificationFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                findFirst: {
                    args: Prisma.NotificationFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.NotificationFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                findMany: {
                    args: Prisma.NotificationFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                create: {
                    args: Prisma.NotificationCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                createMany: {
                    args: Prisma.NotificationCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.NotificationCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                delete: {
                    args: Prisma.NotificationDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                update: {
                    args: Prisma.NotificationUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                deleteMany: {
                    args: Prisma.NotificationDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.NotificationUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.NotificationUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>[];
                };
                upsert: {
                    args: Prisma.NotificationUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$NotificationPayload>;
                };
                aggregate: {
                    args: Prisma.NotificationAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNotification>;
                };
                groupBy: {
                    args: Prisma.NotificationGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationGroupByOutputType>[];
                };
                count: {
                    args: Prisma.NotificationCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NotificationCountAggregateOutputType> | number;
                };
            };
        };
        AvisPrestataire: {
            payload: Prisma.$AvisPrestatairePayload<ExtArgs>;
            fields: Prisma.AvisPrestataireFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.AvisPrestataireFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AvisPrestatairePayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.AvisPrestataireFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AvisPrestatairePayload>;
                };
                findFirst: {
                    args: Prisma.AvisPrestataireFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AvisPrestatairePayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.AvisPrestataireFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AvisPrestatairePayload>;
                };
                findMany: {
                    args: Prisma.AvisPrestataireFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AvisPrestatairePayload>[];
                };
                create: {
                    args: Prisma.AvisPrestataireCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AvisPrestatairePayload>;
                };
                createMany: {
                    args: Prisma.AvisPrestataireCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.AvisPrestataireCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AvisPrestatairePayload>[];
                };
                delete: {
                    args: Prisma.AvisPrestataireDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AvisPrestatairePayload>;
                };
                update: {
                    args: Prisma.AvisPrestataireUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AvisPrestatairePayload>;
                };
                deleteMany: {
                    args: Prisma.AvisPrestataireDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.AvisPrestataireUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.AvisPrestataireUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AvisPrestatairePayload>[];
                };
                upsert: {
                    args: Prisma.AvisPrestataireUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$AvisPrestatairePayload>;
                };
                aggregate: {
                    args: Prisma.AvisPrestataireAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAvisPrestataire>;
                };
                groupBy: {
                    args: Prisma.AvisPrestataireGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AvisPrestataireGroupByOutputType>[];
                };
                count: {
                    args: Prisma.AvisPrestataireCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AvisPrestataireCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly role: "role";
    readonly emailVerified: "emailVerified";
    readonly fcmToken: "fcmToken";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const ParticulierScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly nom: "nom";
    readonly prenom: "prenom";
    readonly telephone: "telephone";
    readonly adresse: "adresse";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly avatarUrl: "avatarUrl";
    readonly statut: "statut";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ParticulierScalarFieldEnum = (typeof ParticulierScalarFieldEnum)[keyof typeof ParticulierScalarFieldEnum];
export declare const PrestataireScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly nom: "nom";
    readonly telephone: "telephone";
    readonly adresse: "adresse";
    readonly bio: "bio";
    readonly avatarUrl: "avatarUrl";
    readonly zoneIntervention: "zoneIntervention";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly actif: "actif";
    readonly statutVerification: "statutVerification";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PrestataireScalarFieldEnum = (typeof PrestataireScalarFieldEnum)[keyof typeof PrestataireScalarFieldEnum];
export declare const OffreScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly libelle: "libelle";
    readonly description: "description";
    readonly prix: "prix";
    readonly dureeMois: "dureeMois";
    readonly actif: "actif";
    readonly ordre: "ordre";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type OffreScalarFieldEnum = (typeof OffreScalarFieldEnum)[keyof typeof OffreScalarFieldEnum];
export declare const AbonnementScalarFieldEnum: {
    readonly id: "id";
    readonly prestataireId: "prestataireId";
    readonly offreId: "offreId";
    readonly dateDebut: "dateDebut";
    readonly dateFin: "dateFin";
    readonly statut: "statut";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type AbonnementScalarFieldEnum = (typeof AbonnementScalarFieldEnum)[keyof typeof AbonnementScalarFieldEnum];
export declare const TypeDocumentScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly libelle: "libelle";
    readonly description: "description";
    readonly obligatoire: "obligatoire";
    readonly ordre: "ordre";
    readonly actif: "actif";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TypeDocumentScalarFieldEnum = (typeof TypeDocumentScalarFieldEnum)[keyof typeof TypeDocumentScalarFieldEnum];
export declare const PrestataireDocumentScalarFieldEnum: {
    readonly id: "id";
    readonly prestataireId: "prestataireId";
    readonly typeDocumentId: "typeDocumentId";
    readonly fichierUrl: "fichierUrl";
    readonly nomFichier: "nomFichier";
    readonly statut: "statut";
    readonly validePar: "validePar";
    readonly valideAt: "valideAt";
    readonly motifRefus: "motifRefus";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PrestataireDocumentScalarFieldEnum = (typeof PrestataireDocumentScalarFieldEnum)[keyof typeof PrestataireDocumentScalarFieldEnum];
export declare const PrestatairePhotoScalarFieldEnum: {
    readonly id: "id";
    readonly prestataireId: "prestataireId";
    readonly url: "url";
    readonly titre: "titre";
    readonly description: "description";
    readonly ordre: "ordre";
    readonly createdAt: "createdAt";
};
export type PrestatairePhotoScalarFieldEnum = (typeof PrestatairePhotoScalarFieldEnum)[keyof typeof PrestatairePhotoScalarFieldEnum];
export declare const ServiceScalarFieldEnum: {
    readonly id: "id";
    readonly libelle: "libelle";
    readonly slug: "slug";
    readonly description: "description";
    readonly icone: "icone";
    readonly tarifs: "tarifs";
    readonly actif: "actif";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum];
export declare const PrestataireServiceScalarFieldEnum: {
    readonly id: "id";
    readonly prestataireId: "prestataireId";
    readonly serviceId: "serviceId";
    readonly tarifHoraire: "tarifHoraire";
    readonly dureeDefautMin: "dureeDefautMin";
    readonly description: "description";
    readonly actif: "actif";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PrestataireServiceScalarFieldEnum = (typeof PrestataireServiceScalarFieldEnum)[keyof typeof PrestataireServiceScalarFieldEnum];
export declare const WalletScalarFieldEnum: {
    readonly id: "id";
    readonly type: "type";
    readonly prestataireId: "prestataireId";
    readonly balance: "balance";
    readonly balancePlafond: "balancePlafond";
    readonly statutPrestataire: "statutPrestataire";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type WalletScalarFieldEnum = (typeof WalletScalarFieldEnum)[keyof typeof WalletScalarFieldEnum];
export declare const WalletTransactionScalarFieldEnum: {
    readonly id: "id";
    readonly walletId: "walletId";
    readonly type: "type";
    readonly amount: "amount";
    readonly prestationId: "prestationId";
    readonly abonnementId: "abonnementId";
    readonly offreId: "offreId";
    readonly meta: "meta";
    readonly createdByUserId: "createdByUserId";
    readonly createdAt: "createdAt";
};
export type WalletTransactionScalarFieldEnum = (typeof WalletTransactionScalarFieldEnum)[keyof typeof WalletTransactionScalarFieldEnum];
export declare const WithdrawalRequestScalarFieldEnum: {
    readonly id: "id";
    readonly prestataireId: "prestataireId";
    readonly method: "method";
    readonly status: "status";
    readonly meta: "meta";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type WithdrawalRequestScalarFieldEnum = (typeof WithdrawalRequestScalarFieldEnum)[keyof typeof WithdrawalRequestScalarFieldEnum];
export declare const PrestationScalarFieldEnum: {
    readonly id: "id";
    readonly particulierId: "particulierId";
    readonly prestataireId: "prestataireId";
    readonly prestataireServiceId: "prestataireServiceId";
    readonly typeDeTache: "typeDeTache";
    readonly description: "description";
    readonly imageUrl: "imageUrl";
    readonly budget: "budget";
    readonly adresse: "adresse";
    readonly codePostal: "codePostal";
    readonly ville: "ville";
    readonly noteParticulier: "noteParticulier";
    readonly statut: "statut";
    readonly acceptedAt: "acceptedAt";
    readonly completedAt: "completedAt";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PrestationScalarFieldEnum = (typeof PrestationScalarFieldEnum)[keyof typeof PrestationScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly title: "title";
    readonly body: "body";
    readonly type: "type";
    readonly data: "data";
    readonly lu: "lu";
    readonly createdAt: "createdAt";
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const AvisPrestataireScalarFieldEnum: {
    readonly id: "id";
    readonly particulierId: "particulierId";
    readonly prestataireId: "prestataireId";
    readonly note: "note";
    readonly commentaire: "commentaire";
    readonly createdAt: "createdAt";
};
export type AvisPrestataireScalarFieldEnum = (typeof AvisPrestataireScalarFieldEnum)[keyof typeof AvisPrestataireScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: runtime.DbNullClass;
    readonly JsonNull: runtime.JsonNullClass;
    readonly AnyNull: runtime.AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>;
export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>;
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>;
export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>;
export type EnumParticulierStatutFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ParticulierStatut'>;
export type ListEnumParticulierStatutFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ParticulierStatut[]'>;
export type EnumStatutVerificationPrestataireFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatutVerificationPrestataire'>;
export type ListEnumStatutVerificationPrestataireFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatutVerificationPrestataire[]'>;
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
export type EnumStatutAbonnementFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatutAbonnement'>;
export type ListEnumStatutAbonnementFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatutAbonnement[]'>;
export type EnumStatutDocumentFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatutDocument'>;
export type ListEnumStatutDocumentFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatutDocument[]'>;
export type EnumWalletTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WalletType'>;
export type ListEnumWalletTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WalletType[]'>;
export type EnumPrestataireWalletStatutFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PrestataireWalletStatut'>;
export type ListEnumPrestataireWalletStatutFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PrestataireWalletStatut[]'>;
export type EnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType'>;
export type ListEnumTransactionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TransactionType[]'>;
export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>;
export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>;
export type EnumWithdrawalMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WithdrawalMethod'>;
export type ListEnumWithdrawalMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WithdrawalMethod[]'>;
export type EnumWithdrawalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WithdrawalStatus'>;
export type ListEnumWithdrawalStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WithdrawalStatus[]'>;
export type EnumStatutPrestationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatutPrestation'>;
export type ListEnumStatutPrestationFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'StatutPrestation[]'>;
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    accelerateUrl: string;
    adapter?: never;
}) & {
    errorFormat?: ErrorFormat;
    log?: (LogLevel | LogDefinition)[];
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    omit?: GlobalOmitConfig;
    comments?: runtime.SqlCommenterPlugin[];
};
export type GlobalOmitConfig = {
    user?: Prisma.UserOmit;
    particulier?: Prisma.ParticulierOmit;
    prestataire?: Prisma.PrestataireOmit;
    offre?: Prisma.OffreOmit;
    abonnement?: Prisma.AbonnementOmit;
    typeDocument?: Prisma.TypeDocumentOmit;
    prestataireDocument?: Prisma.PrestataireDocumentOmit;
    prestatairePhoto?: Prisma.PrestatairePhotoOmit;
    service?: Prisma.ServiceOmit;
    prestataireService?: Prisma.PrestataireServiceOmit;
    wallet?: Prisma.WalletOmit;
    walletTransaction?: Prisma.WalletTransactionOmit;
    withdrawalRequest?: Prisma.WithdrawalRequestOmit;
    prestation?: Prisma.PrestationOmit;
    notification?: Prisma.NotificationOmit;
    avisPrestataire?: Prisma.AvisPrestataireOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
