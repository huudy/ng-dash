import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContextManagerService } from '../../services/context-manager.service';
import { DialogService } from '../../services/dialog.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-letters-of-credit',
  templateUrl: './letters-of-credit.component.html',
  styleUrls: ['./letters-of-credit.component.css']
})
export class LettersOfCreditComponent implements OnInit, OnDestroy {

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
  private letterofCreditData;
  public dataRetrieved = false;
  public search;

  private span = 7;

  buildComponent() {
    this.ContextManagerService.configureContext(
      'newLettersOfCredit_span',
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
        this.letterofCreditData = response['newLettersOfCredit'];
      })
  }

  updateTimeframe(span) {
    this.span = span;

    this.ContextManagerService.configureContext(
      'newLettersOfCredit_span',
      {
        'requestParameters': {
          'span': this.span
        }
      }
    );
    this.ContextManagerService.activateCurrentContext();
  }

}
