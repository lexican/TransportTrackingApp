import { IPosition } from "@/types/IPosition";
import { mapboxToken } from "@/utils/utils";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mapboxApi = createApi({
  reducerPath: "mapboxApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.mapbox.com" }),
  endpoints: (builder) => ({
    getRoute: builder.query<
      any,
      { startCoords: IPosition; endCoords: IPosition }
    >({
      query: ({ startCoords, endCoords }) => ({
        url: `/directions/v5/mapbox/driving/${startCoords.lat},${startCoords.long};${endCoords.lat},${endCoords.long}`,
        params: {
          annotations: "maxspeed",
          overview: "full",
          geometries: "geojson",
          access_token: mapboxToken ?? "",
          alternatives: "true",
        },
      }),
    }),
  }),
});

export const { useGetRouteQuery } = mapboxApi;
