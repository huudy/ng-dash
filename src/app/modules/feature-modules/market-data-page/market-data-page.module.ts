import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarketDataComponent } from '../../../pages/market-data/market-data.component';
import { RatesTableComponent } from '../../../pages/market-data/rates-table/rates-table.component';
import { ForexTableComponent } from '../../../pages/market-data/forex-table/forex-table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    MarketDataComponent,
    RatesTableComponent,
    ForexTableComponent
  ]
})
export class MarketDataPageModule { }
