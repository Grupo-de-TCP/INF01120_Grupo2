import { useCallback } from "react";
import * as yup from "yup";
import { createFormStore } from "../form";

interface CreateExpenseForm {
  title: string;
  amount: number;
  group: string;
  payer: string;
  dividedAmong: string[];
}

interface CreateExpenseStore {
  open: boolean,
}

interface CreateExpenseActions {
  onClose: () => void,
  onOpen: () => void,
}

const scheme = yup.object().shape({
  title: yup.string().required(),
  amount: yup.number().required().positive(),
  group: yup.string().required(),
  payer: yup.string().required(),
  dividedAmong: yup.array().of(yup.string()).min(1),
})

const form = createFormStore<CreateExpenseForm, CreateExpenseStore & CreateExpenseActions>({
  amount: 0,
  dividedAmong: [],
  group: "",
  payer: "",
  title: "",
},scheme,(set) => ({
  open: false,
  onClose: () => set({ open: false }),
  onOpen: () => set({ open: true }),
}))

const useOnSave = () => {
  const { onClose } = form.useStore();
  return useCallback(() => {
    onClose();
  }, [onClose])
}

export const CreateExpenseService = {
  form,
  useOnSave
}