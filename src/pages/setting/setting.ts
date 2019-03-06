import { Component } from '@angular/core';
import { ViewController, NavController, NavParams, AlertController,ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RestProvider } from "../../providers/rest/rest";
import { ProtocolPage } from './../protocol/protocol';
/**
 * Generated class for the SettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
})
export class SettingPage {

  logined:Boolean;
  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public alertCtr: AlertController,
    public navParams: NavParams,
    public restProvider: RestProvider,
    public modalCtrl: ModalController,
    public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingPage');
    this.storage.get('isLogin').then((val) => {
      if (val != null) {
        if(val == "1"){
          this.logined = true;
        }else{
          this.logined = false;
        }
      }else{
        this.logined = false;
      }
    })
  }

  loginOut() {
    console.log('取消');
    const alert = this.alertCtr.create({
      title: '提示',
      message: '确定要退出该账号吗？退出后将收不到为宝宝定制的相关内容。',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('取消');
          }
        },
        {
          text: '退出',
          handler: () => {
            console.log('确定');
            this.restProvider.GET("userloginout", null, (res, err) => {
              if (err) {
                console.log('wang' + JSON.stringify(err));
              }
              if (res) {
                if (res.status == 200) {
                  this.storage.remove('isLogin');
                  this.storage.remove('userName');
                  this.storage.remove('userHeader_img');
                  this.storage.set('userID', res.body.uid);
                  setTimeout(() => {
                    this.dismiss();
                  }, 1000);
                }
                console.log('wang' + JSON.stringify(res));
              }
            })

          }
        }
      ]
    });
    alert.present();
  }

  dismiss() {
    console.log(3333);
    this.viewCtrl.dismiss();
  }

  protocalClick(){
    console.log(2222222);
    let modal = this.modalCtrl.create(ProtocolPage);
    modal.onDidDismiss(() => {

    });
    modal.present();

  }

}
