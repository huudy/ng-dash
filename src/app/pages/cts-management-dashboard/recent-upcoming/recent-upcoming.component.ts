import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-recent-upcoming',
  templateUrl: './recent-upcoming.component.html',
  styleUrls: ['./recent-upcoming.component.scss']
})
export class RecentUpcomingComponent implements OnInit, OnChanges {

  @Input() dataNewLoans;
  @Input() dataMaturingLoans;
  @Input() dataEcommerceTrades;
  @Input() dataMaturities;
  constructor() { }

  public maturitiesForeignExchange;
  public maturitiesFixedIncome;
  public maturitiesInvestment;
  public maturitiesOther;

  numberNewLoans = null;
  numberMaturingLoans = null;
  numberEcommerceTrades = null;
  numberForeignExchangeMaturities = null;
  numberFixedIncomeMaturities = null;
  numberInvestmentMaturities = null;
  numberOtherMaturities = null;

  ngOnInit() {
  }

  ngOnChanges() {
    this.maturitiesForeignExchange = this.dataMaturities.filter(m => m['assetClass'] == 'FX');
    this.maturitiesFixedIncome = this.dataMaturities.filter(m => m['assetClass'] == 'FI');
    this.maturitiesInvestment = this.dataMaturities.filter(m => m['assetClass'] == 'IV');
    this.maturitiesOther = this.dataMaturities.filter(m => m['assetClass'] == 'OTHER');

    this.numberNewLoans = this.dataNewLoans.length;
    this.numberMaturingLoans = this.dataMaturingLoans.length;
    this.numberEcommerceTrades = this.dataEcommerceTrades.length;
    this.numberForeignExchangeMaturities = this.maturitiesForeignExchange.length;
    this.numberFixedIncomeMaturities = this.maturitiesFixedIncome.length;
    this.numberInvestmentMaturities = this.maturitiesInvestment.length;
    this.numberOtherMaturities = this.maturitiesOther.length;
  }

}
