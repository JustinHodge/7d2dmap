import { IMapCoordinates } from '../Types/AppTypes';
import createPosition from './createPosition';

const getPrefabs = (
    prefabXMLString: string,
    mapCenter: IMapCoordinates,
    zoomPercent: number
) => {
    const domParser = new DOMParser();

    if (!prefabXMLString) {
        return;
    }

    const prefabXML = domParser.parseFromString(prefabXMLString, 'text/xml');

    const decorations = prefabXML.getElementsByTagName('decoration');

    const newPrefabs = [];
    for (const decoration of decorations) {
        const newPrefab = {
            type: decoration.getAttribute('type'),
            name: decoration.getAttribute('name'),
            position: createPosition(
                decoration.getAttribute('position'),
                mapCenter,
                zoomPercent
            ),
            rotation: decoration.getAttribute('rotation'),
            visible: true,
        };
        newPrefabs.push(newPrefab);
    }

    return newPrefabs;
};

export default getPrefabs;
