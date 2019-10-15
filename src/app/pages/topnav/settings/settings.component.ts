import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { DialogService } from '../../../services/dialog.service';

declare var $: any;
declare var window: any;

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(
    private UserService: UserService,
    private DialogService: DialogService
  ) { }

  isAdmin = false;
  pushNotificationsPermission = false;
  externalUsername = '';

  ngOnInit() {
    if (this.UserService.getUserIsSet()) {
      this.isAdmin = this.UserService.getAdmin()
      this.externalUsername = this.UserService.getExternalUsername();
    } else {
      this.UserService.observeUserIsSet().subscribe(
        response => {
          if (response) {
            this.isAdmin = this.UserService.getAdmin();
            this.externalUsername = this.UserService.getExternalUsername();
            window.Notification.requestPermission().then(permission => {
              switch (permission) {
                case 'granted': {
                  this.pushNotificationsPermission = true;
                  break;
                }
                case 'denied': {
                  this.pushNotificationsPermission = false;
                  break;
                }
              }
            }
            )
          }
        }
      )
    }
  }

  print() {
    console.log('click');
  }

  ngAfterViewInit() {
    $('#settingsDropdown .dropdown-menu .dropdown-item .prevent-default').click(function (e) {
      e.stopPropagation();
    });

    $('#settingsDropdown').on('show.bs.dropdown', function (e) {
      $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
    });

    $('#settingsDropdown').on('hide.bs.dropdown', function (e) {
      $(this).find('.dropdown-menu').first().stop(true, true).slideUp(200);
    });
  }

  showUserguide() {
    this.DialogService.showUserguide();
  }

  setExternalUsername() {
    this.UserService.setExternalUsername(this.externalUsername);
  }

  showMessages() {
    this.DialogService.showMessages();
  }

}
