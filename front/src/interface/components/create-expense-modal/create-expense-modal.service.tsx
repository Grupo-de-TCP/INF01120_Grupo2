import { useCallback } from "react";
import * as yup from "yup";
import { AutocompleteOption, createFormStore } from "../form";
import { MutationAPI } from "infra/mutations";
import toast from "react-hot-toast";
import { CreateExpensePayload } from "infra/model";

interface CreateExpenseForm {
  title: string;
  amount: number;
  group: AutocompleteOption | null;
  payer: AutocompleteOption | null;
  dividedAmong: AutocompleteOption[];
}

interface CreateExpenseStore {
  open: boolean,
}

interface CreateExpenseActions {
  onClose: () => void,
  onOpen: () => void,
}

const scheme = yup.object().shape({
  title: yup.string().required("Obrigatório!"),
  amount: yup.number().required("Obrigatório!").positive("Tem que ser um numero positivo!"),
  group: yup.object().required("Obrigatório!"),
  payer: yup.object().required("Obrigatório!"),
  dividedAmong: yup.array().min(1, "Tem que ter pelo menos um participante!"),
})

const form = createFormStore<CreateExpenseForm, CreateExpenseStore & CreateExpenseActions>({
  amount: 0,
  dividedAmong: [],
  group: null,
  payer: null,
  title: "",
}, scheme, (set) => ({
  open: false,
  onClose: () => set({ open: false }),
  onOpen: () => set({ open: true }),
}))

const useOnSave = () => {
  const { onClose } = form.useStore();

  const {
    mutateAsync: createExpense,
  } = MutationAPI.useCreateExpenseMutation();

  return useCallback(() => {

    if (form.actions.isValidToSubmit()) {
      const st = form.useStore.getState();

      const data: CreateExpensePayload = {
        amount: st.amount,
        groupId: Number(st.group?.id),
        title: st.title,
        participants: st.dividedAmong.map(e => Number(e.id)),
        payerId: Number(st.payer?.id),
      }

      toast.promise(createExpense(data), {
        loading: "Creating expense...",
        success: "Expense created!",
        error: "Error creating expense"
      }).then(() => {
        onClose();
        form.actions.setIsSubmitting(false)
        form.actions.reset()
      })
    }
  }, [onClose])
}

export const CreateExpenseService = {
  form,
  useOnSave
}