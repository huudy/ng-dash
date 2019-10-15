import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-popular-products',
  templateUrl: './popular-products.component.html',
  styleUrls: ['./popular-products.component.scss']
})
export class PopularProductsComponent implements OnInit {

  @Input() data;

  constructor( ) { }

  ngOnInit() {
    
  }

}
