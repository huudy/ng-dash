import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dia-link',
  templateUrl: './dia-link.component.html',
  styleUrls: ['./dia-link.component.scss']
})
export class DiaLinkComponent implements OnInit {
  @Input() data;
  constructor() { }

  ngOnInit() {
    this.buildComponent();
  }

  diaLink: string = '';

  buildComponent() {
    this.diaLink = (
      'http://g13pv0a0.sd01.unicreditgroup.eu/dpp/advisor/#/' + 
      this.data['clientId'] + 
      '/dap-explorations?name=' + 
      encodeURI(btoa(this.data['clientName']))
    );
  }

}
