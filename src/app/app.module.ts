import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserListComponent } from './component/user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http'
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
    TransferAmountComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
