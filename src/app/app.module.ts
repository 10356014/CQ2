import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/Http';
import { Insomnia } from '@ionic-native/insomnia';
import { IonicStorageModule } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage';
import { Keyboard } from '@ionic-native/keyboard';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { KeyboardPage } from '../pages/keyboard/keyboard';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    KeyboardPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    //鍵盤
    IonicModule.forRoot(MyApp,{
      /*
      scrollAssist: false,
      autoFocusAssist: false,
      */
      scrollPadding: false,  // Valid options appear to be [true, false]
      scrollAssist: false,
      autoFocusAssist: false// Valid options appear to be ['instant', 'delay', false]
        

    })

    /*原始
    IonicModule.forRoot(MyApp),
    */
    /*
    IonicModule.forRoot(MyApp, {  
    backButtonText: '登出', // 配置返回按钮的文字  
    backButtonIcon: 'arrow-dropleft-circle' // 配置返回按钮的图标  
    }) 
    */
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    KeyboardPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Insomnia,
    Keyboard,
    NativeStorage ,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
