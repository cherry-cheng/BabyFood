import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SearchhomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-searchhome",
  templateUrl: "searchhome.html"
})
export class SearchhomePage {
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad SearchPage");
  }

  //返回到主页面
  goBack() {
    this.navCtrl.pop();
  }

  onInput(ev: any) {

  }
}
