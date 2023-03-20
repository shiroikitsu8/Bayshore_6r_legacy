import { prisma } from "../..";
import { Config } from "../../config";

// Import Proto
import { wm } from "../../wmmt/wm.proto";

// Import Util
import * as common from "../../util/common";
import * as ghost_stamp from "../ghost/ghost_stamp";
import * as ghost_get_area_from_path from "../ghost/ghost_util/ghost_get_area_from_path";


// Save ghost history battle
export async function saveGhostHistory(body: wm.protobuf.SaveGameResultRequest)
{
    console.log('Saving Ghost Battle History');
    
    let updateNewTrail: boolean = true;
    let saveExGhostHistory: any = {};

    // Get the car result for the car
    let car = body?.car;

    if(car)
    {
        saveExGhostHistory = {
            carId: common.sanitizeInput(car.carId),
            tunePower: common.sanitizeInput(car.tunePower),
            tuneHandling: common.sanitizeInput(car.tuneHandling),
            playedAt: common.sanitizeInputNotZero(body.playedAt),
            playedShopName: Config.getConfig().shopName
        }
    }

    // Get the rg result for the car
    let rgResult = body?.rgResult;

    if(rgResult)
    {
        if(rgResult.opponents)
        {
            // Get how many opponents available
            for(let i=0; i<rgResult.opponents.length; i++)
            { 
                // First opponent data
                if(i == 0)
                { 
                    // Get first opponent carId
                    saveExGhostHistory.opponent1CarId = rgResult.opponents[0].carId; 

                    // Get first opponent tunePower
                    saveExGhostHistory.opponent1TunePower = rgResult.opponents[0].tunePower; 

                    // Get first opponent tunePower
                    saveExGhostHistory.opponent1TuneHandling = rgResult.opponents[0].tuneHandling; 

                    // Get the advantage distance between first opponent and user
                    saveExGhostHistory.opponent1Result = rgResult.opponents[0].result; 
                }

                // Second opponent data
                else if(i == 1)
                { 
                    // Get second opponent carId
                    saveExGhostHistory.opponent2CarId = rgResult.opponents[1].carId; 

                    // Get second opponent tunePower
                    saveExGhostHistory.opponent2TunePower = rgResult.opponents[1].tunePower; 

                    // Get second opponent tuneHandling
                    saveExGhostHistory.opponent2TuneHandling = rgResult.opponents[1].tuneHandling; 

                    // Get the advantage distance between second opponent and user
                    saveExGhostHistory.opponent2Result = rgResult.opponents[1].result; 
                }

                // Third opponent data
                else if(i == 2)
                { 
                    // Get third opponent carId
                    saveExGhostHistory.opponent3CarId = rgResult.opponents[2].carId;  

                    // Get third opponent tunePower
                    saveExGhostHistory.opponent3TunePower = rgResult.opponents[2].tunePower; 

                    // Get third opponent tuneHandling
                    saveExGhostHistory.opponent3TuneHandling = rgResult.opponents[2].tuneHandling; 

                    // Get the advantage distance between third opponent and user
                    saveExGhostHistory.opponent3Result = rgResult.opponents[2].result; 
                }
            }
        }

        // Get played Area
        if(common.sanitizeInput(rgResult.path))
        {
            let getArea = await ghost_get_area_from_path.getArea(rgResult.path);

            saveExGhostHistory.area = getArea.area
        }
    }

    await prisma.ghostBattleRecord.create({
        data: saveExGhostHistory
    });

    // Sending stamp to opponents
    await ghost_stamp.sendStamp(body);

    // Return the value to 'BASE_PATH/src/util/games/ghost.ts'
    return { updateNewTrail }
}


