import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/common/account';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent {
  account: Account;

  constructor(
    private router: Router,
    private userService: UserService) {
      this.account = new Account;
  }

  onSubmit() {
  }
}
