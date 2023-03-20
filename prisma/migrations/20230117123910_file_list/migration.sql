-- AlterTable
ALTER TABLE "Car" ALTER COLUMN "stLoseBits" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "FileList" (
    "fileId" SERIAL NOT NULL,
    "fileType" INTEGER NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "urlFileName" TEXT NOT NULL,
    "sha1sum" TEXT NOT NULL,
    "notBefore" INTEGER NOT NULL,
    "notAfter" INTEGER NOT NULL,
    "filePath" TEXT NOT NULL,

    CONSTRAINT "FileList_pkey" PRIMARY KEY ("fileId")
);
