import { IMapRenderProps } from '../Types/AppTypes';
import PointOfInterest from './PointOfInterest';

const MapRender = ({ mapData }: IMapRenderProps) => {
    const height = mapData?.mapInfo?.mapGivenSize?.height
        ? mapData.mapInfo?.mapGivenSize.height
        : '500px';
    const width = mapData?.mapInfo?.mapGivenSize?.width
        ? mapData.mapInfo?.mapGivenSize.width
        : '500px';
    const sharedMapStyles = {
        height: height,
        width: width,
    };

    if (mapData?.mapInfo?.mapDisplayedSize?.width) {
        sharedMapStyles.width = mapData.mapInfo.mapDisplayedSize.width;
    }

    if (mapData?.mapInfo?.mapDisplayedSize?.height) {
        sharedMapStyles.height = mapData.mapInfo.mapDisplayedSize.height;
    }

    const biomeStyles = {
        backgroundImage: mapData?.biomesURL ? `url(${mapData.biomesURL})` : '',
    };

    const roadStyles = {
        backgroundImage: mapData?.biomesURL ? `url(${mapData.roadURL})` : '',
    };
    const waterStyles = {
        backgroundImage: mapData?.biomesURL ? `url(${mapData.waterURL})` : '',
    };

    return (
        <div className='map-render'>
            <div
                id='biome'
                className='mapBackground'
                style={{ ...biomeStyles, ...sharedMapStyles }}
            >
                <div
                    id='water'
                    className='mapBackground'
                    style={{ ...waterStyles, ...sharedMapStyles }}
                >
                    <div
                        id='roads'
                        className='mapBackground'
                        style={{ ...roadStyles, ...sharedMapStyles }}
                    >
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
