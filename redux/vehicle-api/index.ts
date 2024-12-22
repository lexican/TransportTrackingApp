import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import * as GtfsRealtimeBindings from "gtfs-realtime-bindings";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import type { transit_realtime } from "gtfs-realtime-bindings";

type VehiclePosition = {
  id: string;
  lat: number;
  lon: number;
};

// Define the vehicle API
export const vehicleApi = createApi({
  reducerPath: "vehicleApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.data.gov.my",
  }),
  keepUnusedDataFor: 3600,
  endpoints: (builder) => ({
    fetchVehiclePositions: builder.query<VehiclePosition[], void>({
      queryFn: async (_, _api, _extraOptions, baseQuery) => {
        try {
          // Fetch raw GTFS data
          const result = await baseQuery({
            url: "/gtfs-realtime/vehicle-position/ktmb",
            responseHandler: (response) => response.arrayBuffer(),
          });

          if (result.error) {
            return { error: result.error as FetchBaseQueryError };
          }

          const buffer = result.data as ArrayBuffer;

          // Decode the GTFS feed
          const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(
            new Uint8Array(buffer)
          );

          // Map GTFS entities to vehicle positions
          const vehicles: VehiclePosition[] = feed.entity.map(
            (entity: transit_realtime.FeedEntity) => ({
              id: entity.id,
              lat: entity.vehicle?.position?.latitude || 0,
              lon: entity.vehicle?.position?.longitude || 0,
            })
          );

          return { data: vehicles };
        } catch (error) {
          return {
            error: {
              status: "FETCH_ERROR",
              data: error,
            } as FetchBaseQueryError,
          };
        }
      },
    }),
  }),
});

export const { useFetchVehiclePositionsQuery } = vehicleApi;
