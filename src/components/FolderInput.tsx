const FolderInput = (props) => {
    const changeUploadedFiles = (event, uploadedFileType) => {
        props.setUploadedFiles({
            ...props.uploadedFiles,
            [uploadedFileType]: event.target.files[0],
        });
    };

    return (
        <>
            <div>
                <label> BIOMES </label>
                <input
                    className='folder-input'
                    type='file'
                    onChange={(event) => changeUploadedFiles(event, 'biomes')}
                    accept={'image/png'}
                    multiple
                />
            </div>
            <div>
                <label> PREFABS </label>
                <input
                    className='folder-input'
                    type='file'
                    onChange={(event) => changeUploadedFiles(event, 'prefabs')}
                    accept={'.xml'}
                    multiple
                />
            </div>
            <div>
                <label> SPAWN POINTS </label>
                <input
                    className='folder-input'
                    type='file'
                    onChange={(event) =>
                        changeUploadedFiles(event, 'spawnpoints')
                    }
                    accept={'.xml'}
                    multiple
                />
            </div>
        </>
    );
};

export default FolderInput;
