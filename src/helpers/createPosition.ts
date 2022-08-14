import { IMapCoordinates, IPosition } from '../Types/AppTypes';

const createPosition = (
    positionString: string | undefined | null,
    mapCenter: IMapCoordinates | undefined | null,
    zoomPercent: number
) => {
    if (mapCenter === undefined || mapCenter === null) {
        console.error('mapDisplayedSize invalid');
        return;
    }

    if (positionString === undefined || positionString === null) {
        console.error('position invalid');
        return;
    }

    const positionParts = positionString.split(',');
    const rawX = positionParts[0];
    const rawZ = positionParts[1];
    const rawY = positionParts[2];

    const xPosition = {
        numericalValue: !isNaN(parseInt(rawX)) ? parseInt(rawX) : 0,
    };
    const yPosition = {
        numericalValue: !isNaN(parseInt(rawY)) ? parseInt(rawY) : 0,
    };
    const zPosition = {
        numericalValue: !isNaN(parseInt(rawZ)) ? parseInt(rawZ) : 0,
    };

    const positionObject: IPosition = {
        rawPosition: positionString,
        xPosition: xPosition,
        yPosition: yPosition,
        zPosition: zPosition,
    };

    return positionObject;
};

export default createPosition;
