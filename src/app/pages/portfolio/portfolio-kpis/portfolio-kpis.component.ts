import { Component, OnInit, Input } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

declare var $:any;

@Component({
  selector: 'app-portfolio-kpis',
  templateUrl: './portfolio-kpis.component.html',
  styleUrls: ['./portfolio-kpis.component.scss']
})
export class PortfolioKpisComponent implements OnInit {

  @Input() activeClientsData;
  @Input() optionsquote;

  kpiTiles = [];
  table = null;
  filter = null;

  constructor( private DatatablesService: DatatablesService ) { }

  ngOnInit() {
    this.makeTiles();
  }

  makeTiles() {
    let activeClients = this.activeClientsData.filter( client => client['activityLevelCurrent'] >= 2 )
    this.kpiTiles.push({
      text: 'active clients',
      value: activeClients.length,
      icon: 'fas fa-users',
      type: 'active'
    });

    let gainedClients = this.activeClientsData.filter( client => client['activityLevelCurrent'] >= 2 && client['activityLevelPrevYear'] < 2 )
    this.kpiTiles.push({
      text: 'clients gained or reactivated',
      value: gainedClients.length,
      icon: 'fas fa-user-plus',
      type: 'gained'
    });

    let lostClients = this.activeClientsData.filter( client => client['activityLevelCurrent'] < 2 && client['activityLevelPrevYear'] >= 2 )
    this.kpiTiles.push({
      text: 'clients lost or became inactive',
      value: lostClients.length,
      icon: 'fas fa-user-minus',
      type: 'lost'
    });

    if (!!this.optionsquote) {
      this.optionsquote = this.optionsquote.toLocaleString('de', { style: 'percent', minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }

  }

  showClientsTable(filter) {
    if (filter != this.filter) {
      $('#activeClientsTableContainer').collapse('show');
      this.makeClientsTable(filter);
    } else if (filter == this.filter) {
      $('#activeClientsTableContainer').collapse('toggle');
    }
    this.filter = filter;
  }

  makeClientsTable(filter) {
    if (!!this.table) {
      this.table.destroy();
    }

    let self = this;
    let data = self.activeClientsData;
    if (filter == 'active') {
      data = data.filter( client => client['activityLevelCurrent'] >= 2 );
    } else if (filter == 'gained') {
      data = data.filter( client => client['activityLevelCurrent'] >= 2 && client['activityLevelPrevYear'] < 2 );
    } else if (filter == 'lost') {
      data = data.filter( client => client['activityLevelCurrent'] < 2 && client['activityLevelPrevYear'] >= 2 );
    }

    this.table = this.DatatablesService.createDatatable(
      '#activeClientsTable',
      {
        data: data,
        columns: [
          { data: 'clientName' },
          { data: null, defaultContent: '' }
        ],
        order: [[1, 'desc']],
        createdRow: function (row, data) {
          $('td:eq(0)', row).html(self.DatatablesService.addClientTooltip(data));
          $('td:eq(1)', row).html(self.buildBadges(data));
        }
      }
    );
  }

  badgeConfig = {
    'forex': {
      'color': 'badge-light text-muted',
      'description': 'FX cash, FX derivatives'
    },
    'fixedIncome': {
      'color': 'badge-light text-muted',
      'description': 'commodity, weather derivatives, CO2, FI derivatives, FI cash'
    },
    'equities': {
      'color': 'badge-light text-muted',
      'description': 'cash equity, equity derivatives'
    },
    'credit': {
      'color': 'badge-light text-muted',
      'description': 'credit derivatives, credit flow'
    },
    'commercial': {
      'color': 'badge-light text-muted',
      'description': 'deposits, securities'
    },
    'capitalMarkets': {
      'color': 'badge-light text-muted',
      'description': 'debt capital markets, equity capital markets'
    },
    'other': {
      'color': 'badge-light text-muted',
      'description': 'brokerage/clearing, other funds, other markets, other structures'
    }
  }

  buildBadges(rowData) {
    let badgeTemplate = `
      <span data-toggle='tooltip' data-placement='auto' data-container='false' data-html='true' title='{{description}}'>
        <span class="badge shadow-sm {{color}} cursor-default">{{descriptorText}}</span>
      </span>`;

    let badgeDescriptors = ['Fx', 'Fi', 'Eq', 'Cr', 'Co', 'Ca', 'Ot'];
    let badgeDescriptorsLong = ['forex', 'fixedIncome', 'equities', 'credit', 'commercial', 'capitalMarkets', 'other'];
    let badgeDescriptorsText = ['Forex', 'Fixed Income', 'Equities', 'Credit', 'Commercial', 'Capital Markets', 'Other'];

    var badgeExp = [
			'client holds no active products and has not traded with us for at least 24 months',
      'client traded with us within the last 24 months',
      'client currently holds active products or has recently traded with us'
    ];

    let badges = '';

    for (let i=0; i<7; i++) {
      let badgeConfig = Object.assign({}, this.badgeConfig[badgeDescriptorsLong[i]]);

      if (rowData['coverageLevel' + badgeDescriptors[i]] == 1) {
        badgeConfig.color = 'badge-warning';
        badgeConfig.description += '<br><em>' + badgeExp[1] + '</em>';
      } else if (rowData['coverageLevel' + badgeDescriptors[i]] == 2) {
        badgeConfig.color = 'badge-success';
        badgeConfig.description += '<br><em>' + badgeExp[2] + '</em>';
      } else {
        badgeConfig.description += '<br><em>' + badgeExp[0] + '</em>';
      }

      badges += badgeTemplate
        .replace('{{description}}', badgeConfig.description)
        .replace('{{color}}', badgeConfig.color)
        .replace('{{descriptorText}}', badgeDescriptorsText[i]);
    }

    return badges
  }

}
