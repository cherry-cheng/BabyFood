import { RestProvider, baseUrl } from './../../providers/rest/rest';
import { Actionsheet2controllerProvider } from './../../components/actionsheet2/actionsheet2controller';
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ModalController,ToastController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { SearchhistoryProvider } from "./../../providers/searchhistory/searchhistory";
import { Storage } from '@ionic/storage';
import { LoginPage } from "../login/login";
import { BaseUI } from "../../common/baseui";
/**
 * Generated class for the RecipedetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: "page-recipedetail",
  templateUrl: "recipedetail.html"
})
export class RecipedetailPage extends BaseUI{
  urlWebPage: string;
  id: any;
  foodItem: any;
  secUrl: any;
  isCollected: Boolean = false;
  lookHisData: { searchvalue: any }[] = [];

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public act2controller: Actionsheet2controllerProvider,
    public searchProvider: SearchhistoryProvider,
    public httpRest: RestProvider,
    public sanitizer: DomSanitizer,
    public navParams: NavParams,
    private storageData: Storage,
    public toastCtrl: ToastController
  ) { 
    super();
  }

  ionViewDidLoad() {
    this.foodItem = this.navParams.get("foodid");
    // alert('wang'+JSON.stringify(this.foodItem));
    this.id = this.foodItem.id;
    this.urlWebPage = baseUrl + "getrecommenfooddetail?id=" + this.id;
    this.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlWebPage);
    console.log('打印url' + this.secUrl);
    this.isCollectFood();

    //添加浏览记录
    this.searchProvider
      .addLookHis(this.foodItem)
      .then(data => console.log(data), error => console.log(error));
  }

  isCollectFood() {
    var params = { 'id': this.foodItem.id };
    this.httpRest.GET('islovefood', params, (res, error) => {
      if (error) {
        console.log(error);
      }
      if (res) {
        if (res.status == 200) {
          if (res.body.state == 1) {
            this.isCollected = true;
          } else {
            this.isCollected = false;
          }
          console.log('wang' + JSON.stringify(res));
        }
      }

    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  /**
   *分享
   *
   * @memberof RecipedetailPage
   */
  share() {
    let that = this;
    this.act2controller.create({
      buttons: [
        {
          text: "微信好友",
          imgurl: "assets/imgs/icon_share_wechat.svg",
          handler: () => {
            console.log("wang11");
            // let params={
            //   logo:that.shareInfo.logo,
            //   id:that.shareInfo.id,
            //   scene:data.type
            // }
            that.httpRest.wechatShare(null, (res, erros) => {
              console.log(res);
              console.log('wang2' + JSON.stringify(res));
            })
          }
        },
        // {
        //   text: "朋友圈",
        //   imgurl: "assets/imgs/icon_share_moments.svg",
        //   handler: () => {
        //     console.log("22");
        //     that.httpRequest.wechatShare(params,(res,erros)=>{
        //       console.log(res)
        //     })
        //   }
        // },
        // {
        //   text: "微博",
        //   imgurl: "assets/imgs/icon_share_weibo.svg",
        //   handler: () => {
        //     console.log("33");
        //   }
        // },
        // {
        //   text: "QQ好友",
        //   imgurl: "assets/imgs/icon_share_qq.svg",
        //   handler: () => {
        //     console.log("44");
        //     that.httpRequest.qqShare(params,(res,erros)=>{
        //       console.log(res)
        //     })
        //   }
        // }
      ]
    });
  }

  /**
   *收藏
   *
   * @memberof RecipedetailPage
   */
  collect() {

    console.log('点击收藏');
    this.storageData.get('isLogin').then((val) => {
      if (val != null) {
        console.log('wang取出存储 ' + val);
        var Option;
        if (this.isCollected) {
          Option = { 'id': this.foodItem.id, 'type': '2' };
        } else {
          Option = { 'id': this.foodItem.id, 'type': '1' };
        }
        console.log('点击收藏参数' + JSON.stringify(Option));
        this.httpRest.POST('lovesfood', null, Option, (res, error) => {
          if (error) {
            console.log('wang' + error);
          }
          if (res) {
            if (this.isCollected) {
              if (res.code == 0) {
                super.showToast(this.toastCtrl,  "取消收藏" );
                this.isCollected = false;
              } else {
                this.isCollected = true;
              }
            } else {
              if (res.code == 0) {
                super.showToast(this.toastCtrl,  "收藏成功" );
                this.isCollected = true;
              } else {
                this.isCollected = false;
              }
            }

            console.log('wang' + JSON.stringify(res));
          }

        })
      } else {
        console.log(2);
        let modal = this.modalCtrl.create(LoginPage);
        modal.onDidDismiss(() => {
          // console.log('退出');
          // this.loadUserPage();
        });
        modal.present();
      }
    });

  }

}
