import { MapPointContainerProps } from "@/types/MapPointContainerProps";
import styled from "styled-components/native";

export const MapPointContainer = styled.View<MapPointContainerProps>`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${(props) => props.bgColor};
`;
