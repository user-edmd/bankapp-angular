import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './component/user-list/user-list.component';
import { UserDetailComponent } from './component/user-detail/user-detail.component';
import { AccountDetailComponent } from './component/account-detail/account-detail.component';
import { TransactionDetailComponent } from './component/transaction-detail/transaction-detail.component';
import { CreateUserComponent } from './component/create-user/create-user.component';
import { CreateAccountComponent } from './component/create-account/create-account.component';
import { CreateTransactionComponent } from './component/create-transaction/create-transaction.component';
import { TransferAmountComponent } from './component/transfer-amount/transfer-amount.component';
import { EditUserComponent } from './component/edit-user/edit-user.component';
import { AuthButtonComponent } from './auth-button-component/auth-button-component.component';
import { HomepageComponent } from './component/homepage/homepage.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { UnauthorizedComponent } from './component/unauthorized/unauthorized.component';

const routes: Routes = [
  // { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '', component: HomepageComponent },
  { path: 'user/:id', component: UserDetailComponent, canActivate: [AuthGuard] },
  { 
    path: 'users', 
    component: UserListComponent, 
    canActivate: [AuthGuard] 
  },
  { path: 'account/:id', component: AccountDetailComponent },
  { path: 'transaction/:id', component: TransactionDetailComponent },
  { path: 'register', component: CreateUserComponent },
  { path: 'user/:id/addAccount', component: CreateAccountComponent },
  { path: 'account/:id/addTransaction', component: CreateTransactionComponent },
  { path: 'user/:id/transfer', component: TransferAmountComponent },
  { path: 'user/:id/editProfile', component: EditUserComponent },
  { path: 'login', component: AuthButtonComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '500', component: UnauthorizedComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
