import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Slide,
  SlideProps,
} from "@mui/material";
import { CreateExpenseService } from "./create-expense-modal.service";
import { FormFieldAutocomplete, FormFieldText } from "../form";
import { useQuery } from "@tanstack/react-query";
import { QueryOptionsAPI } from "infra/queries";

const AutoCompleteGrupos = () => {

  const {
    data: groups
  } = useQuery(QueryOptionsAPI.groups)

  return (
    <FormFieldAutocomplete
      control={CreateExpenseService.form.control}
      name="group"
      label="Grupo"
      items={(groups?.map((gp) => ({ id: String(gp.id), label: gp.title }))) || []}
    />
  )
}

const AutoCompletePayer = () => {

  const groupId = CreateExpenseService.form.useStore(e=> e.group?.id)

  const {
    data: users
  } = useQuery({
    ...QueryOptionsAPI.groupsById(Number(groupId)),
    select: (data) => data?.members
  })

  return (
    <FormFieldAutocomplete
      control={CreateExpenseService.form.control}
      name="payer"
      label="Pagante"
      disabled={!groupId}
      items={users?.map((u) => ({ id: String(u.id), label: u.name })) || []}
    />
  )
}

const AutoCompleteDivideAmong = () => {

  const groupId = CreateExpenseService.form.useStore(e=> e.group?.id)

  const {
    data: users
  } = useQuery({
    ...QueryOptionsAPI.groupsById(Number(groupId)),
    select: (data) => data?.members
  })

  return (
    <FormFieldAutocomplete
      control={CreateExpenseService.form.control}
      name="dividedAmong"
      label="Dividido Entre"
      multiple
      disabled={!groupId}
      items={users?.map((u) => ({ id: String(u.id), label: u.name })) || []}
    />
  )
}

const SubmitButton = () => {
  const onSave = CreateExpenseService.useOnSave();
  const isSubmitting = CreateExpenseService.form.useStoreForm(e => e.isSubmitting)
  return (
    <Button onClick={onSave} disabled={isSubmitting} variant="contained" color="primary">
      Salvar
    </Button>
  )
}

export const CreateExpenseModal = () => {

  const {
    onClose,
    open
  } = CreateExpenseService.form.useStore(({ onClose, open }) => ({ onClose, open }));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      fullScreen
      maxWidth="sm"
      TransitionComponent={Slide}
      TransitionProps={{
        direction: "up"
      } as SlideProps}
    >
      <DialogTitle>Criar Nova Despesa</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} py={.5}>
          <FormFieldText
            control={CreateExpenseService.form.control}
            name="title"
            label="Título"
          />
          <FormFieldText
            control={CreateExpenseService.form.control}
            name="amount"
            label="Valor"
            type="number"
          />
          <AutoCompleteGrupos />
          <AutoCompletePayer />
          <AutoCompleteDivideAmong />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <SubmitButton />
      </DialogActions>
    </Dialog>
  );
};
