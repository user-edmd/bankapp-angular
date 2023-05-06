import { Component } from '@angular/core';
import { Account } from 'src/app/common/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent {
  accounts: Account[] = [];
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.accountService.getAccounts().subscribe((data: Account[]) => {
      console.log(data);
      this.accounts = data;
    });
  }
}
