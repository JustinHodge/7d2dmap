import { useEffect, useState } from 'react';
import PointsOfInterest from './PointsOfInterest';

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
    const prefabReader = new FileReader();
    const mapInfoReader = new FileReader();
    const domParser = new DOMParser();

    const [mapDisplayData, setMapDisplayData] = useState({
        xCenter: 0,
        yCenter: 0,
        mapWidth: 0,
        mapHeight: 0,
    });

    const [prefabs, setPrefabs] = useState([]);

    useEffect(() => {
        const mapDiv = document.getElementById('map');
        const divWidth = mapDiv?.clientWidth;
        const divHeight = mapDiv?.clientHeight;
        const mapYOffset = mapDiv?.offsetTop;
        const mapXOffset = mapDiv?.offsetLeft;

        setMapDisplayData({
            mapHeight: divHeight,
            mapWidth: divWidth,
            yCenter: mapYOffset + divHeight / 2,
            xCenter: mapXOffset + divWidth / 2,
        });
    }, []);

    prefabReader.onload = () => {
        if (typeof prefabReader.result === 'string') {
            const prefabXMLString = prefabReader.result;
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
                        visible: true,
                    });

                    setPrefabs(prefabs);
                }
            }
        }
    };

    mapInfoReader.onload = () => {
        if (typeof mapInfoReader.result === 'string') {
            const mapInfoXMLString = mapInfoReader.result;
            if (mapInfoXMLString) {
                const mapInfoXML = domParser.parseFromString(
                    mapInfoXMLString,
                    'text/xml'
                );
                const properties = mapInfoXML.getElementsByTagName('property');
                for (const property of properties) {
                    const propertyName = property.getAttribute('name');
                    const propertyValue = property.getAttribute('value');
                    if (propertyName && propertyValue) {
                        setMapDisplayData({
                            ...mapDisplayData,
                            [propertyName]: propertyValue,
                        });
                    }
                }
            }
        }
    };

    if (props.uploadedFiles.prefabs) {
        prefabReader.readAsText(props.uploadedFiles.prefabs);
    }

    if (props.uploadedFiles.mapinfo) {
        mapInfoReader.readAsText(props.uploadedFiles.mapinfo);
    }

    return (
        <div className='map-render'>
            <div
                id='map'
                style={{
                    width: '85vw',
                    height: '88vh',
                    backgroundImage: props.uploadedFiles?.biomes
                        ? `url(${URL.createObjectURL(
                              props.uploadedFiles.biomes
                          )})`
                        : '',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
                <PointsOfInterest
                    mapDisplayData={mapDisplayData}
                    prefabs={prefabs ?? []}
                />
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
