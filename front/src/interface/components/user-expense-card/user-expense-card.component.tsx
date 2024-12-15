import { Box, Card, IconButton, Skeleton, Stack, Typography } from "@mui/material"
import { Label } from "../label"
import { FAIcon } from "../fa-icon"
import { useCallback } from "react"
import { MutationAPI } from "infra/mutations"
import toast from "react-hot-toast"

interface UserExpenseCardProps {
  id: number,
  userName: string,
  debt: number,
  isWaiting?: boolean,
  groupId?: number, 
}

export const UserExpenseCard: React.FC<UserExpenseCardProps> = ({
  id,
  userName,
  debt,
  isWaiting,
  groupId
}) => {

  const {
    mutateAsync: payDebt,
    isPending: isPaying,
  } = MutationAPI.useCreatePaymentMutation();

  const handlePayDebt = useCallback(() => {
    const c = window.confirm("Você deseja quitar essa dívida?")
    if (c) {
      toast.promise(payDebt({
        amount: Math.abs(debt),
        payerId: id,
        receiverId: id,
        groupId
      }), {
        loading: "Pagando...",
        success: "Dívida paga com sucesso!",
        error: "Erro ao pagar a dívida"
      })
    }
  }, [])

  return (
    <Card>
      {isWaiting ? (
        <Stack p={2} gap={.5}>
          <Skeleton />
          <Skeleton />
        </Stack>
      ) : (
        <Stack p={2} direction="row" alignItems="center" gap={.5}>
          <Typography variant="h6" flex={1} >
            {userName}
          </Typography>
          <Box>
            {(debt < 0) && (
              <Label
                color="success"
                startIcon={<FAIcon icon="money-bill" />}
              >
                Te devolve: R$ {(debt * -1).toFixed(2)}
              </Label>
            )}
            {(debt > 0) && (
              <Label
                color="warning"
                startIcon={<FAIcon icon="circle-dollar-to-slot" />}
              >
                Tu deve:  R$ {debt.toFixed(2)}
              </Label>
            )}
            {(debt === 0) && (
              <Label
                color="info"
              >
                Quitado
              </Label>
            )}
          </Box>
          <IconButton
            color="primary"
            disabled={isPaying}
            onClick={handlePayDebt}
          >
            <FAIcon icon="circle-dollar-to-slot" />
          </IconButton>
        </Stack>
      )}
    </Card>
  )
}