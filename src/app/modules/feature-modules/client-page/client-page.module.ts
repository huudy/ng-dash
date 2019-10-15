import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../../../app.routing.module';

import { ClientComponent } from '../../../pages/client/client.component';
import { DiaLinkComponent } from '../../..//pages/client/dia-link/dia-link.component';
import { StaticInformationComponent } from '../../../pages/client/static-information/static-information.component';
import { ActivityLevelClientComponent } from '../../../pages/client/activity-level-client/activity-level-client.component';
import { PreSettlementRiskClientComponent } from '../../../pages/client/pre-settlement-risk-client/pre-settlement-risk-client.component';
import { AssetClassCoverageClientComponent } from '../../../pages/client/asset-class-coverage-client/asset-class-coverage-client.component';
import { NextTradeComponent } from '../../../pages/client/next-trade/next-trade.component';
import { ImportantItemComponent } from '../../../pages/client/important-item/important-item.component';
import { ActivityPatternComponent } from '../../../pages/client/activity-pattern/activity-pattern.component';
import { EarningsComponent } from '../../../pages/client/earnings/earnings.component';
import { ActiveTradesComponent } from '../../../pages/client/active-trades/active-trades.component';
import { ForexExposureComponent } from '../../../pages/client/forex-exposure/forex-exposure.component';
import { CurrentAccountsComponent } from '../../../pages/client/current-accounts/current-accounts.component';
import { MarkupStatisticsComponent } from '../../../pages/client/markup-statistics/markup-statistics.component';
import { LoansComponent } from '../../../pages/client/loans/loans.component';
import { CommodityExposureComponent } from '../../../pages/client/commodity-exposure/commodity-exposure.component';
import { TradingChannelComponent } from '../../../pages/client/trading-channel/trading-channel.component';
import { SuggestedActionsComponent } from '../../../pages/client/suggested-actions/suggested-actions.component';
import { PopularProductsComponent } from '../../../pages/client/popular-products/popular-products.component';
import { PotentialForeignExchangeExposureComponent } from '../../../pages/client/potential-foreign-exchange-exposure/potential-foreign-exchange-exposure.component';
import { SectorAnalysisComponent } from '../../../pages/client/sector-analysis/sector-analysis.component';
import { ShareOfWalletComponent } from '../../../pages/client/share-of-wallet/share-of-wallet.component';
import { ShareOfWalletChartComponent } from '../../../pages/client/share-of-wallet/share-of-wallet-chart/share-of-wallet-chart.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  declarations: [
    ClientComponent,
    DiaLinkComponent,
    StaticInformationComponent,
    ActivityLevelClientComponent,
    PreSettlementRiskClientComponent,
    AssetClassCoverageClientComponent,
    NextTradeComponent,
    ImportantItemComponent,
    ActivityPatternComponent,
    EarningsComponent,
    ActiveTradesComponent,
    ForexExposureComponent,
    CurrentAccountsComponent,
    MarkupStatisticsComponent,
    LoansComponent,
    CommodityExposureComponent,
    TradingChannelComponent,
    SuggestedActionsComponent,
    PopularProductsComponent,
    PotentialForeignExchangeExposureComponent,
    SectorAnalysisComponent,
    ShareOfWalletComponent,
    ShareOfWalletChartComponent
  ]
})
export class ClientPageModule { }
