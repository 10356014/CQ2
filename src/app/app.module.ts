import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule } from '@angular/Http';
import { Insomnia } from '@ionic-native/insomnia';
import { IonicStorageModule } from '@ionic/storage';
import { NativeStorage } from '@ionic-native/native-storage';


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
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
    /*
    IonicModule.forRoot(MyApp, {  
    backButtonText: '11', // 配置返回按钮的文字  
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
    NativeStorage ,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
