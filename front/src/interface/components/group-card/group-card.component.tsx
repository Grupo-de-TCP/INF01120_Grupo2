import { Card, CardActionArea, Skeleton, Stack, Typography } from "@mui/material"
import { Label } from "../label"
import { FAIcon } from "../fa-icon"
import { useNavigate } from "react-router-dom"

interface GroupCardProps {
  id: number,
  title: string,
  debt: number,
  dividend: number,
  isWaiting?: boolean,
}

export const GroupCard: React.FC<GroupCardProps> = ({
  id,
  title,
  debt,
  dividend,
  isWaiting
}) => {

  const navigate = useNavigate();

  return (
    <Card>
      <CardActionArea
        disabled={isWaiting}
        onClick={() => {
          navigate(`/group/${id}/debts`)
        }}
      >
        <Stack p={2} gap={2}>
          <Typography variant="h6" >
            {isWaiting ? <Skeleton /> : title}
          </Typography>
          <Stack
            direction="row"
            gap={1}
          >
            {Boolean(dividend && !isWaiting) && (
              <Label
                color="success"
                startIcon={<FAIcon icon="money-bill" />}
              >
                Te devolvem: R$ {dividend.toFixed(2)}
              </Label>
            )}
            {Boolean(debt && !isWaiting) && (
              <Label
                color="warning"
                startIcon={<FAIcon icon="circle-dollar-to-slot" />}
              >
                Tu deve:  R$ {debt.toFixed(2)}
              </Label>
            )}
            {isWaiting && <Skeleton width={120} />}
            {isWaiting && <Skeleton width={120} />}
          </Stack>
        </Stack>
      </CardActionArea>
    </Card>
  )
}