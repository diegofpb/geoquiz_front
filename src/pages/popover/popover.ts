import { Component } from '@angular/core';
import { App, IonicPage, ViewController } from 'ionic-angular';
import { ApiConstantsProvider } from "../../providers/api-constants/api-constants";
import { Storage } from "@ionic/storage";


/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  template: `
    <ion-list>
      <ion-list-header>Opciones de la cuenta</ion-list-header>
      <button ion-item (click)="this.openPage()">
        <ion-icon item-start name="settings"></ion-icon>
        Configurar Cuenta
      </button>
      <button ion-item (click)="this.closeSession()">
        <ion-icon item-start name="log-out"></ion-icon>
        Cerrar Sesión
      </button>
    </ion-list>
  `
})

export class PopoverPage {
  constructor(private app: App,
              public viewCtrl: ViewController,
              public storage: Storage,
              public constants: ApiConstantsProvider) {

  }

  closeSession() {
    this.storage.remove(this.constants.USERNAME);
    this.close();
    this.app.getRootNav().setRoot('LoginPage');
  }

  openPage() {
    this.close();
    this.app.getRootNav().push('ProfilePage');

  }

  close() {
    this.viewCtrl.dismiss();
  }
}
