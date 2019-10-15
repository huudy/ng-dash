import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { IndexComponent } from './pages/index/index.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ActivityLevelComponent } from './pages/activity-level/activity-level.component';
import { MaturitiesComponent } from './pages/maturities/maturities.component';
import { LettersOfCreditComponent } from './pages/letters-of-credit/letters-of-credit.component';
import { UnusualTradesComponent } from './pages/unusual-trades/unusual-trades.component';
import { ClientComponent } from './pages/client/client.component';
import { FxMonitoringComponent } from './pages/fx-monitoring/fx-monitoring.component';
import { LoansComponent } from './pages/loans/loans.component';
import { PreSettlementRiskComponent } from './pages/pre-settlement-risk/pre-settlement-risk.component';
import { TradingForecastComponent } from './pages/trading-forecast/trading-forecast.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { HedgingOpportunitiesComponent } from './pages/hedging-opportunities/hedging-opportunities.component';
import { CurrentAccountsComponent } from './pages/current-accounts/current-accounts.component';
import { MarketDataComponent } from './pages/market-data/market-data.component';
import { ForeignExchangeExposureComponent } from './pages/foreign-exchange-exposure/foreign-exchange-exposure.component';
import { CommodityExposureComponent } from './pages/commodity-exposure/commodity-exposure.component';
import { DeputyManagementComponent } from './pages/deputy-management/deputy-management.component';
import { AlertManagementComponent } from './pages/alert-management/alert-management.component';
import { SportComponent } from './pages/sport/sport.component';
import { ClientGrowthComponent } from './pages/client-growth/client-growth.component';
import { ForexMarkupComponent } from './pages/forex-markup/forex-markup.component';
import { ProductPurchaseHistoryComponent } from './pages/product-purchase-history/product-purchase-history.component';
import { PipTableauReportsComponent } from './pages/pip-tableau-reports/pip-tableau-reports.component';
import { PipIssuanceReportsComponent } from './pages/pip-issuance-reports/pip-issuance-reports.component';
import { CtsManagementDashboardComponent } from './pages/cts-management-dashboard/cts-management-dashboard.component';
import { RequestForQuoteComponent } from './pages/request-for-quote/request-for-quote.component';
import { EcommerceComponent } from './pages/ecommerce/ecommerce.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'index',
    component: IndexComponent,
    children: [
      // { path: '', pathMatch: 'full', redirectTo: 'dashboard' }, // now a user type specfic redirect happens in index.ts
      { path: 'dashboard', component: DashboardComponent },
      { path: 'activityLevel', component: ActivityLevelComponent },
      { path: 'maturities', component: MaturitiesComponent },
      { path: 'letterOfCredit', component: LettersOfCreditComponent },
      { path: 'unusualTrades', component: UnusualTradesComponent },
      { path: 'fxMonitoring', component: FxMonitoringComponent },
      { path: 'loans', component: LoansComponent },
      { path: 'preSettlementRisk', component: PreSettlementRiskComponent },
      { path: 'tradingForecast', component: TradingForecastComponent },
      { path: 'portfolio', component: PortfolioComponent },
      { path: 'hedgingOpportunities', component: HedgingOpportunitiesComponent },
      { path: 'currentAccounts', component: CurrentAccountsComponent },
      { path: 'marketData', component: MarketDataComponent },
      { path: 'foreignExchangeExposure', component: ForeignExchangeExposureComponent },
      { path: 'commodityExposure', component: CommodityExposureComponent },
      { path: 'deputyManagement', component: DeputyManagementComponent },
      { path: 'customAlerts', component: AlertManagementComponent },
      { path: 'clientGrowth', component: ClientGrowthComponent },
      { path: 'forexMarkup', component: ForexMarkupComponent },
      { path: 'productPurchaseHistory', component: ProductPurchaseHistoryComponent },
      { path: 'requestForQuote', component: RequestForQuoteComponent },
      { path: 'ecommerce', component: EcommerceComponent },
      { path: 'pipTableauReports', component: PipTableauReportsComponent },
      { path: 'pipIssuanceReports', component: PipIssuanceReportsComponent },
      { path: 'sport', component: SportComponent },
      { path: 'client/:id', component: ClientComponent },
      { path: 'ctsMgmtDashboard', component: CtsManagementDashboardComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
