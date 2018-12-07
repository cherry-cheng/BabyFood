import { SearchhomePage } from './../searchhome/searchhome';
import { DetailRecipePage } from './../detail-recipe/detail-recipe';
import { Component } from '@angular/core';
import { NavController, NavParams, Events, ModalController } from 'ionic-angular';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  recipeList: string[] = [];

  recipiItem: string = "6-7个月";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public event: Events
  ) {
    for (let i = 0; i < 12; i++) {
      this.recipeList.push(this.recipiItem);
    }
  }

  gotoSearch(ev: any) {
    let modal = this.modalCtrl.create(SearchhomePage);
    //关闭modal页面后的回调
    modal.onDidDismiss(() => {

    });
    modal.present();
  }

  gotoDetail() {
    this.navCtrl.push(DetailRecipePage, { title: "食谱" });
  }
}
