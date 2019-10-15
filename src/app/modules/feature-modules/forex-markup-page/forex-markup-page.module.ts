import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForexMarkupComponent } from '../../../pages/forex-markup/forex-markup.component';
import { ForexMarkupHeatmapComponent } from '../../../pages/forex-markup/forex-markup-heatmap/forex-markup-heatmap.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ForexMarkupComponent,
    ForexMarkupHeatmapComponent
  ]
})
export class ForexMarkupPageModule { }
