import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContextManagerService } from '../../services/context-manager.service';
import { DialogService } from '../../services/dialog.service';

declare var $: any;

@Component({
  selector: 'app-client-growth',
  templateUrl: './client-growth.component.html',
  styleUrls: ['./client-growth.component.scss']
})
export class ClientGrowthComponent implements OnInit, OnDestroy {

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

  subscription = null;
  private clientGrowthData;
  private lastTradeData;
  public clients = [];
  public clientsLoaded = 0;
  public clientsOffset = 0;
  public clientsChunk = 3;
  public clientsCurrentPage = 1;
  public clientsNumberOfPages = 0;
  public clientsTotal = 0;
  public clientsLower = 0;
  public clientsUpper = 0;
  public dataRetrieved = false;

  showUserguide(id: string) {
    this.DialogService.showUserguide(id);
  }

  buildComponent() {
    this.ContextManagerService.configureContext('clientGrowth');
    this.ContextManagerService.activateCurrentContext();
    this.dataRetrieved = false;

    this.subscription = this.ContextManagerService.observeCurrentContext()
      .subscribe(response => {
        this.clientGrowthData = response['clientGrowth'];
        this.lastTradeData = response['lastTradeData'];
        this.clientsTotal = this.clientGrowthData.length;
        this.clientsNumberOfPages = this.numberOfPages();
        this.setPage(1);
        this.dataRetrieved = true;
      })
  }

  setPage(page: number) {

    this.clients = [];

    // validate page
    if (page < 1) page = 1;
    if (page > this.numberOfPages()) page = this.numberOfPages();

    for (var i = (page - 1) * this.clientsChunk; i < (page * this.clientsChunk) && i < this.clientGrowthData.length; i++) {
      this.clients.push(this.clientGrowthData[i]);
    }

    this.clientsLower = (page - 1) * this.clientsChunk + 1;
    this.clientsUpper = Math.min(page * this.clientsChunk, this.clientsTotal);

    // TODO: convert to angular style
    if (page == 1) {
      $('#btn_previous').addClass('disabled');
      $('#btn_previous').removeAttr('data-toggle');
    } else {
      $('#btn_previous').removeClass('disabled');
      $('#btn_previous').attr("data-toggle", "modal");
    }

    if (page == this.numberOfPages()) {
      $('#btn_next').addClass('disabled');
      $('#btn_next').removeAttr('data-toggle');
    } else {
      $('#btn_next').removeClass('disabled');
      $('#btn_next').attr("data-toggle", "modal");
    }
  }

  previousPage() {
    if (this.clientsCurrentPage > 1) {
      this.clientsCurrentPage--;
      this.setPage(this.clientsCurrentPage);
    }
  }

  nextPage() {
    if (this.clientsCurrentPage < this.numberOfPages()) {
      this.clientsCurrentPage++;
      this.setPage(this.clientsCurrentPage);
    }
  }

  numberOfPages(): number {
    return Math.ceil(this.clientGrowthData.length / this.clientsChunk);
  }

}
