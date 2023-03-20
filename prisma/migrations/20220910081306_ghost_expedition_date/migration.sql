-- AlterTable
ALTER TABLE "Car" ALTER COLUMN "stLoseBits" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "GhostExpeditionEvent" (
    "dbId" SERIAL NOT NULL,
    "ghostExpeditionId" INTEGER NOT NULL,
    "startAt" INTEGER NOT NULL,
    "endAt" INTEGER NOT NULL,
    "aftereventEndAt" INTEGER NOT NULL,
    "opponentCountry" INTEGER NOT NULL,

    CONSTRAINT "GhostExpeditionEvent_pkey" PRIMARY KEY ("dbId")
);
