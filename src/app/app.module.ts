import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GlobalErrorHandler } from './classes/GlobalErrorHandler';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { IndexComponent } from './pages/index/index.component';
import { DialogComponent } from './pages/dialog/dialog.component';
import { LoadingIndicatorComponent } from './pages/loading-indicator/loading-indicator.component';

import { AppRoutingModule } from './app.routing.module';

import { DashboardPageModule } from './modules/feature-modules/dashboard-page/dashboard-page.module';
import { ActivityLevelPageModule } from './modules/feature-modules/activity-level-page/activity-level-page.module';
import { LettersOfCreditPageModule } from './modules/feature-modules/letters-of-credit-page/letters-of-credit-page.module';
import { UnusualTradesPageModule } from './modules/feature-modules/unusual-trades-page/unusual-trades-page.module';
import { ForeignExchangeMonitoringPageModule } from './modules/feature-modules/foreign-exchange-monitoring-page/foreign-exchange-monitoring-page.module';
import { ClientPageModule } from './modules/feature-modules/client-page/client-page.module';
import { LoansPageModule } from './modules/feature-modules/loans-page/loans-page.module';
import { PreSettlementRiskPageModule } from './modules/feature-modules/pre-settlement-risk-page/pre-settlement-risk-page.module';
import { TradingForecastPageModule } from './modules/feature-modules/trading-forecast-page/trading-forecast-page.module';
import { PortfolioPageModule } from './modules/feature-modules/portfolio-page/portfolio-page.module';
import { HedgingOpportunitiesPageModule } from './modules/feature-modules/hedging-opportunities-page/hedging-opportunities-page.module';
import { CurrentAccountsPageModule } from './modules/feature-modules/current-accounts-page/current-accounts-page.module';
import { MarketDataPageModule } from './modules/feature-modules/market-data-page/market-data-page.module';
import { ForeignExchangeExposurePageModule } from './modules/feature-modules/foreign-exchange-exposure-page/foreign-exchange-exposure-page.module';
import { NavigationModule } from './modules/feature-modules/navigation/navigation.module';
import { CommodityExposurePageModule } from './modules/feature-modules/commodity-exposure-page/commodity-exposure-page.module';
import { DeputyManagementPageModule } from './modules/feature-modules/deputy-management-page/deputy-management-page.module';
import { AlertManagementPageModule } from './modules/feature-modules/alert-management-page/alert-management-page.module';
import { PipPagesModule } from './modules/feature-modules/pip-pages/pip-pages.module';
import { ClientGrowthPageModule } from './modules/feature-modules/client-growth-page/client-growth-page.module';
import { ForexMarkupPageModule } from './modules/feature-modules/forex-markup-page/forex-markup-page.module';
import { ProductPurchaseHistoryPageModule } from './modules/feature-modules/product-purchase-history-page/product-purchase-history-page.module';
import { MaturitiesPageModule } from './modules/feature-modules/maturities-page/maturities-page.module';
import { CtsManagementDashboardPageModule } from './modules/feature-modules/cts-management-dashboard-page/cts-management-dashboard-page.module';
import { RequestForQuotePageModule } from './modules/feature-modules/request-for-quote-page/request-for-quote-page.module';
import { EcommercePageModule } from './modules/feature-modules/ecommerce-page/ecommerce-page.module';

import { AuthenticationService } from './services/authentication.service';
import { BackendService } from './services/backend.service';
import { PushNotifications } from './services/push-notifications';
import { UserService } from './services/user.service';
import { ContextManagerService } from './services/context-manager.service';
import { DatatablesService } from './services/datatables.service';
import { DialogService } from './services/dialog.service';
import { UserguideComponent } from './pages/userguide/userguide.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    DialogComponent,
    LoadingIndicatorComponent,
    UserguideComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    NavigationModule,
    DashboardPageModule,
    ActivityLevelPageModule,
    LettersOfCreditPageModule,
    UnusualTradesPageModule,
    ForeignExchangeMonitoringPageModule,
    ClientPageModule,
    LoansPageModule,
    PreSettlementRiskPageModule,
    TradingForecastPageModule,
    PortfolioPageModule,
    HedgingOpportunitiesPageModule,
    CurrentAccountsPageModule,
    MarketDataPageModule,
    ForeignExchangeExposurePageModule,
    CommodityExposurePageModule,
    DeputyManagementPageModule,
    AlertManagementPageModule,
    PipPagesModule,
    ClientGrowthPageModule,
    ForexMarkupPageModule,
    ProductPurchaseHistoryPageModule,
    MaturitiesPageModule,
    CtsManagementDashboardPageModule,
    RequestForQuotePageModule,
    EcommercePageModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    },
    BackendService, 
    AuthenticationService,
    PushNotifications,
    UserService,
    ContextManagerService,
    DatatablesService,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
