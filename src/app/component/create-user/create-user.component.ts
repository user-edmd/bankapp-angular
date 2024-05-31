import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OktaAuthStateService } from '@okta/okta-angular';
import { AuthState } from '@okta/okta-auth-js';
import { Observable, filter, map } from 'rxjs';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  user: User;
  public email$!: Observable<string>;

  constructor(
    private router: Router,
    private userService: UserService,
    private _oktaAuthStateService: OktaAuthStateService) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.email$ = this._oktaAuthStateService.authState$.pipe(
      filter((authState: AuthState) => !!authState && !!authState.isAuthenticated),
      map((authState: AuthState) => authState.idToken?.claims.email ?? ''),
    );
  }



  onSubmit() {
    this.userService.createUser(this.user).subscribe(
      () => {
        this.router.navigate(['/dashboard'])
      }
    );
  }
}
