import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnusualTradesComponent } from '../../../pages/unusual-trades/unusual-trades.component';
import { UnusualTradesTableComponent } from '../../../pages/unusual-trades/unusual-trades-table/unusual-trades-table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UnusualTradesComponent,
    UnusualTradesTableComponent
  ]
})
export class UnusualTradesPageModule { }
