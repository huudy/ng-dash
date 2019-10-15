import { Component, OnInit } from '@angular/core';
import { DialogService } from '../../services/dialog.service';

declare var $: any;

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent implements OnInit {

  body: string = ""
  kind: string = ""
  nomessagebody: string = "No messages" // Eventually fetch from DB
  nomessagekind: string = "alert-light" // Eventually fetch from DB

  enableUserguide = false;

  constructor(
    private DialogService: DialogService
  ) { }

  // Subscribe to messages
  subscribeMessages() {

    this.DialogService.currentMessage.subscribe((data) => this.handleData(data))
  }

  // Send new message
  newMessage() {

    let message = {
      body: "Dialog",
      kind: "alert-warning" // e.g. alert-warning, alert-danger, alert-success, alert-dark
    }

    this.DialogService.changeMessage(message)
  }

  // Set message to empty 
  closeMessage() {
    this.body = ""
  }

  // Render HTML output
  renderMessage(kind, body) {
    this.body = '<div class="modal-body alert ' + kind + ' border-0">' + body + '</div> ' + this.body
  }

  // Handle message data and show dialog box
  handleData(data) {

    // Check and process message data
    if (data != "ShowDialogBox" && data.body != undefined) {
      if (this.body.includes(this.nomessagebody)) { this.body = "" }

      this.renderMessage(data.kind, data.body)
    }

    else if (this.body == "") {
      this.renderMessage(this.nomessagekind, this.nomessagebody)
    }

    // Show message in dialog box
    if (data.body != undefined && this.body != "" || data == "ShowDialogBox") {
      $('#dialog').modal()
    }
    else if (data.includes("ShowUserguide")) {
      this.enableUserguide = true;

      // workaround to wait for the element to be rendered to the DOM
      if (this.enableUserguide) {
        setTimeout(
          () => {
            // Extract anchor id
            let id = data.split(',')[1];

            // Show Userguide
            $('#userGuideModal').modal();

            if (!!id) {
              // Scroll to topic
              $('#userGuideModal').on('shown.bs.modal', function () {
                $('#userGuideModal').find('.modal-body').scrollTop(0);

                $('.modal-body').animate({ scrollTop: $(id).offset().top - 100 }, 650);
              })
            }
          }
        )
      }
    }
  }

  ngOnInit() {

    this.subscribeMessages()

  }

  ngOnDestroy() {
    // Clear Observable memory
    this.DialogService.completeMessage()
  }

}
