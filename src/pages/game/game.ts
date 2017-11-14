import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiConstantsProvider} from "../../providers/api-constants/api-constants";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public constants: ApiConstantsProvider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamePage');

    let continent = this.navParams.get(this.constants.CONTINENT);

    console.log(continent);

    let randomIndex = Math.floor(Math.random() * this.constants.COUNTRY_CODES[continent].length());
    let countryCode = this.constants.COUNTRY_CODES[continent][randomIndex];

    console.log(countryCode);
  }

}
