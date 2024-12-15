import { queryOptions, useQueryClient } from '@tanstack/react-query'
import { api } from './api'
import { BaseResponseI, ExpenseI, GroupI, GroupListI, UserI } from './model'
import { useCallback } from 'react'

const groupsById = (id?: number) => queryOptions({
    queryKey: ['group', id],
    queryFn: async () => {
        return api.get<BaseResponseI<GroupI>>(`/groups/${id}`).then(e => e.data.content)
    },
    enabled: Number.isInteger(id)
})

const groups = queryOptions({
    queryKey: ['groups'],
    queryFn: async () => {
        return api.get<BaseResponseI<GroupListI[]>>('/groups').then(e => e.data.content)
    },
})

const users = queryOptions({
    queryKey: ['users'],
    queryFn: async () => {
        return api.get<BaseResponseI<UserI[]>>('/users').then(e => e.data.content)
    },
})

const expenseByGroupId = (groupId?: number) => queryOptions({
    queryKey: ['expenses', groupId],
    queryFn: async () => {
        return api.get<BaseResponseI<ExpenseI[]>>(`/groups/${groupId}/expenses`).then(e => e.data.content)
    },
    enabled: Number.isInteger(groupId)
})

const expenseByIds = (groupId?: number, expenseId?: number) => queryOptions({
    queryKey: ['expense', groupId, expenseId],
    queryFn: async () => {
        return api.get<BaseResponseI<ExpenseI>>(`/groups/${groupId}/expenses/${expenseId}`).then(e => e.data.content)
    },
    enabled: Number.isInteger(groupId) && Number.isInteger(expenseId)
})

const useInvalidateQuery = () => {
    const queryClient = useQueryClient()
    return useCallback(() => {
        queryClient.invalidateQueries(users)
        queryClient.invalidateQueries(groups)
        queryClient.invalidateQueries(groupsById())
        queryClient.invalidateQueries(expenseByIds())
        queryClient.invalidateQueries(expenseByGroupId())
    },[queryClient])
}

export const QueryOptionsAPI = {
    users,
    groups,
    groupsById,
    expenseByIds,
    expenseByGroupId,
    useInvalidateQuery
}