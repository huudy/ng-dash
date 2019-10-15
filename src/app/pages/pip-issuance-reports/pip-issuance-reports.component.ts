import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContextManagerService } from '../../services/context-manager.service';

@Component({
  selector: 'app-pip-issuance-reports',
  templateUrl: './pip-issuance-reports.component.html',
  styleUrls: ['./pip-issuance-reports.component.scss']
})
export class PipIssuanceReportsComponent implements OnInit, OnDestroy {

  constructor( 
    private ContextManagerService: ContextManagerService
  ) { }

  ngOnInit() {
    this.buildComponent();
    let date = new Date();
    if (date.getHours() > 17 && date.getMinutes() > 45) {
      this.after1745 = true;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  after1745 = false;

  subscription = null;
  private primaryMarketData;
  private secondaryMarketSummaryData;
  private secondaryMarketSeriesData;
  private secondaryMarketIssuancesByProductTypeData;
  private secondaryMarketIssuancesByUnderlyingData;
  private onedirectIssuancesByProductTypeData;
  private onedirectIssuancesByUnderlyingData;
  private dericonData;
  private myonedirectData;
  private myonemarketsData;
  private onemarketsIssuancesByUnderlyingData;
  private onemarketsIssuancesByDistributionPartnerData;
  public dataRetrieved = false;
  
  public numberIssuancesTotal = 0;
  public numberIssuancesPrimaryMarket = 0;
  public numberIssuancesSecondaryMarket = 0;
  public numberIssuancesDericon = 0;
  public numberIssuancesMyonedirect = 0;
  public numberIssuancesMyonemarkets = 0;

  buildComponent() {
    this.ContextManagerService.configureContext('pipIssuance');
    this.ContextManagerService.activateCurrentContext();

    this.subscription = this.ContextManagerService.observeCurrentContext()
      .subscribe(response => {
        this.dataRetrieved = true;
        this.primaryMarketData = response['PrimaryMarket'];
        this.secondaryMarketSummaryData = response['SecondaryMarket'];
        this.secondaryMarketSeriesData = response['SecondaryMarketSeries'];
        this.secondaryMarketIssuancesByProductTypeData = response['SecondaryMarketIssuancesByProductType'];
        this.secondaryMarketIssuancesByUnderlyingData = response['SecondaryMarketIssuancesByUnderlying'];
        this.onedirectIssuancesByProductTypeData = response['OnedirectIssuancesByProductType'];
        this.onedirectIssuancesByUnderlyingData = response['OnedirectIssuancesByUnderlying'];
        this.dericonData = response['dericon'];
        this.myonedirectData = response['myonedirect'];
        this.myonemarketsData = response['myonemarkets'];
        this.onemarketsIssuancesByUnderlyingData = response['OnemarketsIssuancesByUnderlying'];
        this.onemarketsIssuancesByDistributionPartnerData = response['OnemarketsIssuancesByDistributionPartner'];

        this.countIssuances();
      })
  }

  countIssuances() {
		this.numberIssuancesDericon = this.dericonData.length;

		this.numberIssuancesMyonedirect = this.myonedirectData.length;

		this.numberIssuancesMyonemarkets = this.myonemarketsData.length;

		this.numberIssuancesPrimaryMarket = this.primaryMarketData.length;

		this.numberIssuancesSecondaryMarket = this.secondaryMarketSeriesData.length;
    let cleanCount = this.numberIssuancesSecondaryMarket - this.numberIssuancesMyonedirect;
		// $('#secondaryMarketData').prev().children().text(countSecondaryMarket + ' (' + cleanCount + ')' );

		// TOTAL
		// $("#totalNumberIssuances").text(
		// 	$("#totalNumberIssuances").text().replace('{{NUM_ISSUANCES}}', countPrimaryMarket + countSecondaryMarket + countMyonemarkets + countDericon)
    // );
    this.numberIssuancesTotal = this.numberIssuancesPrimaryMarket + this.numberIssuancesSecondaryMarket + this.numberIssuancesMyonemarkets + this.numberIssuancesDericon;
	}
}
