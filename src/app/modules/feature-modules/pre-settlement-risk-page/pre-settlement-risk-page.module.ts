import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreSettlementRiskComponent } from '../../../pages/pre-settlement-risk/pre-settlement-risk.component';
import { LimitWarningTableComponent } from '../../../pages/pre-settlement-risk/limit-warning-table/limit-warning-table.component';
import { UnutilizedLineTableComponent } from '../../../pages/pre-settlement-risk/unutilized-line-table/unutilized-line-table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    PreSettlementRiskComponent,
    LimitWarningTableComponent,
    UnutilizedLineTableComponent
  ]
})
export class PreSettlementRiskPageModule { }
