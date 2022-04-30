import { useState } from 'react';
import ControlBar from './ControlBar';
import MapRender from './MapRender';

const ContentPanel = (props) => {
    const [uploadedFiles, setUploadedFiles] = useState({});
    return (
        <div className='content-panel'>
            <ControlBar
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
            />
            <MapRender uploadedFiles={uploadedFiles} />
        </div>
    );
};

export default ContentPanel;
