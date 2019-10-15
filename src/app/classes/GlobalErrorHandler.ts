import { ErrorHandler, Injectable, NgZone} from '@angular/core';
import { DialogService } from '../services/dialog.service';
import { environment } from '../../environments/environment'

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {  
  
  constructor(
    private DialogService: DialogService,
    private NgZone: NgZone
  ) { }
  
  handleError(error) {
    // error swallows template variable update in dialog otherwise
    this.NgZone.run(() => {
      this.DialogService.changeMessage(
        {
         body: '<h5>SONAR encountered an error</h5>This should not have happened. If the error persists please contact the SONAR team.<p><code>' + error.toString() + '</code></p>',
         kind: "alert-danger"
        }
      )
    })

     if (!environment.production) {
       throw error; // IMPORTANT: Rethrow the error otherwise it gets swallowed
     }
  }
  
}
