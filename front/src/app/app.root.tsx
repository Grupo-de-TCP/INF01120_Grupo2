import { AppProvider } from "./app.provider"
import { AppRoutes } from "./app.routes"

export const AppRoot = () => {
  return (
    <AppProvider>
      <AppRoutes/>
    </AppProvider>
  )
}