import { lazy } from "react"
import { useRoutes } from "react-router-dom"

const ListExpensesPage = lazy(() => import("./list/list-expenses.page"))

const ExpensesModule = () => {

  const routes = useRoutes([
    {
      path: "/",
      element: <ListExpensesPage />
    }
  ])

  return routes
}

export default ExpensesModule