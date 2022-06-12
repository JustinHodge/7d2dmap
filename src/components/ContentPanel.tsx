import { useEffect, useState } from 'react';
import ControlBar from './ControlBar';
import MapRender from './MapRender';

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

const ContentPanel = (props) => {
    const [uploadedFiles, setUploadedFiles] = useState({});
    const [zoomPercent, setZoomPercent] = useState(25);
    const [mapData, setMapData] = useState({
        biomes: '',
        prefabs: [],
        mapCenter: { xCenter: 0, yCenter: 0 },
        mapInfo: {},
    });

    const prefabReader = new FileReader();
    const mapInfoReader = new FileReader();
    const domParser = new DOMParser();

    prefabReader.onloadend = () => {
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

        const newPrefabs = [];
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
        setMapData({ ...mapData, prefabs: newPrefabs });
        prefabReader.abort();
    };

    mapInfoReader.onloadend = () => {
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

        const newMapInfo = {};
        for (const property of properties) {
            const propertyName = property.getAttribute('name') as string;
            const propertyValue = property.getAttribute('value') as any;
            newMapInfo[propertyName] = propertyValue;
        }

        const mapSizeParts = newMapInfo.HeightMapSize.split(',');
        const mapGivenSize = {
            width: mapSizeParts[0],
            height: mapSizeParts[1],
        };

        newMapInfo.mapGivenSize = mapGivenSize;

        setMapData({ ...mapData, mapInfo: newMapInfo });
    };

    useEffect(() => {
        if (uploadedFiles.prefabs) {
            prefabReader.readAsText(uploadedFiles.prefabs);
        }

        if (uploadedFiles.mapinfo) {
            mapInfoReader.readAsText(uploadedFiles.mapinfo);
        }

        if (uploadedFiles.biomes) {
            setMapData({ ...mapData, biomes: uploadedFiles.biomes });
        }
    }, [uploadedFiles]);

    useEffect(() => {
        const { height, width } = mapData.mapInfo.mapGivenSize ?? {};
        setMapData({
            ...mapData,
            mapInfo: {
                ...mapData.mapInfo,
                mapDisplayedSize: {
                    height: height * (zoomPercent / 100),
                    width: width * (zoomPercent / 100),
                },
            },
        });
    }, [mapData.mapInfo.mapGivenSize, zoomPercent]);

    return (
        <div className='content-panel'>
            <ControlBar
                uploadedFiles={uploadedFiles}
                setUploadedFiles={setUploadedFiles}
                zoomPercent={zoomPercent}
                setZoomPercent={setZoomPercent}
            />
            <MapRender mapData={mapData} />
        </div>
    );
};

export default ContentPanel;
