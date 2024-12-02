import { Stack } from "@mui/material"
import { ExpenseCard, ExpenseCardProps } from "interface/components/expense-card/expense-card.component"

const expenseCards: ExpenseCardProps[] = [
  {
    id: '1',
    title: 'Aluguel ',
    amount: 1200,
    payer: 'João',
    dividedIn: 3,
  },
  {
    id: '2',
    title: 'Conta de Luz',
    amount: 200,
    payer: undefined,
    dividedIn: 2,
  },
  {
    id: '3',
    title: 'Supermercado',
    amount: 450,
    payer: undefined,
    dividedIn: 4,
  },
  {
    id: '4',
    title: 'Internet',
    amount: 150,
    payer: 'Ana',
    dividedIn: 3,
  },
  {
    id: '5',
    title: 'Netflix',
    amount: 50,
    payer: undefined,
    dividedIn: 5,
  },
];

const ListGroupExpensesPage = () => {
  return (
    <Stack px={2.5} py={3} gap={2}>
      {expenseCards.map(ex => (
        <ExpenseCard
          key={ex.id}
          {...ex}
        />
      ))}
    </Stack>
  )
}

export default ListGroupExpensesPage