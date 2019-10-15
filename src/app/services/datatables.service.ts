import { Injectable } from '@angular/core';

declare var $:any;


@Injectable()
export class DatatablesService {

  constructor() { }

  private conditionalPaginate(table, pageMin?, rowMin?) {
    if ( !pageMin ) {
      pageMin = 1;
    }
    if ( !rowMin ) {
      rowMin = 10;
    }
  
    let $api = table.api();
    let pages = $api.page.info().pages;
    let rows = $api.data().length;
  
    if ( pages <= pageMin && rows <= rowMin ) {
      table.next().find('.dataTables_info').css('display', 'block');
      table.next().find('.dataTables_paginate').css('display', 'none');
  
      table.prev().find('.dataTables_filter').css('display', 'block');
      table.prev().find('.dataTables_length').css('display', 'none');
    }
  
  };

  deactivateTooltips(table) {
    $('[data-toggle="tooltip"]', table).each(function () {
      $(this).tooltip('dispose');
    });
  }

  activateTooltips(table) {
    $('[data-toggle="tooltip"]', table).each(function () {
      $(this).tooltip({
        sanitize: false, // prevents onclick from being removed from markup
        container: $(this),
        delay: {
          show: 0,
          hide: 0
        }
      });
    });
}

  private defaultTableConfig = {
    retrieve: false,
    autoWidth: false,
    deferRender: true,
    aaSorting: [],
    dom: "<'row'<'col pl-0'rl><'col pr-0'f>>t<'row'<'col pl-0'i><'col pr-0'p>>" // no buttons
  }

  private buttonConfigDom = {
    dom: "<'row'<'col pl-0'rl><'col'<'div d-flex justify-content-center' B>><'col pr-0'f>>t<'row'<'col pl-0'i><'col pr-0'p>>"
  }

  createDatatable(tableId: string, datatableConfig: {}, drawCallback?: any, exportConfiguration?: any) {
    let self = this;

    if (!drawCallback) {
      drawCallback = function(arg:any) {};
    }
    if (!exportConfiguration) {
      exportConfiguration = {};
    }

    // defaultTableConfig needs to be deep cloned, otherwise e.g. sorting properties are written into the default object    
    let config = Object.assign(
      {}, 
      $.extend(true, {}, self.defaultTableConfig), // deep copy
      { fnPreDrawCallback: function() { self.deactivateTooltips(this); } },
      { fnDrawCallback: function () { self.conditionalPaginate(this); self.activateTooltips(this); drawCallback(this); } }, 
      datatableConfig,
      { buttons: exportConfiguration }
    )

    if (!$.isEmptyObject(exportConfiguration)) {
      config = $.extend(false, config, self.buttonConfigDom)
    }

    return $(tableId).DataTable(config);
  };

  configureExport(columns) {
    let buttonConfig = { className: 'btn btn-sm btn-light text-muted border-0 shadow-sm' };

    let config = [
      $.extend(false, buttonConfig, { exportOptions: { columns: columns, orthogonal: 'export' } }, { extend: 'excelHtml5' }),
      $.extend(false, buttonConfig, { exportOptions: { columns: columns, orthogonal: 'export'} }, { extend: 'print' })
    ]

    return config;
  }

  formatDate(rowData, dateColumn: string) {
    if (rowData[dateColumn] == null) { return '' }

    let date = new Date(rowData[dateColumn]);
    return date.getFullYear() + '-' + ("0" + (+date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2);
  }

  formatDateTime(rowData, dateTimeColumn: string) {
    if (rowData[dateTimeColumn] == null) { return '' }

    let date = new Date(rowData[dateTimeColumn]);
    return (
      '<span>' +
      date.getFullYear() + '-' + ("0" + (+date.getMonth() + 1)).slice(-2) + '-' + ("0" + date.getDate()).slice(-2) +
      '  <span class="text-muted">' + ("0" + date.getHours()).slice(-2) + ':' + ("0" + date.getMinutes()).slice(-2) + '</span>' +
      '</span>'
    )
  }

  formatAmount(rowData, amountColumn: string, currencyColumn?: string) {
    if (rowData[amountColumn] == null) { return '' }
    
    let currency = 'EUR';
    if (!!currencyColumn) {
      currency = rowData[currencyColumn];
    }

    return Math.round(rowData[amountColumn]).toLocaleString('de-DE') + '&nbsp;' + currency;
  }

  addClientTooltip(rowData) {
    let tooltipRoot = rowData['clientName'];

    let tooltipContent = (
      `NDG: `+ rowData['clientId'] + `<br>` +
      `Matchcode(s): `+ rowData['clientMatchCodes'][0] + `<br>` +
      `<button type="button" class="btn btn-dark border-0 btn-sm px-3 cursor-pointer" value="index/client/` + rowData['clientId'] + `" onClick="publicRouter($(this).val())">View</button>` 
    ); // we use a button and val() here because this circumvents pretty nasty issues with nested quotes
    
    let ret = (
      `<span data-toggle='tooltip' ` +
      `data-placement='auto' ` +
      `data-container='false' ` +
      `data-html='true' ` +
      `title='` + tooltipContent + `' ` +
      `>` + 
      tooltipRoot + 
      `</span>`
    )

    return ret;
  }

  addTooltip(tooltipRoot: string, tooltipContent: string, placement?: string, container?: string, template?: string) {
    if ( !placement ) {
      placement = 'auto';
    }
    if ( !container ) {
      container = 'false';
    }

    return (
      `<span data-toggle='tooltip' ` +
      `data-placement='` + placement + `' ` +
      `data-container='` + container + `' ` +
      `data-html='true' ` +
      `title='` + tooltipContent + `' ` + 
      ( !!template ? `data-template='` + template + `'` : ``) +
      `>` + 
      tooltipRoot + 
      `</span>`
    )
  }
}
