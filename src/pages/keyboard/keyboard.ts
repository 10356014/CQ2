import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/Http';
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
  num_plate:any;
  rid:any;
  returnCode:any;
  manualInput:any;



  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KeyboardPage');
  }

    postVIP(){
        let url='https://cq2.robelf.com/api.php?api=Extra_addNumPlate';

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let data={'num_plate':this.num_plate, 'rid':this.rid};

        this.http.post(url, data, options)			
        .subscribe(
            (data) => {
                    let ret=data.json();     
                    console.log(data);
                    if(ret.code==0){         
                        this.showSuccess();
                        this.num_plate="-1";
                        this.rid="1";
                        return;
                    }else{                   
                        this.showFail();
                        return;
                    }
                },
            (err) => {this.showAlert();}
        );	
    }
    //..........................................
    showAlert() {
        let alert = this.alertCtrl.create({
            title: '連線失敗!',
            subTitle: '請確定網路狀態, 或是主機是否提供服務中.',
            buttons: ['OK']
        });
        alert.present();
    }
    //..........................................
    showSuccess() {
        let alert = this.alertCtrl.create({
            title: '預約客呼叫成功!',
            buttons: ['OK']
        });
        alert.present();
    }	
    //..........................................
    showFail() {
        let alert = this.alertCtrl.create({
            title: '預約客呼叫失敗!',
            buttons: ['OK']
        });
        alert.present();
    }

//-------------------------------------------------------------------------------

    postCus(){
        let url='https://cq2.robelf.com/api.php?api=Extra_addNumPlate';

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let data={'num_plate':this.num_plate, 'rid':this.rid};

        this.http.post(url, data, options)			
        .subscribe(
                (data) => {
                    let ret=data.json();     //接收主機回傳代碼
                    console.log(data);
                    if(ret.code==0){         //如果成功註冊
                        this.tellSuccess();
                        this.num_plate='';
                        this.rid='';
                        return;
                    }else{                   //如果註冊失敗 
                        this.tellFail();
                        return;
                    }
                },
            (err) => {this.showAlert();}
        );	
    }
    //..........................................
    tellSuccess() {
      let alert = this.alertCtrl.create({
          title: '叫號成功!',
          buttons: ['OK']
      });
      alert.present();
    }	
    //..........................................
    tellFail() {
      let alert = this.alertCtrl.create({
          title: '叫號失敗!',
          buttons: ['OK']
      });
      alert.present();
    }

//-------------------------------------------------------------------------------

    loadData() {
        if(this.manualInput>1 && this.manualInput<999){
            this.postCus();
            this.manualInput="";
        }else if (this.manualInput<1 || this.manualInput>999 || this.manualInput=='') {
            let confirm = this.alertCtrl.create({
                title: '提示',
                message: '請輸入1~999',
                buttons: [
                {
                    text: '返回',
                    handler: () => {
                    console.log('Disagree clicked');
                    }

                }
                ] 
            });
            this.manualInput="";
            confirm.present()
        }
        
    }
}
