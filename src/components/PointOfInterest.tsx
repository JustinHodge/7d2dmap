import { IPointOfInterestProps } from '../Types/AppTypes';

const PointOfInterest = ({ prefab, mapData }: IPointOfInterestProps) => {
    if (!prefab?.position) {
        return null;
    }

    return (
        <>
            <div
                key={Math.random()}
                className='poi-marker-wrapper'
                style={{
                    bottom:
                        prefab.position.yPosition.numericalValue *
                            (mapData.mapInfo.Scale ?? 1) -
                        mapData.mapCenter.yCoord,
                    left:
                        prefab.position.xPosition.numericalValue *
                            (mapData.mapInfo.Scale ?? 1) +
                        mapData.mapCenter.xCoord,
                }}
            >
                <div className='poi-marker'></div>
            </div>
        </>
    );
};

export default PointOfInterest;
