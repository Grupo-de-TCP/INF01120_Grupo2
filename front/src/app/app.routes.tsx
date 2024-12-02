import { LinearProgress } from "@mui/material"
import { Box } from "@mui/system"
import { NavGroup } from "interface/components/navs/nav-group/nav-group.component"
import { NavUser } from "interface/components/navs/nav-user/nav-user.component"
import React, { Suspense } from "react"
import { Navigate, Outlet, useRoutes } from "react-router-dom"

const GroupsModule = React.lazy(() => import("../interface/pages/groups/groups.module"))
const ExpensesModule = React.lazy(() => import("../interface/pages/expenses/expenses.module"))

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
          element: <GroupsModule />
        },
        {
          path: "/expenses/*",
          element: <ExpensesModule />
        },
      ]
    },
    {
      element: <GroupLayout />,
      path: "/group/:id/*",
      children: [
        {
          path: "users",
          element: <div />
        },
        {
          path: "debts",
          element: <div />
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