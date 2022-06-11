const PointsOfInterest = ({ mapDisplayData, prefabs }) => {
    console.log('oops');
    console.log(mapDisplayData);
    return (
        <>
            {prefabs.map((prefab, index, array) => {
                return (
                    <div
                        key={index}
                        style={{
                            width: '5px',
                            height: '5px',
                            position: 'absolute',
                            backgroundColor: 'red',
                            top:
                                mapDisplayData.yCenter -
                                prefab.position.yPosition.numericalValue / 9,
                            left:
                                mapDisplayData.xCenter +
                                prefab.position.xPosition.numericalValue / 9,
                        }}
                    ></div>
                );
            })}

            {/* {
                for(const prefab of prefabs) {
                    return (
                        <div
                        style={{
                            width: '5px',
                            height: '5px',
                            position: 'absolute',
                            top:
                                mapDisplayData.yCenter +
                                prefabs[prefabKey].position.yPosition
                                    .numericalValue *
                                    2,
                            left:
                                mapDisplayData.xCenter +
                                prefabs[prefabKey].position.xPosition
                                    .numericalValue *
                                    2,
                        }}
                    ></div>
                    )
                }
            } */}
        </>
    );
};

export default PointsOfInterest;
