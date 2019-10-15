import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContextManagerService } from '../../services/context-manager.service';
import { DialogService } from '../../services/dialog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit, OnDestroy {

  constructor(
    private ContextManagerService: ContextManagerService,
    private DialogService: DialogService,
    private ActivatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.buildComponent();
    let search = this.ActivatedRoute.snapshot.paramMap.get('search');
    if (!!search) {
      this.search = search.split(',');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showUserguide(id: string) {
    this.DialogService.showUserguide(id);
  }

  subscription = null;
  private newLoansData;
  private loanRateData;
  private maturingLoansData;
  public dataRetrieved = false;
  public search: Array<string> = [];

  private span_new = 7;
  private span_maturing = 7;
  private span_expiring = 7;

  buildComponent() {
    this.ContextManagerService.configureContext(
      'loans_span',
      {
        'requestParameters': {
          'span_new': this.span_new,
          'span_maturing': this.span_maturing,
          'span_expiring': this.span_expiring
        }
      }
    );
    this.ContextManagerService.activateCurrentContext();

    this.subscription = this.ContextManagerService.observeCurrentContext()
      .subscribe(response => {
        this.dataRetrieved = true;
        this.newLoansData = response['newLoans'];
        this.loanRateData = response['loanInterestRateContitionExpires'];
        this.maturingLoansData = response['maturingLoans'];
      })
  }

  updateTimeframe(targetSpan: string, span) {
    switch (targetSpan) {
      case 'new': {
        this.span_new = span;
        break;
      }
      case 'maturing': {
        this.span_maturing = span;
        break;
      }
      case 'expiring': {
        this.span_expiring = span;
        break;
      }
    }

    this.ContextManagerService.configureContext(
      'loans_span',
      {
        'requestParameters': {
          'span_new': this.span_new,
          'span_maturing': this.span_maturing,
          'span_expiring': this.span_expiring
        }
      }
    );
    this.ContextManagerService.activateCurrentContext();
  }

}
