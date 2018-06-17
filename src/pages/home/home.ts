import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { KeyboardPage } from '../keyboard/keyboard';
import { Http } from '@angular/Http';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  result:any; 
  rid:any;
  items:any;
  item:any;
  storeSelect:any;
  citySelect:any;
  selectId:any;
  pushId:any;
  rid_result:any;
  id:number;
  sid:number;
  store_name:string;
  addr:string;
  value:string;
  myString:string[];
  myArray:string[];
  myId=[];
  myAddr=[];
  myStore_name=[];
  myCityStore=[];
  myCityStoreId=[];
  myRid:number;

	constructor(public navCtrl: NavController, public http:Http, public alertCtrl: AlertController, public storage: Storage) {
      /*
      if (this.storage.get('rid')!=null){
        console.log(this.storage.get('rid'));
        //this.navCtrl.push(KeyboardPage, {rid:this.storage.get('rid')});
        console.log('rid is'+this.rid);
      }
      */
      this.storage.get('rid').then((val) => {
        this.myRid=Number(val);
        if ((this.myRid) !==null){
          this.navCtrl.push(KeyboardPage, {myRid:this.myRid});
        }
      });

      

    	let params: URLSearchParams = new URLSearchParams();
		  this.http.post('https://cq2.robelf.com/api.php?api=Extra_getStoreList', {search: params})			
          .subscribe(
            (data) => {
              this.items=data.json()['data'];
              this.getData(this.items);
            },(err) => {
              this.showAlert();
            }
          );


   }

//資料陣列------------------------------------------------------------
	getData(myString){	
      this.result = new Set(); //新增集合	
      
      for(var i=0; i< myString.length; i++){
		    //取出若干欄位資料
        var id= myString[i].id;
        var addr=myString[i].addr;				
        var store_name=myString[i].store_name;

        //將存有資料的物件加入陣列
        this.myId.push(id);
        this.myAddr.push(addr.substring(0,3));//擷取地址前3位放入陣列
        this.myStore_name.push(store_name);
		    
        //如果集合內沒有相同的值，就放入reault中
        if (this.result.has(addr.substring(0,3)) != true){
           this.result.add(addr.substring(0,3));
        }
        
      }                  
  }

//店鋪縣市------------------------------------------------------------
  selectCity(citySelect) {  
    console.log(citySelect);  
    this.myCityStore=[];
    this.myCityStoreId=[];
    
    for(var i=0; i< this.myAddr.length; i++){
      if (this.myAddr[i]==citySelect){
      var cityStore= this.myStore_name[i];
      this.myCityStore.push(cityStore);
      var cityStoreId= this.myId[i];
      this.myCityStoreId.push(cityStoreId);
      }
    }
  }  

//店鋪名稱------------------------------------------------------------
  selectStore(storeSelect) {  
    console.log(storeSelect);  
    for(var i=0; i< this.myStore_name.length; i++){
      if (this.myStore_name[i]==storeSelect){
        var selectId=this.myId[i];
      }
    }
    this.pushId = selectId;
    console.log(this.pushId);
  }  

 //連線失敗訊息------------------------------------------------------------
  showAlert() {
      let alert = this.alertCtrl.create({
          title: '連線失敗!',
          subTitle: '請確定網路狀態, 或是主機是否提供服務中.',
          buttons: ['OK']
      });
      alert.present();
  }

 //防呆訊息----------------------------------------------------------------
  doConfirm() {
    if (this.citySelect == undefined || this.storeSelect == undefined) {
      let confirm = this.alertCtrl.create({
        title: '提示',
        message: '請選擇店鋪縣市及名稱',
        buttons: [
          {
            text: '返回',handler: () => {}
          }
        ] 
      });
      confirm.present()
    }else{
      let confirm = this.alertCtrl.create({
        title: '提示',
        message: '所選店鋪為「' + this.citySelect + this.storeSelect + '」',
        buttons: [
          {
            text: '返回',
            handler: () => {}
          },
          {
            text: '確認',
            handler: () => {
            
            let params = new FormData();
            params.append('sid', this.pushId);
            this.http.post('https://cq2.robelf.com/api.php?api=Extra_getRid',params)
            .subscribe(data => {
                this.rid_result=data.json()['result'];
                this.rid=data.json()['data'];

                if(this.rid_result!=0){
                  let alert = this.alertCtrl.create({
                  title: '通知',
                  subTitle: '店鋪沒有機器人',
                  buttons: ['返回']
                  });
                alert.present();
                }else{
                  //存下rid
                  
                  this.storage.set('rid',this.rid);
                  this.storage.get('rid').then((val) => {
                    this.myRid=Number(val);
                    this.navCtrl.push(KeyboardPage, {myRid:this.myRid});
                    });
                }
            }, error => {
                this.showAlert();
            });
          }
        }]
      });
      confirm.present()
    }     
  }
  /*
  getLocalData(){
  // set a key/value
    this.storage.set('rid',this.rid);
  }
  lookLocalData(){
    // Or to get a key/value pair
    this.storage.get('rid').then((val) => {
      console.log('Your rid is', val);
    });
  }
  */
}