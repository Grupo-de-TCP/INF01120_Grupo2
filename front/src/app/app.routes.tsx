import { LinearProgress } from "@mui/material"
import { Box } from "@mui/system"
import { NavGroup } from "interface/components/navs/nav-group/nav-group.component"
import { NavUser } from "interface/components/navs/nav-user/nav-user.component"
import React, { Suspense } from "react"
import { Navigate, Outlet, useRoutes } from "react-router-dom"

const ListGroupPage = React.lazy(() => import("../interface/pages/groups/list-group.page"))
const ListExpensesPage = React.lazy(() => import("../interface/pages/expenses/list-expenses.page"))
const ListGroupUsersPage = React.lazy(() => import("interface/pages/groups/list-group-users.page"))
const ListGroupExpensesPage = React.lazy(() => import("interface/pages/expenses/list-group-expenses.page"))

const MainLayout = () => {
  return (
    <Box component="main">
      <NavUser />
      <Suspense fallback={<LinearProgress />}>
        <Outlet />
      </Suspense>
    </Box>
  )
}

const GroupLayout = () => {
  return (
    <Box component="main">
      <NavGroup />
      <Suspense fallback={<LinearProgress />}>
        <Outlet />
      </Suspense>
    </Box>
  )
}

export const AppRoutes = () => {
  const routes = useRoutes([
    {
      element: <MainLayout />,
      children: [
        {
          path: "/groups/*",
          element: <ListGroupPage />
        },
        {
          path: "/expenses/*",
          element: <ListExpensesPage />
        },
      ]
    },
    {
      element: <GroupLayout />,
      path: "/group/:id/*",
      children: [
        {
          path: "users",
          element: <ListGroupUsersPage />
        },
        {
          path: "debts",
          element: <ListGroupExpensesPage />
        },
        {
          path: "*",
          element: <Navigate to="users" />
        }
      ]
    },
    {
      path: "*",
      element: <Navigate to="/groups" />
    }
  ])

  return routes
}