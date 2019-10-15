import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommodityExposureComponent } from '../../../pages/commodity-exposure/commodity-exposure.component';
import { CommodityExposureTableComponent } from '../../../pages/commodity-exposure/commodity-exposure-table/commodity-exposure-table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CommodityExposureComponent,
    CommodityExposureTableComponent
  ]
})
export class CommodityExposurePageModule { }
