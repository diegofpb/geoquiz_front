import {Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiConstantsProvider} from "../../providers/api-constants/api-constants";
import {ApiProvider} from "../../providers/api/api";
import {Md5} from 'ts-md5/dist/md5';
declare var google;

/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})


export class GamePage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;

  images: string[];
  continent: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public constants: ApiConstantsProvider, public api:ApiProvider, public md5:Md5) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');

    this.continent = this.navParams.get(this.constants.CONTINENT);

    let innerContinent:string = this.constants.COUNTRY_CODES[this.continent];

    this.api.getMonuments(innerContinent, monuments => {
      console.log(monuments);
      this.images = monuments.map(monument => {
        this.loadMap();
        return "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1080&photoreference="+monument.photos[0].photo_reference+"&key="+this.constants.GOOGLE_API_KEY
      });

    });

  }

  loadMap(){
    let latLng = new google.maps.LatLng(-34.9290, 138.6010);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  }

}
