import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContextManagerService } from '../../services/context-manager.service';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-current-accounts',
  templateUrl: './current-accounts.component.html',
  styleUrls: ['./current-accounts.component.scss']
})
export class CurrentAccountsComponent implements OnInit, OnDestroy {

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
  private freeCapitalData;
  private activeForeignCurrentAccountsData;
  public dataRetrieved = false;

  buildComponent() {
    this.ContextManagerService.configureContext('accounts');
    this.ContextManagerService.activateCurrentContext();

    this.subscription = this.ContextManagerService.observeCurrentContext()
      .subscribe(response => {
        this.dataRetrieved = true;
        this.freeCapitalData = response['freeCapital'];
        this.activeForeignCurrentAccountsData = response['foreignAccounts']
      })
  }

}
