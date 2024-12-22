import { IPosition } from "@/types/IPosition";
import { googleMapKey } from "@/utils/utils";
import React from "react";
import { StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

type AddressAutocompleteProps = {
  placeholder: string;
  onPlaceSelected: (position: IPosition) => void;
};

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  placeholder,
  onPlaceSelected,
}) => {
  return (
    <GooglePlacesAutocomplete
      styles={autocompleteStyles}
      placeholder={placeholder}
      fetchDetails={true}
      onPress={(_, details) => {
        onPlaceSelected({
          lat: details?.geometry.location.lng ?? 0,
          long: details?.geometry.location.lat ?? 0,
        });
      }}
      query={{
        key: googleMapKey,
        language: "en",
      }}
    />
  );
};

const autocompleteStyles = StyleSheet.create({
  container: {
    flex: 0,
  },
  description: {
    color: "#000",
    fontSize: 16,
  },
  predefinedPlacesDescription: {
    color: "#3caf50",
  },
});

export default AddressAutocomplete;
