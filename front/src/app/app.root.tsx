import { AppProvider } from "./app.provider"
import { Layout } from "interface/core"

export const AppRoot = () => {
  return (
    <AppProvider>
      <Layout/>
    </AppProvider>
  )
}