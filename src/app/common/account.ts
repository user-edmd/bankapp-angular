import { Transaction } from "./transaction";

export class Account {
    id: number 
    accountType: string
    accountNumber: string
    accountBalance: number
    transactionsList: Transaction[]
}
