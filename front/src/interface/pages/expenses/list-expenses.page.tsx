import { Stack } from "@mui/material"
import { UserExpenseCard } from "interface/components/user-expense-card/user-expense-card.component"



const ListExpensesPage = () => {
  return (
    <Stack px={2.5} py={3} gap={2}>
      <UserExpenseCard
        id="e1"
        debt={10}
        userName="Joao"
      />
      <UserExpenseCard
        id="e2"
        debt={-10}
        userName="Joao"
      />
      <UserExpenseCard
        id="e3"
        debt={0}
        userName="Joao"
      />
    </Stack>
  )
}

export default ListExpensesPage