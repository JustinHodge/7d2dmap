import { IMapInfo } from '../Types/AppTypes';

const getMapInfo = (mapInfoXMLString: string) => {
    const domParser = new DOMParser();

    if (!mapInfoXMLString) {
        console.error('mapInfoReader.result is empty');
        return {};
    }

    const mapInfoXML = domParser.parseFromString(mapInfoXMLString, 'text/xml');

    const properties = mapInfoXML.getElementsByTagName('property');

    const newMapInfo: IMapInfo = {};
    for (const property of properties) {
        const propertyName = property.getAttribute('name') as string;
        const propertyValue = property.getAttribute('value') as any;
        newMapInfo[propertyName as keyof typeof newMapInfo] = propertyValue;
    }

    const mapSizeParts = newMapInfo?.HeightMapSize?.split(',');
    const mapGivenSize = {
        width:
            Array.isArray(mapSizeParts) && mapSizeParts[0]
                ? mapSizeParts[0]
                : '',
        height:
            Array.isArray(mapSizeParts) && mapSizeParts[1]
                ? mapSizeParts[1]
                : '',
    };

    newMapInfo.mapGivenSize = mapGivenSize;

    return newMapInfo;
};

export default getMapInfo;
