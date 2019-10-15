import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContextManagerService } from '../../services/context-manager.service';
import { DialogService } from '../../services/dialog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-request-for-quote',
  templateUrl: './request-for-quote.component.html',
  styleUrls: ['./request-for-quote.component.scss']
})
export class RequestForQuoteComponent implements OnInit, OnDestroy {

  constructor(
    private ContextManagerService: ContextManagerService,
    private DialogService: DialogService,
    private ActivatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.buildComponent();
    let search = this.ActivatedRoute.snapshot.paramMap.get('search');
    if (!!search) {
      this.search = search;
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showUserguide(id: string) {
    this.DialogService.showUserguide(id);
  }

  subscription = null;
  private maturingQuotesData;
  public dataRetrieved = false;
  public search: string;

  private span = 7;

  buildComponent() {
    this.ContextManagerService.configureContext(
      'maturingQuotes',
      {
        'requestParameters': {
          'span': this.span
        }
      }
    );
    this.ContextManagerService.activateCurrentContext();

    this.subscription = this.ContextManagerService.observeCurrentContext()
      .subscribe(response => {
        this.dataRetrieved = true;
        this.maturingQuotesData = response['maturingQuotes'];
      })
  }

  updateTimeframe(span) {
    this.span = span

    this.ContextManagerService.configureContext(
      'maturingQuotes',
      {
        'requestParameters': {
          'span': this.span
        }
      }
    );
    this.ContextManagerService.activateCurrentContext();
  }

}
