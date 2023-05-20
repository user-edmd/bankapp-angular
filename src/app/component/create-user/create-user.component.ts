import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private userService: UserService) {
      this.user = new User();
  }

  onSubmit() {
    this.userService.createUser(this.user).subscribe();
    this.router.navigate(['/users']);
  }
}
