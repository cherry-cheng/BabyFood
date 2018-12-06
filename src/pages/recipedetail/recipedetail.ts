import { Actionsheet2controllerProvider } from './../../components/actionsheet2/actionsheet2controller';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';

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
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public modalCtrl: ModalController,
    public act2controller: Actionsheet2controllerProvider,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad RecipedetailPage");
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
          text: "微信",
          imgurl: "assets/imgs/weixinzone.png",
          handler: () => {
            console.log("11");
          }
        },
        {
          text: "微信朋友圈",
          imgurl: "assets/imgs/weixinzone.png",
          handler: () => {
            console.log("22");
          }
        },
        {
          text: "qq",
          imgurl: "assets/imgs/weixinzone.png",
          handler: () => {
            console.log("33");
          }
        },
        {
          text: "qq空间",
          imgurl: "assets/imgs/weixinzone.png",
          handler: () => {
            console.log("44");
          }
        },
        {
          text: "qq空间",
          imgurl: "assets/imgs/weixinzone.png",
          handler: () => {
            console.log("55");
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
