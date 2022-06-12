const MapRender = ({ mapData }) => {
    console.log(mapData?.mapInfo?.mapDisplayedSize);
    return (
        <div className='map-render'>
            <div
                id='map'
                style={{
                    width: mapData?.mapInfo?.mapDisplayedSize?.width
                        ? mapData?.mapInfo?.mapDisplayedSize?.width
                        : '85vw',
                    height: mapData?.mapInfo?.mapDisplayedSize?.height
                        ? mapData?.mapInfo?.mapDisplayedSize?.height
                        : '88vh',
                    backgroundImage: mapData?.biomes
                        ? `url(${URL.createObjectURL(mapData.biomes)})`
                        : '',
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
                {/* {prefabs.map((prefab, index, array) => {
                    return <PointOfInterest prefab={prefab ?? []} />;
                })} */}

                <div
                    style={{
                        width: '25px',
                        height: '25px',
                        backgroundColor: 'red',
                        position: 'absolute',
                        top: mapData.mapCenter.yCenter,
                        left: mapData.mapCenter.xCenter,
                    }}
                ></div>
            </div>
        </div>
    );
};

export default MapRender;
