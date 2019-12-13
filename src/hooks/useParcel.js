import * as React from "react";

import { parcels } from "../sampleData.json";

export const useParcel = parcelID => {
  const [parcel, setParcel] = React.useState(
    parcels.find(parcel => {
      return parcel.ParcelID === parcelID;
    })
  );

  return parcel;
};
