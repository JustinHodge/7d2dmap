import { useEffect, useState } from 'react';
import ControlBar from './ControlBar';
import MapRender from './MapRender';
import {
    IContentPanelProps,
    IFileList,
    IMapData,
    IMapInfo,
    IPosition,
} from '../Types/AppTypes';

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
        mapInfo: { mapGivenSize: { height: '500px', width: '500px' } },
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
            console.error('mapInfoReader.result is not string');
            return;
        }

        const mapInfoXMLString = mapInfoReader.result;

        if (!mapInfoXMLString) {
            console.error('mapInfoReader.result is empty');
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
            const newGivenSize = {
                height: '500px',
                width: '500px',
            };

            const biomesURL = URL.createObjectURL(uploadedFiles.biomes);

            const tmp_img = new Image();
            tmp_img.src = biomesURL;
            tmp_img.onload = (event) => {
                newGivenSize.height = (
                    event?.currentTarget as HTMLImageElement
                )?.height.toString();
                newGivenSize.width = (
                    event?.currentTarget as HTMLImageElement
                )?.width.toString();

                const mapCenter = {
                    xCoord: parseInt(newGivenSize.height) / 2,
                    yCoord: parseInt(newGivenSize.width) / 2,
                };

                setMapData({
                    ...mapData,
                    biomes: uploadedFiles.biomes,
                    biomesURL: biomesURL,
                    mapCenter: mapCenter,
                    mapInfo: {
                        ...mapData.mapInfo,
                        mapGivenSize: newGivenSize,
                    },
                });
            };
        }
    }, [uploadedFiles]);

    useEffect(() => {
        const { height, width } = mapData.mapInfo.mapGivenSize ?? {};

        if (height === undefined || width === undefined) {
            console.error('mapData.MapInfo.mapGivenSize has undefined member');
            return;
        }

        const newMapDisplayedSize = {
            height:
                (typeof height === 'string' ? parseInt(height) : height) *
                (zoomPercent / 100),
            width:
                (typeof width === 'string' ? parseInt(width) : width) *
                (zoomPercent / 100),
        };

        const newMapCenter = {
            xCoord:
                ((typeof width === 'string' ? parseInt(width) : width) *
                    (zoomPercent / 100)) /
                2,
            yCoord:
                ((typeof height === 'string' ? parseInt(height) : height) *
                    (zoomPercent / 100)) /
                2,
        };

        const newMapInfo = {
            ...mapData.mapInfo,
            mapDisplayedSize: newMapDisplayedSize,
        };

        const newMapData = {
            ...mapData,
            mapInfo: newMapInfo,
            mapCenter: newMapCenter,
        };

        setMapData(newMapData);

        console.log('newMapData', newMapData);
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
