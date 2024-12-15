import React, { useMemo, useState } from "react";
import { Card, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, CardActionArea, Divider, IconButton, Skeleton } from "@mui/material";
import { Stack } from "@mui/system";
import { FAIcon } from "../fa-icon";
import { ExpenseI } from "infra/model";
import { MutationAPI } from "infra/mutations";
import { toast } from "react-hot-toast"

export interface ExpenseCardProps extends ExpenseI {
  isWaiting?: boolean;
  groupId: number | undefined;
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({
  amount,
  title,
  id,
  groupId,
  participants,
  isWaiting,
  payer,
}) => {


  const [open, setOpen] = useState(false);

  const dividedIn = useMemo(() => participants.length, [participants]);

  const divAm = useMemo(() => {
    if (payer) {
      return amount / dividedIn;
    }
    return (amount / dividedIn) * (dividedIn - 1);
  }, [amount, dividedIn, payer]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    mutateAsync: deleteExpense,
    isPending: isDeleting,
  } = MutationAPI.useDeleteExpenseMutation(groupId, id);

  const handleDelete = () => {
    const c = window.confirm("Você deseja excluir essa despesa?");
    if (c) {
      toast.promise(deleteExpense(), {
        loading: "Excluindo...",
        success: "Despesa excluída com sucesso!",
        error: "Erro ao excluir a despesa"
      }).then(() => {
        handleClose();
      })
    }
  }

  return (
    <>
      <Card>
        <CardActionArea
          onClick={handleOpen}
          disabled={isWaiting}
        >
          {isWaiting ? (
            <Stack px={2} py={1.5} gap={0.5}>
              <Skeleton />
              <Skeleton />
            </Stack>
          ) : (
            <Stack px={2} py={1.5} direction="row" justifyContent="space-between">
              <Stack gap={0.5}>
                <Typography variant="subtitle1">{title}</Typography>
                <Typography variant="caption" sx={{ whiteSpace: "nowrap" }}>
                  {`${payer.name || "Você"} pagou R$ ${amount.toFixed(2)}`}
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
          )}
        </CardActionArea>
      </Card>

      <Dialog
        open={open}
        onClose={isDeleting ? () => { } : handleClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Detalhes da Despesa</DialogTitle>
        <IconButton
          disabled={isDeleting}
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
            {`Pago por: ${payer.name || "Você"}`}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {`Participantes:`}
          </Typography>
          <ul>
            {participants.map((p, index) => (
              <li key={index}>
                <Typography variant="body2">{p.name} (R$ {(amount / dividedIn).toFixed(2)})</Typography>
              </li>
            ))}
          </ul>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            variant="outlined"
            onClick={handleDelete}
            disabled={isDeleting}
            startIcon={<FAIcon icon="trash" fontSize="small" />}
          >
            Excluir
          </Button>
          <Button disabled={isDeleting} color="primary" variant="contained" onClick={handleClose}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
