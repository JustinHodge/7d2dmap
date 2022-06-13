import { IMapRenderProps } from '../Types/AppTypes';
import PointOfInterest from './PointOfInterest';

const MapRender = ({ mapData }: IMapRenderProps) => {
    const height = mapData?.mapInfo?.mapGivenSize?.height
        ? mapData.mapInfo?.mapGivenSize.height
        : '500px';
    const width = mapData?.mapInfo?.mapGivenSize?.width
        ? mapData.mapInfo?.mapGivenSize.width
        : '500px';
    const mapStyles = {
        height: height,
        width: width,
        backgroundImage: mapData?.biomesURL ? `url(${mapData.biomesURL})` : '',
    };

    if (mapData?.mapInfo?.mapDisplayedSize?.width) {
        mapStyles.width = mapData.mapInfo.mapDisplayedSize.width;
    }

    if (mapData?.mapInfo?.mapDisplayedSize?.height) {
        mapStyles.height = mapData.mapInfo.mapDisplayedSize.height;
    }

    return (
        <div className='map-render'>
            <div id='map' style={mapStyles}>
                {mapData.prefabs.map((prefab, index, array) => {
                    return <PointOfInterest prefab={prefab ?? []} />;
                })}

                {/* <div
                    style={{
                        width: '25px',
                        height: '25px',
                        backgroundColor: 'red',
                        position: 'relative',
                        top: mapData.mapCenter.yCoord,
                        left: mapData.mapCenter.xCoord,
                    }}
                ></div> */}
            </div>
        </div>
    );
};

export default MapRender;
