import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { CreateExpenseModal } from "interface/components/create-expense-modal/create-expense-modal.component"
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "theme/theme.provider"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: 4,
      networkMode: 'offlineFirst',
      retryOnMount: true
    }
  }
})

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Toaster />
        {children}
        <CreateExpenseModal />
      </ThemeProvider>
    </QueryClientProvider>
  )
}