import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContextManagerService } from '../../services/context-manager.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-forex-markup',
  templateUrl: './forex-markup.component.html',
  styleUrls: ['./forex-markup.component.scss']
})
export class ForexMarkupComponent implements OnInit, OnDestroy {

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
  private markupData;
  public dataRetrieved = false;

  buildComponent() {
    this.ContextManagerService.configureContext('fxMarkupStatistics');
    this.ContextManagerService.activateCurrentContext();

    this.subscription = this.ContextManagerService.observeCurrentContext()
      .subscribe(response => {
        this.dataRetrieved = true;
        try { this.markupData = response['fxMarkupStatistics'][0]['visualizationData']; } catch(e) { }
      })
  }
}