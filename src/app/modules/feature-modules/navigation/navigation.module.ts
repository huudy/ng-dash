import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../../../app.routing.module';

import { SidebarComponent } from '../../../pages/sidebar/sidebar.component';
import { TopnavComponent } from '../../../pages/topnav/topnav.component';
import { CoverageDropdownComponent } from '../../../pages/topnav/coverage-dropdown/coverage-dropdown.component';
import { SearchbarComponent } from '../../../pages/topnav/searchbar/searchbar.component';
import { SettingsComponent } from '../../../pages/topnav/settings/settings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    SidebarComponent,
    TopnavComponent,
    CoverageDropdownComponent,
    SearchbarComponent,
    SettingsComponent
  ],
  exports: [
    SidebarComponent,
    TopnavComponent
  ]
})
export class NavigationModule { }
