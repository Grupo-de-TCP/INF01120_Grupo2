interface GroupI {
    id: string,
    title: string,
    debt: number,
    dividend: number,
    members: UserI[]
}

interface ExpenseI {
    id: string,
    title: string,
    debt: number,
    dividend: number
}

interface UserI {
    id: string,
    name: string,
}