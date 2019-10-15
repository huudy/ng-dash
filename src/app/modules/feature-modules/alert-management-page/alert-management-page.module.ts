import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertManagementComponent } from '../../../pages/alert-management/alert-management.component';
import { CustomAlertCardComponent } from '../../../pages/alert-management/custom-alert-card/custom-alert-card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    AlertManagementComponent,
    CustomAlertCardComponent
  ]
})
export class AlertManagementPageModule { }
