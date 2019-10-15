import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HedgingOpportunitiesComponent } from '../../../pages/hedging-opportunities/hedging-opportunities.component';
import { HedgingOpportunitiesTableComponent } from '../../../pages/hedging-opportunities/hedging-opportunities-table/hedging-opportunities-table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HedgingOpportunitiesComponent,
    HedgingOpportunitiesTableComponent
  ]
})
export class HedgingOpportunitiesPageModule { }
