import { useMutation } from "@tanstack/react-query"
import { api } from "./api"
import { CreateExpensePayload, CreatePaymentPayload } from "./model"
import { QueryOptionsAPI } from "./queries"

const useCreatePaymentMutation = () => {
  const invalidate = QueryOptionsAPI.useInvalidateQuery()
  return useMutation({
    mutationFn: async (data: CreatePaymentPayload) => {
      return await api.post(`/create-payment`, data)
    },
    onSuccess: () => {
      invalidate();
    }
  })
}

const useCreateExpenseMutation = () => {
  const invalidate = QueryOptionsAPI.useInvalidateQuery()
  return useMutation({
    mutationFn: async (data: CreateExpensePayload) => {
      return await api.post(`/create-expense`, data)
    },
    onSuccess: () => {
      invalidate();
    }
  })
}

const useDeleteExpenseMutation = (groupId?: number, expenseId?: number) => {
  const invalidate = QueryOptionsAPI.useInvalidateQuery()
  return useMutation({
    mutationFn: async () => {
      if (!groupId || !expenseId) {
        return
      }
      return await api.delete(`/groups/${groupId}/expenses/${expenseId}`)
    },
    onSuccess: () => {
      invalidate();
    }
  })
}

export const MutationAPI = {
  useCreatePaymentMutation,
  useCreateExpenseMutation,
  useDeleteExpenseMutation
}