import { Config } from "../../config";

// Import Proto
import * as wm from "../../wmmt/wm.proto";

// Global Variable
let date = Math.floor(new Date().getTime() / 1000);
let playedPlace = wm.wm.protobuf.Place.create({ 
    placeId: Config.getConfig().placeId,
    regionId: Config.getConfig().regionId,
    shopName: Config.getConfig().shopName,
    country: Config.getConfig().country
});


export async function DefaultGhostCarBMW()
{
    let cars = wm.wm.protobuf.Car.create({ 
        carId: 999999999, // Don't change this
        name: 'ＳＡＦＴＹ',
        regionId: 18, // IDN (福井)
        manufacturer: 0,
        model: 71, // Z4 Safty (yes.. safty)
        visualModel: 100, // Z4 Safty (yes.. safty)
        defaultColor: 0,
        customColor: 0,
        wheel: 20,
        wheelColor: 0,
        aero: 0,
        bonnet: 0,
        wing: 0,
        mirror: 0,
        neon: 0,
        trunk: 0,
        plate: 0,
        plateColor: 0,
        plateNumber: 0,
        tunePower: 18,
        tuneHandling: 16,
        rivalMarker: 32,
        aura: 551,
        windowSticker: true,
        windowStickerString: 'ＢＡＹＳＨＯＲＥ',
        windowStickerFont: 0,
        title: 'Wangan Beginner',
        level: 65, // SSSSS
        lastPlayedAt: date,
        country: 'JPN',
        lastPlayedPlace: playedPlace
    });

    return { cars };
}


export async function DefaultGhostCarChevrolet()
{
    let cars = wm.wm.protobuf.Car.create({ 
        carId: 999999999, // Don't change this
        name: 'ＴＡＸＩ',
        regionId: 18, // IDN (福井)
        manufacturer: 1,
        model: 66, // Corvette C6 Taxi
        visualModel: 1, // Corvette C6 Taxi
        defaultColor: 0,
        customColor: 0,
        wheel: 20,
        wheelColor: 0,
        aero: 0,
        bonnet: 0,
        wing: 0,
        mirror: 0,
        neon: 0,
        trunk: 0,
        plate: 0,
        plateColor: 0,
        plateNumber: 0,
        tunePower: 18,
        tuneHandling: 16,
        rivalMarker: 32,
        aura: 551,
        windowSticker: true,
        windowStickerString: 'ＢＡＹＳＨＯＲＥ',
        windowStickerFont: 0,
        title: 'Wangan Beginner',
        level: 65, // SSSSS
        lastPlayedAt: date,
        country: 'JPN',
        lastPlayedPlace: playedPlace
    });

    return { cars };
}


export async function DefaultGhostCarMazda()
{
    let cars = wm.wm.protobuf.Car.create({ 
        carId: 999999999, // Don't change this
        name: 'ＥＲＥＫ７',
        regionId: 18, // IDN (福井)
        manufacturer: 2,
        model: 9, // RX-7
        visualModel: 6, // RX-7
        defaultColor: 0,
        customColor: 0,
        wheel: 20,
        wheelColor: 0,
        aero: 0,
        bonnet: 0,
        wing: 0,
        mirror: 0,
        neon: 0,
        trunk: 0,
        plate: 0,
        plateColor: 0,
        plateNumber: 0,
        tunePower: 18,
        tuneHandling: 16,
        rivalMarker: 32,
        aura: 551,
        windowSticker: true,
        windowStickerString: 'ＢＡＹＳＨＯＲＥ',
        windowStickerFont: 0,
        title: 'Wangan Beginner',
        level: 65, // SSSSS
        lastPlayedAt: date,
        country: 'JPN',
        lastPlayedPlace: playedPlace
    });

    return { cars };
}


