import { SearchhomePage } from './../searchhome/searchhome';
import { DetailRecipePage } from './../detail-recipe/detail-recipe';
import { Component } from '@angular/core';
import { NavController, NavParams, Events, ModalController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  recipeList: string[] = [];

  recipiItem: string = "6-7个月";

  foodcate: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public restProvider: RestProvider,
    public event: Events
  ) {
    for (let i = 0; i < 12; i++) {
      this.recipeList.push(this.recipiItem);
    }
  }

  ionViewDidLoad() {
    this.getFoodCategory();
  }

  gotoSearch(ev: any) {
    let modal = this.modalCtrl.create(SearchhomePage);
    //关闭modal页面后的回调
    modal.onDidDismiss(() => {});
    modal.present();
  }

  gotoDetail() {
    this.navCtrl.push(DetailRecipePage, { title: "食谱" });
  }

  getFoodCategory() {
    this.restProvider.getFoodCategory().then(data => {
      this.foodcate = data;
      console.log(this.foodcate);
    });
  }
}
