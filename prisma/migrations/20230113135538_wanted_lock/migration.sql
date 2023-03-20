-- AlterTable
ALTER TABLE "Car" ALTER COLUMN "stLoseBits" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "GhostExpeditionWantedCar" ADD COLUMN     "lockTime" INTEGER NOT NULL DEFAULT 0;
