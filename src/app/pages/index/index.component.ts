import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { BackendService } from '../../services/backend.service';
import { UserService } from '../../services/user.service';
import { DialogService } from '../../services/dialog.service';
import { Router, NavigationEnd } from '@angular/router';
import { PushNotifications } from '../../services/push-notifications';
import { environment } from '../../../environments/environment';

import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {

  constructor(
    private BackendService: BackendService,
    private AuthenticationService: AuthenticationService,
    private UserService: UserService,
    private DialogService: DialogService,
    private Router: Router,
    private PushNotifications: PushNotifications
  ) { }

  private routerSubscription = null;
  public redirectUrl = null;

  ngOnInit() {
    this.AuthenticationService.verifySession()
      .subscribe(
        (response) => {
          this.UserService.setUser(response['Username'], response['BusinessUnits'], response['SonarRole'] == 1);
          this.PushNotifications.startWebPushService();
          
          if (environment.production) {
            this.checkDataIsCurrent();
          }
          
          this.determineRedirectUrl();
          this.redirect();

          this.routerSubscription = this.Router.events.pipe(
            filter(event => event instanceof NavigationEnd)
          ).subscribe(
            (event) => {
              this.redirect();
            }
          )
        },
        (error) => {
          let currentRoute = this.Router.url;
          this.Router.navigate(['/login', { 'redirect': encodeURIComponent(currentRoute) }]);
        }
      )
  }

  ngOnDestroy() {
    if (!!this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  checkDataIsCurrent() {
    this.BackendService.communicateWithBackend('data/dataUpdate').subscribe(
      (response) => {
        let maxDate = new Date(response['dataUpdate'][0]['updateDateMax']);
        let minDate = new Date(response['dataUpdate'][0]['updateDateMin']);
        let today = new Date().setHours(0, 0, 0, 0);
        let stringDate = maxDate.getFullYear() + '-' + ("0" + (+maxDate.getMonth() + 1)).slice(-2) + '-' + ("0" + maxDate.getDate()).slice(-2);

        if (maxDate.getTime() < today) {
          this.DialogService.changeMessage({
            body: 'Please note that information in SONAR has not been updated since ' + stringDate,
            kind: "alert-danger"
          })
        } else if (maxDate.getTime() != minDate.getTime()) {
          this.DialogService.changeMessage({
            body: 'Please be aware that some information in SONAR may be out-of-date',
            kind: "alert-warning"
          })
        }
      }
    );
  }

  redirect() {
    let currentRoute = this.Router.url;
    if (currentRoute == '/index') {
      this.Router.navigateByUrl(this.redirectUrl);
    }
  }

  determineRedirectUrl() {
    let pipIssuanceUsers = [
      "AG50091",
      "P100446",
      "P101025",
      "P101236",
      "P101257",
      "P101561",
      "P514055",
      "P526918",
      "P533999",
      "P542718",
      "P566487",
      "P591031",
      "P592455",
      "P811978",
      "P821689",
      "P840594",
      "P840817",
      "P857560",
      "P864470",
      "P867131",
      "P867204",
      "P867625",
      "P868865",
      "P870459",
      "P870749",
      "P872269",
      "P872411",
      "P875162",
      "P875691",
      "P877125",
      "P880261",
      "P882234",
      "P882257",
      "P883666",
      "P884723",
      "P885521",
      "P889276",
      "P889688",
      "P889853"
    ];

    let pipTableauUsers = ["5110", "5120", "5130", "P542926"]; // Dominik Walter

    let pipSportUsers = ["5330", "5140", "8000", "5340", "0010"];

    let grants = this.UserService.getGrants();
    let isAdmin = this.UserService.getAdmin();

    if (isAdmin || grants.includes("SON1")) {
      this.redirectUrl = "/index/dashboard";
    } else if (grants.includes("SON2")) {
      this.redirectUrl = "/index/ctsMgmtDashboard";
    } else if (
      grants.some(grant => {
        return pipIssuanceUsers.includes(grant);
      })
    ) {
      this.redirectUrl = "/index/pipIssuanceReports";
    } else if (
      grants.some(grant => {
        return pipTableauUsers.includes(grant);
      })
    ) {
      this.redirectUrl = "/index/pipTableauReports";
    } else if (
      grants.some(grant => {
        return pipSportUsers.includes(grant);
      })
    ) {
      this.redirectUrl = "/index/sport";
    }
  }

}
