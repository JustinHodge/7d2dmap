import { useEffect, useState } from 'react';
import ControlBar from './ControlBar';
import MapRender from './MapRender';
import { IContentPanelProps, IFileList, IMapData } from '../Types/AppTypes';
import getPrefabs from '../helpers/getPrefabs';
import getMapInfo from '../helpers/getMapInfo';

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

    prefabReader.onloadend = () => {
        if (typeof prefabReader.result !== 'string') {
            return;
        }

        const prefabXMLString = prefabReader.result;
        const newPrefabs = getPrefabs(
            prefabXMLString,
            mapData.mapCenter,
            zoomPercent
        );

        setMapData({ ...mapData, prefabs: newPrefabs });
    };

    mapInfoReader.onloadend = () => {
        if (typeof mapInfoReader.result !== 'string') {
            console.error('mapInfoReader.result is not string');
            return;
        }

        const mapInfoXMLString = mapInfoReader.result;
        const newMapInfo = getMapInfo(mapInfoXMLString);

        setMapData({ ...mapData, mapInfo: newMapInfo });
    };

    useEffect(() => {
        if (uploadedFiles.prefabs) {
            prefabReader.readAsText(uploadedFiles.prefabs);
        }
    }, [uploadedFiles.prefabs]);

    useEffect(() => {
        if (uploadedFiles.mapinfo) {
            mapInfoReader.readAsText(uploadedFiles.mapinfo);
        }
    }, [uploadedFiles.mapinfo]);

    useEffect(() => {
        if (uploadedFiles.biomes) {
            const newGivenSize = {
                height: '500px',
                width: '500px',
            };

            const biomesURL = URL.createObjectURL(uploadedFiles.biomes);
            const waterURL = '';
            const roadURL = '';

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
                    waterURL: waterURL,
                    roadURL: roadURL,
                    mapCenter: mapCenter,
                    mapInfo: {
                        ...mapData.mapInfo,
                        mapGivenSize: newGivenSize,
                    },
                });
            };
        }
    }, [uploadedFiles.biomes]);

    useEffect(() => {
        const { height, width } = mapData.mapInfo.mapGivenSize ?? {};

        if (height === undefined || width === undefined) {
            console.error('mapData.MapInfo.mapGivenSize has undefined member');
            return;
        }

        const mapScale = zoomPercent / 100;

        const newMapDisplayedSize = {
            height:
                (typeof height === 'string' ? parseInt(height) : height) *
                mapScale,
            width:
                (typeof width === 'string' ? parseInt(width) : width) *
                mapScale,
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
            Scale: mapScale,
        };

        const newMapData = {
            ...mapData,
            mapInfo: newMapInfo,
            mapCenter: newMapCenter,
        };

        setMapData(newMapData);
    }, [mapData.mapInfo.mapGivenSize, zoomPercent]);

    return (
        <div className='content-panel'>
            <ControlBar
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
                zoomPercent={zoomPercent}
                setZoomPercent={setZoomPercent}
                mapData={mapData}
                setMapData={setMapData}
            />
            <MapRender mapData={mapData} />
        </div>
    );
};

export default ContentPanel;