// Save OCM ghost history battle
export async function saveOCMGhostHistory(body: wm.protobuf.SaveGameResultRequest)
{
    let updateNewTrail: boolean = true;
    let saveExGhostHistory: any = {};

    // Get the car result for the car
    let car = body?.car;

    if(car)
    {
        saveExGhostHistory = {
            carId: common.sanitizeInput(car.carId),
            tunePower: common.sanitizeInput(car.tunePower),
            tuneHandling: common.sanitizeInput(car.tuneHandling),
            playedAt: common.sanitizeInputNotZero(body.playedAt),
            playedShopName: Config.getConfig().shopName
        }
    }

    // Get the rg result for the car
    let rgResult = body?.rgResult;

    if(rgResult)
    {
        if(rgResult.opponents)
        {
            // Get the advantage distance between first opponent and user
            saveExGhostHistory.result = rgResult.opponents[0].result;
        }

        // Get played Area
        if(common.sanitizeInput(rgResult.path))
        {
            let getArea = await ghost_get_area_from_path.getArea(rgResult.path);

            saveExGhostHistory.area = getArea.area
        }
    }

    // Get current date
    let date = Math.floor(new Date().getTime() / 1000);

    // Get currently active OCM event
    let ocmEventDate = await prisma.oCMEvent.findFirst({ 
        where: {
            // qualifyingPeriodStartAt is less than equal current date
            qualifyingPeriodStartAt: { lte: date },

            // competitionEndAt is greater than equal current date
            competitionEndAt: { gte: date },
        },
        orderBy:{
            dbId: 'desc'
        }
    });

    // ----------Get available OCM Record (Qualifying or Main Draw)----------
    // Current date is OCM main draw
    let countGBR;
    if(ocmEventDate!.competitionStartAt < date && ocmEventDate!.competitionCloseAt > date)
    {
        // Set OCM Main draw value to true 
        saveExGhostHistory.ocmMainDraw = true

        // Get the user's available OCM Battle Record data
        countGBR = await prisma.oCMTally.findFirst({ 
            where:{
                carId: saveExGhostHistory.carId,
                competitionId: ocmEventDate!.competitionId,
            }
        });
    }
    // Current date is OCM qualifying day
    else
    { 
        // Set OCM Main draw value to false 
        saveExGhostHistory.ocmMainDraw = false

        // Get the user's available OCM Battle Record data
        countGBR = await prisma.oCMGhostBattleRecord.findFirst({ 
            where:{
                carId: saveExGhostHistory.carId,
                ocmMainDraw: saveExGhostHistory.ocmMainDraw,
                area: saveExGhostHistory.area,
                competitionId: ocmEventDate!.competitionId,
                periodId: 0
            }
        });
    }
    // ----------------------------------------------------------------

    // User have OCM Battle Record data available
    if(countGBR)
    { 
        // Check if the newest advantage distance is bigger than the older advantage distance
        if(countGBR!.result < saveExGhostHistory.result)
        {
            console.log('OCM Ghost Tally found');

            // Current date is OCM Main Draw
            if(ocmEventDate!.competitionStartAt < date && ocmEventDate!.competitionCloseAt > date)
            {
                // Get OCM Period ID
                let OCM_periodId = await prisma.oCMPeriod.findFirst({ 
                    where:{
                        competitionDbId: ocmEventDate!.dbId,
                        competitionId: ocmEventDate!.competitionId,
                        startAt: 
                        {
                            lte: date, // competitionStartAt is less than equal current date
                        },
                        closeAt:
                        {
                            gte: date, // competitionCloseAt is greater than equal current date
                        }
                    },
                    select:{
                        periodId: true
                    }
                });

                let checkGhost = await prisma.oCMGhostBattleRecord.findFirst({ 
                    where:{
                        carId: saveExGhostHistory.carId,
                        competitionId: ocmEventDate!.competitionId,
                    }
                });

                if(checkGhost)
                {
                    console.log('Updating OCM Ghost Battle Record entry');
                    
                    // Get the user's available OCM Battle Record data
                    let getGBR = await prisma.oCMGhostBattleRecord.findFirst({ 
                        where:{
                            carId: saveExGhostHistory.carId,
                            area: saveExGhostHistory.area,
                            competitionId: ocmEventDate!.competitionId,
                        }
                    });

                    // Update ghost battle record
                    await prisma.oCMGhostBattleRecord.update({
                        where:{
                            dbId: getGBR!.dbId
                        },
                        data: {
                            ...saveExGhostHistory,
                            competitionId: ocmEventDate!.competitionId,
                            periodId: OCM_periodId!.periodId
                        }
                    });  
                }
                else
                {
                    console.log('Creating new OCM Ghost Battle Record entry');

                    // Create new ghost battle record
                    await prisma.oCMGhostBattleRecord.create({
                        data: {
                            ...saveExGhostHistory,
                            competitionId: ocmEventDate!.competitionId,
                            periodId: OCM_periodId!.periodId
                        }
                    }); 
                }

                console.log('Updating OCM Tally Record');

                // Update the OCM Tally Record
                await prisma.oCMTally.update({
                    where:{
                        dbId: countGBR.dbId
                    },
                    data: {
                        periodId: OCM_periodId!.periodId,
                        result: body.rgResult!.opponents![0].result,
                        tunePower: body.car?.tunePower!,
                        tuneHandling: body.car?.tuneHandling!
                    }
                });
            }
            // Current date is OCM Qualifying
            else
            {
                // Update ghost battle record
                await prisma.oCMGhostBattleRecord.update({
                    where:{
                        dbId: countGBR.dbId
                    },
                    data: {
                        ...saveExGhostHistory,
                        competitionId: ocmEventDate!.competitionId,
                        periodId: 0
                    }
                });
            }
        }
        // Newest advantage distance is smaller than the older advantage distance
        else
        { 
            console.log('Result record is lower than previous record');

            // Don't update the User's OCM ghost trail
            updateNewTrail = false; 
        }
    }
    // User don't have OCM Battle Record data available
    else
    { 
        console.log('OCM Ghost Battle Record not found');
        console.log('Creating new OOCM Ghost Battle Record entry');

        // Current date is OCM Main Draw
        if(ocmEventDate!.competitionStartAt < date && ocmEventDate!.competitionCloseAt > date)
        {
            // Get OCM Period ID
            let OCM_periodId = await prisma.oCMPeriod.findFirst({ 
                where:{
                    competitionDbId: ocmEventDate!.dbId,
                    competitionId: ocmEventDate!.competitionId
                },
                orderBy:{
                    periodId: 'desc'
                },
                select:{
                    periodId: true
                }
            });

            // Update ghost battle record
            await prisma.oCMGhostBattleRecord.create({
                data: {
                    ...saveExGhostHistory,
                    competitionId: ocmEventDate!.competitionId,
                    periodId: OCM_periodId!.periodId
                }
            });

            let ocmTallyfind = await prisma.oCMTally.findFirst({
                where:{
                    carId: saveExGhostHistory.carId,
                    competitionId: ocmEventDate!.competitionId,
                },
            });

            if(ocmTallyfind)
            {
                console.log('Updating OCM Tally Record');
                
                // Update the OCM Tally Record
                await prisma.oCMTally.update({
                    where:{
                        dbId: ocmTallyfind.dbId
                    },
                    data: {
                        periodId: OCM_periodId!.periodId,
                        result: body.rgResult!.opponents![0].result,
                        tunePower: body.car?.tunePower!,
                        tuneHandling: body.car?.tuneHandling!
                    }
                });
            }
        }
        // Current date is OCM Qualifying
        else
        {
            // Update ghost battle record
            await prisma.oCMGhostBattleRecord.create({
                data: {
                    ...saveExGhostHistory,
                    competitionId: ocmEventDate!.competitionId,
                    periodId: 0
                }
            });
        }
    }

    // Return the value to 'BASE_PATH/src/util/games/ghost.ts'
    return { updateNewTrail }
}


