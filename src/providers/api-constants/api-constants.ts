import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ApiConstantsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiConstantsProvider {

  constructor(public http: Http) {
    console.log('Hello ApiConstantsProvider Provider');
  }

  USERNAME:string = "username";
  URL_BASE_API:string = "http://localhost:8000";

}