export async function DefaultGhostCarMercedes()
{
    let cars = wm.wm.protobuf.Car.create({ 
        carId: 999999999, // Don't change this
        name: 'ＳＬＳ',
        regionId: 18, // IDN (福井)
        manufacturer: 3,
        model: 87, // SLS AMG
        visualModel: 107, // SLS AMG
        defaultColor: 0,
        customColor: 0,
        wheel: 20,
        wheelColor: 0,
        aero: 0,
        bonnet: 0,
        wing: 0,
        mirror: 0,
        neon: 0,
        trunk: 0,
        plate: 0,
        plateColor: 0,
        plateNumber: 0,
        tunePower: 18,
        tuneHandling: 16,
        rivalMarker: 32,
        aura: 551,
        windowSticker: true,
        windowStickerString: 'ＢＡＹＳＨＯＲＥ',
        windowStickerFont: 0,
        title: 'Wangan Beginner',
        level: 65, // SSSSS
        lastPlayedAt: date,
        country: 'JPN',
        lastPlayedPlace: playedPlace
    });

    return { cars };
}


export async function DefaultGhostCarMitsubishi()
{
    let cars = wm.wm.protobuf.Car.create({ 
        carId: 999999999, // Don't change this
        name: 'ＥＶＯ　９',
        regionId: 18, // IDN (福井)
        manufacturer: 4,
        model: 22, // EVO IX
        visualModel: 15, // EVO IX
        defaultColor: 0,
        customColor: 0,
        wheel: 20,
        wheelColor: 0,
        aero: 0,
        bonnet: 0,
        wing: 0,
        mirror: 0,
        neon: 0,
        trunk: 0,
        plate: 0,
        plateColor: 0,
        plateNumber: 0,
        tunePower: 18,
        tuneHandling: 16,
        rivalMarker: 32,
        aura: 551,
        windowSticker: true,
        windowStickerString: 'ＢＡＹＳＨＯＲＥ',
        windowStickerFont: 0,
        title: 'Wangan Beginner',
        level: 65, // SSSSS
        lastPlayedAt: date,
        country: 'JPN',
        lastPlayedPlace: playedPlace
    });

    return { cars };
}


export async function DefaultGhostCarNissan()
{
    let cars = wm.wm.protobuf.Car.create({ 
        carId: 999999999, // Don't change this
        name: 'ＤＥＢＵＧ',
        regionId: 18, // IDN (福井)
        manufacturer: 5,
        model: 27, // R34 nur
        visualModel: 30, // R34 nur
        defaultColor: 0,
        customColor: 0,
        wheel: 20,
        wheelColor: 0,
        aero: 0,
        bonnet: 0,
        wing: 0,
        mirror: 0,
        neon: 0,
        trunk: 0,
        plate: 0,
        plateColor: 0,
        plateNumber: 0,
        tunePower: 18,
        tuneHandling: 16,
        rivalMarker: 32,
        aura: 551,
        windowSticker: true,
        windowStickerString: 'ＢＡＹＳＨＯＲＥ',
        windowStickerFont: 0,
        title: 'Wangan Beginner',
        level: 65, // SSSSS
        lastPlayedAt: date,
        country: 'JPN',
        lastPlayedPlace: playedPlace
    });

    return { cars };
}


export async function DefaultGhostCarSubaru()
{
    let cars = wm.wm.protobuf.Car.create({ 
        carId: 999999999, // Don't change this
        name: 'ＳＶＸ',
        regionId: 18, // IDN (福井)
        manufacturer: 7,
        model: 47, // ALCYONE SVX
        visualModel: 54, // ALCYONE SVX
        defaultColor: 0,
        customColor: 0,
        wheel: 20,
        wheelColor: 0,
        aero: 0,
        bonnet: 0,
        wing: 0,
        mirror: 0,
        neon: 0,
        trunk: 0,
        plate: 0,
        plateColor: 0,
        plateNumber: 0,
        tunePower: 18,
        tuneHandling: 16,
        rivalMarker: 32,
        aura: 551,
        windowSticker: true,
        windowStickerString: 'ＢＡＹＳＨＯＲＥ',
        windowStickerFont: 0,
        title: 'Wangan Beginner',
        level: 65, // SSSSS
        lastPlayedAt: date,
        country: 'JPN',
        lastPlayedPlace: playedPlace
    });

    return { cars };
}


