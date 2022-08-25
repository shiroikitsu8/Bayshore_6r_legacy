import { prisma } from "../..";

// Import Proto
import { wm } from "../../wmmt/wm.proto";

// Import Util
import * as ghost_get_area_from_path from "../ghost/ghost_util/ghost_get_area_from_path";


export async function sendStamp(body: wm.protobuf.SaveGameResultRequest)
{
    let consoleLog = 0; // stupid stuff for console log notice

    let rgResult = body.rgResult;

    // Get current date
    let date = Math.floor(new Date().getTime() / 1000);

    if(rgResult)
    {
        // Stamp must bigger than 0
        if(rgResult.rgStamp === 0)
        {
            rgResult.rgStamp = 1;
        }

        // Get the area
        let area;
        if(rgResult.path)
        {
            let getArea = await ghost_get_area_from_path.getArea(rgResult.path);

            area = getArea.area;
        }

        // Check how many opponents available
        for(let i=0; i<rgResult.opponents!.length; i++)
        {
            let checkCar = await prisma.car.findFirst({
                where:{
                    carId: rgResult.opponents![i].carId,
                    NOT:{
                        userId: body.car!.userId!
                    }
                },
                include:{
                    gtWing: true,
                    lastPlayedPlace: true
                }
            })

            if(checkCar)
            {
                if(consoleLog === 0)
                {
                    console.log('Sending Stamp');
                    consoleLog = 1;
                }

                // Create Challenger data
                let dataChallenger: any = {
                    carId: rgResult.opponents![i].carId,
                    challengerCarId: body.carId,
                    stamp: rgResult.rgStamp,
                    result: rgResult.opponents![i].result,
                    area: area,
                    lastPlayedAt: date
                }
    
                // Create Stamp Target data
                let dataStampTarget: any = {
                    carId: body.carId,
                    stampTargetCarId: rgResult.opponents![i].carId,
                    returnCount: 1,
                    locked: false,
                    recommended: true
                } 

                // Check available stamp
                let stampTarget = await prisma.carStampTarget.findFirst({
                    where:{
                        carId: body.carId,
                        stampTargetCarId: rgResult.opponents![i].carId,
                    }
                })

                // No record found
                if(!(stampTarget))
                {
                    console.log('Creating new stamp entry');

                    await prisma.carChallenger.create({
                        data: dataChallenger
                    })
    
                    await prisma.carStampTarget.create({
                        data: dataStampTarget
                    })
                }
            }
        } 
    }
}


export async function shuttleReturnStamp(body: wm.protobuf.SaveGameResultRequest)
{
    let consoleLog = 0; // stupid stuff for console log notice

    let rgResult = body.rgResult;
    
    // Get current date
    let date = Math.floor(new Date().getTime() / 1000);

    if(rgResult)
    {
        // Stamp must bigger than 0
        if(rgResult.rgStamp === 0)
        {
            rgResult.rgStamp = 1;
        }

        // Get the area
        let area;
        if(rgResult.path)
        {
            let getArea = await ghost_get_area_from_path.getArea(rgResult.path);

            area = getArea.area;
        }

        // Check how many opponents available
        for(let i=0; i<rgResult.opponents!.length; i++)
        {
            let checkCar = await prisma.car.findFirst({
                where:{
                    carId: rgResult.opponents![i].carId,
                    NOT:{
                        userId: body.car!.userId!
                    }
                },
                include:{
                    gtWing: true,
                    lastPlayedPlace: true
                }
            })

            if(checkCar)
            {
                if(consoleLog === 0)
                {
                    console.log('Returning Stamp');
                    consoleLog = 1;
                }

                // Return the stamp
                let stampTarget = await prisma.carStampTarget.findFirst({
                    where:{
                        carId: rgResult.opponents![i].carId,
                        stampTargetCarId: body.carId,
                    }
                })

                if(stampTarget)
                {
                    let returnCount = stampTarget.returnCount + 1;
        
                    let dataStampTarget: any = {
                        carId: rgResult.opponents![i].carId,
                        stampTargetCarId: body.carId,
                        returnCount: returnCount,
                        locked: true,
                        recommended: false
                    } 

                    console.log(`Updating car ${rgResult.opponents![i].carId} vs ${body.carId} stamp entry and locking it`);

                    await prisma.carStampTarget.update({
                        where:{
                            id: stampTarget.id
                        },
                        data: dataStampTarget
                    })
                }

                // Stamp Returned
                let challengeReturned = await prisma.carChallenger.findFirst({
                    where:{
                        carId: rgResult.opponents![i].carId,
                        challengerCarId: body.carId,
                    }
                })

                if(challengeReturned)
                {
                    let dataChallenger: any = {
                        carId: rgResult.opponents![i].carId,
                        challengerCarId: body.carId,
                        stamp: rgResult.rgStamp,
                        result: rgResult.opponents![i].result,
                        area: area,
                        lastPlayedAt: date
                    }
    
                    console.log('Updating challenger entry');

                    await prisma.carChallenger.update({
                        where:{
                            id: challengeReturned.id
                        },
                        data: dataChallenger
                    })
                }
                
                let stampReturned = await prisma.carStampTarget.findFirst({
                    where:{
                        carId: body.carId,
                        stampTargetCarId: rgResult.opponents![i].carId,
                    }
                })

                if(stampReturned)
                {
                    console.log(`Stamp returned to ${rgResult.opponents![i].carId}, unlocking it so opponents can fight your ghost`);

                    await prisma.carStampTarget.update({
                        where:{
                            id: stampReturned.id
                        },
                        data: {
                            locked: false,
                            recommended: true
                        }
                    })
                }
            }
        }
    }
}