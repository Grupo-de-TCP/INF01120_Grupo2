import { Box } from "@mui/system"
import { NavUser } from "interface/components/navs/nav-user/nav-user.component"
import React from "react"
import { Navigate, Outlet, useRoutes } from "react-router-dom"

const GroupsModule = React.lazy(() => import("../interface/pages/groups/groups.module"))

const Layout = () => {
  return (
    <Box component="main">
      <NavUser />
      <Outlet />
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
        path: "/debts/*",
        element: <div />
      },
      {
        path: "*",
        element: <Navigate to="/groups" />
      }
    ]
  }])

  return routes
}