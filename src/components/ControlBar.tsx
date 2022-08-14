import { IControlBarProps } from '../Types/AppTypes';
import FolderInput from './FolderInput';
import demoBiomesPNG from '../../DemoMap/biomes.png';
import demoPrefabsXML from '../../DemoMap/prefabs.xml?raw';
import demoMapInfoXML from '../../DemoMap/map_info.xml?raw';
import getPrefabs from '../helpers/getPrefabs';
import getMapInfo from '../helpers/getMapInfo';

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
