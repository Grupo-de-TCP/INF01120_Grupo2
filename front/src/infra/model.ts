export interface BaseResponseI<T, E = string> {
    success: boolean,
    content: T,
    error?: E
}

export interface GroupListI {
    id: number,
    title: string,
    debt: number,
    dividend: number,
}
export interface GroupI {
    id: number,
    title: string,
    debt: number,
    dividend: number,
    members: UserI[]
}

export interface ExpenseUserI {
    id: number,
    name: string
}

export interface ExpenseI {
    id: number,
    payer: ExpenseUserI,
    title: string,
    amount: number,
    participants: ExpenseUserI[]
}

export interface UserI {
    id: number,
    name: string,
    debt: number,
}


export interface CreateExpensePayload {
    title: string,
    amount: number,
    participants: number[],
    payerId: number,
    groupId: number,
}

export interface CreatePaymentPayload {
    payerId: number,
    receiverId: number,
    amount: number,
    groupId?: number,
}