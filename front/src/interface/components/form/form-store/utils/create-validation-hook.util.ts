import * as _ from "lodash-es";
import { useEffect } from "react";
import { AnyObject, ObjectSchema, ValidationError } from "yup";
import { Mutate, StoreApi, UseBoundStore } from "zustand";
import { DeepStringOrUndefined, StoreForm } from "./form-store.model";

export const getValidationAt = (path: string, values: any, schema: ObjectSchema<any>): false | string => {
  try {
    const casted = schema.cast(values, { stripUnknown: true, assert: false });
    if (_.get(casted, path) === undefined) return false;
    schema.validateSyncAt(path, casted, { abortEarly: false, strict: true });
  } catch (error) {
    return (error as ValidationError).message;
  }
  return false;
};
export const getValidation = <IT, M extends boolean = false>(values: any, schema: ObjectSchema<any>, returnPaths: M = false as M): M extends true ? string[] : DeepStringOrUndefined<IT> => {
  try {
    schema.validateSync(schema.cast(values, { stripUnknown: true, assert: false }), { abortEarly: false, strict: true });
  } catch (error) {
    const errors = {};
    if (returnPaths) {
      return (error as ValidationError).inner.map((e: ValidationError) => e.path!) as M extends true ? string[] : DeepStringOrUndefined<IT>;
    } else {
      (error as ValidationError).inner.map((e: ValidationError) => _.set(errors, e.path!, e.message));
      return errors as M extends true ? string[] : DeepStringOrUndefined<IT>;
    }
  }
  return {} as M extends true ? string[] : DeepStringOrUndefined<IT>;
};

export const createValidationHook = <IT extends Record<string, unknown>, store, Mos, YupSchema extends AnyObject>(useStore: UseBoundStore<Mutate<StoreApi<store>, Mos>>, useStoreForm: UseBoundStore<StoreApi<StoreForm<IT>>>, schema?: ObjectSchema<YupSchema>) => {
  const useValidation = <T extends string | undefined = undefined>(name?: T) => {
    const values = useStore();

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
      if (!schema) return;
      useStoreForm.setState({
        errors: getValidation<IT>(values, schema),
      });
    }, [values]);

    const errors = useStoreForm((e) => e.errors);

    if (!schema) return;

    if (name) {
      return getValidationAt(name, values, schema);
    }

    return errors;
  };

  return useValidation;
};
