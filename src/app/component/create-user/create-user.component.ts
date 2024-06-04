import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    private userService: UserService) {
    this.user = new User();
  }

  ngOnInit(): void {
    this.user.username = localStorage.getItem("EMAIL") ?? '';
  }
  onSubmit() {
    this.userService.createUser(this.user).subscribe(
      () => {
        this.router.navigate(['/dashboard'])
      }
    );
  }
}