export async function DefaultGhostCarToyota()
{
    let cars = wm.wm.protobuf.Car.create({ 
        carId: 999999999, // Don't change this
        name: 'Ａ９０',
        regionId: 18, // IDN (福井)
        manufacturer: 8,
        model: 122, // GR Supra (not honda supra motorbike)
        visualModel: 145, // GR Supra (not honda supra motorbike)
        defaultColor: 0,
        customColor: 0,
        wheel: 20,
        wheelColor: 0,
        aero: 0,
        bonnet: 0,
        wing: 0,
        mirror: 0,
        neon: 0,
        trunk: 0,
        plate: 0,
        plateColor: 0,
        plateNumber: 0,
        tunePower: 18,
        tuneHandling: 16,
        rivalMarker: 32,
        aura: 551,
        windowSticker: true,
        windowStickerString: 'ＢＡＹＳＨＯＲＥ',
        windowStickerFont: 0,
        title: 'Wangan Beginner',
        level: 65, // SSSSS
        lastPlayedAt: date,
        country: 'JPN',
        lastPlayedPlace: playedPlace
    });

    return { cars };
}


export async function DefaultGhostCarAudi()
{
    let cars = wm.wm.protobuf.Car.create({ 
        carId: 999999999, // Don't change this
        name: 'Ｒ８',
        regionId: 18, // IDN (福井)
        manufacturer: 9,
        model: 89, // R8
        visualModel: 109, // R8
        defaultColor: 0,
        customColor: 0,
        wheel: 20,
        wheelColor: 0,
        aero: 0,
        bonnet: 0,
        wing: 0,
        mirror: 0,
        neon: 0,
        trunk: 0,
        plate: 0,
        plateColor: 0,
        plateNumber: 0,
        tunePower: 18,
        tuneHandling: 16,
        rivalMarker: 32,
        aura: 551,
        windowSticker: true,
        windowStickerString: 'ＢＡＹＳＨＯＲＥ',
        windowStickerFont: 0,
        title: 'Wangan Beginner',
        level: 65, // SSSSS
        lastPlayedAt: date,
        country: 'JPN',
        lastPlayedPlace: playedPlace
    });

    return { cars };
}


export async function DefaultGhostCarDodge()
{
    let cars = wm.wm.protobuf.Car.create({ 
        carId: 999999999, // Don't change this
        name: 'ＶＩＰＥＲ',
        regionId: 18, // IDN (福井)
        manufacturer: 10,
        model: 91, // Viper SRT10
        visualModel: 111, // Viper SRT10
        defaultColor: 0,
        customColor: 0,
        wheel: 20,
        wheelColor: 0,
        aero: 0,
        bonnet: 0,
        wing: 0,
        mirror: 0,
        neon: 0,
        trunk: 0,
        plate: 0,
        plateColor: 0,
        plateNumber: 0,
        tunePower: 18,
        tuneHandling: 16,
        rivalMarker: 32,
        aura: 551,
        windowSticker: true,
        windowStickerString: 'ＢＡＹＳＨＯＲＥ',
        windowStickerFont: 0,
        title: 'Wangan Beginner',
        level: 65, // SSSSS
        lastPlayedAt: date,
        country: 'JPN',
        lastPlayedPlace: playedPlace
    });

    return { cars };
}


