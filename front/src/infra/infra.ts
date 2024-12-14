import { queryOptions } from '@tanstack/react-query'
import { api } from './api'
import { BaseResponseI, ExpenseI, GroupI, GroupListI, UserI } from './model'

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

const expenseByIds = (groupId?: number, expenseId?: number) => queryOptions({
    queryKey: ['expense', groupId, expenseId],
    queryFn: async () => {
        return api.get<BaseResponseI<ExpenseI>>(`/groups/${groupId}/expenses/${expenseId}`).then(e => e.data.content)
    },
    enabled: Number.isInteger(groupId) && Number.isInteger(expenseId)
})


export const QueryOptionsAPI = {
    users,
    groups,
    groupsById,
    expenseByIds
}