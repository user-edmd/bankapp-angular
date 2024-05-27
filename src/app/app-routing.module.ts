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
import { HomepageComponent } from './component/homepage/homepage.component';
import { UnauthorizedComponent } from './component/unauthorized/unauthorized.component';
import { OktaCallbackComponent } from '@okta/okta-angular';
import { DashboardComponent } from './component/dashboard/dashboard.component';


const routes: Routes = [
  // { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '', component: HomepageComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { 
    path: 'users', 
    component: UserListComponent, 
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'account/:id', component: AccountDetailComponent },
  { path: 'transaction/:id', component: TransactionDetailComponent },
  { path: 'register', component: CreateUserComponent },
  { path: 'addAccount', component: CreateAccountComponent },
  { path: 'account/:id/addTransaction', component: CreateTransactionComponent },
  { path: 'user/:id/transfer', component: TransferAmountComponent },
  { path: 'editProfile', component: EditUserComponent },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '500', component: UnauthorizedComponent },
  { path: 'login/callback', component: OktaCallbackComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
