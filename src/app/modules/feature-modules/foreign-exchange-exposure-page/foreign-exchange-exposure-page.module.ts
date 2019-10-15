import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForeignExchangeExposureComponent } from '../../../pages/foreign-exchange-exposure/foreign-exchange-exposure.component';
import { TransactionExposureTableComponent } from '../../../pages/foreign-exchange-exposure/transaction-exposure-table/transaction-exposure-table.component';
import { ForeignCurrentAccountsTableComponent } from '../../../pages/foreign-exchange-exposure/foreign-current-accounts-table/foreign-current-accounts-table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ForeignExchangeExposureComponent,
    TransactionExposureTableComponent,
    ForeignCurrentAccountsTableComponent
  ]
})
export class ForeignExchangeExposurePageModule { }
