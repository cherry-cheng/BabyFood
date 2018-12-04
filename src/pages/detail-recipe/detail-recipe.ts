import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { BaseUI } from '../../common/baseui';

/**
 * Generated class for the DetailRecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-detail-recipe",
  templateUrl: "detail-recipe.html"
})
export class DetailRecipePage extends BaseUI {
  title: string;
  recipeList: string[] = [];

  testList: string[] = [];

  monthRange: string[] = ['孕期', '产后', '6-7个月', '8-9个月', '10-12个月', '1-2岁', '2-3岁', '3岁以上']

  recipiItem: string = "#6-7";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public toastCtrl: ToastController
  ) {
    super();
    for (let i = 0; i < 3; i++) {
      this.recipeList.push(this.recipiItem);
    }
    for (let n = 0; n < 12; n++) {
      this.testList.push(this.recipiItem);
    }
  }

  ionViewDidLoad() {
    this.title = this.navParams.get("title");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  gotoChoose(id: any) {
    if (id == 1) {
      super.showToast(this.toastCtrl, "id等于1");
    }
    if (id == 2) {
      super.showToast(this.toastCtrl, "id等于2");
    }
  }
}
