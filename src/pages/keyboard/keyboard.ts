import { Component, AnimationStyleMetadata } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
/**
 * Generated class for the KeyboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-keyboard',
    templateUrl: 'keyboard.html',
})
export class KeyboardPage {
    //----------------------------------
    // 成員
    //----------------------------------  
    alert:any;
    manualInput:any;

    constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad KeyboardPage');
    }
    
    loadData() {
        if (this.manualInput>999) {
          let confirm = this.alertCtrl.create({
            title: '提示',
            message: '不可超過999',
            buttons: [
              {
                text: '返回',
                handler: () => {
                  console.log('Disagree clicked');
                }
    
              }
            ] 
          });
          confirm.present()
        /*
        }else if (this.manualInput) {
            let confirm = this.alertCtrl.create({
              title: '提示',
              message: '所選店鋪為「' + this.city + this.name + '」',
              buttons: [
                {
                  text: '返回',
                  handler: () => {
                    console.log('Disagree clicked');
                  }
                },
                {
                  text: '確認',
                  handler: () => {
                    console.log('Agree clicked');
                    this.navCtrl.push(KeyboardPage);
                  }
                }
              ]
            });
            confirm.present()
        */  
        }
        
    }
}
