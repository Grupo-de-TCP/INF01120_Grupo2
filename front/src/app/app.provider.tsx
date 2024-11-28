import { Typography } from "@mui/material"
import { ThemeProvider } from "theme/theme.provider"

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  )
}