import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/common/account';
import { User } from 'src/app/common/user';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  account: Account;
  user: User;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private userService: UserService) {
      this.account = new Account;
      this.userService.getUser()
      .subscribe(user => this.user = user);
  }

  onSubmit() {
    // this.account.userId = Number(this.route.snapshot.paramMap.get('id'))
    this.account.userId = Number(this.user.id)
    this.accountService.createAccount(this.account).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      }
    );
  }
}
