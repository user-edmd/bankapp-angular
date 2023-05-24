import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  user: User;

  constructor(
    private router: Router,
    private userService: UserService) {
      this.user = new User();
  }

  onSubmit() {
    console.log(this.user)
    this.userService.editUser(this.user).subscribe(user => this.user = user);
    // this.router.navigate(['/users']);
  }
}
