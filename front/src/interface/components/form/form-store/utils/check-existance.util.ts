import * as _ from "lodash-es";
import { Mutate, StoreApi, UseBoundStore } from "zustand";

export const checkFieldExitance = <store, Mos>(useStore: UseBoundStore<Mutate<StoreApi<store>, Mos>>, name: string) => {
  // Check if the field exists using lodash
  if (!_.has(useStore.getState(), name)) {
    throw new Error(`Field "${name}" is not registered in the store!`);
  }
};
