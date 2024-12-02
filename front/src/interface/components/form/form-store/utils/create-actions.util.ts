import { AnyObject, ObjectSchema } from "yup";
import { Mutate, StoreApi, UseBoundStore } from "zustand";
import { getValidation } from "./create-validation-hook.util";
import { ActionsInStore, StoreForm } from "./form-store.model";

export const createActions = <IT extends Record<string, unknown>, store extends ActionsInStore, Mos, YupSchema extends AnyObject = object>(useStore: UseBoundStore<Mutate<StoreApi<store>, Mos>>, useStoreForm: UseBoundStore<StoreApi<StoreForm<IT>>>, schema?: ObjectSchema<YupSchema>) => {
  const setIsSubmitting = (isSubmitting: boolean) => {
    useStoreForm.setState({ isSubmitting });
  };

  const reset = () => {
    useStore.getState().reset();
    useStoreForm.getState().reset();
  };
  const resetExtra = () => {
    useStore.getState().resetExtra();
  };

  const isValidToSubmit = () => {
    useStoreForm.setState({ firstSubmit: true });

    if (!schema) {
      useStoreForm.setState({ isSubmitting: true });
      return true;
    }

    const isValid = schema.isValidSync(useStore.getState());
    if (isValid) {
      useStoreForm.setState({ isSubmitting: true });
    } else {
      const paths = getValidation(useStore.getState(), schema, true);

      paths.forEach((path) => {
        const potentialPaths = path.split(".").map((_, index, arr) => arr.slice(0, index + 1).join("."));

        for (let i = potentialPaths.length - 1; i >= 0; i--) {
          const dataFormLocation = `[data-form-location="${potentialPaths[i]}"]`;
          const element = document.querySelector(dataFormLocation);
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "center",
            });
            break;
          }
        }
      });
    }
    return isValid;
  };

  const isValidToSubmitByField = async (name: string) => {
    useStoreForm.setState({ firstSubmit: true });

    if (!schema) {
      useStoreForm.setState({ isSubmitting: true });
      return true;
    }

    const isValid = await schema
      ?.validateAt(name, useStore.getState())
      .then(() => true)
      .catch(() => false);

    if (isValid) {
      useStoreForm.setState({ isSubmitting: true });
    }

    return isValid;
  };

  return {
    reset,
    resetExtra,
    setIsSubmitting,
    isValidToSubmit,
    isValidToSubmitByField,
  };
};
