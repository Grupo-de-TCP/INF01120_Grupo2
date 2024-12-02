import { Dispatch, SetStateAction } from "react";

export type Primitive = string | number | boolean | null | undefined;

export type ArrayFunction<T, U> = {
  default: Dispatch<SetStateAction<T>>;
  item: (value: SetStateAction<T>, index: number) => void;
} & (U extends object
  ? {
      props: (index: number) => {
        [K in keyof U & string as `${K}Set`]: U[K] extends object | Array<any> ? NestedSetFunction<U[K]> : Dispatch<SetStateAction<U[K]>>;
      };
    }
  : object);

type NestedSetFunction<T> = T extends Array<infer U>
  ? ArrayFunction<T, U>
  : {
      default: Dispatch<SetStateAction<T>>;
    } & {
      [K in keyof T & string as `${K}Set`]: T[K] extends object | Array<any> ? NestedSetFunction<T[K]> : Dispatch<SetStateAction<T[K]>>;
    };

export type SetFunctions<T extends Record<string, any>> = {
  [K in keyof T & string as `${K}Set`]: T[K] extends object | Array<any> ? NestedSetFunction<T[K]> : Dispatch<SetStateAction<T[K]>>;
};

export type DeepStringOrUndefined<T> = {
  [K in keyof T]: T[K] extends object ? DeepStringOrUndefined<T[K]> : string | undefined;
};
export type DeepBooleanOrUndefined<T> = {
  [K in keyof T]: T[K] extends object ? DeepStringOrUndefined<T[K]> : boolean | undefined;
};

export interface ActionsInStore {
  reset: () => void;
  resetExtra: () => void;
}

export interface StoreForm<IT> {
  isSubmitting: boolean;
  firstSubmit: boolean;
  errors: DeepStringOrUndefined<IT>;
  touched: DeepBooleanOrUndefined<IT>;
  resetCount: number;
  reset: () => void;
}
