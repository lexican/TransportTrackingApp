import React from "react";
import {
  AppLoaderActivityIndicator,
  AppLoaderContainer,
} from "./AppLoader.styled";

const AppLoader: React.FC = () => {
  return (
    <AppLoaderContainer>
      <AppLoaderActivityIndicator size="large" />
    </AppLoaderContainer>
  );
};

export default AppLoader;
