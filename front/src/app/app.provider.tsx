import { CreateExpenseModal } from "interface/components/create-expense-modal/create-expense-modal.component"
import { ThemeProvider } from "theme/theme.provider"

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider>
      {children}
      <CreateExpenseModal/>
    </ThemeProvider>
  )
}