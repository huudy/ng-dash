import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DatatablesService } from '../../../services/datatables.service';

@Component({
  selector: 'app-custom-alert-card',
  templateUrl: './custom-alert-card.component.html',
  styleUrls: ['./custom-alert-card.component.scss']
})
export class CustomAlertCardComponent implements OnInit {

  @Input() alert;
  @Output() modifyEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  fromattedAlert = {};

  constructor(
    private DatatablesService: DatatablesService
  ) { }

  ngOnInit() {
    this.formatInput();
  }

  formatInput() {
    let alertCard = {};

    alertCard['name'] = this.alert['alertName'];
    alertCard['id'] = this.alert['alertId'];
    alertCard['reference'] = this.alert['alertTriggerReference'];
    alertCard['currentValueDate'] = this.DatatablesService.formatDate(this.alert, 'triggerValueDate');

    switch (this.alert['alertCondition']) {
      case 'TRUE':
        alertCard['decorationState'] = 'danger';
        alertCard['textState'] = 'danger';
        alertCard['conditionState'] = 'alert triggered';
        break;
      case 'FALSE':
        alertCard['decorationState'] = 'success';
        alertCard['textState'] = 'muted';
        alertCard['conditionState'] = 'alert not triggered';
        break;
    };

    if (['ACCOUNTBALANCE', 'PREDICTION', 'ACTIVITYLEVEL', 'MATURITY', 'EARNIGNS'].includes(this.alert['alertType'])) {
      alertCard['referenceType'] = 'client id';
    } else {
      alertCard['referenceType'] = 'trade id';
    }

    if (['PREDICTION', 'MATURITY'].includes(this.alert['alertType'])) {
      switch (this.alert['alertType']) {
        case 'PREDICTION':
          alertCard['currentValue'] = parseFloat(this.alert['triggerValue'].replace(',', '.')).toLocaleString('de', { style: 'percent', maximumFractionDigits: 0 });
          break;
        case 'MATURITY':
          alertCard['currentValue'] = 'next on 20' + this.alert['triggerValue'].substr(-2, 2) + '-' + this.alert['triggerValue'].substr(-5, 2) + '-' + this.alert['triggerValue'].substr(0, 2);
          break;
      }
    } else {
      alertCard['currentValue'] = this.alert['triggerValue'];
    }

    alertCard['conditions'] = [];
    for (let j = 0; j < this.alert['conditionOperator'].length; j++) {
      alertCard['conditions'].push(((this.alert['conditionOperator'][j] || '').toLowerCase() + ' ' + (this.alert['conditionValue'][j] || '---')).trim());
    }

    this.fromattedAlert = alertCard;
  }

  modifyAlert() {
    this.modifyEvent.emit(this.alert);
  }

  deleteAlert() {
    this.deleteEvent.emit(this.alert);
  }

}
