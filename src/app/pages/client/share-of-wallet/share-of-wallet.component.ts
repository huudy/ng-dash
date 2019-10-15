import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-share-of-wallet',
  templateUrl: './share-of-wallet.component.html',
  styleUrls: ['./share-of-wallet.component.scss']
})
export class ShareOfWalletComponent implements OnInit {

  @Input() data;

  constructor() { }

  ngOnInit() {
    this.data = JSON.parse(this.data);
  }

}
