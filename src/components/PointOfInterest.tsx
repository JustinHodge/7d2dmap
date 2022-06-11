const PointOfInterest = ({ mapDisplayData, prefab }) => {
    console.count(mapDisplayData);
    if (!prefab || !prefab.hasOwnProperty('position')) {
        return null;
    }

    return (
        <>
            <div
                key={Math.random()}
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

export default PointOfInterest;
