import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContextManagerService } from '../../services/context-manager.service';
import { DialogService } from '../../services/dialog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.scss']
})
export class EcommerceComponent implements OnInit, OnDestroy {

  constructor(
    private ContextManagerService: ContextManagerService,
    private DialogService: DialogService,
    private ActivatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.buildComponent();
    let search = this.ActivatedRoute.snapshot.paramMap.get('search');
    if (!!search) {
      this.search = search;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showUserguide(id: string) {
    this.DialogService.showUserguide(id);
  }

  subscription = null;
  public ecommerceEarningsData;
  public ecommerceEarningsGraphData;
  public recentTradesData;
  public dataRetrieved = false;
  public search: string;

  private spanDetailsStart = 30;
  private spanDetailsEnd = 0;
  private spanChartsEnd = 0;
  private spanRecent = 7;

  earningsTransactionsChartConfig = {
    dataXLabel: 'date',
    dataSetOneYLabel: 'earnings (EUR)',
    dataSetTwoYLabel: 'no. transactions',
    dataXKey: 'tradeDate',
    dataSetOneKey: 'earning',
    dataSetTwoKey: 'numberOfTransactions'
  }

  clientsChartConfig = {
    dataXLabel: 'date',
    dataSetOneYLabel: 'active clients',
    dataSetTwoYLabel: 'new clients',
    dataXKey: 'tradeDate',
    dataSetOneKey: 'numberOfClients',
    dataSetTwoKey: 'numberNewClients'
  }

  volumeChartConfig = {
    dataXLabel: 'date',
    dataSetOneYLabel: 'traded volume (EUR)',
    dataSetTwoYLabel: 'requested volume (EUR)',
    dataXKey: 'tradeDate',
    dataSetOneKey: 'tradedVolume',
    dataSetTwoKey: 'requestedVolume'
  }

  buildComponent() {
    this.ContextManagerService.configureContext(
      'fxEcommerceOverview',
      {
        'requestParameters': {
          'span_details_start': this.spanDetailsStart,
          'span_details_end': this.spanDetailsEnd,
          'span_charts_end': this.spanChartsEnd,
          'span_recent_trades': this.spanRecent
        }
      }
    );
    this.ContextManagerService.activateCurrentContext();

    this.subscription = this.ContextManagerService.observeCurrentContext()
      .subscribe(response => {
        this.dataRetrieved = true;
        this.ecommerceEarningsData = response['fxEcommerceOverview'];
        this.ecommerceEarningsGraphData = response['fxEcommerceOverviewGraph'];
        this.recentTradesData = response['recentEcommerceTrades'];
      })
  }

  updateTimeframeDetails(period: string) {
    switch(period) {
      case 'month': {
        this.spanDetailsStart = 30;
        this.spanDetailsEnd = 0;
        break;
      }
      case 'ytd': {
        this.spanDetailsStart = this.getDayofYear();
        this.spanDetailsEnd = 0;
        break;
      }
      case 'last': {
        this.spanDetailsStart = this.getDayofYear() + 365;
        this.spanDetailsEnd = this.getDayofYear();
        break;
      }
    }

    this.ContextManagerService.configureContext(
      'fxEcommerceOverview',
      {
        'requestParameters': {
          'span_details_start': this.spanDetailsStart,
          'span_details_end': this.spanDetailsEnd,
          'span_charts_end': this.spanChartsEnd,
          'span_recent_trades': this.spanRecent
        }
      }
    );
    this.ContextManagerService.activateCurrentContext();
  }

  updateTimeframeCharts(period: string) {
    switch(period) {
      case 'ytd': {
        this.spanChartsEnd = 0;
        break;
      }
      case 'last': {
        this.spanChartsEnd = this.getDayofYear();
        break;
      }
    }

    this.ContextManagerService.configureContext(
      'fxEcommerceOverview',
      {
        'requestParameters': {
          'span_details_start': this.spanDetailsStart,
          'span_details_end': this.spanDetailsEnd,
          'span_charts_end': this.spanChartsEnd,
          'span_recent_trades': this.spanRecent
        }
      }
    );
    this.ContextManagerService.activateCurrentContext();
  }

  updateTimeframeRecent(span: number) {
    this.spanRecent = span

    this.ContextManagerService.configureContext(
      'fxEcommerceOverview',
      {
        'requestParameters': {
          'span_details_start': this.spanDetailsStart,
          'span_details_end': this.spanDetailsEnd,
          'span_charts_end': this.spanChartsEnd,
          'span_recent_trades': this.spanRecent
        }
      }
    );
    this.ContextManagerService.activateCurrentContext();
  }

  getDayofYear() {
    let now = new Date();
    let start = new Date(now.getFullYear(), 0, 0);
    let diff = (now.valueOf() - start.valueOf()) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    let oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  }

}
