import { RecipedetailPage } from './../recipedetail/recipedetail';
import { convertEnumToColumn } from "ion-multi-picker";
import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  ViewController,
  ToastController
} from "ionic-angular";
import { BaseUI } from "../../common/baseui";

/**
 * Generated class for the DetailRecipePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

enum BabyMonth {
  孕期,
  产后,
  "6-7个月",
  "8-9个月",
  "10-12个月",
  "1-2岁",
  "2-3岁",
  "3岁以上"
}

enum Nutrition {
  预防便秘,
  腹泻,
  感冒,
  缺铁性贫血,
  发烧,
  咳嗽,
  补铁,
  补锌,
  补钙,
  补DHA,
  补维生素叶酸,
  免疫力,
  促长牙,
  促食欲
}
@Component({
  selector: "page-detail-recipe",
  templateUrl: "detail-recipe.html"
})
export class DetailRecipePage extends BaseUI {
  title: string;
  titleLabel1: string = "3333";
  titleLabel2: string = "4444";
  recipeList: string[] = [];

  testList: string[] = [];

  monthRange: string[] = [
    "孕期",
    "产后",
    "6-7个月",
    "8-9个月",
    "10-12个月",
    "1-2岁",
    "2-3岁",
    "3岁以上"
  ];

  nutritionRange: string[] = [
    "预防便秘",
    "腹泻",
    "感冒",
    "缺铁性贫血",
    "发烧",
    "咳嗽",
    "补铁",
    "补锌",
    "补钙",
    "补DHA",
    "补维生素叶酸",
    "免疫力",
    "促长牙",
    "促食欲"
  ];

  recipiItem: string = "#6-7";

  babymonths: any[];
  babymonth: BabyMonth;
  BabyMonth;

  nutritions: any[];
  nutrition: Nutrition;
  Nutrition;

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

    this.babymonth = BabyMonth.产后;
    this.BabyMonth = BabyMonth;
    this.babymonths = convertEnumToColumn(this.BabyMonth);

    this.nutrition = Nutrition.预防便秘;
    this.Nutrition = Nutrition;
    this.nutritions = convertEnumToColumn(this.Nutrition);
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

  showDetail() {
    this.navCtrl.push(RecipedetailPage, { title: "食谱" });
  }

  onModel1Change(event: any) {
    console.log(event);
  }

  onModel2Change(event: any) {
    console.log(event);
  }
}
