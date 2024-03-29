import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from "@ionic/storage"


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import { ApiConstantsProvider } from '../providers/api-constants/api-constants';
import {HttpModule} from "@angular/http";
import { ApiProvider } from '../providers/api/api';
import {PopoverPage} from "../pages/popover/popover";
import {Md5} from 'ts-md5/dist/md5';
import { Geolocation } from '@ionic-native/geolocation';
import {LoginPageModule} from "../pages/login/login.module";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PopoverPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    LoginPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    PopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiConstantsProvider,
    ApiProvider,
    Md5,
    Geolocation
  ]
})
export class AppModule {}
