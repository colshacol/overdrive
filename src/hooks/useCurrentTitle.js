import * as React from "react";
import { useGlobalStore } from "../global.store";
import { useProjects } from "../projects.store";

import { titles } from "../sampleData.json";

export const useCurrentTitle = () => {
  const globalStore = useGlobalStore();
};
