import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
      super();
    }

  ionViewDidLoad() {
    this.title = this.navParams.get("title");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
