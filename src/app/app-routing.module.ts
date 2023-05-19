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

const routes: Routes = [
  { path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: 'user/:id', component: UserDetailComponent },
  { path: 'users', component: UserListComponent },
  { path: 'account/:id', component: AccountDetailComponent },
  { path: 'transaction/:id', component: TransactionDetailComponent },
  { path: 'register', component: CreateUserComponent },
  { path: 'user/:id/addAccount', component: CreateAccountComponent },
  { path: 'account/:id/addTransaction', component: CreateTransactionComponent },
  { path: 'user/:id/transfer', component: TransferAmountComponent }
  // { path: 'transactions', component: TransactionDetailComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
