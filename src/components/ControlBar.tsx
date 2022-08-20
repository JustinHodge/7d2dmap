import { IControlBarProps } from '../Types/AppTypes';
import FolderInput from './FolderInput';
import demoBiomesPNG from '../../DemoMap/biomes.png';
import demoWaterPNG from '../../DemoMap/splat3_processed.png';
import demoRoadPNG from '../../DemoMap/splat4_processed.png';
import demoPrefabsXML from '../../DemoMap/prefabs.xml?raw';
import demoMapInfoXML from '../../DemoMap/map_info.xml?raw';
import demoMapRaw from '../../DemoMap/dtm_processed.raw?url';
import getPrefabs from '../helpers/getPrefabs';
import getMapInfo from '../helpers/getMapInfo';
import 'jimp/browser/lib/jimp';

const adjustZoom = (currentZoom: number, adjustment: number) => {
    const potentialNewZoom = currentZoom + adjustment;

    if (potentialNewZoom >= 100) {
        return 100;
    }

    if (potentialNewZoom <= 10) {
        return 10;
    }

    return potentialNewZoom;
};

const getDataRaw = async () => {
    const rawData = await fetch(demoMapRaw).then((res) => res.blob());
    const src = new Uint8Array(await rawData.arrayBuffer());
    const data = new Uint8Array(src.length / 2);

    return data;
};

const compileLayeredPNG = (color, image) => {
    Jimp.read(image)
        .then((image) => {
            console.log(image.bitmap.data.buffer);
            return '';
        })
        .catch((err) => {
            console.log('oops');
        });

    return '';
};

const ControlBar = (props: IControlBarProps) => {
    return (
        <div className='control-bar'>
            <FolderInput
                setUploadedFiles={props.setUploadedFiles}
                uploadedFiles={props.uploadedFiles}
            />
            <button
                onClick={() => {
                    props.setMapData({
                        ...props.mapData,
                        biomesURL: demoBiomesPNG,
                        waterURL: compileLayeredPNG('#000000', demoWaterPNG),
                        roadURL: demoRoadPNG,
                        prefabs: getPrefabs(
                            demoPrefabsXML,
                            props.mapData.mapCenter,
                            props.zoomPercent
                        ),
                        mapInfo: getMapInfo(demoMapInfoXML),
                    });
                }}
            >
                Navezgane Demo
            </button>
            <button
                onClick={() =>
                    props.setZoomPercent(adjustZoom(props.zoomPercent, 10))
                }
            >
                Zoom In
            </button>
            <button
                onClick={() =>
                    props.setZoomPercent(adjustZoom(props.zoomPercent, -10))
                }
            >
                Zoom Out
            </button>
        </div>
    );
};

export default ControlBar;
