import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContextManagerService } from '../../services/context-manager.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-fx-monitoring',
  templateUrl: './fx-monitoring.component.html',
  styleUrls: ['./fx-monitoring.component.scss']
})
export class FxMonitoringComponent implements OnInit, OnDestroy {

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
  public technicalAnalysisData;
  public calendarData;
  public dataRetrieved = false;

  buildComponent() {
    this.ContextManagerService.configureContext('exchangeRateMonitoring');
    this.ContextManagerService.activateCurrentContext();

    this.subscription = this.ContextManagerService.observeCurrentContext()
      .subscribe(response => {
        try { this.technicalAnalysisData = response['exchangeRateMonitoring'][0]['visualizationData']; } catch(e) {}
        this.calendarData = response['calendar'];
        this.dataRetrieved = true;
      })
  }

}
