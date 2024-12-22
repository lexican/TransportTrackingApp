import { configureStore } from "@reduxjs/toolkit";
import { mapboxApi } from "./mapbox-api";
import { vehicleApi } from "./vehicle-api";

export const store = configureStore({
  reducer: {
    [mapboxApi.reducerPath]: mapboxApi.reducer,
    [vehicleApi.reducerPath]: vehicleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(mapboxApi.middleware)
      .concat(vehicleApi.middleware),
});
