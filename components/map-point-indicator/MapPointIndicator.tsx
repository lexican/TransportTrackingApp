import Mapbox from "@rnmapbox/maps";
import React from "react";
import { MapPointContainer } from "./MapPointIndicator.styled";
import { MapPointIndicatorProps } from "@/types/MapPointIndicatorProps";

const MapPointIndicator: React.FC<MapPointIndicatorProps> = ({
  lat,
  long,
  id,
  color,
}) => {
  return (
    <Mapbox.PointAnnotation id={id} coordinate={[lat, long]}>
      <MapPointContainer bgColor={color} />
    </Mapbox.PointAnnotation>
  );
};

export default MapPointIndicator;
