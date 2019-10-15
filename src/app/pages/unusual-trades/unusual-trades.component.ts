import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContextManagerService } from '../../services/context-manager.service';
import { DialogService } from '../../services/dialog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-unusual-trades',
  templateUrl: './unusual-trades.component.html',
  styleUrls: ['./unusual-trades.component.css']
})
export class UnusualTradesComponent implements OnInit, OnDestroy {

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
  public unsualTradesData;
  public dataRetrieved = false;
  public search = null;

  buildComponent() {
    this.ContextManagerService.configureContext(
      'outliers_span',
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
        this.unsualTradesData = response['outliers'];
      })
  }

  updateTimeframe(span) {
    this.ContextManagerService.configureContext(
      'outliers_span', 
      { 
        'requestParameters': {
          'span': span
        }
      }
    );
    this.ContextManagerService.activateCurrentContext();
  }

}
