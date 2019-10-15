import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { UserService } from './user.service';
import { DialogService } from './dialog.service';

@Injectable()
export class ContextManagerService {

  constructor( 
    private BackendService: BackendService,
    private UserService: UserService,
    private DialogService: DialogService
  ) { }
  
  private coverageLevel:string = 'user';
  private coverageLevelSubject = new Subject<string>();

  public setCoverageLevel(level: string) {
    if (level != this.coverageLevel) {
      this.coverageLevelSubject.next(level);
      this.coverageLevel = level;
      if (Object.entries(this.currentContextConfiguration).length !== 0 && this.currentContextConfiguration.constructor === Object) { // is empty
        this.loadContext(this.currentContextConfiguration['contextName'], this.currentContextConfiguration['configuration'])
          .subscribe(
            response => { this.currentContext.next(response); }
          );
      }
    }
  }

  public observeCoverageLevel() {
    return this.coverageLevelSubject;
  }

  private currentContextConfiguration = {};
  private currentContext= new Subject();

  public configureContext(contextName: string, args?: {}) {
    this.currentContextConfiguration = {
      'contextName': contextName,
      'configuration': args
    }
  }

  // TODO: add 'delete current context'

  public activateCurrentContext() {
    if (this.UserService.getUserIsSet()) {
      this._activateCurrentContext();
    } else {
      this.UserService.observeUserIsSet().subscribe(
        userIsSet => {
          if (userIsSet) {
            this._activateCurrentContext();
          }
        }
      )
    }
  }

  private _activateCurrentContext() {
    this.loadContext(this.currentContextConfiguration['contextName'], this.currentContextConfiguration['configuration'])
      .subscribe(
        response => { this.currentContext.next(response); }
      );
  }

  public observeCurrentContext() {
    return this.currentContext;
  }
  
  public loadingIndicatorVisible = false;
  public isLoading = false;

  public loadContext(contextName: string, args?: {}) {
    this.loadingIndicatorVisible = true;
    this.isLoading = true;
    let serviceParameters = {};
    let requestParameters = {};

    if (args) {
      if (args['serviceParameters']) {
        serviceParameters = args['serviceParameters'];
      }
      if (args['requestParameters']) {
        requestParameters = args['requestParameters'];
      }
      // check eg coverage from button
    }

    return this.BackendService.communicateWithBackend(
      'data/' + contextName,
      serviceParameters,
      Object.assign({}, { 'username': this.UserService.getExternalUsername(), 'hierarchyLevel': this.coverageLevel }, requestParameters)
    ).pipe(
      tap(
        (response) => { 
          this.loadingIndicatorVisible = false;
          this.isLoading = false;
          return response;
        },
        (error) => { 
          this.DialogService.changeMessage({
            kind: 'alert-danger',
            body: 'Failed to load data'
          })
          this.loadingIndicatorVisible = false; 
          this.isLoading = false;
        }
      )
    )
  }

}
