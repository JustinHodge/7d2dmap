const MapRender = (props) => {
    const parser = new DOMParser();
    const reader = new FileReader();
    let prefabXML = '';
    let prefabs;
    reader.onload = (event) => {
        if (typeof reader.result === 'string') {
            prefabXML = reader.result;
            // console.log(prefabXML);
            prefabs = parser.parseFromString(prefabXML, 'text/xml');
            console.log(prefabs);
        }
    };
    // reader.readAsText(props.uploadedFiles.prefabs);
    return (
        <div className='map-render'>
            <img
                style={{ maxWidth: '85vw', maxHeight: '88vh' }}
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
