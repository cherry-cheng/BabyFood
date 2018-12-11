import { SearchhomePage } from "./../searchhome/searchhome";
import { DetailRecipePage } from "./../detail-recipe/detail-recipe";
import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  Events,
  ModalController
} from "ionic-angular";
import { RestProvider } from "../../providers/rest/rest";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  recipeList: string[] = [];

  recipiItem: string = "6-7个月";

  foodcate: any;

  listCate1: any = {
    bigcategory: "",
    samllcategory: []
  };
  listCate2: any = {
    bigcategory: "",
    samllcategory: []
  };
  listCate3: any = {
    bigcategory: "",
    samllcategory: []
  };
  listCate4: any = {
    bigcategory: "",
    samllcategory: []
  };

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

  gotoDetail(id: any, title: string) {
    this.navCtrl.push(DetailRecipePage, { title: id, titleName: title });
  }

  getFoodCategory() {
    this.restProvider.getFoodCategory().then(data => {
      this.foodcate = data;
      console.log(this.foodcate);

      this.listCate1 = this.foodcate.body[0];
      this.listCate2 = this.foodcate.body[1];
      this.listCate3 = this.foodcate.body[2];
      this.listCate4 = this.foodcate.body[3];
      console.log(this.listCate1);
      console.log(this.listCate1.bigcategory);
      console.log(this.listCate1.samllcategory);
      console.log(this.listCate2);
      console.log(this.listCate3);
      console.log(this.listCate4);
    });
  }
}
