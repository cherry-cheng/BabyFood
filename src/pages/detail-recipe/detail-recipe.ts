import { RestProvider } from "./../../providers/rest/rest";
import { RecipedetailPage } from "./../recipedetail/recipedetail";
import { convertEnumToColumn } from "ion-multi-picker";
import { Component } from "@angular/core";
import {
  NavController,
  NavParams,
  ViewController,
  ToastController
} from "ionic-angular";
import { BaseUI } from "../../common/baseui";


//聊天信息的属性
export class ChatMessage {
  imgurl: string;
  id: string;
  loves: string;
  title: string;
  // toUserId: string;//发送给谁的
  // time: number | string;
  // message: string;
  // status: string;
}

/**
 *保留以后做滑动选择的数据
 *
 * @enum {number}
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
  foodid: string;
  recipeList: string[] = [];
  testList: string[] = [];
  recipiItem: string = "#6-7";
  titleName: string;
  foodResponse: any;
  foodModel:ChatMessage;
  foodList: any = {
    data: [],
    count: 1,
    currentpage: 1
  };
  foodListArray: any;
  hasmore = true;
  spinner1: boolean = true;
  params = {
    page: 1,
    id: "1"
  };

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
    public httpRest: RestProvider,
    public toastCtrl: ToastController,
    
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
    this.foodid = this.navParams.get("title");
    this.params.id = this.foodid;
    this.titleName = this.navParams.get("titleName");
    this.getFoodList();
  }

  /**
   *请求获取食物列表数据
   *
   * @param {*} idfood
   * @memberof DetailRecipePage
   */
  getFoodList() {
    this.httpRest.GET("getfoodlist", this.params, (res, err) => {
      if (err) {
        console.log(err);
      }
      if (res) {
        this.foodResponse = res;
        this.foodList = this.foodResponse.body;
        this.foodListArray = this.foodList.data;
        this.params.page += 1;
        this.spinner1 = false;
        console.log(this.foodList);
      }
    });
  }

  doInfinite(infiniteScroll) {
    if (this.hasmore == false) {
      infiniteScroll.complete();
      return;
    }
    this.httpRest.GET("getfoodlist", this.params, (res, err) => {
      if (err) {
        console.log(err);
      }
      if (res) {
        if (res.body.data.length > 0) {
          this.foodListArray = this.foodListArray.concat(res.body.data);
          this.params.page += 1;
        } else {
          this.hasmore = false;
          console.log("没有数据啦！！！");
        }
        infiniteScroll.complete();
      }
    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  showDetail(id:any) {
    console.log(111111);
    console.log(id);
    console.log (typeof id);
    // console.log('wang'+JSON.stringify(id));
    this.navCtrl.push(RecipedetailPage, {foodid:id});
  }

  /**
   *保留以后做滑动选择的监听事件
   *
   * @param {*} event
   * @memberof DetailRecipePage
   */
  onModel1Change(event: any) {
    console.log(event);
  }

  onModel2Change(event: any) {
    console.log(event);
  }
}
