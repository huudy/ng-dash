import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SportComponent } from '../../../pages/sport/sport.component';
import { PipTableauReportsComponent } from '../../../pages/pip-tableau-reports/pip-tableau-reports.component';
import { PipIssuanceReportsComponent } from '../../../pages/pip-issuance-reports/pip-issuance-reports.component';
import { PrimaryMarketTableComponent } from '../../../pages/pip-issuance-reports/primary-market-table/primary-market-table.component';
import { SecondaryMarketTableComponent } from '../../../pages/pip-issuance-reports/secondary-market-table/secondary-market-table.component';
import { SecondaryMarketSummaryTableComponent } from '../../../pages/pip-issuance-reports/secondary-market-summary-table/secondary-market-summary-table.component';
import { IssuanceChartComponent } from '../../../pages/pip-issuance-reports/issuance-chart/issuance-chart.component';
import { DericonTableComponent } from '../../../pages/pip-issuance-reports/dericon-table/dericon-table.component';
import { MyonedirectTableComponent } from '../../../pages/pip-issuance-reports/myonedirect-table/myonedirect-table.component';
import { MyonemarketsTableComponent } from '../../../pages/pip-issuance-reports/myonemarkets-table/myonemarkets-table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SportComponent,
    PipTableauReportsComponent,
    PipIssuanceReportsComponent,
    PrimaryMarketTableComponent,
    SecondaryMarketTableComponent,
    SecondaryMarketSummaryTableComponent,
    IssuanceChartComponent,
    DericonTableComponent,
    MyonedirectTableComponent,
    MyonemarketsTableComponent
  ]
})
export class PipPagesModule { }
