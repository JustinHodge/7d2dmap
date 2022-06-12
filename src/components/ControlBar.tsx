import FolderInput from './FolderInput';

const adjustZoom = (currentZoom, adjustment) => {
    const potentialNewZoom = currentZoom + adjustment;
    if (potentialNewZoom >= 100) {
        return 100;
    }

    if (potentialNewZoom <= 0) {
        return 0;
    }

    return potentialNewZoom;
};
const ControlBar = (props) => {
    return (
        <div className='control-bar'>
            <FolderInput
                setUploadedFiles={props.setUploadedFiles}
                uploadedFiles={props.uploadedFiles}
            />
            <button
                onClick={() =>
                    props.setZoomPercent(adjustZoom(props.zoomPercent, 10))
                }
            >
                {' '}
                Zoom In
            </button>
            <button
                onClick={() =>
                    props.setZoomPercent(adjustZoom(props.zoomPercent, -10))
                }
            >
                {' '}
                Zoom Out
            </button>
        </div>
    );
};

export default ControlBar;
