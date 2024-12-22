import MapCamera from "@/components/map-camera/MapCamera";
import Mapbox from "@rnmapbox/maps";
import { Position } from "@rnmapbox/maps/lib/typescript/src/types/Position";

const RoutePlanner: React.FC = () => {
  const position: Position = [100.48318481445312, 5.292852878570557];

  return (
    <Mapbox.MapView
      style={{
        flex: 1,
      }}
    >
      <MapCamera zoomLevel={5} position={position} />
    </Mapbox.MapView>
  );
};

export default RoutePlanner;