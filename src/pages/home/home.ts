import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { KeyboardPage } from '../keyboard/keyboard';
import { Http } from '@angular/Http';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    id:number;
    store_name:string;
    addr:string;
    sid:number;
    name:any;
    city:any;
    items:any;
    item:any;
    test:object[];
    myString:string[];
    myArray:string[];
    myId=[];
    myAddr=[];
    myStore_name=[];
    result:any; //存放縣市的集合
    myCityStore=[];
    myCityStoreId=[];
    value:string;
    storeSelect:any;
    citySelect:any;
    selectId:any;
    pushId:any;

  //----------------------------------
	constructor(public navCtrl: NavController, public http:Http, public alertCtrl: AlertController) {
    	// 傳給主機的參數
    	let params: URLSearchParams = new URLSearchParams();
		  this.http.post('https://cq2.robelf.com/api.php?api=Extra_getStoreList', {search: params})			
          .subscribe(
            (data) => {
              this.items=data.json()['data'];
              this.getData(this.items);
              //console.log(this.items);
          },
            (err) => {this.showAlert();
            }
      );

  }
    
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

  selectCity(citySelect) {  
    console.log(citySelect);  
    for(var i=0; i< this.myAddr.length; i++){
      if (this.myAddr[i]==citySelect){

      var cityStore= this.myStore_name[i];
      this.myCityStore.push(cityStore);
      var cityStoreId= this.myId[i];
      this.myCityStoreId.push(cityStoreId);
      }
    }
  }  

  selectStore(storeSelect) {  
    console.log(storeSelect);  
    
    for(var i=0; i< this.myStore_name.length; i++){
      if (this.myStore_name[i]=storeSelect){
        var selectId=this.myId[i];
      }
    }
    this.pushId = selectId;
    console.log(this.pushId);
  }  

 //----------------------------------------------------------------
  showAlert() {
      let alert = this.alertCtrl.create({
          title: '連線失敗!',
          subTitle: '請確定網路狀態, 或是主機是否提供服務中.',
          buttons: ['OK']
      });
      alert.present();
  }
 //----------------------------------------------------------------

  doConfirm() {
    if (this.citySelect == undefined || this.storeSelect == undefined) {
      let confirm = this.alertCtrl.create({
        title: '提示',
        message: '請選擇店鋪縣市及名稱',
        buttons: [
          {
            text: '返回',
            handler: () => {
            }

          }
        ] 
      });
      confirm.present()
    }else {
      let confirm = this.alertCtrl.create({
        title: '提示',
        message: '所選店鋪為「' + this.citySelect + this.storeSelect + '」',
        buttons: [
          {
            text: '返回',
            handler: () => {
            }
          },
          {
            text: '確認',
            handler: () => {
              let data = this.selectId
              this.navCtrl.push(KeyboardPage, {
                sid:this.pushId
              });
            }
          }
        ]
      });
      confirm.present()
    }
  }
}