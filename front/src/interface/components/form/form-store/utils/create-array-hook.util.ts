import * as _ from "lodash-es";
import { Dispatch, SetStateAction, useCallback } from "react";
import { Mutate, StoreApi, UseBoundStore } from "zustand";

export type UseArrayConfig = {
  disableOptimization?: boolean;
};

type ExtractState<S> = S extends {
  getState: () => infer T;
}
  ? T
  : never;

type ArrayElement<ArrayType extends readonly unknown[]> = ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export const createArrayHook = <store, Mos>(useStore: UseBoundStore<Mutate<StoreApi<store>, Mos>>) => {
  const useArray = <T extends unknown[]>(selectorValue: (c: ExtractState<Mutate<StoreApi<store>, Mos>>) => T, selectorSetter: (c: store) => Dispatch<SetStateAction<T>>, config: UseArrayConfig = {}) => {
    const items = useStore(config.disableOptimization ? (e) => _.cloneDeep(selectorValue(e)) : selectorValue);

    return {
      items,
      // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
      add: useCallback((value: ArrayElement<T>) => {
        const setter = selectorSetter(useStore.getState());
        setter((arr) => {
          return [...arr, value] as T;
        });
      }, []),
      // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
      remove: useCallback((index: number) => {
        const setter = selectorSetter(useStore.getState());
        setter((arr) => arr.filter((_it, i) => i !== index) as unknown as T);
      }, []),
      // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
      move: useCallback((from: number, to: number) => {
        const setter = selectorSetter(useStore.getState());
        setter((arr) => {
          const newArray = [...arr];
          const item = newArray.splice(from, 1)[0];
          newArray.splice(to, 0, item);
          return newArray as T;
        });
      }, []),
    };
  };
  return useArray;
};
