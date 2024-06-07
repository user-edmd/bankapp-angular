import { Account } from "./account"

export class AccountResponse {
    content: Account[]
    page: {
        size: number
        number: number
        totalElements: number
        totalPages: number
    }
}
