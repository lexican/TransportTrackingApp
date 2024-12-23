import MapCamera from "@/components/map-camera/MapCamera";
import { Image, StyleSheet, View, Text } from "react-native";

import { useFetchVehiclePositionsQuery } from "@/redux/vehicle-api";
import { mapboxToken } from "@/utils/utils";
import Mapbox from "@rnmapbox/maps";
import { Position } from "@rnmapbox/maps/lib/typescript/src/types/Position";
import { useEffect } from "react";
import { ErrorContainer, ErrorText } from "@/styles/common/App.styled";

Mapbox.setAccessToken(mapboxToken ?? "");

const Home: React.FC = () => {
  const position: Position = [100.48318481445312, 5.292852878570557];

  const {
    data: vehiclePositions,
    error,
    refetch,
  } = useFetchVehiclePositionsQuery();

  useEffect(() => {
    const interval = setInterval(() => {
      refetch();
    }, 30000);

    return () => clearInterval(interval);
  }, [refetch]);

  if (error) {
    return (
      <ErrorContainer>
        <ErrorText>An error just occured</ErrorText>
      </ErrorContainer>
    );
  }

  return (
    <Mapbox.MapView style={styles.map}>
      <MapCamera zoomLevel={10} position={position} />
      {vehiclePositions?.map((vehicle) => (
        <Mapbox.PointAnnotation
          key={vehicle.id}
          id={vehicle.id}
          coordinate={[vehicle.lon, vehicle.lat]}
        >
          <View>
            <Image
              source={require("@/assets/images/train.png")}
              style={styles.trainIcon}
            />
          </View>
        </Mapbox.PointAnnotation>
      ))}
    </Mapbox.MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  trainIcon: {
    width: 30,
    height: 30,
  },
});

export default Home;
