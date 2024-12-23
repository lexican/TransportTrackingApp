import MapCamera from "@/components/map-camera/MapCamera";
import Mapbox from "@rnmapbox/maps";
import React, { useEffect, useState } from "react";
import { useGetRouteQuery } from "@/redux/mapbox-api";
import { Text } from "react-native";
import { IPosition } from "@/types/IPosition";
import AppLoader from "@/components/app-loader/AppLoader";
import { AppContainer, AppSafeAreaView } from "@/styles/common/App.styled";
import {
  SearchContainer,
  SearchInnerContainer,
} from "@/styles/route-planner/route-planner.styled";
import AddressAutocomplete from "@/components/address-auto-complete/AddressAutocomplete";
import MapPointIndicator from "@/components/map-point-indicator/MapPointIndicator";
import {
  getLastLocation,
  initializeDatabase,
  insertLocation,
} from "@/database/db";

export default function RoutePlanner() {
  const [startCoords, setStartCoords] = useState<IPosition>({
    lat: 3.3914817,
    long: 6.558351699999999,
  });
  const [endCoords, setEndCoords] = useState<IPosition>({
    lat: 3.1114879,
    long: 6.5114449,
  });

  const { data, error, isLoading } = useGetRouteQuery({
    startCoords: startCoords,
    endCoords: endCoords,
  });

  const mainRouteCords = data?.routes?.[0]?.geometry?.coordinates || [];
  const alternativeRoutes = data?.routes?.slice(1) || [];

  useEffect(() => {
    async function setupDb() {
      await initializeDatabase();
      const lastCoorinates = await getLastLocation();

      if (lastCoorinates != null) {
        setStartCoords({
          lat: lastCoorinates.startLat,
          long: lastCoorinates.startLong,
        });
        setEndCoords({
          lat: lastCoorinates.endLat,
          long: lastCoorinates.endLong,
        });
      }
    }
    setupDb();
  }, []);

  if (isLoading) {
    return <AppLoader />;
  }

  if (error) {
    return <Text>Error fetching routes</Text>;
  }

  return (
    <AppSafeAreaView>
      <AppContainer>
        <Mapbox.MapView
          style={{
            flex: 1,
          }}
        >
          <MapCamera
            zoomLevel={10}
            position={[startCoords.lat, startCoords.long]}
          />
          {mainRouteCords.length > 0 && (
            <Mapbox.ShapeSource
              id="primaryRouteShapeSource"
              shape={{
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: mainRouteCords,
                },
                properties: {},
              }}
            >
              <Mapbox.LineLayer
                id="primaryRouteLineLayer"
                style={{ lineColor: "blue", lineWidth: 4 }}
              />
            </Mapbox.ShapeSource>
          )}

          {alternativeRoutes.map((route: any, index: any) => (
            <Mapbox.ShapeSource
              key={`altRoute${index}`}
              id={`altRouteShapeSource${index}`}
              shape={{
                type: "Feature",
                geometry: {
                  type: "LineString",
                  coordinates: route.geometry.coordinates,
                },
                properties: {},
              }}
            >
              <Mapbox.LineLayer
                id={`altRouteLineLayer${index}`}
                style={{
                  lineColor: "#f77976",
                  lineWidth: 4,
                  lineOpacity: 0.7,
                }}
              />
            </Mapbox.ShapeSource>
          ))}

          <MapPointIndicator
            lat={startCoords.lat}
            long={startCoords.long}
            id={"startPoint"}
            color={"green"}
          />

          <MapPointIndicator
            lat={endCoords.lat}
            long={endCoords.long}
            id={"endPoint"}
            color={"red"}
          />
        </Mapbox.MapView>

        <SearchContainer>
          <SearchInnerContainer>
            <AddressAutocomplete
              placeholder="Start Address"
              onPlaceSelected={async (position) => {
                setStartCoords(position);
                await insertLocation(
                  position.lat,
                  position.long,
                  endCoords.lat,
                  endCoords.long
                );
              }}
            />
            <AddressAutocomplete
              placeholder="Destination Address"
              onPlaceSelected={async (position) => {
                setEndCoords(position);
                await insertLocation(
                  startCoords.lat,
                  startCoords.long,
                  position.lat,
                  position.long
                );
              }}
            />
          </SearchInnerContainer>
        </SearchContainer>
      </AppContainer>
    </AppSafeAreaView>
  );
}
