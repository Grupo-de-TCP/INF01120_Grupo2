import { Stack } from "@mui/material"
import { useQuery } from "@tanstack/react-query"
import { QueryOptionsAPI } from "infra/infra"
import { UserExpenseCard } from "interface/components/user-expense-card/user-expense-card.component"



const ListExpensesPage = () => {

  const {
    data: usersData,
    isLoading,
  } = useQuery(QueryOptionsAPI.users)

  if (isLoading || !usersData) {
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
      {usersData.map(user => (
        <UserExpenseCard
          key={user.id}
          id={user.id}
          userName={user.name}
          debt={user.debt}
        />
      ))}
    </Stack>
  )
}

export default ListExpensesPage