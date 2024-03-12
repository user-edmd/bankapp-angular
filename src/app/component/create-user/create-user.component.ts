import { HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, IdToken } from '@auth0/auth0-angular';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  user: User;

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.authService.idTokenClaims$.subscribe((token: IdToken | null | undefined) => {
      if (token != null)
        this.user.username = token.email;
    })
  }



  onSubmit() {
    this.userService.createUser(this.user).subscribe();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });

  }
}
