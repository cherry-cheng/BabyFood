import { SearchhistoryProvider } from './../../providers/searchhistory/searchhistory';
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

  keyword: string;
  keywords: any;

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
    public searchProvider: SearchhistoryProvider,
    public event: Events
  ) {
    for (let i = 0; i < 12; i++) {
      this.recipeList.push(this.recipiItem);
    }
  }

  ionViewDidLoad() {
    this.getFoodCategory();
    var params = { type: "1" };
    this.restProvider.GET("getsearchkeywords", params, (res, err) => {
      if (err) {
        console.log(err);
      }
      if (res) {
        this.keywords = res.body;
        if (res.status == 200) {
          this.keyword = this.keywords[0];
          console.log(this.keyword);
        } else {
          return;
        }
      }
    });

    //仅仅为了提前初始化
    this.searchProvider.getSearchHis();
  }

  gotoSearch(ev: any) {
    let modal = this.modalCtrl.create(SearchhomePage, { "keywords": this.keywords});
    //关闭modal页面后的回调
    modal.onDidDismiss(() => {

    });
    modal.present();
  }

  gotoDetail(id: any, title: string) {
    this.navCtrl.push(DetailRecipePage, { title: id, titleName: title });
  }

  getFoodCategory() {
    this.restProvider.GET("getfoodcategory",null,(res, err) => {
      if(err) {
        console.log(err);
      }
      if(res) {
        this.foodcate = res;
        if (this.foodcate.status == 200) {
          this.listCate1 = this.foodcate.body[0];
          this.listCate2 = this.foodcate.body[1];
          this.listCate3 = this.foodcate.body[2];
          this.listCate4 = this.foodcate.body[3];
        } else {
          return;
        }
      }
    });
  }
}
