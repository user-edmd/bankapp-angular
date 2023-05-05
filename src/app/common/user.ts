import { Account } from "./account"

export class User {
    public id: number 
    public firstName: string
    public lastName: string
    public address: string
    public ssn: string
    public dob: string
    public username: string
    public password: string
    public role: string
    public accountList: Account[]
}
