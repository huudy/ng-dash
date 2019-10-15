import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContextManagerService } from '../../services/context-manager.service';
import { DialogService } from '../../services/dialog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hedging-opportunities',
  templateUrl: './hedging-opportunities.component.html',
  styleUrls: ['./hedging-opportunities.component.scss']
})
export class HedgingOpportunitiesComponent implements OnInit, OnDestroy {

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
  private hedgingOpportunitiesData;
  public dataRetrieved = false;
  public search = null;

  buildComponent() {
    this.ContextManagerService.configureContext(
      'clientsWHedgingPots_span',
      { 
        'requestParameters': {
          'span': 7
        }
      }
    );
    this.ContextManagerService.activateCurrentContext();

    this.subscription = this.ContextManagerService.observeCurrentContext()
      .subscribe(response => {
        this.dataRetrieved = true;
        this.hedgingOpportunitiesData = response['clientsWHedgingPots'];
      })
  }

  updateTimeframe(span) {
    this.ContextManagerService.configureContext(
      'clientsWHedgingPots_span', 
      { 
        'requestParameters': {
          'span': span
        }
      }
    );
    this.ContextManagerService.activateCurrentContext();
  }

}
