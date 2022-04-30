const FolderInput = (props) => {
    const changeUploadedFiles = (event, uploadedFileType) => {
        console.log(uploadedFileType);
        props.setUploadedFiles({
            ...props.uploadedFiles,
            [uploadedFileType]: event.target.files[0],
        });
    };

    return (
        <>
            <label> BIOMES </label>
            <input
                className='folder-input'
                type='file'
                onChange={(event) => changeUploadedFiles(event, 'biomes')}
                accept={'image/png'}
                multiple
            />
            <label> PREFABS </label>
            <input
                className='folder-input'
                type='file'
                onChange={(event) => changeUploadedFiles(event, 'prefabs')}
                accept={'.xml'}
                multiple
            />
            <label> SPAWN POINTS </label>
            <input
                className='folder-input'
                type='file'
                onChange={(event) => changeUploadedFiles(event, 'spawnpoints')}
                accept={'.xml'}
                multiple
            />
        </>
    );
};

export default FolderInput;
