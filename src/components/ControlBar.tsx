import FolderInput from './FolderInput';

const ControlBar = (props) => {
    return (
        <div className='control-bar'>
            <FolderInput
                setUploadedFiles={props.setUploadedFiles}
                uploadedFiles={props.uploadedFiles}
            />
        </div>
    );
};

export default ControlBar;
