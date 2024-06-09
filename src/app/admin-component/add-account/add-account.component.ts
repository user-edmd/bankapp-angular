import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from 'src/app/common/account';
import { User } from 'src/app/common/user';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrl: './add-account.component.css'
})
export class AddAccountComponent {
  account: Account;
  user: User;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private userService: UserService,
    private route: ActivatedRoute) {
      this.account = new Account;
      const routeParams = this.route.snapshot.paramMap;
      const userIdFromRouter = Number(routeParams.get('id'));
      this.userService.getUserById(userIdFromRouter)
      .subscribe(user => this.user = user);
  }

  onSubmit() {
    this.account.userId = Number(this.user.id)
    this.accountService.createAccount(this.account).subscribe(
      () => {
        this.router.navigate([`/users/${this.account.userId}`]);
      }
    );
  }
}
