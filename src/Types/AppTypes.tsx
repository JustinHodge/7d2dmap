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

export interface IMapRenderProps {
    mapData: IMapData;
}

export interface IMapData {
    biomes?: File;
    prefabs: Array<IPrefabData>;
    mapCenter: IMapCoordinates;
    mapInfo: IMapInfo;
    defaultSize: IDivSize;
    biomesURL?: string;
}

export interface IControlBarProps {
    uploadedFiles: IFileList;
    setUploadedFiles: (newUploadedFiles: IFileList) => void;
    zoomPercent: number;
    setZoomPercent: (newZoomPercent: number) => void;
}

export interface IFileList {
    biomes?: File;
    mapinfo?: File;
    prefabs?: File;
}

export interface IContentPanelProps {}
