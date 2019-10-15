import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContextManagerService } from '../../services/context-manager.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit, OnDestroy {

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
  private activeClientsData;
  private clientEarningsData;
  private portfolioEarningsData;
  private optionsquote;
  public dataRetrieved = false;

  buildComponent() {
    this.ContextManagerService.configureContext('salesStatistics', { 'requestParameters': { 'hierarchyLevel': 'user' } });
    this.ContextManagerService.activateCurrentContext();

    this.subscription = this.ContextManagerService.observeCurrentContext()
      .subscribe(response => {
        this.dataRetrieved = true;
        this.activeClientsData = response['activeClients'];
        this.clientEarningsData = response['earningsByClient'];
        this.portfolioEarningsData = response['graph'][0]['data'];
        try { this.optionsquote = response['optionsquote'][0]['optionsquote']; } catch(e) {}
      })
  }
}
