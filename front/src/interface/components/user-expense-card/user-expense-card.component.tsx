import { Card, IconButton, Stack, Typography } from "@mui/material"
import { Label } from "../label"
import { FAIcon } from "../fa-icon"

interface UserExpenseCardProps {
  id: string,
  userName: string,
  debt: number,
}

export const UserExpenseCard: React.FC<UserExpenseCardProps> = ({
  userName,
  debt,
}) => {
  return (
    <Card>
      <Stack direction="row" gap={1}>
        <Stack gap={1}>
          <Typography variant="h6" >
            {userName}
          </Typography>
          {(debt < 0) && (
            <Label
              color="success"
              startIcon={<FAIcon icon="money-bill" />}
            >
              Te devolvem: R$ {(debt * -1).toFixed(2)}
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
        </Stack>
        <IconButton
          color="primary"
        >
          <FAIcon icon="circle-dollar-to-slot" />
        </IconButton>
      </Stack>
    </Card>
  )
}