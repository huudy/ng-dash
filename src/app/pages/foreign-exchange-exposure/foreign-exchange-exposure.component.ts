import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContextManagerService } from '../../services/context-manager.service';
import { ActivatedRoute } from '@angular/router';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-foreign-exchange-exposure',
  templateUrl: './foreign-exchange-exposure.component.html',
  styleUrls: ['./foreign-exchange-exposure.component.scss']
})
export class ForeignExchangeExposureComponent implements OnInit, OnDestroy {

  constructor( 
    private ContextManagerService: ContextManagerService,
    private ActivatedRoute: ActivatedRoute,
    private DialogService: DialogService
  ) { }

  ngOnInit() {
    this.buildComponent();
    let search = this.ActivatedRoute.snapshot.paramMap.get('search');
    if (!!search) {
      this.search = search.split(',').map( s => decodeURI(s));
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showUserguide(id: string) {
    this.DialogService.showUserguide(id);
  }

  subscription = null;
  search: Array<string> = [];
  private transactionExposureData;
  private foreignCurrentAccountsData;
  public dataRetrieved = false;

  buildComponent() {
    this.ContextManagerService.configureContext('clientsFxExposures');
    this.ContextManagerService.activateCurrentContext();

    this.subscription = this.ContextManagerService.observeCurrentContext()
      .subscribe(response => {
        this.dataRetrieved = true;
        this.transactionExposureData = response['clientFxExposure'];
        this.foreignCurrentAccountsData = response['foreignCurrAccs'];
      })
  }
}
