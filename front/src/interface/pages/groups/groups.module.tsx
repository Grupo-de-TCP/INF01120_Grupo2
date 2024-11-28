import { lazy } from "react"
import { useRoutes } from "react-router-dom"

const ListGroupPage = lazy(() => import("./list/list-group.page"))

const GroupsModule = () => {

  const routes = useRoutes([
    {
      path: "/",
      element: <ListGroupPage />
    }
  ])

  return routes
}

export default GroupsModule