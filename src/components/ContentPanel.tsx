import { useEffect, useState } from 'react';
import ControlBar from './ControlBar';
import MapRender from './MapRender';

interface IPosition {
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

interface IMapCoordinates {
    xCoord: number;
    yCoord: number;
}

interface IDivSize {
    height: number | string;
    width: number | string;
}

interface IMapInfo {
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

interface IPrefabData {}

interface IMapData {
    biomes?: File;
    prefabs: Array<IPrefabData>;
    mapCenter: IMapCoordinates;
    mapInfo: IMapInfo;
    defaultSize: IDivSize;
    biomesURL?: string;
}

interface IFileList {
    biomes?: File;
    mapinfo?: File;
    prefabs?: File;
}

interface IContentPanelProps {}
const createPosition = (positionString: string) => {
    const positionParts = positionString.split(',');
    const rawX = positionParts[0];
    const rawZ = positionParts[1];
    const rawY = positionParts[2];

    const xPosition = {
        numericalValue: Number.isInteger(rawX)
            ? (rawX as unknown as number)
            : 0,
    };
    const yPosition = {
        numericalValue: Number.isInteger(rawY)
            ? (rawY as unknown as number)
            : 0,
    };
    const zPosition = {
        numericalValue: Number.isInteger(rawZ)
            ? (rawZ as unknown as number)
            : 0,
    };

    const positionObject: IPosition = {
        rawPosition: positionString,
        xPosition,
        yPosition,
        zPosition,
    };

    return positionObject;
};

const ContentPanel = (props: IContentPanelProps) => {
    const [uploadedFiles, setUploadedFiles] = useState({} as IFileList);
    const [zoomPercent, setZoomPercent] = useState(25);
    const [mapData, setMapData] = useState({
        biomes: undefined,
        prefabs: [],
        mapCenter: { xCoord: 0, yCoord: 0 },
        mapInfo: {},
        defaultSize: { height: '500px', width: '500px' },
    } as IMapData);

    const prefabReader = new FileReader();
    const mapInfoReader = new FileReader();
    const domParser = new DOMParser();

    prefabReader.onloadend = () => {
        if (typeof prefabReader.result !== 'string') {
            return;
        }

        const prefabXMLString = prefabReader.result;
        if (!prefabXMLString) {
            return;
        }

        const prefabXML = domParser.parseFromString(
            prefabXMLString,
            'text/xml'
        );

        const decorations = prefabXML.getElementsByTagName('decoration');

        const newPrefabs = [];
        for (const decoration of decorations) {
            const newPrefab = {
                type: decoration.getAttribute('type'),
                name: decoration.getAttribute('name'),
                position: createPosition(
                    decoration.getAttribute('position') ?? '0,0,0'
                ),
                rotation: decoration.getAttribute('rotation'),
                visible: true,
            };
            newPrefabs.push(newPrefab);
        }
        setMapData({ ...mapData, prefabs: newPrefabs });
        prefabReader.abort();
    };

    mapInfoReader.onloadend = () => {
        if (typeof mapInfoReader.result !== 'string') {
            return;
        }

        const mapInfoXMLString = mapInfoReader.result;

        if (!mapInfoXMLString) {
            return;
        }

        const mapInfoXML = domParser.parseFromString(
            mapInfoXMLString,
            'text/xml'
        );

        const properties = mapInfoXML.getElementsByTagName('property');

        const newMapInfo: IMapInfo = {};
        for (const property of properties) {
            const propertyName = property.getAttribute('name') as string;
            const propertyValue = property.getAttribute('value') as any;
            newMapInfo[propertyName as keyof typeof newMapInfo] = propertyValue;
        }

        console.log(newMapInfo);

        const mapSizeParts = newMapInfo?.HeightMapSize?.split(',');
        const mapGivenSize = {
            width:
                Array.isArray(mapSizeParts) && mapSizeParts[0]
                    ? mapSizeParts[0]
                    : '',
            height:
                Array.isArray(mapSizeParts) && mapSizeParts[1]
                    ? mapSizeParts[1]
                    : '',
        };

        newMapInfo.mapGivenSize = mapGivenSize;

        setMapData({ ...mapData, mapInfo: newMapInfo });
    };

    useEffect(() => {
        if (uploadedFiles.prefabs) {
            prefabReader.readAsText(uploadedFiles.prefabs);
        }

        if (uploadedFiles.mapinfo) {
            mapInfoReader.readAsText(uploadedFiles.mapinfo);
        }

        if (uploadedFiles.biomes) {
            const newDefaultSize = {
                height: '500px',
                width: '500px',
            };

            const biomesURL = URL.createObjectURL(uploadedFiles.biomes);

            const tmp_img = new Image();
            tmp_img.src = biomesURL;
            tmp_img.onload = (event) => {
                newDefaultSize.height = (
                    event?.currentTarget as HTMLImageElement
                )?.height.toString();
                newDefaultSize.width = (
                    event?.currentTarget as HTMLImageElement
                )?.width.toString();

                const mapCenter = {
                    xCoord: parseInt(newDefaultSize.height) / 2,
                    yCoord: parseInt(newDefaultSize.width) / 2,
                };

                setMapData({
                    ...mapData,
                    defaultSize: newDefaultSize,
                    biomes: uploadedFiles.biomes,
                    biomesURL: biomesURL,
                    mapCenter: mapCenter,
                });
            };
        }
    }, [uploadedFiles]);

    useEffect(() => {
        const { height, width } = mapData.mapInfo.mapGivenSize ?? {};
        if (height === undefined || width === undefined) {
            return;
        }
        setMapData({
            ...mapData,
            mapInfo: {
                ...mapData.mapInfo,
                mapDisplayedSize: {
                    height:
                        (typeof height === 'string'
                            ? parseInt(height)
                            : height) *
                        (zoomPercent / 100),
                    width:
                        (typeof width === 'string' ? parseInt(width) : width) *
                        (zoomPercent / 100),
                },
            },
        });
    }, [mapData.mapInfo.mapGivenSize, zoomPercent]);

    return (
        <div className='content-panel'>
            <ControlBar
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
                zoomPercent={zoomPercent}
                setZoomPercent={setZoomPercent}
            />
            <MapRender mapData={mapData} />
        </div>
    );
};

export default ContentPanel;
