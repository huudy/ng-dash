import { Component, OnInit } from '@angular/core';
import { ContextManagerService } from '../../services/context-manager.service';
import { DialogService } from '../../services/dialog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-maturities',
  templateUrl: './maturities.component.html',
  styleUrls: ['./maturities.component.css']
})
export class MaturitiesComponent implements OnInit {

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
  search = null;
  private maturitiesData;
  public dataRetrieved = false;

  buildComponent() {
    this.ContextManagerService.configureContext(
      'maturities', 
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
        this.maturitiesData = response['maturities'];
      })
  }

  updateTimeframe(span) {
    this.ContextManagerService.configureContext(
      'maturities', 
      { 
        'requestParameters': {
          'span': span
        }
      }
    );
    this.ContextManagerService.activateCurrentContext();
  }

}