// Save VSORG ghost history battle
export async function saveVSORGGhostHistory(body: wm.protobuf.SaveGameResultRequest)
{
    console.log('Saving VSORG Ghost Battle History');

    // Get the ghost expedition result for the car
    let expeditionResult = body.rgResult?.expeditionResult;

    // Get current date
    let date = Math.floor(new Date().getTime() / 1000);

    // expeditionResult is set
    if (expeditionResult)
    {
        // Expedition update data
        let dataExpedition = {
            ghostExpeditionId: common.sanitizeInput(expeditionResult.ghostExpeditionId),
            sugorokuPoint: common.sanitizeInput(expeditionResult.sugorokuPoint),
            earnedScore: common.sanitizeInput(expeditionResult.earnedScore),
            score: common.sanitizeInput(expeditionResult.score),
        }
        
        let checkExpeditionData = await prisma.ghostExpedition.findFirst({
            where:{
                carId: body.carId
            }
        }); 

        // Update the expedition data
        if(checkExpeditionData)
        {
            await prisma.ghostExpedition.update({
                where:{
                    dbId: checkExpeditionData.dbId
                },
                data: {
                    ...dataExpedition
                }
            }); 
        }
        // Create the expedition data
        else
        {
            await prisma.ghostExpedition.create({
                data: {
                    carId: body.carId,
                    ...dataExpedition
                }
            }); 
        }
        
        if(expeditionResult.earnedItems!.length !== 0)
        {
            console.log('User Item reward from VSORG available, continuing ...');

            // Get current date
            let date = Math.floor(new Date().getTime() / 1000);

            for(let i=0; i<expeditionResult.earnedItems!.length; i++)
            {
                await prisma.userItem.create({
                    data: {
                        category: expeditionResult.earnedItems![i].category,
                        itemId: expeditionResult.earnedItems![i].itemId,
                        userId: body.car!.userId!,
                        earnedAt: date,
                        type: 0
                    }
                });
            }
        }

        if(expeditionResult.aftereventBonus!.length !== 0)
        {
            console.log('User Item after event reward from VSORG available, continuing ...');

            // Get current date
            let date = Math.floor(new Date().getTime() / 1000);

            for(let i=0; i<expeditionResult.aftereventBonus!.length; i++)
            {
                /*
                await prisma.userItem.create({
                    data: {
                        category: expeditionResult.earnedItems![i].category,
                        itemId: expeditionResult.earnedItems![i].itemId,
                        userId: body.car!.userId!,
                        earnedAt: date,
                        type: 0
                    }
                });*/
            }
        }
    }

    let updateNewTrail: boolean = true;
    let saveExGhostHistory: any = {};

    // Get the car result for the car
    let car = body?.car;

    if(car)
    {
        saveExGhostHistory = {
            carId: common.sanitizeInput(car.carId),
            tunePower: common.sanitizeInput(car.tunePower),
            tuneHandling: common.sanitizeInput(car.tuneHandling),
            playedAt: common.sanitizeInputNotZero(body.playedAt),
            playedShopName: Config.getConfig().shopName
        }
    }

    // Get the rg result for the car
    let rgResult = body?.rgResult;

    if(rgResult)
    {
        if(rgResult.opponents)
        {
            // Get first opponent carId
            saveExGhostHistory.opponent1CarId = rgResult.opponents[0].carId; 

            // Get first opponent tunePower
            saveExGhostHistory.opponent1TunePower = rgResult.opponents[0].tunePower; 

            // Get first opponent tunePower
            saveExGhostHistory.opponent1TuneHandling = rgResult.opponents[0].tuneHandling; 

            // Get the advantage distance between first opponent and user
            saveExGhostHistory.opponent1Result = rgResult.opponents[0].result; 
        }

        // Get played Area
        if(common.sanitizeInput(rgResult.path))
        {
            let getArea = await ghost_get_area_from_path.getArea(rgResult.path);

            saveExGhostHistory.area = getArea.area
        }
    }

    await prisma.ghostBattleRecord.create({
        data: saveExGhostHistory
    });

    let getArea = await ghost_get_area_from_path.getArea(rgResult!.path);

    // Check if defeating Wanted car
    let checkWantedCar = await prisma.ghostExpeditionWantedCar.findFirst({
        where:{
            carId: rgResult!.opponents![0].carId,
            area: getArea.area
        }
    })

    // Wanted car available
    if(checkWantedCar)
    {
        if(rgResult!.opponents![0].result > 0)
        {
            console.log('Wanted Car Defeated');

            await prisma.ghostExpeditionWantedCar.delete({
                where:{
                    dbId: checkWantedCar.dbId
                }
            })
        }
        else
        {
            console.log('Lose from Wanted Car');

            // Making wanted car
            let dataWantedGhost = {
                carId: common.sanitizeInput(rgResult!.opponents![0].carId),
                bonus: checkWantedCar.bonus + 1,
                defeatedMeCount: checkWantedCar.defeatedMeCount + 1
            }

            await prisma.ghostExpeditionWantedCar.update({
                where:{
                    dbId: checkWantedCar.dbId
                },
                data: dataWantedGhost
            })
        }
    }
    // If lose the race maybe
    else
    {
        if(rgResult!.opponents![0].result < 0)
        {
            // Making wanted car
            let dataWantedGhost = {
                carId: common.sanitizeInput(rgResult!.opponents![0].carId),
                bonus: 0,
                numOfHostages: 1,
                defeatedMeCount: 1,
                area: getArea.area
            }

            console.log('Creating Wanted Car');

            await prisma.ghostExpeditionWantedCar.create({
                data: dataWantedGhost
            })
        }
    }

    // Check full tune ticket piece
    let checkFTTicketPiece = await prisma.userItem.findMany({
        where:{
            userId: body.car!.userId!,
            category: 202,
            itemId: 2
        }
    });

    if(checkFTTicketPiece.length >= 6)
    {
        // Give full tune ticket :)
        await prisma.userItem.create({
            data:{
                userId: body.car!.userId!,
                category: 203,
                itemId: 5,
                type: 0,
                earnedAt: date
            }
        });
        
        // Remove full tune ticket piece :(
        await prisma.userItem.deleteMany({
            where:{
                userId: body.car!.userId!,
                category: 202,
                itemId: 2,
            }
        });
    }

    // Sending stamp to opponents
    await ghost_stamp.sendStamp(body);

    // Return the value to 'BASE_PATH/src/util/games/ghost.ts'
    return { updateNewTrail }
}


