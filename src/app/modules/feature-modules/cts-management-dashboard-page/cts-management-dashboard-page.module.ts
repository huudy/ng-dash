import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CtsManagementDashboardComponent } from '../../../pages/cts-management-dashboard/cts-management-dashboard.component';
import { RegionKpisComponent } from '../../../pages/cts-management-dashboard/region-kpis/region-kpis.component';
import { RegionComparisonComponent } from '../../../pages/cts-management-dashboard/region-comparison/region-comparison.component';
import { RecentUpcomingComponent } from '../../../pages/cts-management-dashboard/recent-upcoming/recent-upcoming.component';
import { MgmtNewLoansTableComponent } from '../../../pages/cts-management-dashboard/recent-upcoming/mgmt-new-loans-table/mgmt-new-loans-table.component';
import { MgmtMaturingLoansTableComponent } from '../../../pages/cts-management-dashboard/recent-upcoming/mgmt-maturing-loans-table/mgmt-maturing-loans-table.component';
import { MgmtEcommerceTradesTableComponent } from '../../../pages/cts-management-dashboard/recent-upcoming/mgmt-ecommerce-trades-table/mgmt-ecommerce-trades-table.component';
import { MgmtMaturitiesTableComponent } from '../../../pages/cts-management-dashboard/recent-upcoming/mgmt-maturities-table/mgmt-maturities-table.component';
import { TrendingProductsComponent } from '../../../pages/cts-management-dashboard/trending-products/trending-products.component';
import { EarningsBySectorComponent } from '../../../pages/cts-management-dashboard/earnings-by-sector/earnings-by-sector.component';
import { EarningsTopologyChartComponent } from '../../../pages/cts-management-dashboard/earnings-topology-chart/earnings-topology-chart.component';
import { TradedCurrenciesChartComponent } from '../../../pages/cts-management-dashboard/traded-currencies-chart/traded-currencies-chart.component';
import { BusinessDevelopmentChartComponent } from '../../../pages/cts-management-dashboard/business-development-chart/business-development-chart.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CtsManagementDashboardComponent,
    RegionKpisComponent,
    RegionComparisonComponent,
    RecentUpcomingComponent,
    MgmtMaturingLoansTableComponent,
    MgmtNewLoansTableComponent,
    MgmtEcommerceTradesTableComponent,
    MgmtMaturitiesTableComponent,
    TrendingProductsComponent,
    EarningsBySectorComponent,
    EarningsTopologyChartComponent,
    TradedCurrenciesChartComponent,
    BusinessDevelopmentChartComponent
  ]
})
export class CtsManagementDashboardPageModule { }
