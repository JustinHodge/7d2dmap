export interface IPosition {
    rawPosition: string;
    xPosition: {
        numericalValue: number;
    };
    yPosition: {
        numericalValue: number;
    };
    zPosition: {
        numericalValue: number;
    };
}

export interface IMapCoordinates {
    xCoord: number;
    yCoord: number;
}

export interface IDivSize {
    height: number | string;
    width: number | string;
}

export interface IMapInfo {
    HeightMapSize?: string;
    mapGivenSize?: IDivSize;
    mapDisplayedSize?: IDivSize;
    Scale?: number;
    Modes?: string;
    FixedWaterLevel?: boolean;
    RandomGeneratedWorld?: boolean;
    GameVersion?: string;
    GenerationSeed?: string;
}

export interface IPrefabData {}

export interface IMapData {
    biomes?: File;
    prefabs: Array<IPrefabData>;
    mapCenter: IMapCoordinates;
    mapInfo: IMapInfo;
    defaultSize: IDivSize;
    biomesURL?: string;
}

export interface IFileList {
    biomes?: File;
    mapinfo?: File;
    prefabs?: File;
}

export interface IContentPanelProps {}
