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
  CONTINENT:string = "continent";
  URL_BASE_API:string = "http://localhost:8000";
  GOOGLE_API_KEY:string = "AIzaSyA5xov4mJbIoHmgd2spPc7DbB-2b4x9xF4";//"AIzaSyAoK6KYK1s-kMy5qnDm5qssVPdji6q36Ik";

  COUNTRY_CODES:object = {
    "Europa":"Europe",
    "Asia":"Asia",
    "América":"Americas",
    "África":"Africa",
    "Oceanía":"Oceania"
  }

}
