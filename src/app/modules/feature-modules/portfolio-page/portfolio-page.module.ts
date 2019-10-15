import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../../app.routing.module'

import { PortfolioComponent } from '../../../pages/portfolio/portfolio.component';
import { ClientEarningsTableComponent } from '../../../pages/portfolio/client-earnings-table/client-earnings-table.component';
import { PortfolioEarningsChartComponent } from '../../../pages/portfolio/portfolio-earnings-chart/portfolio-earnings-chart.component';
import { PortfolioKpisComponent } from '../../../pages/portfolio/portfolio-kpis/portfolio-kpis.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  declarations: [
    PortfolioComponent,
    ClientEarningsTableComponent,
    PortfolioEarningsChartComponent,
    PortfolioKpisComponent
  ]
})
export class PortfolioPageModule { }
