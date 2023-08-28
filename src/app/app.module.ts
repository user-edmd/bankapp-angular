import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { UserService } from './services/user.service';
import { AppRoutingModule } from './app-routing.module';
import { UserDetailComponent } from './component/user-detail/user-detail.component';
import { AccountDetailComponent } from './component/account-detail/account-detail.component';
import { TransactionDetailComponent } from './component/transaction-detail/transaction-detail.component';
import { CreateUserComponent } from './component/create-user/create-user.component';
import { FormsModule } from '@angular/forms';
import { CreateAccountComponent } from './component/create-account/create-account.component';
import { CreateTransactionComponent } from './component/create-transaction/create-transaction.component';
import { TransferAmountComponent } from './component/transfer-amount/transfer-amount.component';
import { EditUserComponent } from './component/edit-user/edit-user.component';
import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './auth-button-component/auth-button-component.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { environment } from 'src/environments/environment';
import { SecureInterceptor } from './auth/secure-interceptor.service';
import { UnauthorizedComponent } from './component/unauthorized/unauthorized.component';
import { ExampleInterceptor } from './example.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailComponent,
    AccountDetailComponent,
    TransactionDetailComponent,
    CreateUserComponent,
    CreateAccountComponent,
    CreateTransactionComponent,
    TransferAmountComponent,
    EditUserComponent,
    AuthButtonComponent,
    HomepageComponent,
    UnauthorizedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    AuthModule.forRoot({
      ...environment.auth0,
      httpInterceptor: {
        ...environment.httpInterceptor,
      }
    }),
  ],
  providers: [
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: SecureInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ExampleInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
