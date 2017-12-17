import {Component} from '@angular/core';
import {AlertController, App, IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, Validators} from "@angular/forms";
import {Storage} from "@ionic/storage";
import {ApiProvider} from "../../providers/api/api";
import {HomePage} from "../home/home";
import {ApiConstantsProvider} from "../../providers/api-constants/api-constants";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  registerCredentials: any;


  constructor(public navCtrl: NavController,
              public app: App,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              public storage: Storage,
              public api: ApiProvider,
              public apiConstants: ApiConstantsProvider,
              public alertCtrl: AlertController) {


    this.registerCredentials = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  sendCredentials() {
    this.api.getUser(this.registerCredentials.value.username)
      .subscribe((response: any) => {

        if (this.registerCredentials.value.password === response.password) {
          this.storage.set(this.apiConstants.USERNAME, response.username)
            .then((data) => {
              console.log(data);
              this.navCtrl.setRoot(HomePage);
            });
        } else {
          this.showError();
        }

      }, (error: any) => {
        console.log(error);
        this.showError();
      });

  }

  showError() {
    this.alertCtrl.create({
      title: "Error",
      message: "Usuario o contraseña incorrectos",
      buttons: [
        {
          text: "Aceptar",
          role: "accept"
        }
      ]
    }).present();
  }

  register() {
    this.app.getRootNav().push('ProfilePage');
  }

}
