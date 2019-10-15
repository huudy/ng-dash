import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $:any;

@Component({
  selector: 'app-event-calendar',
  templateUrl: './event-calendar.component.html',
  styleUrls: ['./event-calendar.component.scss']
})
export class EventCalendarComponent implements OnInit, OnChanges {

  @Input() data;

  table = null;

  constructor( private DatatablesService: DatatablesService ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (!!this.data) {
      this.buildTable();
    }
  }

  buildTable() {
    if (!!this.table) {
      this.table.destroy();
    }

    let data = this.data;

    let formatDateTime = this.DatatablesService.formatDateTime;
    let buildbadge = this.buildbadge;
    let buildLink = this.buildLink;

    this.table = this.DatatablesService.createDatatable(
      '#economicEvenetCalendar',
      {
        data: data,
        columns: [
          { data: 'eventDate' },
          { data: 'eventName' },
          { "data" : "affectedCurrency" },
          { "data" : "eventImpact" },
          { "data" : "eventForecast" },
          { "data" : "eventPrevious" },
          { data: null, defaultContent: '' }
        ],
        createdRow: function (row, data) {
          $('td:eq(0)', row).html(formatDateTime(data, 'eventDate'));
          $('td:eq(3)', row).html(buildbadge(data['eventImpact']));
          $('td:eq(6)', row).html(buildLink(data['affectedCurrency']));
        }
      }
    );
  }

  buildbadge(impact: string) {
    let badgeColor = 'success';
    switch (impact) {
      case 'HIGH':
        badgeColor = 'danger';
        break;
      case 'MEDIUM':
        badgeColor = 'warning';
        break;
      default:
        badgeColor = 'success';
        break;
    }

   return '<div class="badge badge-' + badgeColor + ' font-weight-light">' + impact + '</div>';
  }

  buildLink(currency: string) {
    return '<button type="button" class="p-0 btn btn-sm btn-link text-decoration-none" value="index/foreignExchangeExposure;search=' + currency.trim() + ',' + currency.trim() + '" onClick="publicRouter($(this).val())">show potentially affected clients <i class="fas fa-angle-right"></i></button>';
  }

}
