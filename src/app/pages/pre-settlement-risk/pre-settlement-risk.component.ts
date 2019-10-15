import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContextManagerService } from '../../services/context-manager.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-pre-settlement-risk',
  templateUrl: './pre-settlement-risk.component.html',
  styleUrls: ['./pre-settlement-risk.component.scss']
})
export class PreSettlementRiskComponent implements OnInit, OnDestroy {

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
  private limitWarningData;
  private lineUnutilizedData;
  public dataRetrieved = false;

  buildComponent() {
    this.ContextManagerService.configureContext('preSettlementRisk');
    this.ContextManagerService.activateCurrentContext();

    this.subscription = this.ContextManagerService.observeCurrentContext()
      .subscribe(response => {
        this.dataRetrieved = true;
        this.limitWarningData = response['limitWarning'];
        this.lineUnutilizedData = response['lineUnutilized'];
      })
  }

}
