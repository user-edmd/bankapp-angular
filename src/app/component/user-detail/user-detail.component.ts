import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Transaction } from 'src/app/common/transaction';
import { User } from 'src/app/common/user';
import { AccountService } from 'src/app/services/account.service';
import { TransactionService } from 'src/app/services/transaction.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User | undefined;
  transactions: Transaction[] = [];

  page: number = 0;
  size: number = 8;
  total: number = 0;
  accId: number = 0;
  

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private accountService: AccountService,
    private transactionService : TransactionService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userIdFromRouter = Number(routeParams.get('id'));
    this.userService.getUser(userIdFromRouter)
      .subscribe(user => this.user = user);
  }

  openAccount(): void {
    console.log('open account', this.route.snapshot.paramMap.get('id'))

    //this.userService.createUser(id, )


  }

  openTransactions(accountId : number) {
    console.log(accountId)
    this.transactionService.getTransactions(accountId, 5, 0)
    
  }

  getTransactions2(accountId: number, page: number) {
    this.accId = accountId;
    const routeParams = this.route.snapshot.paramMap;
    const accountIdFromRouter = Number(routeParams.get('id'));
    this.transactionService.getTransactions(accountId, this.size, page).subscribe(({content, size, number, totalPages}) => {
      this.page = number
      this.size = size
      this.total = totalPages
      this.transactions = content;
    });
  }

  goToPage(pageSelected: number) {
    if (this.page !== pageSelected)
      this.getTransactions2(this.accId, pageSelected);
  }

  goToPrevOrNext(buttonSelected: string) {
      if (buttonSelected === 'prev') {
        if (this.page - 1 >= 0) {
          this.page--
          this.getTransactions2(this.accId, this.page);
        }
      } else if (buttonSelected === 'next') {
        if (this.page + 1 < this.total) {
          this.page++
          this.getTransactions2(this.accId, this.page);
        }
      }
      
  }

}
