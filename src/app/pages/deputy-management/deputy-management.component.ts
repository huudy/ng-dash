import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContextManagerService } from '../../services/context-manager.service';
import { BackendService } from '../../services/backend.service';
import { DialogService } from '../../services/dialog.service';

declare var $: any;

@Component({
  selector: 'app-deputy-management',
  templateUrl: './deputy-management.component.html',
  styleUrls: ['./deputy-management.component.scss']
})
export class DeputyManagementComponent implements OnInit, OnDestroy {

  constructor(
    private ContextManagerService: ContextManagerService,
    private BackendService: BackendService,
    private DialogService: DialogService
  ) { }

  ngOnInit() {
    this.buildComponent();
  }

  ngAfterViewInit() {
    $('.datepickerEmit').datepicker({
      // calendarWeeks: true,
      clearBtn: true,
      // todayHighlight: true,
      daysOfWeekHighlighted: '06',
      weekStart: 1,
      language: 'en',
      format: 'yyyy-mm-dd',
      startDate: new Date(),
      orientation: 'top'
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  showUserguide(id: string) {
    this.DialogService.showUserguide(id);
  }

  subscription = null;
  private deputyGrantedData;
  private deputyReceivedData;
  public dataRetrieved = false;

  buildComponent() {
    this.ContextManagerService.configureContext(
      'deputyManagement',
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
        this.dataRetrieved = true;
        this.deputyGrantedData = response['deputyGranted'];
        this.deputyReceivedData = response['deputyReceived']
      })
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

  grantDeputyRights($event) {
    let source = $(event.currentTarget);
    let userId = $('#deputyReceiveUserId').val();
    let validFrom = $('#deputyReceiveDateFrom').val();
    let validTo = $('#deputyReceiveDateTo').val();

    if (userId !== '') {
      $('.btn-deputy').addClass('disabled');
      this.animateBtn(source, true);
      $('#deputyReceiveUserId').removeClass('is-invalid');

      let requestBody = JSON.stringify({ deputy: userId, validFrom: validFrom, validTo: validTo });

      this.BackendService.communicateWithBackend('deputy/grant', { method: 'POST' }, { body: requestBody }).subscribe(
        (response) => {
          $('.btn-deputy').removeClass('disabled');
          this.animateBtn(source, false);
          $('#deputyRightsGrantedTable').DataTable().clear().draw().destroy();
          $('#deputyRightsReceivedTable').DataTable().clear().draw().destroy();
          this.ContextManagerService.activateCurrentContext();
        },
        (error) => {
          $('.btn-deputy').removeClass('disabled');
          this.animateBtn(source, false);
          this.DialogService.changeMessage({
            body: 'Unable to grant deputy rights. The server did not respond or you are not eligible to grant the requested deputy rights.',
            kind: "alert-danger"
          });
        }
      );
    } else {
      $('#deputyReceiveUserId').addClass('is-invalid');
    }
  };

  revokeDeputyRights($event, userIdInput) {
    let source = $(event.currentTarget);
    let userId = $(userIdInput).val();

    if (userId !== '') {
      $('.btn-deputy').addClass('disabled');
      this.animateBtn(source, true);
      $(userIdInput).removeClass('is-invalid');

      var requestBody = JSON.stringify({ deputy: userId });
      this.BackendService.communicateWithBackend('deputy/revoke',  { method: 'POST' }, { body: requestBody }).subscribe(
        (response) => {
          $('.btn-deputy').removeClass('disabled');
          this.animateBtn(source, false);
          $('#deputyRightsGrantedTable').DataTable().clear().draw().destroy();
          $('#deputyRightsReceivedTable').DataTable().clear().draw().destroy();
          this.ContextManagerService.activateCurrentContext();
        },
        (error) => {
          $('.btn-deputy').removeClass('disabled');
          this.animateBtn(source, false);
          this.DialogService.changeMessage({
            body: 'Unable to revoke deputy rights. The server did not respond or you are not eligible to grant the requested deputy rights.',
            kind: "alert-danger"
          });
        }
      );
    } else {
      $(userIdInput).addClass('is-invalid');
    }
  };

}
