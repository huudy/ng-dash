import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrentAccountsComponent } from '../../../pages/current-accounts/current-accounts.component';
import { FreeCapitalTableComponent } from '../../../pages/current-accounts/free-capital-table/free-capital-table.component';
import { ActiveForeignCurrentAccountsTableComponent } from '../../../pages/current-accounts/active-foreign-current-accounts-table/active-foreign-current-accounts-table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CurrentAccountsComponent,
    FreeCapitalTableComponent,
    ActiveForeignCurrentAccountsTableComponent
  ]
})
export class CurrentAccountsPageModule { }
