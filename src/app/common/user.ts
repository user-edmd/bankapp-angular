import { Account } from "./account"

export class User {
    id: number
    firstName: string
    lastName: string
    address: string
    ssn: string
    dob: string
    username?: string
    password: string
    role: string
    accountList: Account[]
}