export async function DefaultGhostCarLamborghini()
{
    let cars = wm.wm.protobuf.Car.create({ 
        carId: 999999999, // Don't change this
        name: 'ＭＩＵＲＡ',
        regionId: 18, // IDN (福井)
        manufacturer: 11,
        model: 103, // MIURA
        visualModel: 125, // MIURA
        defaultColor: 0,
        customColor: 0,
        wheel: 20,
        wheelColor: 0,
        aero: 0,
        bonnet: 0,
        wing: 0,
        mirror: 0,
        neon: 0,
        trunk: 0,
        plate: 0,
        plateColor: 0,
        plateNumber: 0,
        tunePower: 18,
        tuneHandling: 16,
        rivalMarker: 32,
        aura: 551,
        windowSticker: true,
        windowStickerString: 'ＢＡＹＳＨＯＲＥ',
        windowStickerFont: 0,
        title: 'Wangan Beginner',
        level: 65, // SSSSS
        lastPlayedAt: date,
        country: 'JPN',
        lastPlayedPlace: playedPlace
    });

    return { cars };
}


export async function DefaultGhostCarHonda()
{
    let cars = wm.wm.protobuf.Car.create({ 
        carId: 999999999, // Don't change this
        name: 'Ｓ６６０',
        regionId: 18, // IDN (福井)
        manufacturer: 12,
        model: 105, // S660
        visualModel: 130, // S660
        defaultColor: 0,
        customColor: 0,
        wheel: 20,
        wheelColor: 0,
        aero: 0,
        bonnet: 0,
        wing: 0,
        mirror: 0,
        neon: 0,
        trunk: 0,
        plate: 0,
        plateColor: 0,
        plateNumber: 0,
        tunePower: 18,
        tuneHandling: 16,
        rivalMarker: 32,
        aura: 551,
        windowSticker: true,
        windowStickerString: 'ＢＡＹＳＨＯＲＥ',
        windowStickerFont: 0,
        title: 'Wangan Beginner',
        level: 65, // SSSSS
        lastPlayedAt: date,
        country: 'JPN',
        lastPlayedPlace: playedPlace
    });

    return { cars };
}


export async function DefaultGhostCarAcura()
{
    let cars = wm.wm.protobuf.Car.create({ 
        carId: 999999999, // Don't change this
        name: 'ＡＣＵＲＡ',
        regionId: 18, // IDN (福井)
        manufacturer: 12, // Not Acura... Acura is ID 13
        model: 107, // Honda NSX
        visualModel: 128, // Honda NSX
        defaultColor: 0,
        customColor: 0,
        wheel: 20,
        wheelColor: 0,
        aero: 0,
        bonnet: 0,
        wing: 0,
        mirror: 0,
        neon: 0,
        trunk: 0,
        plate: 0,
        plateColor: 0,
        plateNumber: 0,
        tunePower: 18,
        tuneHandling: 16,
        rivalMarker: 32,
        aura: 551,
        windowSticker: true,
        windowStickerString: 'ＢＡＹＳＨＯＲＥ',
        windowStickerFont: 0,
        title: 'Wangan Beginner',
        level: 65, // SSSSS
        lastPlayedAt: date,
        country: 'JPN',
        lastPlayedPlace: playedPlace
    });

    return { cars };
}


export async function DefaultGhostCarPorsche()
{
    let cars = wm.wm.protobuf.Car.create({ 
        carId: 999999999, // Don't change this
        name: '７１８',
        regionId: 18, // IDN (福井)
        manufacturer: 14,
        model: 121, // 718 CAYMAN S
        visualModel: 144, // 718 CAYMAN S
        defaultColor: 0,
        customColor: 0,
        wheel: 20,
        wheelColor: 0,
        aero: 0,
        bonnet: 0,
        wing: 0,
        mirror: 0,
        neon: 0,
        trunk: 0,
        plate: 0,
        plateColor: 0,
        plateNumber: 0,
        tunePower: 18,
        tuneHandling: 16,
        rivalMarker: 32,
        aura: 551,
        windowSticker: true,
        windowStickerString: 'ＢＡＹＳＨＯＲＥ',
        windowStickerFont: 0,
        title: 'Wangan Beginner',
        level: 65, // SSSSS
        lastPlayedAt: date,
        country: 'JPN',
        lastPlayedPlace: playedPlace
    });

    return { cars };
}