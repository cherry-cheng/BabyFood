import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { SettingPage } from "../setting/setting";
import { AboutPage } from "../about/about"
import { Actionsheet2controllerProvider } from "./../../components/actionsheet2/actionsheet2controller";
import { Storage } from '@ionic/storage';
/**
 * Generated class for the MyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-my',
  templateUrl: 'my.html',
})
export class MyPage {


  userName: any;
  headImaUrl: any;

  public notLogin: boolean = true;
  public logined: boolean = false;
  //public navCtrl: NavController, public navParams: NavParams
  constructor(public navCtrl: NavController,
    public modalCtrl: ModalController,
    public actionCtr: Actionsheet2controllerProvider,
    private storageData: Storage) {

  }

  showModal() {
    console.log(2222222);
    let modal = this.modalCtrl.create(LoginPage);
    modal.onDidDismiss(() => {

      console.log('退出');
      this.loadUserPage();
    });
    modal.present();
  }

  //获取用户本地数据
  loadUserPage() {
    this.storageData.get('userName').then((val) => {
      if (val != null) {
        console.log('wang取出存储 ' + val);
        this.userName = val;
      } else {
        this.userName = "";
        console.log(2);
      }
    });

    this.storageData.get('userHeader_img').then((val) => {
      if (val != null) {
        this.headImaUrl = val;
        console.log('wang取出存储 ' + val);
      } else {
        this.headImaUrl = "";
        console.log(2);
      }
    });


  }

  ionViewDidLoad() {
    this.loadUserPage();
    // console.log('ionViewDidLoad MyPage');
  }

  ionViewDidEnter() {
    console.log('我的页面');
    this.loadUserPage();

  }

  gotoSet() {
    this.navCtrl.push(SettingPage);
    console.log(22222);
  }

  gotoAbout() {
    this.navCtrl.push(AboutPage);
    console.log(22222);
  }

  sahreToOther() {
    this.actionCtr.create({
      buttons: [
        {
          text: "微信好友",
          imgurl: "assets/imgs/icon_share_wechat.svg",
          handler: () => {
            console.log("11");
          },
        },
        {
          text: "朋友圈",
          imgurl: "assets/imgs/icon_share_moments.svg",
          handler: () => {
            console.log("22");
          },
        },
        {
          text: "微博",
          imgurl: "assets/imgs/icon_share_weibo.svg",
          handler: () => {
            console.log("33");
          },
        },
        {
          text: "QQ好友",
          imgurl: "assets/imgs/icon_share_qq.svg",
          handler: () => {
            console.log("44");
          }
        }
      ]
    })
  }

  attionWeibo() {
    // <iframe allowtransparency="" border="0" frameborder="0" height="22" marginheight="0" marginwidth="0" scrolling="no" src="http://widget.weibo.com/relationship/followbutton.php?width=200&amp;height=22&amp;uid=1697591620&amp;style=5&amp;btn=red&amp;dpc=1" style="width: 64px; height: 22px;" width="200"></iframe>
  }
}
