-- CreateTable
CREATE TABLE "public"."Rifa" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "budget" DOUBLE PRECISION NOT NULL,
    "imgUrl" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "totalTickets" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rifa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Ticket" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "ticketHolderID" TEXT NOT NULL,
    "ticketHolderName" TEXT NOT NULL,
    "ticketHolderPhone" TEXT NOT NULL,
    "ticketHolderEmail" TEXT NOT NULL,
    "referenceCode" TEXT NOT NULL,
    "refImageUrl" TEXT NOT NULL DEFAULT 'https://picsum.photos/200',
    "isSold" BOOLEAN NOT NULL DEFAULT false,
    "rifaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_number_key" ON "public"."Ticket"("number");

-- CreateIndex
CREATE UNIQUE INDEX "Ticket_number_rifaId_key" ON "public"."Ticket"("number", "rifaId");

-- AddForeignKey
ALTER TABLE "public"."Ticket" ADD CONSTRAINT "Ticket_rifaId_fkey" FOREIGN KEY ("rifaId") REFERENCES "public"."Rifa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
