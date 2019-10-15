import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LettersOfCreditComponent } from '../../../pages/letters-of-credit/letters-of-credit.component';
import { LettersOfCreditTableComponent } from '../../../pages/letters-of-credit/letters-of-credit-table/letters-of-credit-table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LettersOfCreditComponent,
    LettersOfCreditTableComponent
  ]
})
export class LettersOfCreditPageModule { }
