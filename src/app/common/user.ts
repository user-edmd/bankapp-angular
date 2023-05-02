export class User {

    constructor(public id: number, 
        public firstName: string,
        public lastName: string,
        public address: string,
        public ssn: string,
        public dob: string,
        public username: string,
        public password: string,
        public role: string,
        public accountList: object[]
        )
        {

        }
    }
