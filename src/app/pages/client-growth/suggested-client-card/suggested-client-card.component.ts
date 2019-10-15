import { Component, OnInit, Input, OnDestroy, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { animate, trigger, transition, style } from '@angular/animations';
import { DatatablesService } from '../../../services/datatables.service';

declare var $: any;

@Component({
  selector: 'app-suggested-client-card',
  templateUrl: './suggested-client-card.component.html',
  styleUrls: ['./suggested-client-card.component.scss'],
  animations: [
    trigger(
      'enter', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('300ms', style({ opacity: 1 }))
        ])
      ]
    )
  ],
})
export class SuggestedClientCardComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild("scrollbarContainer") scrollbarContainer: ElementRef;
  @ViewChild("title") title: ElementRef;

  @Input() data;

  client = {};
  scrollbar = null;

  constructor(
    private DatatablesService: DatatablesService
  ) { }

  ngOnInit() {
    if (!!this.data) {
      this.modifyInput();
    }
  }

  ngAfterViewInit() {
    let container = this.scrollbarContainer.nativeElement;
    this.scrollbar = new PerfectScrollbar(
      container, 
      { 
        wheelPropagation: false,
        scrollingThreshold: 0 
      }
    );

   $(this.title.nativeElement).html(
     this.DatatablesService.addClientTooltip(this.data)
   );
   this.DatatablesService.activateTooltips(this.title.nativeElement);

  }

  ngOnDestroy() {
    if (!!this.scrollbar) {
      this.scrollbar.destroy();
    }
    this.DatatablesService.deactivateTooltips(this.title.nativeElement);
  }

  // TODO: add tooltip to name
  modifyInput() {
    let client = {};

    client['suggestions'] = this.data['suggestionList'].split('::');

    client['products'] = this.data['productList'].split('::');
    client['name'] = this.data['clientName'];
    client['lastTradeDate'] = this.DatatablesService.formatDate(this.data, 'lastTradeDate');

    // modify according to data
    if (this.data['category'] == 'inactive') {
      client['status'] = 'inactive';
      client['statusColor'] = 'danger';
      client['potentialTransactions'] = this.data['potentialTransactions'].toString();

      client['coverage'] = JSON.parse(this.data['pastCoverage'].replace(/'/g, '"'));
    } else {
      client['status'] = 'low share of wallet';
      client['statusColor'] = 'warning';

      client['shareOfWallet'] = 100 * this.data['shareOfWallet'];
      client['shareOfWalletAvg'] = 100 * this.data['shareOfWalletAvgCluster'];
      client['shareOfWalletDecent'] = 100 * this.data['shareOfWalletHighCluster'];
    }

    this.client = client;

  }

}
