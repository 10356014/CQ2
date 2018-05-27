import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { KeyboardPage } from '../keyboard/keyboard';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
<<<<<<< HEAD
  name:any; 
  city:any; 
=======
  name:any;
  city:any;

>>>>>>> master
  constructor(public navCtrl: NavController,public alertCtrl: AlertController) {

  }
 
  doConfirm() {
<<<<<<< HEAD
    let confirm = this.alertCtrl.create({
      title: '提示',
      message: '所選店鋪為「' + this.city + this.name + '」?', 
      buttons: [
        {
          text: '返回',
          handler: () => {
            console.log('Disagree clicked');
=======
    if (this.city == undefined || this.name == undefined) {
      let confirm = this.alertCtrl.create({
        title: '提示',
        message: '請選擇店鋪縣市及名稱',
        buttons: [
          {
            text: '返回',
            handler: () => {
              console.log('Disagree clicked');
            }
>>>>>>> master
          }
        ] 
      });
      confirm.present()
    }else {
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
    }
  }
}
