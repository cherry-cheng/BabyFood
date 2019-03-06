import { Component } from '@angular/core';
// import { NavController } from 'ionic-angular';
import { RestProvider } from "../../providers/rest/rest";
import { SearchhistoryProvider } from "./../../providers/searchhistory/searchhistory";
import { RecipedetailPage } from "./../recipedetail/recipedetail";
import {
  NavController,
  NavParams,
  ViewController,
  ToastController
} from "ionic-angular";
// import { BaseUI } from "../../common/baseui";
// import {
//   NavController,
//   NavParams,
//   ViewController,
//   ToastController
// } from "ionic-angular";
/**
 * Generated class for the CollectPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-collect',
  templateUrl: 'collect.html',
})
export class CollectPage {

  public foodMenu: boolean = true;
  public history: boolean = false;
  foodListArray = [];
  lookHisData = [];

  // public navParams: NavParams
  constructor(public httpRest: RestProvider,
    public searchProvider: SearchhistoryProvider,
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CollectPage');


  }

  ionViewDidEnter() {
    this.getFoodData();
    this.getHistory();
  }

  getHistory() {
    this.lookHisData = this.searchProvider.getLookHis();
    console.log('浏览历史' + JSON.stringify(this.lookHisData));

  }

  gotoFood() {
    this.foodMenu = true;
    this.history = false;
  }

  gotoHistory() {
    this.foodMenu = false;
    this.history = true;

  }

  getFoodData() {
    this.httpRest.GET("getlovesfoodlist", null, (res, err) => {
      if (err) {
        console.log('wang' + JSON.stringify(err));
      }
      if (res) {
        if (res.status == 200) {
          this.foodListArray = res.body;
        }
        console.log('wang' + JSON.stringify(res));
        console.log('wang' + JSON.stringify(this.foodListArray));
      }
    })
  }
  showMenu() {

  }

  cancelCollect(item: any) {
    console.log('取消');
    console.log('取消' + JSON.stringify(item));
    var Option = { 'id': item.id, 'type': '2' };
    console.log('点击收藏参数' + JSON.stringify(Option));
    this.httpRest.POST('lovesfood', null, Option, (res, error) => {
      if (error) {
        console.log('wang' + error);
      }
      if (res) {
        if (res.code == 0) {
          var index = this.foodListArray.indexOf(item);
          console.log('取消' + index);
          this.foodListArray.splice(index, 1);
          console.log('wang取消收藏' + JSON.stringify(res));
        }
      }
    })
  }

  // detelHis(item: any) {
  //   //删除历史
  //   var index = this.lookHisData.indexOf(item);
  //   console.log('取消' + index);
  //   this.lookHisData.splice(index, 1);


  //   this.lookHisData
  // }

  goDetail(id: any) {
    this.navCtrl.push(RecipedetailPage, { foodid: id });
  }
}
