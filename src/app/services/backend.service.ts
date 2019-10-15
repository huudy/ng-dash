import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class BackendService {

  constructor(
    private http: HttpClient
  ) { }

  public communicateWithBackend(requestUrl: string, serivceParameters?: {}, requestParameters?: {}) {
    const url = environment.services.baseUri + requestUrl;

    let method = 'GET';
    let credentials = true;

    let cache = true;
    let coverage = 'user';
    let body = '';

    let httpParameters = new HttpParams()
      .set('noCache', String(!cache))
      .set('hierarchyLevel', coverage);

    if (serivceParameters) {
      if (serivceParameters['method']) {
        method = serivceParameters['method'];
      }
      if (serivceParameters['credentials']) {
        credentials = serivceParameters['credentials'];
      }
    }

    if (requestParameters) {
      for (let key in requestParameters) {
        if (key == 'body') {
          body = requestParameters[key];
          continue;
        }
        httpParameters = httpParameters.set(key, requestParameters[key]);
      }
    }

    if (method == 'GET') {
      return this.http.get(url, { params: httpParameters, withCredentials: credentials })
    } else if (method == 'POST') {
      return this.http.post(url, body, { params: httpParameters, withCredentials: credentials }) // observe: 'response' 
    }

  }

}
