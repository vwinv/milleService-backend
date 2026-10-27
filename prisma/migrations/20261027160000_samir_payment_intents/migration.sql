CREATE TABLE "samir_payment_intents" (
    "id" TEXT NOT NULL,
    "order_id" TEXT NOT NULL,
    "transaction_id" TEXT,
    "kind" TEXT NOT NULL,
    "amount_fcfa" INTEGER NOT NULL,
    "checkout_url" TEXT,
    "meta" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "samir_payment_intents_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "samir_payment_intents_order_id_key" ON "samir_payment_intents"("order_id");
CREATE UNIQUE INDEX "samir_payment_intents_transaction_id_key" ON "samir_payment_intents"("transaction_id");
