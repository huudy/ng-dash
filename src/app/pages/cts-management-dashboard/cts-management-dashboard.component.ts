import { Component, OnInit } from '@angular/core';
import { ContextManagerService } from '../../services/context-manager.service';
// import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-cts-management-dashboard',
  templateUrl: './cts-management-dashboard.component.html',
  styleUrls: ['./cts-management-dashboard.component.scss']
})
export class CtsManagementDashboardComponent implements OnInit {

  constructor(
    private ContextManagerService: ContextManagerService,
    // private DialogService: DialogService
  ) { }

  ngOnInit() {
    this.buildComponent();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // showUserguide(id: string) {
  //   this.DialogService.showUserguide(id);
  // }

  subscription = null;

  private kpiData;
  private regionComparisonData;
  private detailsNewLoansData;
  private detailsMaturingLoansData;
  private detailsEcommTradesData;
  private detailsMaturitiesData;
  private trendingProductsData;
  private sectorEarningsData;
  private earningsTopologyData;
  private currencyVolumesData;
  private earnignsAssetClassData;

  public dataRetrieved = false;

  buildComponent() {
    this.ContextManagerService.configureContext(
      'ctsMgmtDashboard',
      {
        'requestParameters': {
          'region': 'CTSGER'
        }
      }
    );
    this.ContextManagerService.activateCurrentContext();

    this.subscription = this.ContextManagerService.observeCurrentContext()
      .subscribe(response => {
        this.dataRetrieved = true;
        
        this.kpiData = response['kpi'];
        this.regionComparisonData = response['comparison'];

        this.detailsNewLoansData = response['detailsNewLoans'];
        this.detailsMaturingLoansData = response['detailsMaturingLoans'];
        this.detailsEcommTradesData = response['detailsEcommTrades'];
        this.detailsMaturitiesData = response['detailsMaturities'];
        
        this.trendingProductsData = response['trendingProducts'];
        this.sectorEarningsData = response['sectorEarnings'];
        try { this.earningsTopologyData = response['earningsTopology'][0]['visualizationData'] } catch(e) {}
        try { this.currencyVolumesData = response['currencyVolumes'][0]['visualizationData'] } catch(e) {}
        try { this.earnignsAssetClassData = response['earningsByProduct'][0]['visualizationData'] } catch(e) {}
      })
  }

  changeRegion(region: string) {
    this.ContextManagerService.configureContext(
      'ctsMgmtDashboard',
      {
        'requestParameters': {
          'region': region
        }
      }
    );
    this.ContextManagerService.activateCurrentContext();
  }

}
