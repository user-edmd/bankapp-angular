import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/common/user';
import { AccountService } from 'src/app/services/account.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User | undefined;
  

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(): void {
    const routeParams = this.route.snapshot.paramMap;
    const userIdFromRouter = Number(routeParams.get('id'));
    this.userService.getUser(userIdFromRouter)
      .subscribe(user => this.user = user);
  }

  openAccount(): void {
    console.log('open account', this.route.snapshot.paramMap.get('id'))

    //this.userService.createUser(id, )


  }

}
