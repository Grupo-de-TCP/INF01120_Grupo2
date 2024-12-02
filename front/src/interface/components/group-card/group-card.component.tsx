import { Card, CardActionArea, Stack, Typography } from "@mui/material"
import { Label } from "../label"
import { FAIcon } from "../fa-icon"
import { useNavigate } from "react-router-dom"

interface GroupCardProps {
  id: string,
  title: string,
  debt: number,
  dividend: number,
}

export const GroupCard: React.FC<GroupCardProps> = ({
  id,
  title,
  debt,
  dividend,
}) => {

  const navigate = useNavigate();

  return (
    <Card>
      <CardActionArea 
        onClick={() => {
          navigate(`/group/${id}/debts`)
        }}
      >
        <Stack p={2} gap={2}>
          <Typography variant="h6" >
            {title}
          </Typography>
          <Stack
            direction="row"
            gap={1}
          >
            {Boolean(dividend) && (
              <Label
                color="success"
                startIcon={<FAIcon icon="money-bill" />}
              >
                Te devolvem: R$ {dividend.toFixed(2)}
              </Label>
            )}
            {Boolean(debt) && (
              <Label
                color="warning"
                startIcon={<FAIcon icon="circle-dollar-to-slot" />}
              >
                Tu deve:  R$ {debt.toFixed(2)}
              </Label>
            )}
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  )
}