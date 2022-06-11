const createPosition = (positionString) => {
    const positionObject = { rawPosition: positionString };
    const positionParts = positionString.split(',');
    const rawX = positionParts[0];
    const rawZ = positionParts[1];
    const rawY = positionParts[2];

    positionObject.xPosition = { numericalValue: rawX };
    positionObject.yPosition = { numericalValue: rawY };
    positionObject.zPosition = { numericalValue: rawZ };

    return positionObject;
};

const MapRender = (props) => {
    const reader = new FileReader();
    const domParser = new DOMParser();
    let prefabs = [];
    reader.onload = (event) => {
        if (typeof reader.result === 'string') {
            const prefabXMLString = reader.result;
            if (prefabXMLString) {
                const prefabXML = domParser.parseFromString(
                    prefabXMLString,
                    'text/xml'
                );
                const decorations =
                    prefabXML.getElementsByTagName('decoration');
                for (const decoration of decorations) {
                    prefabs.push({
                        type: decoration.getAttribute('type'),
                        name: decoration.getAttribute('name'),
                        position: createPosition(
                            decoration.getAttribute('position')
                        ),
                        rotation: decoration.getAttribute('rotation'),
                    });
                }

                console.log(prefabs);

                prefabs.forEach((element) => {});
            }
        }
    };

    if (props.uploadedFiles.prefabs) {
        reader.readAsText(props.uploadedFiles.prefabs);
    }

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
