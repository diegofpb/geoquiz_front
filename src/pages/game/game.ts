import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiConstantsProvider} from "../../providers/api-constants/api-constants";
import {ApiProvider} from "../../providers/api/api";
import {Md5} from 'ts-md5/dist/md5';

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

  imageUrl: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public constants: ApiConstantsProvider, public api:ApiProvider, public md5:Md5) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');

    let continent = this.navParams.get(this.constants.CONTINENT);

    console.log(continent);

    let randomIndex = Math.floor(Math.random() * this.constants.COUNTRY_CODES[continent].length);
    let countryCode = this.constants.COUNTRY_CODES[continent][randomIndex];

    this.api.getMonuments(countryCode).subscribe((monument:any) => {
      this.setImageSrc(monument[0].image);
    });

    console.log(countryCode);
  }

  setImageSrc(image:string){
    image = image.replace(" ", "_");
    console.log(this.md5.appendStr(image).start());
  }

}
