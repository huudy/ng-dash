import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContextManagerService } from '../../services/context-manager.service';
import { DialogService } from '../../services/dialog.service';
import { DashboardTileConfig } from './dashboard-tile/dashboard-tile.config';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

import * as humanFormat from 'human-format';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':leave', [
          stagger(50, [
            animate('0.3s', style({ opacity: 0 }))
          ])
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(50, [
            animate('0.3s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(
    private ContextManagerService: ContextManagerService,
    private DialogService: DialogService,
  ) { }

  ngOnInit() {
    this.buildComponent();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showUserguide(id: string) {
    this.DialogService.showUserguide(id);
  }

  tiles = [];
  subscription = null;
  noDataWarning = true;

  buildComponent() {
    this.ContextManagerService.configureContext('dashboard');
    this.ContextManagerService.activateCurrentContext();

    this.subscription = this.ContextManagerService.observeCurrentContext()
      .subscribe(response => {
        this.responseToTile(response);
      })
  }

  userStatsTile() {
    let tile = {
      img: '',
      text: '',
      routerLink: ''
    };

    tile.img = 'assets/img/static/banner_statistics.png';
    tile.routerLink = '../portfolio';

    // this.portfolioTile = tile;
  }

  responseToTile(response) {
    this.tiles = [];
    for (let key in response) {
      let tile = DashboardTileConfig.tiles.find(function (tile) { return tile.key == key });
      let dataNonZero = false;
      try { dataNonZero = !!response[key][0][Object.keys(response[key][0])[0]] } catch(e) {}

      if (!!tile && dataNonZero) {
        this.noDataWarning = this.noDataWarning && tile['removesNoDataWarning'];

        tile['text'] = tile['textTemplate'];
        if (tile.hasOwnProperty('textKey1')) {
          let value = response[key][0][tile['textKey1']];
          if (tile.hasOwnProperty('key1Transform')) {
            value = humanFormat(value, { decimals: 1 });
          }
          tile['text'] = tile['text'].replace('{{VALUE_1}}', value);
        }
        if (tile.hasOwnProperty('textKey2')) {
          let value = response[key][0][tile['textKey2']];
          if (tile.hasOwnProperty('key2Transform')) {
            value = humanFormat(value, { decimals: 1 });
          }
          tile['text'] = tile['text'].replace('{{VALUE_2}}', value);
        }
        this.tiles.push(tile);
      }
    }
  }

}