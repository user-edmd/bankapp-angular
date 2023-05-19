import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Account } from 'src/app/common/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-transfer-amount',
  templateUrl: './transfer-amount.component.html',
  styleUrls: ['./transfer-amount.component.css']
})
export class TransferAmountComponent {
  accounts: Account[] = []

  

  constructor(
    private router: Router,
    private route: ActivatedRoute,

    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.getAccounts();
  }
  getAccounts(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userIdFromRouter = Number(routeParams.get('id'));
    this.accountService.getAccountsFromUser(userIdFromRouter)
      .subscribe(accounts => this.accounts = accounts)
  }

  onSubmit() {
  }
}
