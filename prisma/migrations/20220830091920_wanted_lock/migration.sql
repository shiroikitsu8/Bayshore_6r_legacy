-- AlterTable
ALTER TABLE "Car" ALTER COLUMN "stLoseBits" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "GhostExpeditionWantedCar" ADD COLUMN     "challengerCarId" INTEGER,
ADD COLUMN     "locked" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "numOfHostages" SET DEFAULT 1,
ALTER COLUMN "defeatedMeCount" SET DEFAULT 1;
