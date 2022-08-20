import { IMapRenderProps } from '../Types/AppTypes';
import PointOfInterest from './PointOfInterest';

const MapRender = ({ mapData }: IMapRenderProps) => {
    const height = mapData?.mapInfo?.mapGivenSize?.height
        ? mapData.mapInfo?.mapGivenSize.height
        : '500px';
    const width = mapData?.mapInfo?.mapGivenSize?.width
        ? mapData.mapInfo?.mapGivenSize.width
        : '500px';
    const biomeStyles = {
        height: height,
        width: width,
        backgroundImage: mapData?.biomesURL ? `url(${mapData.biomesURL})` : '',
    };
    const roadStyles = {};
    const waterStyles = {};

    if (mapData?.mapInfo?.mapDisplayedSize?.width) {
        biomeStyles.width = mapData.mapInfo.mapDisplayedSize.width;
    }

    if (mapData?.mapInfo?.mapDisplayedSize?.height) {
        biomeStyles.height = mapData.mapInfo.mapDisplayedSize.height;
    }

    return (
        <div className='map-render'>
            <div id='biome' style={biomeStyles}>
                <div id='water' style={waterStyles}>
                    <div id='roads' style={roadStyles}>
                        {mapData.prefabs.map((prefab, index, array) => {
                            return (
                                <PointOfInterest
                                    prefab={prefab ?? []}
                                    mapData={mapData}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MapRender;
