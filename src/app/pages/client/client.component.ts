import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ContextManagerService } from '../../services/context-manager.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit, OnDestroy {

  constructor(
    private ActivatedRoute: ActivatedRoute,
    private ContextManagerService: ContextManagerService,
    private DialogService: DialogService
  ) { }

  ngOnInit() {
    this.getClientId();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  subscription = null;

  clientId = null;
  clientName = '';
  dataRetrieved = false;
  staticData = null;
  recentTransactionsData = null;
  preSettlementRiskData = null;
  importantItems = null;
  activityData = null;
  earnings = null;
  activeTradesData = null;
  forexExposureData = null;
  currentAccountsData = null;
  markupData = null;
  loansData = null;
  commodityExposureData = null;
  tradingChannelData = null;
  suggestionsData = null;
  popularProductsData = null;
  potentialForeignExchangeExposureData = null;
  sectorAnalysisCompositionData = null;
  sectorAnalysisCurrencyMixData = null;
  sectorAnalysisTenorData = null;
  sectorAnalysisHedgingBinsData = null;
  shareOfWalletData = null;

  showUserguide(id: string) {
    this.DialogService.showUserguide(id);
  }

  getClientId() {
    this.ActivatedRoute.params.subscribe(
      params => {
        this.clientId = params['id'];
        this.buildComponent();
      }
    )
  }

  buildComponent() {
    this.ContextManagerService.configureContext('clientView', { 'requestParameters': { 'clientid': this.clientId } });
    this.ContextManagerService.activateCurrentContext();

    this.subscription = this.ContextManagerService.observeCurrentContext()
      .subscribe(response => {
        this.dataRetrieved = false;
        // check if data is not empty
        if (response['statics'].length > 0) {
          this.clientName = response['statics'][0]['clientName'];
          this.staticData = response['statics'][0];
          this.recentTransactionsData = response['recentTrades'];
          this.preSettlementRiskData = response['preSettlementRisk'][0];
          this.importantItems = response['notifications'];
          this.activityData = response['actGraphs'][0]['visualizationData'];
          this.earnings = response['earnGraphs'][0]['visualizationData'];
          this.activeTradesData = response['activeTrades'];
          this.forexExposureData = response['fxExposureFromTrades'];
          this.currentAccountsData = response['currAccs'];
          this.markupData = response['fxMarkup'];
          this.loansData = response['loans'];
          this.commodityExposureData = response['commodities'];
          try { this.tradingChannelData = response['ecommShare'][0]['ecommRatioData']; } catch (e) { };
          this.suggestionsData = response['alerts'];
          this.popularProductsData = response['popProds'];
          try { this.potentialForeignExchangeExposureData = response['fxExpGraphs'][0]['visualizationData']; } catch(e) {};
          this.sectorAnalysisCompositionData = response['sectorAnalysisComposition'][0]['data'];
          this.sectorAnalysisCurrencyMixData = response['sectorAnalysisCurrencyMix'][0]['data'];
          this.sectorAnalysisTenorData = response['sectorAnalysisTenor'][0]['data'];
          this.sectorAnalysisHedgingBinsData = response['sectorAnalysisHedgingBins'][0]['data'];
          this.shareOfWalletData = response['shareOfWallet'][0]['visualizationData'];

          this.dataRetrieved = true;
        }
      })
  }


}
