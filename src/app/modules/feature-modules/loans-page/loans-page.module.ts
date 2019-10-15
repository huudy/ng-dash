import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoansComponent } from '../../../pages/loans/loans.component';
import { NewLoansTableComponent } from '../../../pages/loans/new-loans-table/new-loans-table.component';
import { ExpiringInterestTermsTableComponent } from '../../../pages/loans/expiring-interest-terms-table/expiring-interest-terms-table.component';
import { MaturingLoansTableComponent } from '../../../pages/loans/maturing-loans-table/maturing-loans-table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LoansComponent,
    NewLoansTableComponent,
    ExpiringInterestTermsTableComponent,
    MaturingLoansTableComponent
  ]
})
export class LoansPageModule { }
