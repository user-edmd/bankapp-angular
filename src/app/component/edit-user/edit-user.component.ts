import { Component, OnInit } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
  providers: [provideNativeDateAdapter()],
})
export class EditUserComponent implements OnInit {


  user: any = {}
  routeParams = this.route.snapshot.paramMap;
  userIdFromRouter = Number(this.routeParams.get('id'));

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService) {
      
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(user => this.user = user)
  }

  onSubmit() {
    this.user.dob = new Date(this.user.dob).toLocaleDateString('en-CA');
    this.userService.editUser2(this.user).subscribe(user => { 
      this.user = user;
      this.router.navigateByUrl('/dashboard');
    });
  }

  onTest() {
    this.user.dob = new Date(this.user.dob).toLocaleDateString('en-CA');
    console.log(this.user);
  }
}