import { Component } from '@angular/core';
import { Platform, Keyboard } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
//import { KeyboardPage } from '../pages/keyboard/keyboard';//

import { NativeStorage } from '@ionic-native/native-storage';
import { Storage } from '@ionic/storage';
import { KeyboardPage } from '../pages/keyboard/keyboard';


@Component({
  templateUrl: 'app.html'
})

/*
export class MyApp {
  rootPage:any = HomePage;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
*/
export class MyApp {
  rootPage:any;
  pushId:any;
  loginSid:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage, private nativeStorage: NativeStorage) {
    
    this.storage.get('loginSid').then((loginSid) => {
      this.loginSid=loginSid;
      if(this.loginSid==null){
        //this.rootPage=KeyboardPage;
        this.rootPage=HomePage;
      }else{
        this.rootPage=KeyboardPage;   
      }
    });   

    /*
    this.storage.get('pushId').then((pushId) => {
      this.pushId=pushId;
      if(this.pushId==null){
        this.rootPage=HomePage;
      }else{
        this.rootPage=KeyboardPage;   
      }
    });   
    */
   
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      
    });

  }
}
  

