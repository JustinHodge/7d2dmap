import { useEffect, useState } from 'react';
import PointOfInterest from './PointOfInterest';

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
    const { uploadedFiles } = { ...props };
    const prefabReader = new FileReader();
    const mapInfoReader = new FileReader();
    const domParser = new DOMParser();

    const [prefabs, setPrefabs] = useState([]);

    prefabReader.onload = () => {
        if (typeof prefabReader.result !== 'string') {
            return;
        }

        const prefabXMLString = prefabReader.result;
        if (!prefabXMLString) {
            return;
        }

        const prefabXML = domParser.parseFromString(
            prefabXMLString,
            'text/xml'
        );

        const decorations = prefabXML.getElementsByTagName('decoration');

        const newPrefabs = prefabs;
        for (const decoration of decorations) {
            const newPrefab = {
                type: decoration.getAttribute('type'),
                name: decoration.getAttribute('name'),
                position: createPosition(decoration.getAttribute('position')),
                rotation: decoration.getAttribute('rotation'),
                visible: true,
            };
            newPrefabs.push(newPrefab);
        }
        setPrefabs(newPrefabs);
    };

    mapInfoReader.onload = () => {
        if (typeof mapInfoReader.result !== 'string') {
            return;
        }

        const mapInfoXMLString = mapInfoReader.result;

        if (!mapInfoXMLString) {
            return;
        }

        const mapInfoXML = domParser.parseFromString(
            mapInfoXMLString,
            'text/xml'
        );

        const properties = mapInfoXML.getElementsByTagName('property');

        for (const property of properties) {
            const propertyName = property.getAttribute('name');
            const propertyValue = property.getAttribute('value');
            console.log(propertyName, propertyValue);
            // if (propertyName && propertyValue) {
            //     setMapDisplayData({
            //         ...mapDisplayData,
            //         [propertyName]: propertyValue,
            //     });
            // }
        }
    };

    if (uploadedFiles.prefabs) {
        prefabReader.readAsText(uploadedFiles.prefabs);
    }

    if (uploadedFiles.mapinfo) {
        mapInfoReader.readAsText(uploadedFiles.mapinfo);
    }

    return (
        <div className='map-render'>
            <div
                id='map'
                style={{
                    width: '85vw',
                    height: '88vh',
                    backgroundImage: uploadedFiles?.biomes
                        ? `url(${URL.createObjectURL(uploadedFiles.biomes)})`
                        : '',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
                {prefabs.map((prefab, index, array) => {
                    return <PointOfInterest prefab={prefab ?? []} />;
                })}

                {/* <div
                    style={{
                        width: '25px',
                        height: '25px',
                        backgroundColor: 'red',
                        position: 'absolute',
                        top: mapDisplayData.yCenter,
                        left: mapDisplayData.xCenter,
                    }}
                ></div> */}
            </div>
        </div>
    );
};

export default MapRender;
