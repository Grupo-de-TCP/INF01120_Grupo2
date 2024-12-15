import { Stack } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { QueryOptionsAPI } from "infra/queries"
import { UserExpenseCard } from "interface/components/user-expense-card/user-expense-card.component"
import { useParams } from "react-router-dom"



const ListGroupUsersPage = () => {

  const { id } = useParams();
  const {
    data: groupData,
    isLoading,
  } = useQuery(QueryOptionsAPI.groupsById(Number(id)))

  if (isLoading || !groupData) {
    return (
      <Stack px={2.5} py={3} gap={2}>
        <UserExpenseCard id={0} debt={10} userName="Joao" isWaiting />
        <UserExpenseCard id={0} debt={10} userName="Joao" isWaiting />
        <UserExpenseCard id={0} debt={10} userName="Joao" isWaiting />
        <UserExpenseCard id={0} debt={10} userName="Joao" isWaiting />
        <UserExpenseCard id={0} debt={10} userName="Joao" isWaiting />
        <UserExpenseCard id={0} debt={10} userName="Joao" isWaiting />
      </Stack>
    )
  }

  return (
    <Stack px={2.5} py={3} gap={2}>
      {groupData.members.map(gp => (
        <UserExpenseCard
          key={gp.id}
          id={gp.id}
          userName={gp.name}
          debt={gp.debt}
        />
      ))}
    </Stack>
  )
}

export default ListGroupUsersPage