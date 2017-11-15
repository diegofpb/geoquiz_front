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

  getMonuments(continent:string, callback: (any) => void) {
    this.http.get("https://restcountries.eu/rest/v2/region/" + continent)
      .map(res => res.json()).subscribe((res:any) => {
      let randomIndex = Math.floor(Math.random() * res.length);
      let country:any = res[randomIndex];
      this.http.get("https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="
        +country.latlng[0]+","+country.latlng[1]+"&radius=50000&language=es&keyword=monuments in "+country.capital+"&key="+this.apiconstants.GOOGLE_API_KEY)
        .map(res => res.json()).subscribe((res) => {
        let filtered = res.results.filter((element) => {
          return element.hasOwnProperty("photos");
        });
        if(filtered.length > 2) {
          let sorted = filtered.sort( function() { return 0.5 - Math.random() } );
          callback(sorted.slice(0, Math.min(sorted.length, 9)));
        } else {
          this.getMonuments(continent, callback);
        }
      });
    });
  }


}
