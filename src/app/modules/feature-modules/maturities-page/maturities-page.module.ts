import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaturitiesComponent } from '../../../pages/maturities/maturities.component';
import { MaturitiesTableComponent } from '../../../pages/maturities/maturities-table/maturities-table.component';
import { TreemapComponent } from '../../../pages/maturities/treemap/treemap.component';
import { AppRoutingModule } from '../../../app.routing.module';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  declarations: [
    MaturitiesComponent,
    MaturitiesTableComponent,
    TreemapComponent
  ]
})
export class MaturitiesPageModule { }
