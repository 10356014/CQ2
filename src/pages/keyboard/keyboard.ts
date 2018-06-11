import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/Http';
import { RequestOptions, Headers } from '@angular/Http';
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
    //--------
    num_plate:any;
    returnCode:any;
    manualInput:any;
    //---------
    alert:any;
    sid:any;
    rid:any;
    //---------
    LastData:any;
    LastNum:number; //當前叫號
    //---------
    data:any;
        constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public alertCtrl: AlertController) {
            
            this.rid = this.navParams.get('rid'); //接收上一頁的ID
            console.log(this.rid);
            

}
    /*
    ionViewDidLoad() {
        console.log('KeyboardPage');
        console.log(this.rid);
    }
    */
    //..........................................
    //--取得當前叫號--//
    getLastNum(rid){
        let url='https://cq2.robelf.com/api.php?api=Extra_getLastNumber ';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let data={'rid': this.rid };
        console.log(this.rid);

        this.http.post(url, data, options)			
            .subscribe(
                (data) => {
                    this.LastData=data.json()['data'];
                    console.log(this.LastNum);


                }, error => {
                        this.showAlert();
        });
        

       for(var i=0; i< this.LastData.length; i++){
                //取出若干欄位資料
            var rid=this.LastData[i].rid;				
            var num_plate=this.LastData[i].num_plate;
            var time= this.LastData[i].time;

            //將存有資料的物件加入陣列
            this.lastRid.push(rid);
            this.lastNum_plate.push(num_plate);//擷取地址前3位放入陣列
            this.lastTime.push(time);

            this.time=Max(time.getTime(),time);
        }

        
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
    

    //--預約客叫號--//
    postVIP(){
        let url='https://cq2.robelf.com/api.php?api=Extra_addNumPlate';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let data={'num_plate': -1 , 'rid':this.rid};

        this.http.post(url, data, options)			
        .subscribe(
            (data) => {
                    let ret=data.json()['result'];     
                    console.log(ret);
                    if(ret==0){         
                        this.showSuccess();
                    }else{                   
                        this.showFail();
                        return;
                    }
                },
            (err) => {this.showAlert();}
        );	
    }
    //-------------------------------------------------------------------------------
    //按下加一
    postCus(callingNum){
        this.getCallingNum();
        let url='https://cq2.robelf.com/api.php?api=Extra_addNumPlate';
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let data={'num_plate':this.callingNum + 1, 'rid':this.rid};

        this.http.post(url, data, options)			
        .subscribe(
                (data) => {
                    let result =data.json()['result'];     //接收主機回傳代碼
                    console.log(result);
                    if(result.code==0){         //如果成功註冊
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
    //..........................................
    //..........................................
    /*loadData() {
        if(this.manualInput>1 && this.manualInput<999){
            this.postCus(this.manualInput);
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
        
    }*/

}
