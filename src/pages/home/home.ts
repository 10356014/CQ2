import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { KeyboardPage } from '../keyboard/keyboard';
import { Http, URLSearchParams, RequestOptions, Headers } from '@angular/Http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';
import { NativeStorage } from '@ionic-native/native-storage';

//---------------------------------------------
import { ViewChild } from '@angular/core';
import { Select } from 'ionic-angular';
import { Events } from 'ionic-angular';

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
  myRid:number;
  store_name:any;
  addr:string;
  value:string;
  myString:string[];
  myArray:string[];
  myId=[];
  myAddr=[];
  myStore_name=[];
  myCityStore=[];
  myCityStoreId=[];
  passWordInput:any;
  pwd:any;
  RequestOptions:any;

  loginSid:any;
  loginPassword:any;

  constructor(public navCtrl: NavController, public http:Http, public alertCtrl: AlertController, public storage: Storage, public nativeStorage: NativeStorage,public events: Events) {
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
    
    this.navCtrl.swipeBackEnabled = false;
    

    //讀取storage
    this.storage.get('citySelect').then((citySelect) => {
      console.log('選擇縣市：', citySelect);
      this.citySelect=citySelect;
      this.selectCity(this.citySelect);
      this.clickStore();

    });
    

    this.storage.get('pushId').then((pushId) => {
    console.log('選擇店鋪ID', pushId);
    this.pushId=pushId;
    });

    this.storage.get('storeSelect').then((storeSelect) => {
      console.log('選擇店鋪', storeSelect);
      this.storeSelect=storeSelect;
    });

    this.sid=this.pushId;
    this.store_name=this.storeSelect;

  }

  @ViewChild('mySelect') selectRef: Select;
  /*
  selectOptions = {
    title: '',
    mode: 'ios'
  }
  */

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
		  
      //如果集合內沒有相同的值，就放入result中
      if (this.result.has(addr.substring(0,3)) != true){
        this.result.add(addr.substring(0,3));
      }  
    }  
    this.selectCity(this.citySelect);   
  }

//店鋪縣市------------------------------------------------------------
  selectCity(citySelect) {  
    console.log(citySelect);  
    this.myCityStore=[];
    this.myCityStoreId=[];

    this.storage.set('citySelect', citySelect);
    this.clickStore()

    for(var i=0; i< this.myAddr.length; i++){
      if (citySelect==this.myAddr[i]){
        var cityStore= this.myStore_name[i];
        this.myCityStore.push(cityStore);
        var cityStoreId= this.myId[i];
        this.myCityStoreId.push(cityStoreId);
      }
    }
  }  

//clickStore---------------------------------------------------------
  
  clickStore(){
    
    if(this.citySelect==null){
      this.selectRef.disabled=true;
      /*
      let alert = this.alertCtrl.create({
        title: '提示',
        message: '請先選擇店鋪所在的縣市',
        buttons: [
          {
            text: '確認',
            role: '確認',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      alert.present();
      this.selectRef.close();
      
      this.selectOptions = {
        title: '請先選擇店鋪所在的縣市',
        mode: 'ios'
      }
      */
    }else{
      this.selectRef.disabled=false;
      /*
      this.selectOptions = {
        title: '店鋪名稱',
        mode: 'ios'
      }
      */
    } 
  }

//店鋪名稱------------------------------------------------------------
  selectStore(storeSelect) {  
    console.log(storeSelect); 
     
    this.storage.set('storeSelect', storeSelect);
    console.log(storeSelect);
    
    for(var i=0; i< this.myStore_name.length; i++){
      if (this.myStore_name[i]==storeSelect){
        var selectId=this.myId[i];
      }
    }
    
    this.pushId = selectId;
    this.storage.set('pushId', this.pushId);
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

  //確認登入密碼------------------------------------------------------------
  checkPassword(password) {
     //記住password
     this.loginPassword=this.passWordInput;
     console.log(this.loginPassword);

     this.storage.set('loginPassword', this.loginPassword);

     this.storage.get('loginPassword').then((loginPassword) => {
       console.log('loginPassword:', loginPassword);
     });

    let params = new FormData();
      params.append('password', password);
      this.http.post('https://cq2.robelf.com/api.php?api=Extra_checkPassWord', params, {withCredentials: true})
      .subscribe(data => {
        this.pwd=data.json()['result'];
        console.log(this.pwd);

        if(this.pwd == 0){
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
                
                this.storage.get('pushId').then((pushId) => {
                    console.log('選擇店鋪ID', pushId);
                    this.pushId=pushId;
                });
                this.storage.get('storeSelect').then((storeSelect) => {
                  console.log('選擇店鋪', storeSelect);
                  this.storeSelect=storeSelect;
                });
  
                this.sid=this.pushId;
                this.store_name=this.storeSelect;
                this.loginSid=this.sid;

                //登入設定
                this.storage.set('loginSid', this.loginSid);

                this.storage.get('loginSid').then((loginSid) => {
                  console.log('Push店sid:', loginSid);
                });

                //console.log(this.sid);
                //this.storage.set('sid', this.sid);
                this.navCtrl.push(KeyboardPage, {sid:this.sid , store_name:this.store_name});
  
                /*let params = new FormData();
                params.append('sid', this.pushId);
                this.http.post('https://cq2.robelf.com/api.php?api=Extra_getRid',params)
                .subscribe(data => {
                    this.rid_result=data.json()['result'];
                    this.sid=data.json()['data'];
                    this.navCtrl.push(KeyboardPage, {rid:this.rid});
                    this.navCtrl.push(KeyboardPage, {sid:this.sid});
                    if(this.rid_result!=0){
                      let alert = this.alertCtrl.create({
                      title: '通知',
                      subTitle: '店鋪沒有機器人',
                      buttons: ['返回']
                      });
                    alert.present();
                    }else{
                      this.storage.set('rid',this.rid);
                      this.storage.get('rid').then((val) => {
                        this.myRid=Number(val);
                        this.navCtrl.push(KeyboardPage, {myRid:this.myRid});
                        });
                        this.navCtrl.push(KeyboardPage, {rid:this.rid});
                    }
  
                }, error => {
                    this.showAlert();
                });*/
              }
            }]
          });
          confirm.present()
        }else{
          let confirm = this.alertCtrl.create({
            title: '提示',
            message: '登入密碼錯誤',
            buttons: [
              {
                text: '返回',handler: () => {}
              }
            ] 
          });
          confirm.present()
        } 

      }, error => {
        this.showAlert();
      }
      );

     

      /*let headers = new Headers({"Content-Type":"application/json; charset=UTF-8",
      "Accept":"application/json",
      "Access-Control-Allow-Origin" : "*",
      'Allow-Control-Allow-Origin': '*'
      });
      let options = new RequestOptions({ withCredentials: true, headers: headers});
      let data={'password':password};

      this.http.post('https://cq2.robelf.com/api.php?api=Extra_checkPassWord', data, options)			
          .subscribe(
              (data) => {
                  this.pwd=data.json();
                  password="";
                  console.log(this.pwd);
              },
              (err) => {this.showAlert();}
          );	*/
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
    }else if(this.passWordInput == undefined){
      let confirm = this.alertCtrl.create({
        title: '提示',
        message: '請輸入登入密碼',
        buttons: [
          {
            text: '返回',handler: () => {}
          }
        ] 
      });
      confirm.present()
    }else{
      this.checkPassword(this.passWordInput);
    }    
  }
}

