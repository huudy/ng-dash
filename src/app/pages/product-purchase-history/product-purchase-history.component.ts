import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContextManagerService } from '../../services/context-manager.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-product-purchase-history',
  templateUrl: './product-purchase-history.component.html',
  styleUrls: ['./product-purchase-history.component.scss']
})
export class ProductPurchaseHistoryComponent implements OnInit, OnDestroy {

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
  private purchaseHistoryData;
  public dataRetrieved = false;

  buildComponent() {
    this.ContextManagerService.configureContext('productsTradedByVolume');
    this.ContextManagerService.activateCurrentContext();

    this.subscription = this.ContextManagerService.observeCurrentContext()
      .subscribe(response => {
        this.dataRetrieved = true;
        this.purchaseHistoryData = response['productsTradedByVolume'];
      })
  }
}