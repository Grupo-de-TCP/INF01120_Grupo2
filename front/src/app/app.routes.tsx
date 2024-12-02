import { LinearProgress } from "@mui/material"
import { Box } from "@mui/system"
import { NavUser } from "interface/components/navs/nav-user/nav-user.component"
import React, { Suspense } from "react"
import { Navigate, Outlet, useRoutes } from "react-router-dom"

const GroupsModule = React.lazy(() => import("../interface/pages/groups/groups.module"))
const ExpensesModule = React.lazy(() => import("../interface/pages/expenses/expenses.module"))

const Layout = () => {
  return (
    <Box component="main">
      <NavUser />
      <Suspense fallback={<LinearProgress />}>
        <Outlet />
      </Suspense>
    </Box>
  )
}

export const AppRoutes = () => {
  const routes = useRoutes([{
    element: <Layout />,
    children: [
      {
        path: "/groups/*",
        element: <GroupsModule />
      },
      {
        path: "/expenses/*",
        element: <ExpensesModule />
      },
      {
        path: "*",
        element: <Navigate to="/groups" />
      }
    ]
  }])

  return routes
}