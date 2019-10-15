import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContextManagerService } from '../../services/context-manager.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-commodity-exposure',
  templateUrl: './commodity-exposure.component.html',
  styleUrls: ['./commodity-exposure.component.scss']
})
export class CommodityExposureComponent implements OnInit, OnDestroy {

  constructor( 
    private ContextManagerService: ContextManagerService,
    private DialogService: DialogService
  ) { }

  ngOnInit() {
    this.buildComponent();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showUserguide(id: string) {
    this.DialogService.showUserguide(id);
  }

  subscription = null;
  private commodityExposureData;
  public dataRetrieved = false;

  buildComponent() {
    this.ContextManagerService.configureContext('clientsCommExposures');
    this.ContextManagerService.activateCurrentContext();

    this.subscription = this.ContextManagerService.observeCurrentContext()
      .subscribe(response => {
        this.dataRetrieved = true;
        this.commodityExposureData = response['commodities'];
      })
  }
}
