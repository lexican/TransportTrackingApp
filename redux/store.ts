import { configureStore } from "@reduxjs/toolkit";
import { mapboxApi } from "./mapbox-api";

export const store = configureStore({
  reducer: {
    [mapboxApi.reducerPath]: mapboxApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mapboxApi.middleware),
});
