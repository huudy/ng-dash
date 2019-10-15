import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service'
import { UserService } from '../../services/user.service';

declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private AuthenticationService: AuthenticationService,
    private UserService: UserService,
    private Router: Router,
    private ActivatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    let self = this;
    let passwordField = document.querySelector("#PasswordInput");
    let windowsLoginCheckbox = document.querySelector("#WindowsLoginCheck");

    $('#PasswordInput').prop('checked', false);

    passwordField.addEventListener("keypress", function (e: KeyboardEvent) {
      // 13 is ENTER
      if (e.keyCode === 13) {
        self.autoLogin.bind(self)();
      }
    });

    windowsLoginCheckbox.addEventListener("click", function (e) {
      if ($('#WindowsLoginCheck').is(':checked')) {
        self.autoLogin.bind(self)();
      }
    });

    this.toggleInput();

    // check url parameters
    let autoLogin = this.ActivatedRoute.snapshot.paramMap.get('autoLogin');
    if (!autoLogin) {
      $('#WindowsLoginCheck').click();
    }
  }

  // component methods below //

  attemptIntegratedWindowsAuthentication() {
    this.AuthenticationService.integratedWindowsAuthentication()
      .subscribe(
        (response) => {
          this.AuthenticationService.setSession(response).subscribe(
            (sessionResponse) => {
              this.registerUserandContinue(response);
            },
            (error) => {
              this.hideProgress();
              this.setWindowsLoginNotPossible();
              $('#WindowsLoginCheck').prop('checked', false);
              this.toggleInput();
            }
          )
        },
        (error) => {
          // console.log('windows login not implemented properly yet');
          this.hideProgress();
          this.setWindowsLoginNotPossible();
          $('#WindowsLoginCheck').prop('checked', false);
          this.toggleInput();
        }
      );
  }

  attemptusernamePasswordAuthentication(username: string, password: string) {
    this.AuthenticationService.usernamePasswordAuthentication(username, password)
      .subscribe(_ => this.AuthenticationService.verifySession()
        .subscribe(response => {
          this.registerUserandContinue(response);
        }),
        (error) => {
          this.hideProgress();
          this.setInvalidUsernameOrPassword();
        }
      )
  }

  registerUserandContinue(response) {
    // now in index component from session object
    /*if ('Username' in response) {
      // username password login
      this.UserService.setUser(response['Username'], response['BusinessUnits'], false);
    } else {
      // windows login
      this.UserService.setUser(response['UserName'], response['UserBusinessUnits'], false);
    }*/
    let redirect = this.ActivatedRoute.snapshot.paramMap.get('redirect');
    if (!redirect) {
      this.Router.navigateByUrl('/index');
    } else {
      this.Router.navigateByUrl(decodeURIComponent(redirect));
    }
  }

  // login function
  autoLogin() {
    $('#UserNameInput').removeClass('is-invalid');
    $('#UserNameInputError').collapse('hide');

    $('#PasswordInput').removeClass('is-invalid');
    $('#PasswordInputError').removeClass('show');

    $('#WindowsLoginCheckError').removeClass('show');

    $('#GeneralError').collapse('hide');

    this.showProgress();

    let userName = $('#UserNameInput').val();
    let password = $('#PasswordInput').val();

    let loginType = 'usernamePassword';
    let requestBody = JSON.stringify({ username: userName, password: password });

    if ($('#WindowsLoginCheck').is(':checked')) {
      this.attemptIntegratedWindowsAuthentication();
    } else {
      this.attemptusernamePasswordAuthentication(userName, password);
    }

  }

  // funcitons that modify the state of the UI --> migrate to angular way of doing things at some point
  setInvalidUsername() {
    $('#UserNameInput').addClass('is-invalid');
    $('#UserNameInputError').text('Unknown user name.');
    $('#UserNameInputError').collapse('show');
  }

  setInvalidPassword() {
    $('#PasswordInput').addClass('is-invalid');
    $('#PasswordInputError').text('Bad password');
    $('#PasswordInputError').collapse('show');
  }

  setInvalidUsernameOrPassword() {
    $('#PasswordInput').addClass('is-invalid');
    $('#UserNameInput').addClass('is-invalid');
    $('#GeneralError').collapse('show');
  }

  setWindowsLoginNotPossible() {
    if (!$('#WindowsLoginCheckError').hasClass('show')) {
      $('#WindowsLoginCheckError').collapse('show');
    }
  }

  showProgress() {
    $('#LoginButton').addClass('progress-bar-striped');
    $('#LoginButton').addClass('progress-bar-animated');
    $('#LoginButton').prop('disabled', true);
  }

  hideProgress() {
    $('#LoginButton').removeClass('progress-bar-striped');
    $('#LoginButton').removeClass('progress-bar-animated');
    $('#LoginButton').prop('disabled', false);
  }

  toggleInput() {
    if ($('#WindowsLoginCheck').is(':checked')) {
      $('#UserNameInput').prop('disabled', true);
      $('#PasswordInput').prop('disabled', true);
    } else {
      $('#UserNameInput').prop('disabled', false);
      $('#PasswordInput').prop('disabled', false);
    }
  }

}
