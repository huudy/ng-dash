import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContextManagerService } from '../../services/context-manager.service';
import { DialogService } from '../../services/dialog.service';
import { BackendService } from '../../services/backend.service';

declare var $: any;
declare var window: any;

@Component({
  selector: 'app-alert-management',
  templateUrl: './alert-management.component.html',
  styleUrls: ['./alert-management.component.scss'],
})
export class AlertManagementComponent implements OnInit, OnDestroy {

  constructor(
    private ContextManagerService: ContextManagerService,
    private BackendService: BackendService,
    private DialogService: DialogService
  ) { }

  ngOnInit() {
    this.buildComponent();
    this.pushPermissionDenied = (window.Notification.permission === 'denied');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  subscription = null;
  private alertData;
  public dataRetrieved = false;

  pushPermissionDenied = false;

  showUserguide(id: string) {
    this.DialogService.showUserguide(id);
  }

  buildComponent() {
    this.ContextManagerService.configureContext(
      'alerts',
      {
        requestParameters: {
          hierarchyLevel: 'user',
          noCache: 'true'
        }
      }
    );
    this.ContextManagerService.activateCurrentContext();

    this.subscription = this.ContextManagerService.observeCurrentContext()
      .subscribe(response => {
        let alertData = response['alerts'];
        // this.addExistingAlerts();
        this.alertData = this.consolidateAlertData(alertData);
        this.dataRetrieved = true;
      })
  }

  consolidateAlertData(alertData) {
    // consolidate alerts with multiple conditions
    let alerts = [];

    if (alertData.length > 0) {
      alerts = [alertData[0]];

      alerts[alerts.length - 1]['conditionOperator'] = [alerts[alerts.length - 1]['conditionOperator']]; // convert to array
      alerts[alerts.length - 1]['conditionValue'] = [alerts[alerts.length - 1]['conditionValue']]; // convert to array

      for (var i = 1; i < alertData.length; i++) {
        if (alertData[i]['alertId'] != alertData[i - 1]['alertId']) {
          alerts.push(alertData[i]);
          alerts[alerts.length - 1]['conditionOperator'] = [alerts[alerts.length - 1]['conditionOperator']]; // convert to array
          alerts[alerts.length - 1]['conditionValue'] = [alerts[alerts.length - 1]['conditionValue']]; // convert to array
        } else {
          alerts[alerts.length - 1]['conditionOperator'].push(alertData[i]['conditionOperator']);
          alerts[alerts.length - 1]['conditionValue'].push(alertData[i]['conditionValue']);
        }
      }
    }

    return alerts;
  }

  animateBtn(btn, onOff) {
    if (onOff) {
      $(btn).addClass('progress-bar-striped');
      $(btn).addClass('progress-bar-animated');
    } else {
      $(btn).removeClass('progress-bar-striped');
      $(btn).removeClass('progress-bar-animated');
    }
  }

  changeAlert() {
    let ref = $('#alertTypeSelect').val();
    $('.card-alert-config').not('#' + ref).collapse('hide');
    $('#' + ref).collapse('show');
    // TODO: clear content
  }

  addAlert($event) {
    let source = event.currentTarget;
    let card = $(source).parentsUntil('.card').parent();
    card.find('input').removeClass('is-invalid');
    let id = card.attr('id');

    let reference = card.find('#' + id + 'Reference').val();
    let alertId = card.attr('alertid') || null;
    let alertType = (card.attr('alertType') || '').toUpperCase();
    let name = card.find('#' + id + 'Name').val() || card.find('#' + id + 'Name').attr('placeholder');

    let n = 1;
    let conditions = [];
    let invalidConditions = [];
    while (true) {
      let operator = card.find('#' + id + 'ConditionOperator' + n).val() || card.find('#' + id + 'ConditionOperator' + n).attr('value') || card.find('#' + id + 'ConditionOperator' + n).attr('placeholder');
      let value = card.find('#' + id + 'ConditionValue' + n).val() || card.find('#' + id + 'ConditionOperator' + n).attr('value') || card.find('#' + id + 'ConditionValue' + n).attr('placeholder');

      if (card.find('#' + id + 'ConditionValue' + n).attr('type') == 'number' && isNaN(parseInt(value))) {
        value = null;
        invalidConditions.push('#' + id + 'ConditionValue' + n);
      }

      if (operator == null && value == null) {
        break;
      } else {
        conditions.push(
          { 'operator': operator || null, 'value': value || null, 'number': n }
        );
      }
      n += 1;
    }

    if (reference == '' || reference == 'must be NDG' || invalidConditions.length > 0) {
      if (reference == '' || reference == 'must be NDG') { card.find('#' + id + 'Reference').addClass('is-invalid'); }
      for (let i = 0; i < invalidConditions.length; i++) {
        card.find(invalidConditions[i]).addClass('is-invalid');
      }
      this.DialogService.changeMessage({
        body: 'Unable to set alert. Please verify all input fields have been set correctly.',
        kind: "alert-danger"
      });
    } else {
      let requestBody = JSON.stringify({
        id: alertId,
        // user: null,
        name: name,
        type: alertType,
        triggerReference: reference,
        condition: conditions
      });

      /* markup */
      $(source).addClass('disabled');
      $('#alertTypeSelect').prop('disabled', true);
      this.animateBtn(source, true);

      this.BackendService.communicateWithBackend('alert/upsert', { method: 'POST' }, { body: requestBody }).subscribe(
        (response) => {
          $(source).removeClass('disabled');
          $('#alertTypeSelect').prop('disabled', false);
          this.animateBtn(source, false);
          this.ContextManagerService.activateCurrentContext();
        },
        (error) => {
          $(event.currentTarget).removeClass('disabled');
          $('#alertTypeSelect').prop('disabled', false);
          this.animateBtn(source, false);
          this.DialogService.changeMessage({
            body: 'Unable to set alert. The server did not respond or you are not eligible to configure the alert.',
            kind: "alert-danger"
          });
        }
      );
    }
  }

  modifyAlert($event) {
    let data = $event;
    let source = event.currentTarget;
    let card = $(source).parentsUntil('.card').parent();

    let alertIds = {};
    $('.card-alert-config').each(function () {
      alertIds[$(this).attr('alertType').toUpperCase()] = $(this).attr('id');
    });

    let id = alertIds[data['alertType']];

    $('#alertTypeSelect').val(id);//.change();
    this.changeAlert();
    $('html, body').animate({ scrollTop: $('#alertTypeSelect').offset().top }, 'slow');

    // reassign card to the alert modification card
    card = $('#' + id);

    let reference = card.find('#' + id + 'Reference').val(data['alertTriggerReference']);
    let alertId = card.attr('alertid', data['alertId']);
    let name = card.find('#' + id + 'Name').val(data['alertName']);

    let n = 1;
    for (let i = 0; i < data['conditionOperator'].length; i++) {
      let operator = data['conditionOperator'][i];

      card.find('#' + id + 'ConditionOperator' + n).val(operator);
      card.find('#' + id + 'ConditionValue' + n).val(data['conditionValue'][i])
      n += 1;
    }

  }

  deleteAlert($event) {
    let data = $event;
    let source = event.currentTarget;
    let card = $(source).parentsUntil('.card').parent();

    let requestBody = JSON.stringify({
      id: data['alertId']
    });

    /* markup */
    $(source).addClass('disabled');
    this.animateBtn(source, true);

    this.BackendService.communicateWithBackend('alert/delete', { method: 'POST' }, { body: requestBody }).subscribe(
      (response) => {
        $(source).removeClass('disabled');
        this.animateBtn(source, false);
        this.ContextManagerService.activateCurrentContext();
      },
      (error) => {
        $(source).removeClass('disabled');
        this.animateBtn(source, false);
        this.DialogService.changeMessage({
          body: 'Unable to delete alert. he server did not respond or you are not eligible to configure the alert.',
          kind: "alert-danger"
        });
      }
    );
  }

}
