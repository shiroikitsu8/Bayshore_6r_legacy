-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "chipId" TEXT NOT NULL,
    "accessCode" TEXT NOT NULL,
    "carOrder" INTEGER[],
    "tutorials" BOOLEAN[],
    "userBanned" BOOLEAN NOT NULL DEFAULT false,
    "bookmarks" INTEGER[],
    "currentSheet" INTEGER NOT NULL DEFAULT 1,
    "lastScratched" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScratchSheet" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sheetNo" INTEGER NOT NULL,

    CONSTRAINT "ScratchSheet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScratchSquare" (
    "id" SERIAL NOT NULL,
    "sheetId" INTEGER NOT NULL,
    "category" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "earned" BOOLEAN NOT NULL,

    CONSTRAINT "ScratchSquare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserItem" (
    "userItemId" SERIAL NOT NULL,
    "category" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "type" INTEGER NOT NULL DEFAULT 0,
    "earnedAt" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "UserItem_pkey" PRIMARY KEY ("userItemId")
);

-- CreateTable
CREATE TABLE "Car" (
    "userId" INTEGER NOT NULL,
    "carId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "manufacturer" INTEGER NOT NULL,
    "model" INTEGER NOT NULL,
    "visualModel" INTEGER NOT NULL,
    "customColor" INTEGER NOT NULL DEFAULT 0,
    "defaultColor" INTEGER NOT NULL,
    "wheel" INTEGER NOT NULL DEFAULT 0,
    "wheelColor" INTEGER NOT NULL DEFAULT 0,
    "aero" INTEGER NOT NULL DEFAULT 0,
    "bonnet" INTEGER NOT NULL DEFAULT 0,
    "wing" INTEGER NOT NULL DEFAULT 0,
    "mirror" INTEGER NOT NULL DEFAULT 0,
    "neon" INTEGER NOT NULL DEFAULT 0,
    "trunk" INTEGER NOT NULL DEFAULT 0,
    "plate" INTEGER NOT NULL DEFAULT 0,
    "plateColor" INTEGER NOT NULL DEFAULT 0,
    "plateNumber" INTEGER NOT NULL DEFAULT 0,
    "tunePower" INTEGER NOT NULL DEFAULT 0,
    "tuneHandling" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL DEFAULT 'New Car',
    "level" INTEGER NOT NULL DEFAULT 0,
    "windowSticker" BOOLEAN NOT NULL DEFAULT false,
    "windowStickerString" TEXT NOT NULL DEFAULT 'ＷＡＮＧＡＮ',
    "windowStickerFont" INTEGER NOT NULL DEFAULT 0,
    "windowDecoration" INTEGER NOT NULL DEFAULT 0,
    "rivalMarker" INTEGER NOT NULL DEFAULT 0,
    "lastPlayedAt" INTEGER NOT NULL DEFAULT 0,
    "aura" INTEGER NOT NULL DEFAULT 0,
    "regionId" INTEGER NOT NULL DEFAULT 0,
    "country" TEXT NOT NULL DEFAULT 'JPN',
    "tuningPoints" INTEGER NOT NULL DEFAULT 0,
    "odometer" INTEGER NOT NULL DEFAULT 0,
    "playCount" INTEGER NOT NULL DEFAULT 0,
    "earnedCustomColor" BOOLEAN NOT NULL DEFAULT false,
    "carSettingsDbId" INTEGER NOT NULL,
    "auraMotif" INTEGER NOT NULL DEFAULT 0,
    "vsPlayCount" INTEGER NOT NULL DEFAULT 0,
    "vsBurstCount" INTEGER NOT NULL DEFAULT 0,
    "vsStarCount" INTEGER NOT NULL DEFAULT 0,
    "vsStarCountMax" INTEGER NOT NULL DEFAULT 0,
    "vsCoolOrWild" INTEGER NOT NULL DEFAULT 0,
    "vsSmoothOrRough" INTEGER NOT NULL DEFAULT 0,
    "vsTripleStarMedals" INTEGER NOT NULL DEFAULT 0,
    "vsDoubleStarMedals" INTEGER NOT NULL DEFAULT 0,
    "vsSingleStarMedals" INTEGER NOT NULL DEFAULT 0,
    "vsPlainMedals" INTEGER NOT NULL DEFAULT 0,
    "ghostLevel" INTEGER NOT NULL DEFAULT 1,
    "rgPlayCount" INTEGER NOT NULL DEFAULT 0,
    "rgWinCount" INTEGER NOT NULL DEFAULT 0,
    "rgTrophy" INTEGER NOT NULL DEFAULT 0,
    "rgScore" INTEGER NOT NULL DEFAULT 0,
    "rgStamp" INTEGER NOT NULL DEFAULT 0,
    "rgAcquireAllCrowns" BOOLEAN NOT NULL DEFAULT false,
    "rgRegionMapScore" INTEGER[],
    "stampSheetCount" INTEGER NOT NULL DEFAULT 0,
    "stampSheet" INTEGER[],
    "dressupLevel" INTEGER NOT NULL DEFAULT 0,
    "dressupPoint" INTEGER NOT NULL DEFAULT 0,
    "stPlayCount" INTEGER NOT NULL DEFAULT 0,
    "stClearBits" INTEGER NOT NULL DEFAULT 0,
    "stClearDivCount" INTEGER NOT NULL DEFAULT 0,
    "stClearCount" INTEGER NOT NULL DEFAULT 0,
    "stLoseBits" BIGINT NOT NULL DEFAULT 0,
    "stConsecutiveWins" INTEGER NOT NULL DEFAULT 0,
    "stConsecutiveWinsMax" INTEGER NOT NULL DEFAULT 0,
    "stCompleted100Episodes" BOOLEAN NOT NULL DEFAULT false,
    "rgScoreVs_2" INTEGER NOT NULL DEFAULT 0,
    "rgHighwayClearCount" INTEGER NOT NULL DEFAULT 0,
    "rgHighwayPoint" INTEGER NOT NULL DEFAULT 0,
    "rgHighwayStationClearBits" INTEGER NOT NULL DEFAULT 0,
    "rgHighwayPreviousDice" INTEGER NOT NULL DEFAULT 0,
    "lastPlayedPlaceId" INTEGER,
    "carGTWingDbId" INTEGER NOT NULL,
    "carStateDbId" INTEGER NOT NULL,

    CONSTRAINT "Car_pkey" PRIMARY KEY ("carId")
);

-- CreateTable
CREATE TABLE "CarGTWing" (
    "dbId" SERIAL NOT NULL,
    "pillar" INTEGER NOT NULL DEFAULT 0,
    "pillarMaterial" INTEGER NOT NULL DEFAULT 0,
    "mainWing" INTEGER NOT NULL DEFAULT 0,
    "mainWingColor" INTEGER NOT NULL DEFAULT 0,
    "wingTip" INTEGER NOT NULL DEFAULT 0,
    "material" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CarGTWing_pkey" PRIMARY KEY ("dbId")
);

-- CreateTable
CREATE TABLE "CarItem" (
    "dbId" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "category" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,

    CONSTRAINT "CarItem_pkey" PRIMARY KEY ("dbId")
);

-- CreateTable
CREATE TABLE "CarSettings" (
    "dbId" SERIAL NOT NULL,
    "view" BOOLEAN NOT NULL DEFAULT true,
    "transmission" BOOLEAN NOT NULL DEFAULT false,
    "retire" BOOLEAN NOT NULL DEFAULT false,
    "meter" INTEGER NOT NULL DEFAULT 0,
    "navigationMap" BOOLEAN NOT NULL DEFAULT true,
    "volume" INTEGER NOT NULL DEFAULT 2,
    "bgm" INTEGER NOT NULL DEFAULT 0,
    "nameplate" INTEGER NOT NULL DEFAULT 0,
    "nameplateColor" INTEGER NOT NULL DEFAULT 0,
    "terminalBackground" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CarSettings_pkey" PRIMARY KEY ("dbId")
);

-- CreateTable
CREATE TABLE "CarState" (
    "dbId" SERIAL NOT NULL,
    "hasOpponentGhost" BOOLEAN NOT NULL DEFAULT false,
    "eventJoined" BOOLEAN NOT NULL DEFAULT false,
    "transferred" BOOLEAN NOT NULL DEFAULT false,
    "toBeDeleted" BOOLEAN NOT NULL DEFAULT false,
    "competitionState" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CarState_pkey" PRIMARY KEY ("dbId")
);

-- CreateTable
CREATE TABLE "CarPathandTuning" (
    "dbId" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "area" INTEGER NOT NULL DEFAULT 0,
    "ramp" INTEGER NOT NULL DEFAULT 0,
    "path" INTEGER NOT NULL DEFAULT 0,
    "tunePower" INTEGER NOT NULL DEFAULT 17,
    "tuneHandling" INTEGER NOT NULL DEFAULT 17,
    "lastPlayedAt" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CarPathandTuning_pkey" PRIMARY KEY ("dbId")
);

-- CreateTable
CREATE TABLE "CarCrown" (
    "dbId" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "area" INTEGER NOT NULL,
    "ramp" INTEGER NOT NULL,
    "path" INTEGER NOT NULL,
    "playedAt" INTEGER NOT NULL DEFAULT 0,
    "tunePower" INTEGER NOT NULL,
    "tuneHandling" INTEGER NOT NULL,

    CONSTRAINT "CarCrown_pkey" PRIMARY KEY ("dbId")
);

-- CreateTable
CREATE TABLE "TimeAttackRecord" (
    "dbId" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "model" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "course" INTEGER NOT NULL,
    "isMorning" BOOLEAN NOT NULL,
    "section1Time" INTEGER NOT NULL,
    "section2Time" INTEGER NOT NULL,
    "section3Time" INTEGER NOT NULL,
    "section4Time" INTEGER NOT NULL,
    "section5Time" INTEGER,
    "section6Time" INTEGER,
    "section7Time" INTEGER,
    "tunePower" INTEGER NOT NULL DEFAULT 0,
    "tuneHandling" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "TimeAttackRecord_pkey" PRIMARY KEY ("dbId")
);

-- CreateTable
CREATE TABLE "GhostTrail" (
    "dbId" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "area" INTEGER NOT NULL,
    "ramp" INTEGER NOT NULL,
    "path" INTEGER NOT NULL,
    "trail" BYTEA NOT NULL,
    "time" INTEGER,
    "driveData" BYTEA,
    "driveDMergeSerial" INTEGER,
    "trendBinaryByUser" BYTEA,
    "byUserMergeSerial" INTEGER,
    "trendBinaryByArea" BYTEA,
    "byAreaMergeSerial" INTEGER,
    "trendBinaryByCar" BYTEA,
    "byCarMergeSerial" INTEGER,
    "playedAt" INTEGER NOT NULL DEFAULT 0,
    "tunePower" INTEGER NOT NULL DEFAULT 0,
    "tuneHandling" INTEGER NOT NULL DEFAULT 0,
    "crownBattle" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "GhostTrail_pkey" PRIMARY KEY ("dbId")
);

-- CreateTable
CREATE TABLE "GhostBattleRecord" (
    "dbId" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "tunePower" INTEGER NOT NULL DEFAULT 0,
    "tuneHandling" INTEGER NOT NULL DEFAULT 0,
    "opponent1CarId" INTEGER NOT NULL,
    "opponent1Result" INTEGER NOT NULL,
    "opponent1TunePower" INTEGER NOT NULL,
    "opponent1TuneHandling" INTEGER NOT NULL,
    "opponent2CarId" INTEGER,
    "opponent2Result" INTEGER,
    "opponent2TunePower" INTEGER,
    "opponent2TuneHandling" INTEGER,
    "opponent3CarId" INTEGER,
    "opponent3Result" INTEGER,
    "opponent3TunePower" INTEGER,
    "opponent3TuneHandling" INTEGER,
    "area" INTEGER NOT NULL DEFAULT 0,
    "playedAt" INTEGER NOT NULL DEFAULT 0,
    "playedShopName" TEXT NOT NULL DEFAULT 'Bayshore',

    CONSTRAINT "GhostBattleRecord_pkey" PRIMARY KEY ("dbId")
);

-- CreateTable
CREATE TABLE "OCMEvent" (
    "dbId" SERIAL NOT NULL,
    "competitionId" INTEGER NOT NULL,
    "qualifyingPeriodStartAt" INTEGER NOT NULL,
    "qualifyingPeriodCloseAt" INTEGER NOT NULL,
    "competitionStartAt" INTEGER NOT NULL,
    "competitionCloseAt" INTEGER NOT NULL,
    "competitionEndAt" INTEGER NOT NULL,
    "lengthOfPeriod" INTEGER NOT NULL,
    "lengthOfInterval" INTEGER NOT NULL,
    "area" INTEGER NOT NULL DEFAULT 0,
    "minigamePatternId" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "OCMEvent_pkey" PRIMARY KEY ("dbId")
);

-- CreateTable
CREATE TABLE "OCMPlayRecord" (
    "dbId" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "competitionId" INTEGER NOT NULL,
    "periodId" INTEGER NOT NULL,
    "brakingPoint" INTEGER,
    "playedAt" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "OCMPlayRecord_pkey" PRIMARY KEY ("dbId")
);

-- CreateTable
CREATE TABLE "OCMTop1Ghost" (
    "dbId" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "competitionId" INTEGER NOT NULL,
    "periodId" INTEGER NOT NULL,
    "result" INTEGER NOT NULL,
    "tunePower" INTEGER NOT NULL DEFAULT 0,
    "tuneHandling" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "OCMTop1Ghost_pkey" PRIMARY KEY ("dbId")
);

-- CreateTable
CREATE TABLE "OCMTop1GhostTrail" (
    "dbId" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "area" INTEGER NOT NULL,
    "ramp" INTEGER NOT NULL,
    "path" INTEGER NOT NULL,
    "trail" BYTEA NOT NULL,
    "competitionId" INTEGER NOT NULL,
    "periodId" INTEGER NOT NULL,
    "playedAt" INTEGER NOT NULL DEFAULT 0,
    "tunePower" INTEGER NOT NULL DEFAULT 0,
    "tuneHandling" INTEGER NOT NULL DEFAULT 0,
    "ocmMainDraw" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "OCMTop1GhostTrail_pkey" PRIMARY KEY ("dbId")
);

-- CreateTable
CREATE TABLE "OCMTally" (
    "dbId" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "competitionId" INTEGER NOT NULL,
    "periodId" INTEGER NOT NULL,
    "result" INTEGER NOT NULL,
    "tunePower" INTEGER NOT NULL DEFAULT 0,
    "tuneHandling" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "OCMTally_pkey" PRIMARY KEY ("dbId")
);

-- CreateTable
CREATE TABLE "OCMGhostBattleRecord" (
    "dbId" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "tunePower" INTEGER NOT NULL DEFAULT 0,
    "tuneHandling" INTEGER NOT NULL DEFAULT 0,
    "competitionId" INTEGER NOT NULL,
    "periodId" INTEGER NOT NULL,
    "result" INTEGER NOT NULL,
    "area" INTEGER NOT NULL DEFAULT 0,
    "playedAt" INTEGER NOT NULL DEFAULT 0,
    "playedShopName" TEXT NOT NULL DEFAULT 'Bayshore',
    "ocmMainDraw" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "OCMGhostBattleRecord_pkey" PRIMARY KEY ("dbId")
);

-- CreateTable
CREATE TABLE "OCMGhostTrail" (
    "dbId" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "area" INTEGER NOT NULL,
    "ramp" INTEGER NOT NULL,
    "path" INTEGER NOT NULL,
    "trail" BYTEA NOT NULL,
    "competitionId" INTEGER NOT NULL,
    "periodId" INTEGER NOT NULL,
    "playedAt" INTEGER NOT NULL DEFAULT 0,
    "tunePower" INTEGER NOT NULL DEFAULT 0,
    "tuneHandling" INTEGER NOT NULL DEFAULT 0,
    "ocmMainDraw" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "OCMGhostTrail_pkey" PRIMARY KEY ("dbId")
);

-- CreateTable
CREATE TABLE "OCMPeriod" (
    "dbId" SERIAL NOT NULL,
    "competitionDbId" INTEGER NOT NULL,
    "competitionId" INTEGER NOT NULL,
    "periodId" INTEGER NOT NULL,
    "startAt" INTEGER NOT NULL,
    "closeAt" INTEGER NOT NULL,

    CONSTRAINT "OCMPeriod_pkey" PRIMARY KEY ("dbId")
);

-- CreateTable
CREATE TABLE "GhostRegisteredFromTerminal" (
    "dbId" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "competitionId" INTEGER,
    "opponentCarId" INTEGER NOT NULL,

    CONSTRAINT "GhostRegisteredFromTerminal_pkey" PRIMARY KEY ("dbId")
);

-- CreateTable
CREATE TABLE "CarChallenger" (
    "id" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "challengerCarId" INTEGER NOT NULL,
    "stamp" INTEGER NOT NULL,
    "result" INTEGER NOT NULL,
    "area" INTEGER NOT NULL,
    "lastPlayedAt" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CarChallenger_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarStampTarget" (
    "id" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "stampTargetCarId" INTEGER NOT NULL,
    "returnCount" INTEGER NOT NULL,
    "locked" BOOLEAN NOT NULL,
    "recommended" BOOLEAN NOT NULL,

    CONSTRAINT "CarStampTarget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlaceList" (
    "id" SERIAL NOT NULL,
    "placeId" TEXT NOT NULL,
    "regionId" INTEGER NOT NULL,
    "shopName" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "PlaceList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GhostExpedition" (
    "dbId" SERIAL NOT NULL,
    "carId" INTEGER NOT NULL,
    "ghostExpeditionId" INTEGER NOT NULL,
    "sugorokuPoint" INTEGER NOT NULL DEFAULT 0,
    "earnedScore" INTEGER NOT NULL DEFAULT 0,
    "score" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "GhostExpedition_pkey" PRIMARY KEY ("dbId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_chipId_key" ON "User"("chipId");

-- CreateIndex
CREATE UNIQUE INDEX "Car_carSettingsDbId_key" ON "Car"("carSettingsDbId");

-- CreateIndex
CREATE UNIQUE INDEX "Car_carGTWingDbId_key" ON "Car"("carGTWingDbId");

-- CreateIndex
CREATE UNIQUE INDEX "Car_carStateDbId_key" ON "Car"("carStateDbId");

-- CreateIndex
CREATE UNIQUE INDEX "CarCrown_area_key" ON "CarCrown"("area");

-- AddForeignKey
ALTER TABLE "ScratchSheet" ADD CONSTRAINT "ScratchSheet_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScratchSquare" ADD CONSTRAINT "ScratchSquare_sheetId_fkey" FOREIGN KEY ("sheetId") REFERENCES "ScratchSheet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserItem" ADD CONSTRAINT "UserItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_carGTWingDbId_fkey" FOREIGN KEY ("carGTWingDbId") REFERENCES "CarGTWing"("dbId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_carSettingsDbId_fkey" FOREIGN KEY ("carSettingsDbId") REFERENCES "CarSettings"("dbId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_carStateDbId_fkey" FOREIGN KEY ("carStateDbId") REFERENCES "CarState"("dbId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_lastPlayedPlaceId_fkey" FOREIGN KEY ("lastPlayedPlaceId") REFERENCES "PlaceList"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarItem" ADD CONSTRAINT "CarItem_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("carId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarPathandTuning" ADD CONSTRAINT "CarPathandTuning_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("carId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarCrown" ADD CONSTRAINT "CarCrown_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("carId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TimeAttackRecord" ADD CONSTRAINT "TimeAttackRecord_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("carId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GhostTrail" ADD CONSTRAINT "GhostTrail_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("carId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GhostBattleRecord" ADD CONSTRAINT "GhostBattleRecord_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("carId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OCMPlayRecord" ADD CONSTRAINT "OCMPlayRecord_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("carId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OCMTop1Ghost" ADD CONSTRAINT "OCMTop1Ghost_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("carId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OCMTally" ADD CONSTRAINT "OCMTally_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("carId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OCMGhostBattleRecord" ADD CONSTRAINT "OCMGhostBattleRecord_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("carId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OCMGhostTrail" ADD CONSTRAINT "OCMGhostTrail_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("carId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OCMPeriod" ADD CONSTRAINT "OCMPeriod_competitionDbId_fkey" FOREIGN KEY ("competitionDbId") REFERENCES "OCMEvent"("dbId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GhostRegisteredFromTerminal" ADD CONSTRAINT "GhostRegisteredFromTerminal_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("carId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarChallenger" ADD CONSTRAINT "CarChallenger_challengerCarId_fkey" FOREIGN KEY ("challengerCarId") REFERENCES "Car"("carId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarStampTarget" ADD CONSTRAINT "CarStampTarget_stampTargetCarId_fkey" FOREIGN KEY ("stampTargetCarId") REFERENCES "Car"("carId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GhostExpedition" ADD CONSTRAINT "GhostExpedition_carId_fkey" FOREIGN KEY ("carId") REFERENCES "Car"("carId") ON DELETE RESTRICT ON UPDATE CASCADE;
