import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DialogService {

  private messageSource = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(data) {
    this.messageSource.next(data);
  }

  completeMessage() {
    this.messageSource.complete()
  }

  showMessages() {
    this.messageSource.next("ShowDialogBox")
  }

  showUserguide(id: string = "") {
    this.messageSource.next("ShowUserguide" + "," + id)
  }
}
