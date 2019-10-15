import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductPurchaseHistoryComponent } from '../../../pages/product-purchase-history/product-purchase-history.component';
import { ProductPurchaseHistoryTableComponent } from '../../../pages/product-purchase-history/product-purchase-history-table/product-purchase-history-table.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ProductPurchaseHistoryComponent,
    ProductPurchaseHistoryTableComponent
  ]
})
export class ProductPurchaseHistoryPageModule { }
