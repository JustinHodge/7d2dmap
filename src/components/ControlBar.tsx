import { IControlBarProps } from '../Types/AppTypes';
import FolderInput from './FolderInput';
import navezganeBiomes from '../../dist/assets/DemoMap-Navezgane20.5/biomes.png';
import navezganePrefabs from '../../dist/assets/DemoMap-Navezgane20.5/prefabs.xml?raw';

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
                    console.log(navezganePrefabs);
                    props.setMapData({
                        ...props.mapData,
                        biomesURL: navezganeBiomes,
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
