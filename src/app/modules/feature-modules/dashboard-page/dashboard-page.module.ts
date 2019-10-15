import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../../../pages/dashboard/dashboard.component';
import { DashboardTileComponent } from '../../../pages/dashboard/dashboard-tile/dashboard-tile.component';
import { AppRoutingModule } from '../../../app.routing.module';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  declarations: [
    DashboardComponent,
    DashboardTileComponent
  ]
})
export class DashboardPageModule { }
