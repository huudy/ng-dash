import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestForQuoteComponent } from '../../../pages/request-for-quote/request-for-quote.component';
import { MaturingQuotesTableComponent } from '../../../pages/request-for-quote/maturing-quotes-table/maturing-quotes-table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RequestForQuoteComponent,
    MaturingQuotesTableComponent
  ]
})
export class RequestForQuotePageModule { }
