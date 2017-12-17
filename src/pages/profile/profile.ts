import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {ApiProvider} from "../../providers/api/api";
import {ApiConstantsProvider} from "../../providers/api-constants/api-constants";
import {Storage} from "@ionic/storage";
import {FormBuilder, Validators} from "@angular/forms";
import {HomePage} from "../home/home";


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  myAccount: any;
  loading: any;
  username: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public api: ApiProvider,
              public constants: ApiConstantsProvider,
              public storage: Storage,
              public formBuilder: FormBuilder,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController,) {

    this.myAccount = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', Validators.required],
      validated: ['', Validators.required]
    })


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.storage.get(this.constants.USERNAME)
      .then((username) => {
        this.getUserData(username);
        this.username = username;
      });
  }

  getPreviousPage(){
    this.navCtrl.setRoot(HomePage);
  }

  getUserData(username: string) {
    this.api.getUser(username).subscribe((response: any) => {
      this.setDataToForm(response);
    }, (error: any) => {
      console.log(error);
    });
  }

  setDataToForm(data: any) {
    this.myAccount.controls['username'].setValue(data.username);
    this.myAccount.controls['password'].setValue(data.password);
    this.myAccount.controls['country'].setValue(data.country);
    this.myAccount.controls['email'].setValue(data.email);
    this.myAccount.controls['validated'].setValue(data.validated);

  }

  setUserData() {

    this.presentLoadingCustom();
    this.api.postUser(this.myAccount)
      .subscribe((response: any) => {
        console.log(response);
        this.loading.dismiss();

        this.storage.set(this.constants.USERNAME, this.myAccount.value.username)
          .then((data) => {

            let alert = this.alertCtrl.create({
              title: 'Operación completada',
              subTitle: 'Se ha modificado su perfil correctamente.',
              buttons: ['Aceptar']
            });

            alert.present();

          });

      }, (error: any) => {
        console.log(error);
        this.loading.dismiss();

        let alert = this.alertCtrl.create({
          title: 'Operación fallida',
          subTitle: 'Hubo un error al modificar su perfil..',
          buttons: ['Aceptar']
        });

        alert.present();

      });
  }

  private presentLoadingCustom() {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    this.loading.present();
  }

}