import { Component } from '@angular/core';
import {AlertController, NavController, PopoverController} from 'ionic-angular';
import {PopoverPage} from "../popover/popover";
import {ApiConstantsProvider} from "../../providers/api-constants/api-constants";
import {Storage} from "@ionic/storage";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user:any;
  param:any;

  constructor(public navCtrl: NavController,
              public popoverCtrl: PopoverController,
              public storage: Storage,
              public constants: ApiConstantsProvider,
              public alertCtrl: AlertController) {

    this.storage.get(this.constants.USERNAME)
      .then((username) => {
        this.user = username;
      });
    
    this.param = this.constants.CONTINENT;
    console.log(this.user);
  }

    presentPopover(myEvent:any) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

  startGame(){


    let alert = this.alertCtrl.create({
      title: 'Seleccione',
      message: 'Elige el continente',
      inputs: Object.keys(this.constants.COUNTRY_CODES).map((item:string) => {
        return {
          type: 'radio',
          label: item,
          value: item,
          checked: false
        };
      }),
      buttons: [{
        text: 'Cancelar',
        role: 'cancel'
      }, {
        text: 'Jugar',
        handler: (role: any) => {
          if (!role) {
            return false;
          }

          this.navCtrl.push('GamePage',{
            continent: role})
        }
      }]
    });
    alert.present();
  }

}
