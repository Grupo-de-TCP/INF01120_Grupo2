import * as _ from "lodash-es";
import { AnyObject, ObjectSchema } from "yup";
import { StateCreator, StoreMutatorIdentifier, create } from "zustand";
import { createActions } from "./utils/create-actions.util";
import { createArrayHook } from "./utils/create-array-hook.util";
import { createControl } from "./utils/create-control.util";
import { createSetters } from "./utils/create-setters.util";
import { createValidationHook, getValidation } from "./utils/create-validation-hook.util";
import { ActionsInStore, DeepBooleanOrUndefined, DeepStringOrUndefined, SetFunctions, StoreForm } from "./utils/form-store.model";

export * from "./utils/form-store.model";

export function createFormStore<IT extends Record<string, any>, T extends AnyObject = object, Mos extends [StoreMutatorIdentifier, unknown][] = [], YupSchema extends AnyObject = object>(initialValues: IT, validationSchema?: ObjectSchema<YupSchema>, initializerExtra: StateCreator<T, [], Mos> = () => ({}) as T) {
  type store = IT & SetFunctions<IT> & T & ActionsInStore;

  const useStore = create<store, Mos>((set, get, StoreAPI) => {
    return {
      ..._.cloneDeep(initialValues),
      // Setters
      ...createSetters(initialValues, set),
      // Rest of the store
      ...initializerExtra(set, get, StoreAPI),
      // actions
      reset: () => {
        set(_.cloneDeep(initialValues) as any);
      },
      resetExtra: () => {
        set(initializerExtra(set, get, StoreAPI) as any);
      },
    };
  });

  const errors = validationSchema ? getValidation<IT>(initialValues, validationSchema) : ({} as DeepStringOrUndefined<IT>);
  const useStoreForm = create<StoreForm<IT>>((set) => ({
    isSubmitting: false,
    firstSubmit: false,
    errors,
    touched: {} as DeepBooleanOrUndefined<IT>,
    resetCount: 0,
    reset: () =>
      set((p) => ({
        errors,
        touched: {} as DeepBooleanOrUndefined<IT>,
        firstSubmit: false,
        isSubmitting: false,
        resetCount: p.resetCount + 1,
      })),
  }));

  const control = createControl<IT, store, Mos, YupSchema>(useStore, useStoreForm, validationSchema);
  const actions = createActions<IT, store, Mos, YupSchema>(useStore, useStoreForm, validationSchema);
  const useArray = createArrayHook(useStore);
  const useValidation = createValidationHook<IT, store, Mos, YupSchema>(useStore, useStoreForm, validationSchema);

  return {
    useStore,
    useStoreForm,
    control,
    actions,
    useArray,
    useValidation,
  };
}

export type FormStoreControl<IT extends AnyObject = object> = ReturnType<typeof createFormStore<IT, object>>["control"];
