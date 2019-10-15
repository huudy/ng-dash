import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TradingForecastComponent } from '../../../pages/trading-forecast/trading-forecast.component';
import { TradingForecastTableComponent } from '../../../pages/trading-forecast/trading-forecast-table/trading-forecast-table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TradingForecastComponent,
    TradingForecastTableComponent
  ]
})
export class TradingForecastPageModule { }
