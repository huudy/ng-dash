export class DashboardTileConfig {
  public static tiles = [
    { 
      'key': 'userStatsDashboard', 
      'textTemplate': `
        <div class="card border-0">
          <div class="card-body pt-0 pb-3">
            <i class="fas fa-users large text-gray-300 float-left ml-2 mr-1 my-1"></i>
            <span class="font-weight-bold large text-muted">{{VALUE_1}}</span> active clients
          </div>
        </div>
        <div class="card border-0">
          <div class="card-body pt-3 pb-0">
            <i class="fas fa-box-open large text-gray-300 float-left ml-2 mr-1 my-1"></i>
            <span class="font-weight-bold large text-muted">{{VALUE_2}}</span> trades in the last seven days
          </div>
        </div>`, 
      'textKey1': 'activeUsers',
      'textKey2': 'numberRecentTrades',
      'img': 'assets/img/static/banner_portfolio.png', 
      'routerLink': '../portfolio',
      'removesNoDataWarning': false
    },
    { 
      'key': 'activityLevelDashboard', 
      'textTemplate': '{{VALUE_1}} client(s) with decreased activity level of 5 or below', 
      'textKey1': 'numberClients',
      'img': 'assets/img/static/banner_activity_level.png', 
      'routerLink': '../activityLevel',
      'removesNoDataWarning': true
    },
    { 
      'key': 'maturitiesDashboard', 
      'textTemplate': '{{VALUE_1}} trade(s) mature(s) within the next seven business days<br/>total volume: {{VALUE_2}}&nbsp;EUR', 
      'textKey1': 'numberTrades',
      'textKey2': 'volumeTrades',
      'key2Transform': true,
      'img': 'assets/img/static/banner_maturities.png', 
      'routerLink': '../maturities',
      'removesNoDataWarning': true
    },
    { 
      'key': 'lettersOfCreditDashboard', 
      'textTemplate': '{{VALUE_1}} non EUR denominated letter(s) of credit has(have) been signed by your clients within the last seven days', 
      'textKey1': 'numberTrades',
      'img': 'assets/img/static/banner_new_letter_of_credit.png', 
      'routerLink': '../letterOfCredit',
      'removesNoDataWarning': true
    },
    { 
      'key': 'outliersDashboard', 
      'textTemplate': '{{VALUE_1}} unusual trade(s) with a total volume of {{VALUE_2}}&nbsp;EUR detected within the last seven days', 
      'textKey1': 'numberTrades',
      'textKey2': 'volumeTrades',
      'key2Transform': true,
      'img': 'assets/img/static/banner_unusual_trades.png', 
      'routerLink': '../unusualTrades',
      'removesNoDataWarning': true
    },
    { 
      'key': 'fxMonitoringDashboard', 
      'textTemplate': '{{VALUE_1}}', 
      'textKey1': 'content',
      'img': 'assets/img/static/banner_fx_monitoring.png', 
      'routerLink': '../fxMonitoring',
      'removesNoDataWarning': false
    },
    { 
      'key': 'newLoansDashboard', 
      'textTemplate': '{{VALUE_1}} loan(s) has(have) been signed by your clients within the last seven days', 
      'textKey1': 'numberTrades',
      'img': 'assets/img/static/banner_new_loan.png', 
      'routerLink': '../loans',
      'removesNoDataWarning': true
    },
    { 
      'key': 'loanTermExpiryDashboard', 
      'textTemplate': 'The current interest rate terms for {{VALUE_1}} loan(s) will expire within the next seven business days', 
      'textKey1': 'numberTrades',
      'img': 'assets/img/static/banner_loan_interest_terms_expiry.png', 
      'routerLink': '../loans',
      'removesNoDataWarning': true
    },
    { 
      'key': 'preSettlementRiskDashboard', 
      'textTemplate': '{{VALUE_1}} clients are now at or close to their allocated limits and may not be able to trade any further instruments should the risk not be adjusted', 
      'textKey1': 'numberClients',
      'img': 'assets/img/static/banner_pre_settlement_limit.png', 
      'routerLink': '../preSettlementRisk',
      'removesNoDataWarning': true
    },
    { 
      'key': 'tradePredictionDashboard', 
      'textTemplate': '{{VALUE_1}} trade(s) (not including MM Loans) with a probability of 75% or more expected within the next seven days', 
      'textKey1': 'numberTrades',
      'img': 'assets/img/static/banner_expected_trades.png', 
      'routerLink': '../tradingForecast',
      'removesNoDataWarning': true
    },
    { 
      'key': 'hedgingDashboard', 
      'textTemplate': '{{VALUE_1}} client(s) traded three or more FX spots on the same currency pair within the last 30 days', 
      'textKey1': 'numberClients',
      'img': 'assets/img/static/banner_hedging_opportunity.png', 
      'routerLink': '../hedgingOpportunities',
      'removesNoDataWarning': true
    },
    { 
      'key': 'alertsDashboard', 
      'textTemplate': '{{VALUE_1}} alert(s) you defined were triggered within the last three days', 
      'textKey1': 'numberAlerts',
      'img': 'assets/img/static/banner_alerts.png', 
      'routerLink': '../customAlerts',
      'removesNoDataWarning': true
    },
    { 
      'key': 'maturingQuotesDashboard', 
      'textTemplate': '{{VALUE_1}} lost quote(s) are maturing over the next seven business days', 
      'textKey1': 'numberTrades',
      'img': 'assets/img/static/banner_lost_quotes.png', 
      'routerLink': '../requestForQuote',
      'removesNoDataWarning': true
    },
    { 
      'key': 'ecommerceDashboard', 
      'textTemplate': '{{VALUE_1}} trade(s) with a total volume of {{VALUE_2}}&nbsp;EUR performed by your clients over the last seven days', 
      'textKey1': 'numberTrades',
      'textKey2': 'volumeTrades',
      'key2Transform': true,
      'img': 'assets/img/static/banner_fx_ecommerce_trades.png', 
      'routerLink': '../ecommerce',
      'removesNoDataWarning': true
    }
  ]
}