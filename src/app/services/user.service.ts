import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { of as observableOf } from 'rxjs/observable/of';
import { environment } from '../../environments/environment';


@Injectable()
export class UserService {

  private userIsSet: boolean = false;
  private userIsSetSubject = new Subject();
  private username: string = '';
  private admin: boolean = false;
  private externalUsername: string = ''; // alternatively used in API calls
  private grants: Array<string> = []; // omPP business units
  
  constructor() { }

  setUser(name: string, grants, admin) {
    if (!this.userIsSet || this.admin) {
      this.setUsername(name);
      grants.push(name); // add username to grants
      this.setGrants(grants);
      // this.verifyUserIsAdmin();
      this.setAdmin(admin);
      this.userIsSet = true;
      this.userIsSetSubject.next(true);
    } else {
      throw Error('user properties can only bet set on login for non-admin users');
    }
  }

  private setUsername(name: string) {
    this.username = name;
    
    let externalUsername = name;
    if (!environment.production) {
      externalUsername = environment.services.defaultUsername;
    }
    this.externalUsername = externalUsername;
  }

  observeUserIsSet() {
    return this.userIsSetSubject;
  }
  getUserIsSet() {
    return this.userIsSet;
  }

  getUsername() {
    return this.username;
  }

  
  private verifyUserIsAdmin() {
    // TODO: call backend and fetch the status from there
    this.setAdmin(true);
  }

  private setAdmin(flag: boolean) {
    this.admin = flag;
  }

  getAdmin() {
    return this.admin;
  }

  setExternalUsername(name: string) {
    if (this.admin) {
      this.externalUsername = name;
    } else {
      throw Error('user not allowed to change external username');
    }
  }

  getExternalUsername() {
    if (!!this.externalUsername) {
      return this.externalUsername;
    } else {
      return this.username;
    }
  }

  private setGrants(grants: Array<string>) {
    this.grants = grants;
  }

  getGrants() {
    return this.grants;
  }

}
