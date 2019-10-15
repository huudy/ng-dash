import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeputyManagementComponent } from '../../../pages/deputy-management/deputy-management.component';
import { DeputyTableComponent } from '../../../pages/deputy-management/deputy-table/deputy-table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DeputyManagementComponent,
    DeputyTableComponent
  ]
})
export class DeputyManagementPageModule { }
