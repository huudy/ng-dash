import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FxMonitoringComponent } from '../../../pages/fx-monitoring/fx-monitoring.component';
import { EventCalendarComponent } from '../../../pages/fx-monitoring/event-calendar/event-calendar.component';
import { TechnicalAnalysisChartComponent } from '../../../pages/fx-monitoring/technical-analysis-chart/technical-analysis-chart.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FxMonitoringComponent,
    EventCalendarComponent,
    TechnicalAnalysisChartComponent
  ]
})
export class ForeignExchangeMonitoringPageModule { }
