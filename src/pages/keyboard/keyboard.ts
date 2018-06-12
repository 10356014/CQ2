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
    
    returnCode:any;
    manualInput:any;
    //---------
    alert:any;
    sid:number;
    rid:any;
    //---------
    LastData:any[];//getLastNum帶回來的資料
    LastNum:number; //當前叫號
    lastRid:number[];
    lastNum_plate:number[];
    lastTime: Date[];
    //---------
    data:any;
    vip:any;//VIP的回傳
    LastNumber:any;
    LastNumber_result:any;
    num_plate:any;



    
    constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public alertCtrl: AlertController) {
        this.rid = this.navParams.get('rid'); //接收上一頁的ID
        console.log(this.rid);
        this.getLastNumber();

        
    }

    /*ionViewDidLoad() {
        console.log('KeyboardPage');
        console.log(this.rid);
    }*/

    //..........................................
       /*for(var i=0; i< this.LastData.length; i++){
                //取出若干欄位資料
            var rid=this.LastData[i].rid;				
            var num_plate=this.LastData[i].num_plate;
            var time= this.LastData[i].time;

            //將存有資料的物件加入陣列
            this.lastRid.push(rid);
            this.lastNum_plate.push(num_plate);
            this.lastTime.push(time);

            time=Math.max(time.getTime(),time);
            return time;
            console.log(time);
        }*/

        
    
    //..........................................
    showAlert() {
        let params = new FormData();
        params.append('rid', this.rid);
        this.http.post('https://cq2.robelf.com/api.php?api=Extra_getLastNumber',params)
            .subscribe(data => {
                this.LastData=data.json()['data'];
                console.log(this.LastData);
            }, error => {
                this.showAlert();
            });
    }

    //--重刷--//
    doRefresh(refresher) {
        this.getLastNumber();
        console.log('Begin async operation', refresher);
    
        setTimeout(() => {
          console.log('Async operation has ended');
          refresher.complete();
        }, 1000);
    }
    
    //--當前號碼--//
    getLastNumber(){
        //------------------------------
        let params = new FormData();
        params.append('rid', this.rid);
        this.http.post('https://cq2.robelf.com/api.php?api=Extra_getLastNumber',params)
            .subscribe(data => {
                this.LastNumber_result=data.json()['result'];
                this.data=data.json()['data'];
                this.num_plate= this.data.num_plate;

                console.log("----------------");
                console.log(this.LastNumber_result);
                console.log(this.num_plate);

            }, error => {
                this.showAlert();
            });
    }

    //--預約客叫號--//
    callVIP(){
        let params = new FormData();
        params.append('num_plate', "-1");
        params.append('rid', this.rid);
        this.http.post('https://cq2.robelf.com/api.php?api=Extra_addNumPlate',params)
            .subscribe(data => {
                this.vip=data.json()['data'];
                console.log(this.vip);

                if (this.vip==true){
                    let alert = this.alertCtrl.create({
                        title: '提示',
                        subTitle: '預約客呼叫完成',
                        buttons: ['確定']
                    });
                    alert.present();
                    }
                else{ 
                  this.navCtrl.push(KeyboardPage, {rid:this.rid});
                }

            }, error => {
                this.showAlert();
            });
    }
    //-------------------------------------------------------------------------------
    //按下加一
    /*postCus(callingNum){
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
    }*/
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
            this.manualInpu
            
            confirm.present()
        }
        
    }*/
    

}
