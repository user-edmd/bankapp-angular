import { User } from "./user"

export class MultipleUsers {
    content: User[]
    page: {
        size: number,
        number: number,
        totalElements: number,
        totalPages: number
    }
}