import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'
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
import { HomepageComponent } from './component/homepage/homepage.component';
import { UnauthorizedComponent } from './component/unauthorized/unauthorized.component';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { AuthInterceptor } from './auth-interceptor.service';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SpinnerComponent } from "./component/spinner/spinner.component";

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-30779887.okta.com/oauth2/default',
  clientId: '0oaggcnuf37Zj6EMn5d7',
  redirectUri: window.location.origin + '/login/callback'
});

@NgModule({ declarations: [
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
        HomepageComponent,
        UnauthorizedComponent,
        DashboardComponent,
    ],
    bootstrap: [AppComponent],
    providers: [
        UserService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi())
    ], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        OktaAuthModule.forRoot({ oktaAuth }), SpinnerComponent] })
export class AppModule { }
