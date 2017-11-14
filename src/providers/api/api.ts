import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {ApiConstantsProvider} from "../api-constants/api-constants";

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {

  constructor(public http: Http,
              public apiconstants: ApiConstantsProvider) {
    console.log('Hello ApiProvider Provider');

  }

  getUsers() {
    return this.http.get(this.apiconstants.URL_BASE_API + "/users")
      .map(res => res.json());
  }

  getUser(username:String) {
    return this.http.get(this.apiconstants.URL_BASE_API + "/users/" + username)
      .map(res => res.json());
  }



}
