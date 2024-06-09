import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent {
  user: User;

  constructor(
    private router: Router,
    private userService: UserService) {
    this.user = new User();
  }

  ngOnInit(): void {

  }
  onSubmit() {
    this.userService.createUser(this.user).subscribe(
      () => {
        this.router.navigate([`/users`])
      }
    );
  }
}
