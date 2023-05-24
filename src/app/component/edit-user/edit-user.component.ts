import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  user: User;
  routeParams = this.route.snapshot.paramMap;
  userIdFromRouter = Number(this.routeParams.get('id'));

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService) {
  }
  ngOnInit(): void {
    this.getUser()
  }

  getUser(): void {
    this.userService.getUser(this.userIdFromRouter).subscribe(user => this.user = user)
  }

  onSubmit() {
    this.userService.editUser(this.user).subscribe(user => this.user = user);
    this.router.navigateByUrl(`/user/${this.userIdFromRouter}`).then(() => {
      window.location.reload();
    });;
  }
}
