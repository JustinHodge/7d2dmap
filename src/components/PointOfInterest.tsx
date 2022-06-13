import { IPointOfInterestProps } from '../Types/AppTypes';

const PointOfInterest = ({ prefab }: IPointOfInterestProps) => {
    if (!prefab?.position) {
        return null;
    }

    return (
        <>
            <div
                key={Math.random()}
                className='poi-marker-wrapper'
                style={{
                    top: prefab.position.yPosition.numericalValue,
                    left: prefab.position.xPosition.numericalValue,
                }}
            >
                <div className='poi-marker'></div>
            </div>
        </>
    );
};

export default PointOfInterest;
