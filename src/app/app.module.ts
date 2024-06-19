import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserListComponent } from './admin-component/user-list/user-list.component';
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
import { EditUserComponent } from './component/edit-user/edit-user.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { UnauthorizedComponent } from './component/unauthorized/unauthorized.component';
import { OktaAuthModule, OKTA_CONFIG } from '@okta/okta-angular';
import { OktaAuth } from '@okta/okta-auth-js';
import { AuthInterceptor } from './auth-interceptor.service';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { SpinnerComponent } from "./component/spinner/spinner.component";
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatListModule} from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ViewUserComponent } from './admin-component/view-user/view-user.component';
import { ViewAccountComponent } from './admin-component/view-account/view-account.component';
import { AccountListComponent } from './admin-component/account-list/account-list.component';
import { TransactionsListComponent } from './admin-component/transactions-list/transactions-list.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatInputModule} from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import { TestsortingComponent } from './admin-component/testsorting/testsorting.component';
import { AddUserComponent } from './admin-component/add-user/add-user.component';
import { AddAccountComponent } from './admin-component/add-account/add-account.component';
import { EditProfileComponent } from './admin-component/edit-profile/edit-profile.component';
import { LoaderService } from './services/loader.service';
import { LoaderInterceptor } from './interceptor/loader.interceptor';
import { LoaderComponent } from './loader/loader.component';
import { TransferComponent } from './component/transfer/transfer.component';

const oktaAuth = new OktaAuth({
  issuer: 'https://dev-30779887.okta.com/oauth2/default',
  clientId: '0oaggcnuf37Zj6EMn5d7',
  redirectUri: window.location.origin + '/login/callback'
});

@NgModule({ declarations: [
        AppComponent,
        UserListComponent,
        AccountListComponent,
        TransactionsListComponent,
        UserDetailComponent,
        AccountDetailComponent,
        TransactionDetailComponent,
        CreateUserComponent,
        CreateAccountComponent,
        CreateTransactionComponent,
        TransferComponent,
        EditUserComponent,
        HomepageComponent,
        UnauthorizedComponent,
        DashboardComponent,
        ViewUserComponent,
        ViewAccountComponent,
        AddUserComponent,
        AddAccountComponent,
        EditProfileComponent,
        TestsortingComponent,
        LoaderComponent
    ],
    bootstrap: [AppComponent],
    providers: [
        UserService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        LoaderService, { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true },
        provideHttpClient(withInterceptorsFromDi()),
        provideAnimationsAsync()
    ], imports: [BrowserModule,
        AppRoutingModule,
        FormsModule,
        MatButtonModule,
        MatCardModule,
        MatDividerModule,
        MatPaginatorModule,
        MatTableModule,
        MatSortModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatFormFieldModule,
        MatSelectModule,
        MatListModule,
        MatTooltipModule,
        MatInputModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatMenuModule,
        MatExpansionModule,
        MatRadioModule,
        OktaAuthModule.forRoot({ oktaAuth }), SpinnerComponent] })
export class AppModule { }
