import { useEffect, useState } from 'react';
import ControlBar from './ControlBar';
import MapRender from './MapRender';
import { IContentPanelProps, IFileList, IMapData } from '../Types/AppTypes';
import getPrefabs from '../helpers/getPrefabs';
import getMapInfo from '../helpers/getMapInfo';
import demoBiomesPNG from '../../DemoMap/biomes.png';
import demoWaterPNG from '../../DemoMap/splat3_processed.png';
import demoRoadPNG from '../../DemoMap/splat4_processed.png';
import demoPrefabsXML from '../../DemoMap/prefabs.xml?raw';
import demoMapInfoXML from '../../DemoMap/map_info.xml?raw';
import demoMapRaw from '../../DemoMap/dtm_processed.raw?url';

const getDataRaw = async () => {
    const rawData = await fetch(demoMapRaw).then((res) => res.blob());
    const src = new Uint8Array(await rawData.arrayBuffer());
    const data = new Uint8Array(src.length / 2);

    return data;
};

const getAlteredPNG = (color, image) => {
    const base64 = compileLayeredPNG(color, image);
    console.log(base64);
    return base64;
};

const compileLayeredPNG = (color, image) => {
    const jimpIMG = Jimp.read(image)
        .then((image) => {
            const data = image.bitmap.data;
            for (let i = 0; i < image.bitmap.data.length - 3; i += 4) {
                if (data[i] + data[i + 1] + data[i + 2] + data[i + 3] > 0) {
                    image.bitmap.data[i] = 255;
                    image.bitmap.data[i + 1] = 0;
                    image.bitmap.data[i + 2] = 0;
                    image.bitmap.data[i + 3] = 255;
                }
            }

            return image;
        })
        .catch((err) => {
            console.log('oops');
        });
    jimpIMG.then((result) => {
        return result;
    });
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

    const demoFiles = {
        biomesURL: demoBiomesPNG,
        waterURL: getAlteredPNG('#000000', demoWaterPNG),
        roadURL: demoRoadPNG,
        prefabs: getPrefabs(demoPrefabsXML, mapData.mapCenter, zoomPercent),
        mapInfo: getMapInfo(demoMapInfoXML),
    };

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
                demoFiles={demoFiles}
            />
            <MapRender mapData={mapData} />
        </div>
    );
};

export default ContentPanel;
