import * as _ from "lodash-es";
import { Dispatch, SetStateAction, useCallback, useEffect, useMemo } from "react";
import { AnyObject, ObjectSchema } from "yup";
import { Mutate, StoreApi, UseBoundStore } from "zustand";
import { checkFieldExitance } from "./check-existance.util";
import { getValidationAt } from "./create-validation-hook.util";
import { StoreForm } from "./form-store.model";

const findTrue = (item: object | Array<any> | boolean): boolean => {
  if (typeof item === "boolean") return item;
  if (Array.isArray(item)) return item.map(findTrue).some((e) => e === true);
  return Object.values(item)
    .map(findTrue)
    .some((e) => e === true);
};

export const createControl = <IT extends Record<string, unknown>, store, Mos, YupSchema extends AnyObject = object>(useStore: UseBoundStore<Mutate<StoreApi<store>, Mos>>, useStoreForm: UseBoundStore<StoreApi<StoreForm<IT>>>, schema?: ObjectSchema<YupSchema>) => {
  const useGetter = <T = any>(name: string): T => {
    // Check if the field exists using lodash
    checkFieldExitance(useStore, name);

    const value = useStore((v) => _.get(v, name));
    return value;
  };

  const useSetter = <T = any>(name: string) => {
    // Check if the field exists using lodash
    checkFieldExitance(useStore, name);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    const setValue = useMemo(() => {
      const paths = name
        .split(/\.|\[|\]/)
        .filter(Boolean)
        .map((e) => (isNaN(Number(e)) ? `${e}Set` : Number(e)));
      let inside: any = useStore.getState();
      for (let index = 0; index < paths.length; index++) {
        const isLast = index === paths.length - 1;
        const element = paths[index];
        if (typeof element === "string") {
          inside = inside[element];
        } else {
          if (isLast) {
            inside = (value: any) => inside.item(value, element);
          } else {
            inside = inside.props(element);
          }
        }
      }
      return typeof inside === "function" ? inside : inside.default;
    }, [name]);

    return setValue as Dispatch<SetStateAction<T>>;
  };

  const useValidation = (name: string) => {
    // Check if the field exists using lodash
    checkFieldExitance(useStore, name);

    const value = useGetter(name);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
      if (!schema) return;
      const load = async () => {
        const res = await schema
          .validateAt(name, useStore.getState())
          .then(() => false)
          .catch((e) => e.message);
        useStoreForm.setState((s) => {
          const errors = s.errors;
          if (res) _.set(errors, name, res);
          else _.unset(errors, name);
          return { errors };
        });
      };
      load();
    }, [name, value]);

    if (!schema) return false;

    return getValidationAt(name, useStore.getState(), schema);
  };

  const useTouched = (name: string) => {
    const firstSubmit = useStoreForm((e) => e.firstSubmit);
    const isTouchedState = useStoreForm((e) => _.get(e.touched, name));

    const isTouched = useMemo(() => {
      if (firstSubmit) return true;
      if (!isTouchedState) return false;
      return findTrue(isTouchedState);
    }, [firstSubmit, isTouchedState]);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    const setTouched = useCallback(
      (is = true) => {
        if (isTouched === is) return;
        useStoreForm.setState((s) => {
          const touched = _.set(s.touched, name, true);
          return { touched };
        });
      },
      [isTouched, name],
    );

    return {
      isTouched,
      setTouched,
    };
  };

  return {
    useGetter,
    useSetter,
    useValidation,
    useTouched,
  };
};
