const MapRender = (props) => {
    console.log(props.uploadedFiles.biomes);
    return (
        <div className='map-render'>
            <img
                src={
                    props.uploadedFiles?.biomes
                        ? URL.createObjectURL(props.uploadedFiles.biomes)
                        : ''
                }
            />
        </div>
    );
};

export default MapRender;
