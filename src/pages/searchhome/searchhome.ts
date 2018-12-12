import { SearchhistoryProvider } from './../../providers/searchhistory/searchhistory';
import { TestPage } from './../test/test';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { NativeStorage } from "@ionic-native/native-storage";

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
  items: string[] = [];
  isHomeP: boolean = true;
  isSearchHist: boolean = false;
  keywords: any;
  keyword: string;
  searchdata: { searchvalue: string }[] = [];
  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    private nativeStorage: NativeStorage,
    public searchProvider: SearchhistoryProvider,
    public navParams: NavParams
  ) {}

  ionViewDidLoad() {
    this.keywords = this.navParams.get("keywords");
    this.keyword = this.keywords[0];
    let length = this.keywords.length;
    console.log(length);
    for (let i = 0; i < length; i++) {
      this.items.push(this.keywords[i]);
    }

    this.hotwordSearch("111");
    // 获取本地搜索记录
    this.searchdata = this.searchProvider.getSearchHis();
    if (this.searchdata != null && this.searchdata.length > 0) {
      this.isSearchHist = true;
    } else {
      this.isSearchHist = false;
    }
  }

  showSearchData():any{
    this.nativeStorage.getItem('searchHis')
    .then(
      data => {this.searchdata = data},
      error => console.log(error)
    );
  }

  //返回到主页面
  goBack() {
    this.navCtrl.pop();
  }

  /**
   *监听input输入框的变化
   *
   * @param {*} ev
   * @memberof SearchhomePage
   */
  onInput(ev: any) {}

  /**
   *监听键盘按钮点击搜索时
   * 添加手机键盘监听事件(keyup)="showResult()"
   * @param {*} event
   * @param {string} keyword
   * @memberof SearchhomePage
   */
  showResult(event: any, keyword: string) {
    if ("Enter" == event.key) {
      //function
    }
  }

  gotoResult() {
    //进入搜索界面
    this.isHomeP = false;
    // this.navCtrl.push(TestPage);
  }

  deleteAll() {}

  hotwordSearch(hotItem:string) {
    this.searchProvider.addSearchHis(hotItem).then(
      data=>console.log(data),
      error=>console.log(error)
    );
    this.searchdata = this.searchProvider.getSearchHis();
  }
}
