import { prisma } from "../..";

// Import Proto
import { wm } from "../../wmmt/wm.proto";

// Import Util
import * as common from "../../util/common";


// Saving Crown Data
export async function saveCrownData(body: wm.protobuf.SaveGameResultRequest)
{
    // Get the ghost crown result
    let ghostResultCrown = body?.rgResult;

    // Declare data
    let dataCrown : any;

    // ghostResultCrown is set
    if (ghostResultCrown)
    {
        let carId: number = 0;
        if(body.carId)
        {
            carId = Number(body.carId);
        }

        // Ghost Crown update data
        dataCrown = {
            carId: carId,
            playedAt: common.sanitizeInput(body.playedAt),
            tunePower: common.sanitizeInput(body.car?.tunePower),
            tuneHandling: common.sanitizeInput(body.car?.tuneHandling),
        }

        // Get the area id and ramp id
        let area = 0;
        let ramp = 0;
        let path = 0;
        if(body.rgResult?.path)
        {
            if(body.rgResult?.path >= 0 && body.rgResult?.path <= 9){ // GID_PATH_C1
                area = Number(0);
                ramp = Number(Math.floor(Math.random() * 4));
            }
            else if(body.rgResult?.path >= 10 && body.rgResult?.path <= 15){ // GID_PATH_N9
                area = Number(1);
                ramp = Number(Math.floor(Math.random() * 2) + 4);
            }
            else if(body.rgResult?.path >= 16 && body.rgResult?.path <= 17){ // GID_PATH_WTEAST
                area = Number(2);
                ramp = Number(Math.floor(Math.random() * 2) + 6);
            }
            else if(body.rgResult?.path >= 18 && body.rgResult?.path <= 19){ // GID_PATH_WT_UP_DOWN
                area = Number(3);
                ramp = Number(Math.floor(Math.random() * 2) + 8);
            }
            else if(body.rgResult?.path >= 20 && body.rgResult?.path <= 26){ // GID_PATH_WG
                area = Number(4);
                ramp = Number(Math.floor(Math.random() * 4) + 10);
            }
            else if(body.rgResult?.path >= 27 && body.rgResult?.path <= 33){ // GID_PATH_KG
                area = Number(5);
                ramp = Number(Math.floor(Math.random() * 4) + 14);
            }
            else if(body.rgResult?.path >= 34 && body.rgResult?.path <= 37){ // GID_PATH_YS
                area = Number(6);
                ramp = Number(Math.floor(Math.random() * 3) + 18);
            }
            else if(body.rgResult?.path >= 38 && body.rgResult?.path <= 48){ // GID_PATH_KG_SHINYAMASHITA_MINATOMIRAI
                area = Number(7);
                ramp = Number(Math.floor(Math.random() * 4) + 21);
            }
            else if(body.rgResult?.path === 49){ // GID_PATH_NGR
                area = Number(8);
                ramp = Number(25);
            }
            else if(body.rgResult?.path >= 50 && body.rgResult?.path <= 53){ // GID_PATH_OS
                area = Number(9);
                ramp = Number(26);
            }
            else if(body.rgResult?.path >= 54 && body.rgResult?.path <= 55){ // GID_PATH_KB
                area = Number(10);
                ramp = Number(Math.floor(Math.random() * 2) + 27);
            }
            else if(body.rgResult?.path >= 58 && body.rgResult?.path <= 61){ // GID_PATH_FK
                area = Number(11);
                ramp = Number(Math.floor(Math.random() * 4) + 29);
            }
            else if(body.rgResult?.path >= 62 && body.rgResult?.path <= 63){ // GID_PATH_HK
                area = Number(12);
                ramp = Number(Math.floor(Math.random() * 2) + 33);
            }
            else if(body.rgResult?.path >= 64 && body.rgResult?.path <= 65){ // GID_PATH_TP
                area = Number(13);
                ramp = Number(Math.floor(Math.random() * 2) + 35);
            }
            else if(body.rgResult?.path >= 56 && body.rgResult?.path <= 57){ // GID_PATH_HS
                area = Number(18);
                ramp = Number(Math.floor(Math.random() * 2) + 27);
            }

            path = Number(body.rgResult.path);
        }

        // Get the available crown holder data
        let carCrowns = await prisma.carCrown.count({ 
            where: {
                area: area
            }
        });

        // Crown holder data available
        if(carCrowns !== 0)
        { 
            // Update it to the new one
            let areaVal = Number(area);
            await prisma.carCrown.update({ 
                where: {
                    area: areaVal
                },
                data: {
                    ...dataCrown,
                    area: area,
                    ramp: ramp,
                    path: path
                }
            });
        }
        // Crown holder data not available or still default crown holder data
        else
        { 
            await prisma.carCrown.create({
                data: {
                    ...dataCrown,
                    area: area,
                    ramp: ramp,
                    path: path
                }
            });
        }
    }
}