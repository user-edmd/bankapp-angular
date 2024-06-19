import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, TemplateRef, ViewChild, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatRadioChange } from '@angular/material/radio';
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
  onRadioButtonChange($event: MatRadioChange) {
    this.account.accountType = $event.value;
  }
  @ViewChild('callAPIDialog') callAPIDialog: TemplateRef<any>;
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

  readonly dialog = inject(MatDialog);

  openDialog() {
    const dialogRef = this.dialog.open(this.callAPIDialog);
  }

  onSubmit() {
    this.account.userId = Number(this.user.id)
    this.accountService.createAccount(this.account).subscribe(
      () => {
        this.router.navigate(['/dashboard']);
      }
    );
  }
}