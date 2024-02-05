import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/common/account';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  account: Account;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService) {
      this.account = new Account;
  }

  onSubmit() {
    this.account.userId = Number(this.route.snapshot.paramMap.get('id'))
    this.accountService.createAccount(this.account).subscribe();
    this.router.navigate(['/users/' + this.account.userId]).then(() => {
      window.location.reload();
    });;
  }
}
