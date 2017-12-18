import { Component } from '@angular/core';
import { AlertController, IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from "../../providers/api/api";
import { ApiConstantsProvider } from "../../providers/api-constants/api-constants";
import { Storage } from "@ionic/storage";


/**
 * Generated class for the SearchFriendsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-friends',
  templateUrl: 'search-friends.html',
})
export class SearchFriendsPage {

  users: any;
  usersByCountry: any;
  usersFilter: string = "filterByUsername";
  loading: any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public api: ApiProvider,
              public constants: ApiConstantsProvider,
              public storage: Storage,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController,) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchFriendsPage');
    this.getUsers();
    this.getUsersOrderByCountry();
  }

  public addFriend(userToAdd: String) {

    this.presentLoadingCustom();

    this.storage.get(this.constants.USERNAME)
      .then((username) => {

        this.api.addFriend(username, userToAdd)
          .subscribe((response: any) => {
            console.log(response);
            this.loading.dismiss();

            let alert = this.alertCtrl.create({
              title: 'Operación completada',
              subTitle: 'Se ha enviado petición de amistad.',
              buttons: [ 'Aceptar' ]
            });

            alert.present();

          }, (error: any) => {
            console.log(error);
            this.loading.dismiss();

            let alert = this.alertCtrl.create({
              title: 'Operación erronea.',
              subTitle: JSON.parse(error._body).message,
              buttons: [ 'Aceptar' ]
            });

            alert.present();
          });

      });
  }

  public getUsers() {

    this.api.getUsers()
      .subscribe((response: any) => {
        this.users = response;


      }, (error: any) => {
        console.log(error);

      });

  }

  public getUsersOrderByCountry() {

    this.api.getUsersOrderByCountry()
      .subscribe((response: any) => {
        this.usersByCountry = response;


      }, (error: any) => {
        console.log(error);

      });

  }

  private presentLoadingCustom() {
    this.loading = this.loadingCtrl.create({
      content: 'Cargando...'
    });
    this.loading.present();
  }
}
