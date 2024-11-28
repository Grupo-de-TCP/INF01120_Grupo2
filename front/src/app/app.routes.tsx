import React from "react"
import { Navigate, useRoutes } from "react-router-dom"

const GroupsModule = React.lazy(() => import("../interface/pages/groups/groups.module"))

export const AppRoutes = () => {
  const routes = useRoutes([
    {
      path: "/groups/*",
      element: <GroupsModule />
    },
    {
      path: "*",
      element: <Navigate to="/groups" />
    }
  ])

  return routes
}