export class SearchbarSettings {
  public static pageList = [
    // DASHBOARDS
    {
      name: 'Dashboard',
      routerLink: '/index/dashboard',
      tags: '',
      access: ['SON1']
    },
    {
      name: 'CTS management dashboard',
      routerLink: '/index/ctsMgmtDashboard',
      tags: '',
      access: ['SON2']
    },
    {
      name: 'Portfolio',
      routerLink: '/index/portfolio',
      tags: 'Earnings, Optionsquote, active clients',
      access: ['SON1']
    },
    {
      name: 'Market Data',
      routerLink: '/index/marketData',
      tags: 'Forecast, ECB, Interest Rates, Exchange Rates',
      access: ['SON1']
    },

    // CLIENT ACTIVITY
    {
      name: 'Activity Levels',
      routerLink: '/index/activityLevel',
      tags: '',
      access: ['SON1']
    },
    {
      name: 'Ecommerce',
      routerLink: '/index/ecommerce',
      tags: '360T, UC Trades, FX',
      access: ['SON1']
    },
    {
      name: 'Current Accounts',
      routerLink: '/index/currentAccounts',
      tags: 'Free capital, Foreign accounts',
      access: ['SON1']
    },
    {
      name: 'Letters of Credit',
      routerLink: '/index/letterOfcredit',
      tags: 'Akkreditiv, Handel, Trade',
      access: ['SON1']
    },
    {
      name: 'Loans',
      routerLink: '/index/loans',
      tags: 'New Loans, Maturity, Interest Rate Terms',
      access: ['SON1']
    },
    {
      name: 'Unusual Trades',
      routerLink: '/index/unusualTrades',
      tags: 'Outliers',
      access: ['SON1']
    },

    // CLIENT OPPORTUNITIES
    {
      name: 'Client Growth',
      routerLink: '/index/clientGrowth',
      tags: 'inactive, low, last trade',
      access: ['SON1']
    },
    {
      name: 'Foreign Exchange Monitoring',
      routerLink: '/index/fxMonitoring',
      tags: 'FX, Market, Exposures, MACD, technical analysis',
      access: ['SON1']
    },
    {
      name: 'Hedging Opportunities',
      routerLink: '/index/hedgingOpportunities',
      tags: 'FX Spots',
      access: ['SON1']
    },
    {
      name: 'Maturities',
      routerLink: '/index/maturities',
      tags: 'Fälligkeiten',
      access: ['SON1']
    },
    {
      name: 'Pre-Settlement Risk Monitoring',
      routerLink: '/index/preSettlementRisk',
      tags: 'credit line',
      access: ['SON1']
    },
    {
      name: 'Trading Forecast',
      routerLink: '/index/tradingForecast',
      tags: 'Expected trades',
      access: ['SON1']
    },
    {
      name: 'Maturing Quotes',
      routerLink: '/index/requestForQuote',
      tags: 'ecommerce, 360T, lost, UC Trader',
      access: ['SON1']
    },

    // EXPOSURES
    {
      name: 'Products Putchase History',
      routerLink: '/index/productPurchaseHistory',
      tags: 'Count',
      access: ['SON1']
    },
    {
      name: 'Foreign Exchange Exposure',
      routerLink: '/index/foreignExchangeExposure',
      tags: 'Trade, Balance, Accounts',
      access: ['SON1']
    },
    {
      name: 'Commodity Exposure',
      routerLink: '/index/commodityExposure',
      tags: 'Trade, Metals, Oil, Gas',
      access: ['SON1']
    },
    {
      name: 'Forex Markup',
      routerLink: '/index/forexMarkup',
      tags: '',
      access: ['SON1']
    },

    // Others
    {
      name: 'Deputy Management',
      routerLink: '/index/deputyManagement',
      tags: 'Vertreter, holiday',
      access: ['SON1']
    },
    {
      name: 'Custom Alerts',
      routerLink: '/index/customAlerts',
      tags: 'warning, threshold, notification',
      access: ['SON1']
    },

    // PIP
    {
      name: 'Issuance Reports',
      routerLink: '/index/pipIssuanceReports',
      tags: 'Primary, Secondary, Dericon, onedirect, onemarkets',
      access: [
        "AG50091",
        "P100446",
        "P101025",
        "P101236",
        "P101257",
        "P101561",
        "P514055",
        "P526918",
        "P533999",
        "P542718",
        "P566487",
        "P591031",
        "P592455",
        "P811978",
        "P821689",
        "P840594",
        "P840817",
        "P857560",
        "P864470",
        "P867131",
        "P867204",
        "P867625",
        "P868865",
        "P870459",
        "P870749",
        "P872269",
        "P872411",
        "P875162",
        "P875691",
        "P877125",
        "P880261",
        "P882234",
        "P882257",
        "P883666",
        "P884723",
        "P885521",
        "P889276",
        "P889688",
        "P889853"
      ]
    },
    {
      name: 'Smart Portfolio',
      routerLink: '/index/sport',
      tags: '',
      access: ['5330', '5140', '8000', '5340', '0010']
    },
    {
      name: 'Tableau Reports',
      routerLink: '/index/pipTableauReports',
      tags: 'ATR Settlement Anlysis',
      access: ['5110', '5120', '5130']
    }
  ];
}