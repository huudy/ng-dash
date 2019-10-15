import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContextManagerService } from '../../services/context-manager.service';
import { DialogService } from '../../services/dialog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trading-forecast',
  templateUrl: './trading-forecast.component.html',
  styleUrls: ['./trading-forecast.component.scss']
})
export class TradingForecastComponent implements OnInit, OnDestroy {

  constructor( 
    private ContextManagerService: ContextManagerService,
    private DialogService: DialogService,
    private ActivatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.buildComponent();
    this.search = this.ActivatedRoute.snapshot.paramMap.get('search');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showUserguide(id: string) {
    this.DialogService.showUserguide(id);
  }

  subscription = null;
  private tradingForeacstData;
  public dataRetrieved = false;
  public search;

  buildComponent() {
    this.ContextManagerService.configureContext('tradingForecasts');
    this.ContextManagerService.activateCurrentContext();

    this.subscription = this.ContextManagerService.observeCurrentContext()
      .subscribe(response => {
        this.dataRetrieved = true;
        this.tradingForeacstData = response['tradingForecasts'];
      })
  }

}

