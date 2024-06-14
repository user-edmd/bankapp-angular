import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  user: any = {}
  routeParams = this.route.snapshot.paramMap;
  userIdFromRouter = Number(this.routeParams.get('id'));

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userIdFromRouter = Number(routeParams.get('id'));
    this.userService.getUserById(userIdFromRouter).subscribe(user => {
      this.user = user;
    });
  }

  onSubmit() {
    this.userService.editUser2(this.user).subscribe(user => { 
      this.user = user;
      this.router.navigateByUrl('/dashboard');
    });
  }
}
