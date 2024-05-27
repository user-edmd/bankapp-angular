import { Transaction } from "./transaction";

export interface TransactionResponse {
    content: Transaction[]
    page: {
        size: number
        number: number
        totalElements: number
        totalPages: number
    }
} 