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

const groups = ["Amigos", "Família", "Trabalho"];
const users = ["Alice", "Bob", "Charlie", "David", "Eve"];

export const CreateExpenseModal = () => {

  const {
    onClose,
    open
  } = CreateExpenseService.form.useStore(({ onClose, open }) => ({ onClose, open }));
  const onSave = CreateExpenseService.useOnSave();

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
          <FormFieldAutocomplete
            control={CreateExpenseService.form.control}
            name="group"
            label="Grupo"
            items={groups.map((groupName) => ({ id: groupName, label: groupName }))}
          />
          <FormFieldAutocomplete
            control={CreateExpenseService.form.control}
            name="payer"
            label="Pagante"
            items={users.map((groupName) => ({ id: groupName, label: groupName }))}
          />
          <FormFieldAutocomplete
            control={CreateExpenseService.form.control}
            name="dividedAmong"
            label="Dividido Entre"
            multiple
            items={users.map((groupName) => ({ id: groupName, label: groupName }))}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={onSave} variant="contained" color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};
