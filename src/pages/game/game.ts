import {Component, ElementRef, ViewChild} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {ApiConstantsProvider} from "../../providers/api-constants/api-constants";
import {ApiProvider} from "../../providers/api/api";
import {Md5} from 'ts-md5/dist/md5';
import {Storage} from "@ionic/storage";
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

  points: number = 0;
  capitalLatlng: any;
  counter: number = 1;
  marker: any;
  images: string[];
  continent: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public constants: ApiConstantsProvider, public api:ApiProvider, public md5:Md5, public alertCtrl: AlertController, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');

    this.continent = this.navParams.get(this.constants.CONTINENT);

    this.loadMap();
    this.loadMonuments();
  }

  loadMonuments(){
    let innerContinent:string = this.constants.COUNTRY_CODES[this.continent];
    this.api.getMonuments(innerContinent, (latlng, monuments) => {
      console.log(monuments);
      this.capitalLatlng = latlng;
      this.images = monuments.map(monument => {
        return "https://maps.googleapis.com/maps/api/place/photo?maxwidth=1080&photoreference="+monument.photos[0].photo_reference+"&key="+this.constants.GOOGLE_API_KEY
      });

    });
  }

  loadMap(){
    let latLng = new google.maps.LatLng(0, 0);

    let mapOptions = {
      center: latLng,
      zoom: 2,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    google.maps.event.addListener(this.map, 'click', (event) => {
      this.placeMarker(event.latLng);
    });
  }

  placeMarker(latLng) {
    if (this.marker != null) {
      this.marker.setPosition(latLng);
    } else {
      this.marker = new google.maps.Marker({
        position: latLng,
        map: this.map
      });
    }
  }

  confirmPosition(){

    if(!this.marker || !this.images)
      return;

    this.counter++;
    this.points += GamePage.getDistance(this.capitalLatlng.lat, this.capitalLatlng.lng, this.marker.position.lat(), this.marker.position.lng());

    if(this.counter > 5){
      this.finishGame();
    } else {
      this.loadMonuments();
      this.marker.setMap(null);
      this.marker = null;
    }
  }

  private finishGame() {

    let game = {
      continent: this.continent,
      date: Math.floor(Date.now() / 1000),
      score: this.points
    };

    this.storage.get(this.constants.USERNAME)
      .then((username) => {
        this.api.postGame(username, game).subscribe();
      });

    this.alertCtrl.create({
      title: "Juego finalizado",
      message: "Tu puntuación final es: " + this.points,
      buttons: [
        {
          text: "Continuar",
          role: "accept",
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    }).present();
  }

  static getDistance(lat1, lon1, lat2, lon2) {
    let R = 6371; // Radius of the earth in km
    let dLat = GamePage.deg2rad(lat2-lat1);  // deg2rad below
    let dLon = GamePage.deg2rad(lon2-lon1);
    let a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(GamePage.deg2rad(lat1)) * Math.cos(GamePage.deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = R * c; // Distance in km
    return Math.round(d);
  }

  static deg2rad(deg) {
    return deg * (Math.PI/180)
  }

}
