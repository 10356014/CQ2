import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { KeyboardPage } from '../keyboard/keyboard';
import { Http } from '@angular/Http';
import { RequestOptions, Headers } from '@angular/Http';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { not } from '@angular/compiler/src/output/output_ast';

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

  //----------------------------------
  items:any;
  item:object;
  test:object[];
  myString:string[];
  myArray:string[];
  myID=[];
  myAddr=[];
  myStore_name=[];
  result:any; //存放縣市的集合

  //----------------------------------
	constructor(public navCtrl: NavController, public http:Http, public alertCtrl: AlertController) {
    	// 傳給主機的參數
    	let params: URLSearchParams = new URLSearchParams();
    	//params.set('type', '3');
		  this.http.post('https://cq2.robelf.com/api.php?api=Extra_getStoreList', {search: params})			
          .subscribe(
            (data) => {
              this.items=data.json()['data'];
              //console.log(this.items[0].addr);
              //this.getData(this.items);
             // this.item= JSON.stringify(this.items);
             // console.log(this.item);
              this.getData(this.items);
          },
            (err) => {this.showAlert();
            }
      );

  }
    
	getData(myString){		
      //this.myString= JSON.stringify(this.items);
      //console.log(this.myString);
      for(var i=0; i< myString.length; i++){
		  //取出若干欄位資料
          var id= myString[i].id;
          var addr=myString[i].addr;				
          var store_name=myString[i].store_name;
          
          //將資料加入物件中
          //var item=[];
          //this.id=id;
          //this.addr=addr.substring(0,3);
          //this.store_name=store_name;

          //將存有資料的物件加入陣列
          this.myID.push(id);
          this.myAddr.push(addr.substring(0,3));//擷取地址前3位放入陣列
          this.myStore_name.push(store_name);
          
		  this.result = new Set(); //新增集合
		  //如果集合內沒有相同的值，就放入reault中
		  if  (this.result.has(addr.substring(0,3)) !=  true){
            this.result.add(addr.substring(0,3));
          }
          console.log(this.result); 
          //console.log(item);
          //console.log(this.myID);
          //console.log(this.myAddr);
          //console.log(this.myStore_name);
        
      }                          
    }
    selectChange(citySelect) {  
      var city=this.city;
      console.log("OK"+city);  
    }  


    //--------------------------------------------

    showConfirm() {
      let alert = this.alertCtrl.create({
          title: '資料傳送成功!',
          subTitle: '已將資料傳送給主機.',
          buttons: ['OK']
      });
      alert.present();
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
  //-------------------------
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
  
  //-------------------------
  doConfirm() {
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