import { Application } from "express";
import { Module } from "module";
import { prisma } from "..";

// Import Proto
import * as wm from "../wmmt/wm.proto";
import * as wmsrv from "../wmmt/service.proto";

// Import Util
import * as common from "../util/common";


export default class GhostModule extends Module {
    register(app: Application): void {

        app.post('/method/load_ghost_expedition_info', async (req, res) => {

            // Get the request body for the load stamp target request
            let body = wm.wm.protobuf.LoadGhostExpeditionInfoRequest.decode(req.body);

            // Get User data
            let userScores = await prisma.ghostExpedition.findFirst({
                where:{
                    carId: body.carId,
                    ghostExpeditionId: body.ghostExpeditionId
                }
            })

            // Get local store score
            let localScores = await prisma.ghostExpedition.findMany({
                where:{
                    ghostExpeditionId: body.ghostExpeditionId
                },
                orderBy:{
                    score: 'desc'
                }
            })

            // Totaling local store score
            let sumLocalScore = 0;
            for(let i=0; i<localScores.length; i++)
            {
                sumLocalScore += localScores[i].score;
            }

            // Response data
            let msg = {
                error: wm.wm.protobuf.ErrorCode.ERR_SUCCESS,
                sugorokuPoint: userScores?.sugorokuPoint || 0,
                score: userScores?.score || 0,
                localScore: sumLocalScore,
            };

            // Encode the response
			let message = wm.wm.protobuf.LoadGhostExpeditionInfoResponse.encode(msg);

            // Send the response to the client
            common.sendResponse(message, res);
		})

        
        app.post('/method/load_ghost_expedition_target_by_path', async (req, res) => {

            // Get the request body for the load stamp target request
            let body = wm.wm.protobuf.LoadGhostExpeditionTargetByPathRequest.decode(req.body);

            let areaExpedition: wm.wm.protobuf.LoadGhostExpeditionTargetByPathResponse.AreaStats[] = [];

            for(let j=0; j<19; j++)
			{
                // 14 - 16 are dummy area, 17 is C1 Closed
				if(j >= 14){
					j = 18; // GID_RUNAREA_HIROSHIMA
				}
				let areaVal = 0;
				let pathVal = 0;
				if(j === 0){ // GID_RUNAREA_C1
					areaVal = 0;
					pathVal = 0;
				}
				else if(j === 1){ // GID_RUNAREA_RING
					areaVal = 1;
					pathVal = 10;
				}
				else if(j === 2){ // GID_RUNAREA_SUBTOKYO_3_4
					areaVal = 2;
					pathVal = 16;
				}
				else if(j === 3){ // GID_RUNAREA_SUBTOKYO_5
					areaVal = 3;
					pathVal = 18;
				}
				else if(j === 4){ // GID_RUNAREA_WANGAN
					areaVal = 4;
					pathVal = 20;
				}
				else if(j === 5){ // GID_RUNAREA_K1
					areaVal = 5;
					pathVal = 27;
				}
				else if(j === 6){ // GID_RUNAREA_YAESU
					areaVal = 6;
					pathVal = 34;
				}
				else if(j === 7){ // GID_RUNAREA_YOKOHAMA
					areaVal = 7;
					pathVal = 38;
				}
				else if(j === 8){ // GID_RUNAREA_NAGOYA
					areaVal = 8;
					pathVal = 49;
				}
				else if(j === 9){ // GID_RUNAREA_OSAKA
					areaVal = 9;
					pathVal = 50;
				}
				else if(j === 10){ // GID_RUNAREA_KOBE
					areaVal = 10;
					pathVal = 54;
				}
				else if(j === 11){ // GID_RUNAREA_FUKUOKA
					areaVal = 11;
					pathVal = 58;
				}
				else if(j === 12){ // GID_RUNAREA_HAKONE
					areaVal = 12;
					pathVal = 62;
				}
				else if(j === 13){ // GID_RUNAREA_TURNPIKE
					areaVal = 13;
					pathVal = 64;
				}
				//14 - 16 are dummy area, 17 is GID_RUNAREA_C1_CLOSED
				else if(j === 18){ // GID_RUNAREA_HIROSHIMA
					areaVal = 18;
                    pathVal = 56;
				}

                // Get Wanted List
                let wantedInfo: wm.wm.protobuf.LoadGhostExpeditionTargetByPathResponse.AreaStats.WantedInfo[] = [];

                let checkWantedList = await prisma.ghostExpeditionWantedCar.findMany({
                    where:{
                        ghostExpeditionId: body.ghostExpeditionId,
                        area: j
                    },
                    orderBy:{
                        bonus: 'desc'
                    },
                    take: 10
                })

                // TODO: FIX THIS STUFF
                /* GAME SOMETIMES BUT MOSTLY WILL CRASH IF I ADDED WANTED INFO... HUH?!?!?!??!?!?! WTF GAME?!?!?
                if(checkWantedList.length > 0)
                {
                    wantedInfo.push(wm.wm.protobuf.LoadGhostExpeditionTargetByPathResponse.AreaStats.WantedInfo.create({
                        wantedLevel: checkWantedList[0].bonus,
                        numOfWantedCars: checkWantedList.length
                    }))

                    areaExpedition.push(wm.wm.protobuf.LoadGhostExpeditionTargetByPathResponse.AreaStats.create({
                        area: areaVal,
                        path: pathVal,
                        wantedInfo: wantedInfo
                    }));
                }
                else
                {
                    areaExpedition.push(wm.wm.protobuf.LoadGhostExpeditionTargetByPathResponse.AreaStats.create({
                        area: areaVal,
                        path: pathVal,
                        wantedInfo: null
                    }));
                }*/
                
                // Push the path per area (if not set.. all will become kandabashi ramp)
                areaExpedition.push(wm.wm.protobuf.LoadGhostExpeditionTargetByPathResponse.AreaStats.create({
                    area: areaVal,
                    path: pathVal,
                    wantedInfo: null
                }));
            }

            let msg = {
                error: wm.wm.protobuf.ErrorCode.ERR_SUCCESS,
                areas: areaExpedition,
                selectionMethod: wm.wm.protobuf.PathSelectionMethod.PATH_NORMAL // idk what this is
            };

            // Encode the response
			let message = wm.wm.protobuf.LoadGhostExpeditionTargetByPathResponse.encode(msg);

            // Send the response to the client
            common.sendResponse(message, res);
		})

        app.post('/method/load_ghost_expedition_targets', async (req, res) => {

            // Get the request body for the load stamp target request
            let body = wm.wm.protobuf.LoadGhostExpeditionTargetsRequest.decode(req.body);

            // Get the area id and ramp id
            let area = 0;
            let ramp = 0; // this is important to set, if not.. the path shown when selecting car tune and loading screen will get randomized
            let path = 0;
            if(body.path)
            {
                if(body.path >= 0 && body.path <= 9){ // GID_PATH_C1
                    area = Number(0);
                    ramp = 0;
                }
                else if(body.path >= 10 && body.path <= 15){ // GID_PATH_N9
                    area = Number(1);
                    ramp = 4;
                }
                else if(body.path >= 16 && body.path <= 17){ // GID_PATH_WTEAST
                    area = Number(2);
                    ramp = 6;
                }
                else if(body.path >= 18 && body.path <= 19){ // GID_PATH_WT_UP_DOWN
                    area = Number(3);
                    ramp = 8;
                }
                else if(body.path >= 20 && body.path <= 26){ // GID_PATH_WG
                    area = Number(4);
                    ramp = 10;
                }
                else if(body.path >= 27 && body.path <= 33){ // GID_PATH_KG
                    area = Number(5);
                    ramp = 14;
                }
                else if(body.path >= 34 && body.path <= 37){ // GID_PATH_YS
                    area = Number(6);
                    ramp = 18;
                }
                else if(body.path >= 38 && body.path <= 48){ // GID_PATH_KG_SHINYAMASHITA_MINATOMIRAI
                    area = Number(7);
                    ramp = 21;
                }
                else if(body.path === 49){ // GID_PATH_NGR
                    area = Number(8);
                    ramp = 25;
                }
                else if(body.path >= 50 && body.path <= 53){ // GID_PATH_OS
                    area = Number(9);
                    ramp = 26;
                }
                else if(body.path >= 54 && body.path <= 55){ // GID_PATH_KB
                    area = Number(10);
                    ramp = 27;
                }
                else if(body.path >= 58 && body.path <= 61){ // GID_PATH_FK
                    area = Number(11);
                    ramp = 29;
                }
                else if(body.path >= 62 && body.path <= 63){ // GID_PATH_HK
                    area = Number(12);
                    ramp = 33;
                }
                else if(body.path >= 64 && body.path <= 65){ // GID_PATH_TP
                    area = Number(13);
                    ramp = 35;
                }
                else if(body.path >= 56 && body.path <= 57){ // GID_PATH_HS
                    area = Number(18);
                    ramp = 37;
                }

                path = Number(body.path);
            }

            let lists_candidates: wm.wm.protobuf.GhostCar[] = [];
            let lists_wanted: wm.wm.protobuf.WantedCar[] = [];

            // Check wanted car
            let wantedCarList = await prisma.ghostExpeditionWantedCar.findMany({
                where:{
                    ghostExpeditionId: body.ghostExpeditionId,
                    area: area
                },
                take: 10
            })

            // Make array for excluding wanted car from non wanted car
            let arrayWantedCarId = []; 
            for(let i=0; i<wantedCarList.length; i++)
            {
                arrayWantedCarId.push(wantedCarList[i].carId);
            }

            // Get Expedition (VSORG) VS Ghost Region
            let ghostExpeditionRegion = await prisma.ghostExpeditionEvent.findFirst({
                where: {
					ghostExpeditionId: body.ghostExpeditionId
				},
            });

            let country = 'JPN';
            let regionId: number = 20;
            if(ghostExpeditionRegion!.opponentCountry === 'IDN')
            {
                country = 'IDN';
                regionId = 18;
            }
            else if(ghostExpeditionRegion!.opponentCountry === 'AUS')
            {
                country = 'AUS';
                regionId = 2;
            }
            else if(ghostExpeditionRegion!.opponentCountry === 'CHN')
            {
                country = 'CHN';
                regionId = 10;
            }
            else if(ghostExpeditionRegion!.opponentCountry === 'HKG')
            {
                country = 'HKG';
                regionId = 15;
            }
            else if(ghostExpeditionRegion!.opponentCountry === 'PHL')
            {
                country = 'PHL';
                regionId = 30;
            }

            // Get Canditate list
            let car = await prisma.car.findMany({
                where:{
                    NOT: {
                        carId: { in: arrayWantedCarId }, // except wanted car
                    }
                },
                include:{
                    gtWing: true,
                    lastPlayedPlace: true
                }
            });

            let arr = [];
            let maxNumber = 0;

            // If all user car data available is more than 10 for certain level
			if(car.length > 10)
			{ 
				maxNumber = 10 // Limit to 10 (game default)
			}
            // If no more than 10
			else
			{
				maxNumber = car.length;
			}

            while(arr.length < maxNumber)
			{ 
                // Pick random car Id
				let randomNumber: number = Math.floor(Math.random() * car.length);

                if(arr.indexOf(randomNumber) === -1)
                {
                    // Push current number to array
					arr.push(randomNumber); 

                    // Push data to Ghost car proto
                    lists_candidates.push(wm.wm.protobuf.GhostCar.create({
                        car: {
                            ...car[randomNumber],
                            country: country,
                            regionId: regionId
                        },
                        area: area,
                        ramp: ramp,
                        path: path,
                        nonhuman: false,
                        type: wm.wm.protobuf.GhostType.GHOST_REGION,
                    })); 
                }
            }

            // Get store result performance
            let localScores = await prisma.ghostExpedition.findMany({
                where:{
                    ghostExpeditionId: body.ghostExpeditionId
                }
            })
            let sumLocalScore = 0;
            let recentWinners: wm.wm.protobuf.CarEntry[] = []

            for(let i=0; i<localScores.length; i++)
            {
                // total the local store score
                sumLocalScore += localScores[i].score;

                if(localScores[i].carId !== body.carId)
                {
                    let car = await prisma.car.findFirst({
                        where:{
                            carId: localScores[i].carId
                        }
                    });

                    // Push to recent store winner 
                    recentWinners.push(wm.wm.protobuf.CarEntry.create({
                        name: car!.name,
                        level: car!.level,
                        title: car!.title,
                        model: car!.model,
                        visualModel: car!.visualModel,
                        defaultColor: car!.defaultColor,
                        score: localScores[i].score,
                    }))
                }
            }

            // Get Wanted List
            for(let i=0; i<wantedCarList.length; i++)
            {
                let wantedCar = await prisma.car.findFirst({
                    where:{
                        carId: wantedCarList[i].carId
                    },
                    include:{
                        gtWing: true,
                        lastPlayedPlace: true
                    }
                });

                if(wantedCar)
                {
                    let ghostcar = wm.wm.protobuf.GhostCar.create({
                        car: {
                            ...wantedCar,
                            country: country,
                            regionId: regionId
                        },
                        area: area,
                        ramp: ramp,
                        path: path,
                        nonhuman: false,
                        type: wm.wm.protobuf.GhostType.GHOST_REGION,
                    });

                    let car = await prisma.car.findFirst({
                        where:{
                            carId: body.carId
                        }
                    })

                    // idk what hostages for
                    let hostages = wm.wm.protobuf.CarEntry.create({
                        name: car!.name,
                        level: car!.level,
                        title: car!.title,
						model: car!.model,
						visualModel: car!.visualModel,
                        defaultColor: car!.defaultColor,
                        score: wantedCarList[i].bonus, // idk what this is
                    })

                    lists_wanted.push(wm.wm.protobuf.WantedCar.create({
                        ghost: ghostcar,
                        wantedId: wantedCar.carId, // id?
                        bonus: wantedCarList[i].bonus, // for bonus store win
                        numOfHostages: 1, // idk what this is for
                        defeatedMeCount: wantedCarList[i].defeatedMeCount, // for bonus movements
                        hostage: hostages // idk what this is for
                    }))
                }  
            }

            // Response data
            let msg = {
                error: wm.wm.protobuf.ErrorCode.ERR_SUCCESS,
                candidates: lists_candidates,
                localScore: sumLocalScore,
                wantedCars:  lists_wanted,
                recentWinners: recentWinners // store result performance
            };

            // Encode the response
			let message = wm.wm.protobuf.LoadGhostExpeditionTargetsResponse.encode(msg);

            // Send the response to the client
            common.sendResponse(message, res);
        })

        
        // Lock Wanted
        app.post('/method/lock_wanted', async (req, res) => {

            // Get the request body for the load stamp target request
            let body = wmsrv.wm.protobuf.LockWantedRequest.decode(req.body);

            // Get the current date/time (unix epoch)
			let date = Math.floor(new Date().getTime() / 1000);

            // Wanted Lock Variable
            let locked: boolean = false;
            let lockTime: number = 0;

            // Handling to auto unlock the Wanted Ghost
            await prisma.ghostExpeditionWantedCar.updateMany({
                where:{
                    lockTime: {
                        lt: date
                    }
                },
                data:{
                    locked: locked,
                    lockTime: lockTime
                }
            });

            // Lock the Wanted Ghost
            if(body.lockTime > 0)
            {
                locked = true;
                lockTime = date + 600;
            }

            // Change the Wanted Ghost Lock Status
            await prisma.ghostExpeditionWantedCar.updateMany({
                where:{
                    carId: body.wantedId
                },
                data:{
                    locked: locked,
                    lockTime: lockTime
                }
            });

            // Response data
            let msg = {
                error: wm.wm.protobuf.ErrorCode.ERR_SUCCESS,
            };

            // Encode the response
			let message = wmsrv.wm.protobuf.LockWantedResponse.encode(msg);

            // Send the response to the client
            common.sendResponse(message, res);
        })

        
        // Load Ghost Expedition Result
        app.post('/method/load_ghost_expedition_result', async (req, res) => {

            // Get the request body for the load stamp target request
            let body = wmsrv.wm.protobuf.LoadGhostExpeditionResultRequest.decode(req.body);

            // Get User data
            let userScores = await prisma.ghostExpedition.findFirst({
                where:{
                    carId: body.carId,
                    ghostExpeditionId: body.ghostExpeditionId
                }
            })

            // Get local store score
            let localScores = await prisma.ghostExpedition.findMany({
                where:{
                    ghostExpeditionId: body.ghostExpeditionId
                },
                orderBy:{
                    score: 'desc'
                }
            })

            // Totaling local store score
            let sumLocalScore = 0;
            let ghostExpeditionRankings: wm.wm.protobuf.GhostExpeditionRankingEntry[] = []

            for(let i=0; i<localScores.length; i++)
            {
                sumLocalScore += localScores[i].score;
            }

            // Get car score
            for(let i=0; i<localScores.length; i++)
            {
                let car = await prisma.car.findFirst({
                    where:{
                        carId: localScores[i].carId
                    },
                    orderBy:{
                        carId: 'asc'
                    },
                    include:{
                        gtWing: true,
                        lastPlayedPlace: true
                    }
                });

                
                if(car)
                {    
                    ghostExpeditionRankings.push(wm.wm.protobuf.GhostExpeditionRankingEntry.create({
                        rank: i+1,
                        score: localScores[i].score,
                        car: car!
                    }));
                }
            } 

            // Response data
            let msg = {
                error: wm.wm.protobuf.ErrorCode.ERR_SUCCESS,
                score: userScores?.score || 0,
                localScore: sumLocalScore,
                localRanking: ghostExpeditionRankings
            }

            // Encode the response
			let message = wmsrv.wm.protobuf.LoadGhostExpeditionResultResponse.encode(msg);

            // Send the response to the client
            common.sendResponse(message, res);
        })
    }
}