// Save VSORG ghost history battle but retiring
export async function saveVSORGGhostRetireHistory(body: wm.protobuf.SaveGameResultRequest)
{
    console.log('Saving VSORG Retiring Ghost Battle History');

    // Get the ghost result for the car
    let ghostResult = body?.rgResult;

    // Get current date
    let date = Math.floor(new Date().getTime() / 1000);

    // ghostResult is set
    let dataGhost: any;
    if (ghostResult)
    {
        dataGhost = {
            rgPlayCount: common.sanitizeInput(ghostResult.rgPlayCount), 
        }

        // Update the car properties
        await prisma.car.update({
            where: {
                carId: body.carId
            },
            data: {
                ...dataGhost
            }
        });

        let getArea = await ghost_get_area_from_path.getArea(ghostResult.path);

        // Making wanted car
        let dataWantedGhost = {
            carId: common.sanitizeInput(ghostResult.opponents![0].carId),
            bonus: 0,
            numOfHostages: 1,
            defeatedMeCount: 1,
            area: getArea.area
        }

        let checkWantedCar = await prisma.ghostExpeditionWantedCar.findFirst({
            where:{
                carId: dataWantedGhost.carId
            }
        })

        if(checkWantedCar)
        {
            console.log('Updating Wanted Car');

            dataWantedGhost.bonus = checkWantedCar.bonus + 1;
            dataWantedGhost.defeatedMeCount = checkWantedCar.defeatedMeCount + 1;

            await prisma.ghostExpeditionWantedCar.update({
                where:{
                    dbId: checkWantedCar.dbId
                },
                data: dataWantedGhost
            })
        }
        else
        {
            console.log('Creating Wanted Car');

            await prisma.ghostExpeditionWantedCar.create({
                data: dataWantedGhost
            })
        }
        
    }

    // Get the ghost expedition result for the car
    let expeditionResult = body.rgResult?.expeditionResult;

    // expeditionResult is set
    if (expeditionResult)
    {
        // Expedition update data
        let dataExpedition = {
            ghostExpeditionId: common.sanitizeInput(expeditionResult.ghostExpeditionId),
            sugorokuPoint: common.sanitizeInput(expeditionResult.sugorokuPoint),
            earnedScore: common.sanitizeInput(expeditionResult.earnedScore),
            score: common.sanitizeInput(expeditionResult.score),
        }
        
        let checkExpeditionData = await prisma.ghostExpedition.findFirst({
            where:{
                carId: body.carId
            }
        }); 

        // Update the expedition data
        if(checkExpeditionData)
        {
            await prisma.ghostExpedition.update({
                where:{
                    dbId: checkExpeditionData.dbId
                },
                data: {
                    ...dataExpedition
                }
            }); 
        }
        // Create the expedition data
        else
        {
            await prisma.ghostExpedition.create({
                data: {
                    carId: body.carId,
                    ...dataExpedition
                }
            }); 
        }
        
        if(expeditionResult.earnedItems!.length !== 0)
        {
            console.log('User Item reward from VSORG available, continuing ...');

            for(let i=0; i<expeditionResult.earnedItems!.length; i++)
            {
                await prisma.userItem.create({
                    data: {
                        category: expeditionResult.earnedItems![i].category,
                        itemId: expeditionResult.earnedItems![i].itemId,
                        userId: body.car!.userId!,
                        earnedAt: date,
                        type: 0
                    }
                });
            }
        }

        if(expeditionResult.aftereventBonus!.length !== 0)
        {
            console.log('User Item after event reward from VSORG available, continuing ...');

            for(let i=0; i<expeditionResult.aftereventBonus!.length; i++)
            {
                /*
                await prisma.userItem.create({
                    data: {
                        category: expeditionResult.earnedItems![i].category,
                        itemId: expeditionResult.earnedItems![i].itemId,
                        userId: body.car!.userId!,
                        earnedAt: date,
                        type: 0
                    }
                });*/
            }
        }
    }

    // Check full tune ticket piece
    let checkFTTicketPiece = await prisma.userItem.findMany({
        where:{
            userId: body.car!.userId!,
            category: 202,
            itemId: 2
        }
    });

    if(checkFTTicketPiece.length >= 6)
    {
        // Give full tune ticket :)
        await prisma.userItem.create({
            data:{
                userId: body.car!.userId!,
                category: 203,
                itemId: 5,
                type: 0,
                earnedAt: date
            }
        });
        
        // Remove full tune ticket piece :(
        await prisma.userItem.deleteMany({
            where:{
                userId: body.car!.userId!,
                category: 202,
                itemId: 2,
            }
        });
    }
}