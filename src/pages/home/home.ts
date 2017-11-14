import { Component } from '@angular/core';
import {NavController, PopoverController} from 'ionic-angular';
import {PopoverPage} from "../popover/popover";
import {ApiConstantsProvider} from "../../providers/api-constants/api-constants";
import {Storage} from "@ionic/storage";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  user:any;

  constructor(public navCtrl: NavController,
              public popoverCtrl: PopoverController,
              public storage: Storage,
              public constants: ApiConstantsProvider) {

    this.user = this.storage.get(this.constants.USERNAME);
    console.log(this.user);
  }

    presentPopover(myEvent:any) {
    let popover = this.popoverCtrl.create(PopoverPage);
    popover.present({
      ev: myEvent
    });
  }

}
