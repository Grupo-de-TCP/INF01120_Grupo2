import React, { useMemo, useState } from "react";
import { Card, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, CardActionArea, Divider, IconButton } from "@mui/material";
import { Stack } from "@mui/system";
import { FAIcon } from "../fa-icon";

export interface ExpenseCardProps {
  id: string;
  title: string;
  amount: number;
  payer?: string;
  dividedIn: number;
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({
  amount,
  title,
  dividedIn,
  payer,
}) => {
  const [open, setOpen] = useState(false);

  const divAm = useMemo(() => {
    if (payer) {
      return amount / dividedIn;
    }
    return (amount / dividedIn) * (dividedIn - 1);
  }, [amount, dividedIn, payer]);

  const participants = useMemo(() => {
    const names = ["Alice", "Bob", "Charlie", "David", "Eve"];
    return names.slice(0, dividedIn);
  }, [dividedIn]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDelete = () => {
    const c = window.confirm("Você deseja excluir essa despesa?");
    if(c){
      console.log("Excluindo despesa...");
      handleClose();
    }
  }

  return (
    <>
      <Card>
        <CardActionArea
          onClick={handleOpen}
        >
          <Stack px={2} py={1.5} direction="row" justifyContent="space-between">
            <Stack gap={0.5}>
              <Typography variant="subtitle1">{title}</Typography>
              <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>
                {`${payer || "Você"} pagou R$ ${amount.toFixed(2)}`}
              </Typography>
            </Stack>
            <Stack gap={0.5} color={payer ? "error.main" : "success.main"}>
              <Typography variant="caption" sx={{ whiteSpace: "nowrap" }} textAlign="right">
                {payer ? "Você pegou emprestado" : "Você emprestou"}
              </Typography>
              <Typography variant="subtitle1" textAlign="right">
                {`R$ ${divAm.toFixed(2)}`}
              </Typography>
            </Stack>
          </Stack>
        </CardActionArea>
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Detalhes da Despesa</DialogTitle>
        <IconButton
          onClick={handleClose}
          sx={{ position: "absolute", top: 18, right: 18 }}
        >
          <FAIcon
            icon="times"
          />
        </IconButton>
        <Divider />
        <DialogContent>
          <Typography variant="subtitle1" gutterBottom>
            {`Título: ${title}`}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {`Valor total: R$ ${amount.toFixed(2)}`}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {`Pago por: ${payer || "Você"}`}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {`Participantes:`}
          </Typography>
          <ul>
            {participants.map((name, index) => (
              <li key={index}>
                <Typography variant="body2">{name} (R$ {(amount / dividedIn).toFixed(2)})</Typography>
              </li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            variant="outlined"
            onClick={handleDelete}
            startIcon={<FAIcon icon="trash" fontSize="small" />}
          >
            Excluir
          </Button>
          <Button color="primary" variant="contained" onClick={handleClose}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
