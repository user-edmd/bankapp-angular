import { Transaction } from "./transaction";

export interface Account {
    id: number 
    accountType: string
    accountNumber: string
    accountBalance: number
    transactionsList: Transaction[]
}
