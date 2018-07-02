import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/Http';
import { AlertController } from 'ionic-angular';
import { OnInit,ChangeDetectionStrategy,ChangeDetectorRef,OnDestroy} from  "@angular/core";
import { Insomnia } from '@ionic-native/insomnia';

@IonicPage()
@Component({
  selector: 'page-keyboard',
  templateUrl: 'keyboard.html',
})

export class KeyboardPage {
    num_plate:any;
    manualInput:any;
    rid:any;
    sid:any;
    data:any;
    vip:any;
    cus:any;
    input:any;
    interval:any;
    duration:any;
    myRid:any;
    private timer;
    
    constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http, public alertCtrl: AlertController, private ref : ChangeDetectorRef, public insomnia: Insomnia) {
        //this.rid = this.navParams.get('rid'); //接收上一頁的ID
        this.sid = this.navParams.get('sid'); //接收上一頁的ID
        this.getLastNum();

        this.insomnia.keepAwake()
        .then(
            () => console.log('success'),
            () => console.log('error')
        );

        var dur = 1;
        this.interval = setInterval(()=>{
            dur = dur +1;
            this.duration = dur;
            this.getLastNum();
        }, 1200);
    }

//停止計時器-----------------------------------------------------------------------------
    ionViewWillLeave(){
        clearInterval(this.interval);
    }

//刷新-----------------------------------------------------------------------------------
    doRefresh(refresher) {
        this.getLastNum();
        this.manualInput="";
        console.log('Begin async operation', refresher);
    
        setTimeout(() => {
          console.log('Async operation has ended');
          refresher.complete();
        }, 1000);
    }

//當前叫號--------------------------------------------------------------------------------
    getLastNum(){
        let params = new FormData();
        params.append('sid', this.sid);
        this.http.post('https://cq2.robelf.com/api.php?api=Extra_getLastNumber',params)
            .subscribe(data => {
                this.data=data.json()['data'];
                this.num_plate= this.data.num_plate;
                console.log(this.num_plate);

            }, error => {
                this.showAlert();
            });
    }

//預約客叫號-----------------------------------------------------------------------------
   callVIP(){
        let confirm = this.alertCtrl.create({
            title: '提示',
            message: '即將呼叫預約客',
            buttons: [
              {
                text: '返回',
                handler: () => {}
              },
              {
                text: '確認',
                handler: () => {
                    let params = new FormData();
                    params.append('num_plate', '-1');
                    params.append('rid', this.rid);
                    this.http.post('https://cq2.robelf.com/api.php?api=Extra_addNumPlate',params)
                    .subscribe(data => {
                        this.vip=data.json()['result'];
                                if(this.vip == 1){
                                    let alert = this.alertCtrl.create({
                                        title: '提示',
                                        subTitle: '預約客已在叫號列表中',
                                        buttons: ['確定']
                                    });
                                    alert.present();
                                }
                        }, error => {
                            this.showAlert();
                        }
                    );
                }
              }
            ]
        });
        confirm.present()
    } 

//一般客叫號-----------------------------------------------------------------------------
   callCus(){
        if(this.num_plate == "999"){
            var callNum = "1";
        }else{
            var callNum = String(Number(this.num_plate)+1); 
        }
        let confirm = this.alertCtrl.create({
            title: '提示',
            message: '即將呼叫' + callNum + '號',
            buttons: [
              {
                text: '返回',
                handler: () => {}
              },
              {
                text: '確認', 
                handler: () => {
                    let params = new FormData();
                    params.append('num_plate', callNum);
                    params.append('sid', this.sid);
                    this.http.post('https://cq2.robelf.com/api.php?api=Extra_addNumPlate',params)
                    .subscribe(data => {
                        this.cus=data.json()['result'];
                            if(this.cus == 1){
                                let alert = this.alertCtrl.create({
                                    title: '提示',
                                    subTitle: callNum + '號已在叫號列表中',
                                     buttons: ['確定']
                                });
                                alert.present();
                            }
                        }, error => {
                            this.showAlert();
                        }
                    );
                }
              }
            ]
        });
        confirm.present()
    } 
    
//手動輸入叫號-----------------------------------------------------------------------------
  callInput(manualInput){
        var inputNum = manualInput;
        let confirm = this.alertCtrl.create({
            title: '提示',
            message:  '即將呼叫' + inputNum + '號',
            buttons: [
                {
                    text: '返回',
                    handler: () => {}
                },
                {
                    text: '確認',
                    handler: () => {
                        let params = new FormData();
                        params.append('num_plate', inputNum);
                        params.append('sid', this.sid);
                        this.http.post('https://cq2.robelf.com/api.php?api=Extra_addNumPlate',params)
                        .subscribe(data => {
                            this.input=data.json()['result'];
                            this.getLastNum();
                            if(this.input == 1){
                                let alert = this.alertCtrl.create({
                                    title: '提示',
                                    subTitle: inputNum + '號已在叫號列表中',
                                    buttons: ['確定']
                                });
                                alert.present();
                            }}, error => {
                                this.showAlert();
                            }
                        );
                    }
                }
            ]
        });
        confirm.present()
    } 
                

/*callInput(manualInput){
    let params = new FormData();
    params.append('num_plate', this.manualInput);
    params.append('rid', this.rid);
    this.http.post('https://cq2.robelf.com/api.php?api=Extra_addNumPlate',params)
        .subscribe(data => {
            this.input=data.json()['result'];
            console.log(this.input);
            if(this.input == 0){
                let alert = this.alertCtrl.create({
                    title: '提示',
                    subTitle: '叫號成功',
                    buttons: ['確定']
                });
                alert.present();
                this.getLastNum();
            }else{
                let alert = this.alertCtrl.create({
                    title: '提示',
                    subTitle: '此號碼已在叫號列表中',
                    buttons: ['確定']
                });
                alert.present();
            }}, error => {
                this.showAlert();
            });
}*/

//連線失敗訊息---------------------------------------------------------------------------
    showAlert() {
        let alert = this.alertCtrl.create({
            title: '連線失敗!',
            subTitle: '請確定網路狀態, 或是主機是否提供服務中.',
            buttons: ['OK']
        });
        alert.present();
    }
    
//手動輸入-------------------------------------------------------------------------------
    loadData() {
        if(this.manualInput>0 && this.manualInput<1000){
            this.callInput(this.manualInput);
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
