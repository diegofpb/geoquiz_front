import { Component } from '@angular/core';
import {App, IonicPage, ViewController} from 'ionic-angular';

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
      <button ion-item (click)="openPage()">
        <ion-icon item-start name="settings"></ion-icon>
        Configurar Cuenta
      </button>
      <button ion-item (click)="closeSession()">
        <ion-icon item-start name="log-out"></ion-icon>
        Cerrar Sesión
      </button>
    </ion-list>
  `
})

export class PopoverPage {
  constructor(private app: App,
              public viewCtrl: ViewController) {

  }

  closeSession() {
    this.close();
    this.app.getRootNav().setRoot('LoginPage');
  }

  openPage(){
    this.close();
  }

  close() {
    this.viewCtrl.dismiss();
  }
}
