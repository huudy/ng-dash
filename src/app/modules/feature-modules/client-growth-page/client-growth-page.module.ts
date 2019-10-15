import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientGrowthComponent } from '../../../pages/client-growth/client-growth.component';
import { LastTradeTableComponent } from '../../../pages/client-growth/last-trade-table/last-trade-table.component';
import { SuggestedClientCardComponent } from '../../../pages/client-growth/suggested-client-card/suggested-client-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ClientGrowthComponent,
    LastTradeTableComponent,
    SuggestedClientCardComponent
  ]
})
export class ClientGrowthPageModule { }
