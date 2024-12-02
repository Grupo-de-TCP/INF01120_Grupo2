import { Box, Card, IconButton, Stack, Typography } from "@mui/material"
import { Label } from "../label"
import { FAIcon } from "../fa-icon"

interface UserExpenseCardProps {
  id: string,
  userName: string,
  debt: number,
}

export const UserExpenseCard: React.FC<UserExpenseCardProps> = ({
  id,
  userName,
  debt,
}) => {


  return (
    <Card>
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
          onClick={() => {
            const c = window.confirm("Você deseja quitar essa dívida?")
            console.log(id, c)
          }}
        >
          <FAIcon icon="circle-dollar-to-slot" />
        </IconButton>
      </Stack>
    </Card>
  )
}