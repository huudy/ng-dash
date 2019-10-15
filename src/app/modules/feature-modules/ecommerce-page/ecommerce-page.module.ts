import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcommerceComponent } from '../../../pages/ecommerce/ecommerce.component';
import { EcommerceEarningsTableComponent } from '../../../pages/ecommerce/ecommerce-earnings-table/ecommerce-earnings-table.component';
import { EcommercePerformanceChartComponent } from '../../../pages/ecommerce/ecommerce-performance-chart/ecommerce-performance-chart.component';
import { EcommerceRecentTradesTableComponent } from '../../../pages/ecommerce/ecommerce-recent-trades-table/ecommerce-recent-trades-table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EcommerceComponent,
    EcommerceEarningsTableComponent,
    EcommercePerformanceChartComponent,
    EcommerceRecentTradesTableComponent
  ]
})
export class EcommercePageModule { }
