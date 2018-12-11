import { RestProvider, baseUrl } from './../../providers/rest/rest';
import { Actionsheet2controllerProvider } from './../../components/actionsheet2/actionsheet2controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the RecipedetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-recipedetail",
  templateUrl: "recipedetail.html"
})
export class RecipedetailPage {
  urlWebPage: string;
  id:any;
  secUrl: any;
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public act2controller: Actionsheet2controllerProvider,
    public httpRest: RestProvider,
    public sanitizer: DomSanitizer,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    this.id = this.navParams.get("foodid");
    this.urlWebPage = baseUrl + "getrecommenfooddetail?id="+this.id;
    this.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlWebPage);
    console.log(this.secUrl);
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
    this.act2controller.create({
      buttons: [
        {
          text: "微信好友",
          imgurl: "assets/imgs/icon_share_wechat.svg",
          handler: () => {
            console.log("11");
          }
        },
        {
          text: "朋友圈",
          imgurl: "assets/imgs/icon_share_moments.svg",
          handler: () => {
            console.log("22");
          }
        },
        {
          text: "微博",
          imgurl: "assets/imgs/icon_share_weibo.svg",
          handler: () => {
            console.log("33");
          }
        },
        {
          text: "QQ好友",
          imgurl: "assets/imgs/icon_share_qq.svg",
          handler: () => {
            console.log("44");
          }
        }
      ]
    });
  }

  /**
   *收藏
   *
   * @memberof RecipedetailPage
   */
  collect() {

  }
}
