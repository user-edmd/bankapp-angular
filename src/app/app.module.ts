import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http'
import { UserService } from './services/user.service';
import { AccountListComponent } from './component/account-list/account-list.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    AccountListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
