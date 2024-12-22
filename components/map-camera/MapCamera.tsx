import React from "react";
import Mapbox from "@rnmapbox/maps";
import { MapCameraProps } from "@/types/MapCameraProps";

const MapCamera: React.FC<MapCameraProps> = ({ zoomLevel, position }) => {
  return <Mapbox.Camera zoomLevel={zoomLevel} centerCoordinate={position} />;
};

export default MapCamera;
