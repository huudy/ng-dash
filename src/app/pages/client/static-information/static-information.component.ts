import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-static-information',
  templateUrl: './static-information.component.html',
  styleUrls: ['./static-information.component.css']
})
export class StaticInformationComponent implements OnInit {
  @Input() data;
  constructor() { }

  ngOnInit() {
    this.buildComponent();
  }

  clientSector: string = '';
  clientNdg: string = '';
  clientMatchcode: string = '';
  clientLei: string = '';
  
  greenhouseRatingText: string = 'poor';
  greenhouseRatingLow: string = 'text-muted';
  greenhouseRatingMedium: string = 'text-muted';
  greenhouseRatingHigh: string = 'text-muted';

  buildComponent() {
    this.clientSector = this.data['industry'];
    this.clientNdg = this.data['clientId'];
    this.clientMatchcode = this.data['clientMatchCodes'].join(', ');
    this.clientLei = this.data['clientLEI'];

    let greenhouseScore = this.data['sectorGreenhouseScore'];
    if (greenhouseScore >= 0.25) {
      this.greenhouseRatingText = 'fair'
      this.greenhouseRatingLow = 'text-success'
    }
    if (greenhouseScore >= 0.5) {
      this.greenhouseRatingText = 'good'
      this.greenhouseRatingMedium = 'text-success'
    }
    if (greenhouseScore >= 0.75) {
      this.greenhouseRatingText = 'very good'
      this.greenhouseRatingHigh = 'text-success'
    }

  }

}
