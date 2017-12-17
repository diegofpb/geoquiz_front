import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {ApiConstantsProvider} from "../../providers/api-constants/api-constants";
import {ApiProvider} from "../../providers/api/api";

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  notificationNumber: any;
  notifications:any;
  username:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public storage: Storage,
              public constants: ApiConstantsProvider,
              public api: ApiProvider,
              public viewCtrl: ViewController,
  ) {

    this.storage.get(this.constants.USERNAME)
      .then((username) => {
        this.getNotifications(username);
        this.username = username;
      });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

  public getNotifications(username: any) {
    this.api.getPendingFriends(username)
      .subscribe((response: any) => {
        console.log(response);
        this.notificationNumber = response.length;
        this.notifications = response;
      }, (error: any) => {
        console.log(error);
      });
  }

  public acceptFriendship(user:any){

    this.api.acceptFriendship(user,this.username)
      .subscribe((response: any) => {
        this.getNotifications(this.username);
      }, (error: any) => {
        console.log(error);
      });

  }

  dismissModal() {
    let data = { 'number': this.notificationNumber };
    this.viewCtrl.dismiss(data);
  }


}
