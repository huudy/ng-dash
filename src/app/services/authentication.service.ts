import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BackendService } from './backend.service';

// declare var $:any;

@Injectable()
export class AuthenticationService {

  private ompIntegratedWindowsAuthenticationUrl = environment.services.ompIntegratedWindowsAuthenticationUrl;
  
  constructor(
    private http: HttpClient,
    private backendService: BackendService
   ) { }

  public integratedWindowsAuthentication() {
    return this.http.get(this.ompIntegratedWindowsAuthenticationUrl, { withCredentials: true } )
  }

  public usernamePasswordAuthentication(username: string, password: string) {
    return this.backendService.communicateWithBackend(
      'login', 
      {
        'method': 'POST'
      }, 
      {
        'body': JSON.stringify({ username: username, password: password })
      }
    )
  }

  public verifySession() {
    return this.backendService.communicateWithBackend('login/session')
  }

  public setSession(ompIntegratedWindowsAuthenticationResponse) {
    return this.backendService.communicateWithBackend(
      'login/windows',
      {
        'method': 'POST'
      },
      {
        'body': JSON.stringify(ompIntegratedWindowsAuthenticationResponse)
      }
    )
  }

}
