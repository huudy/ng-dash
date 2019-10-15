import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityLevelComponent } from '../../../pages/activity-level/activity-level.component';
import { ActivityLevelTableComponent } from '../../../pages/activity-level/activity-level-table/activity-level-table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ActivityLevelComponent,
    ActivityLevelTableComponent
  ]
})
export class ActivityLevelPageModule { }
