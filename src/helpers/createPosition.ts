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
        numericalValue:
            parseInt(rawX) !== NaN
                ? mapCenter.xCoord + parseInt(rawX) * (zoomPercent / 100)
                : 0,
    };
    const yPosition = {
        numericalValue:
            parseInt(rawY) !== NaN
                ? mapCenter.yCoord - parseInt(rawY) * (zoomPercent / 100)
                : 0,
    };
    const zPosition = {
        numericalValue:
            parseInt(rawZ) !== NaN ? parseInt(rawZ) * (zoomPercent / 100) : 0,
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
