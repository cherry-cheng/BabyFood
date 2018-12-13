import { RecipedetailPage } from './../recipedetail/recipedetail';
import { SearchhistoryProvider } from "./../../providers/searchhistory/searchhistory";
import { TestPage } from "./../test/test";
import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ItemSliding
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { NativeStorage } from "@ionic-native/native-storage";
import { RestProvider } from "../../providers/rest/rest";

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
  isHasResult: boolean = true;
  keywords: any;
  keyword: string;
  searchdata: { searchvalue: string }[] = [];
  inputWord: string;

  searchResultdata: {
    imgurl: string;
    title: string;
    loves: any;
    label: any;
    hits: any;
    type: any;
  }[] = [];

  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    private nativeStorage: NativeStorage,
    public searchProvider: SearchhistoryProvider,
    public restProvider: RestProvider,
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

    this.getSearchHist();
  }

  //返回到主页面
  goBack() {
    this.navCtrl.pop();
  }

  getSearchHist() {
    // 获取本地搜索记录
    this.searchdata = this.searchProvider.getSearchHis();
    if (this.searchdata != null && this.searchdata.length > 0) {
      this.isSearchHist = true;
    } else {
      this.isSearchHist = false;
    }
  }

  /**
   *监听键盘按钮点击搜索时
   * 添加手机键盘监听事件(keyup)="showResult()"
   * @param {*} event
   * @param {string} keyword
   * @memberof SearchhomePage
   */
  showResult(event: any, keyword: string) {
    // var idInput = document.getElementById("searchinput");
    // idInput.onkeyup=(event)=>{
    //   if(event.keyCode==13) {
    //     alert("1aaa");
    //   }
    // }
    if ("Enter" == event.key) {
      //function
      if (keyword == null || keyword.trim().length == 0) {
        console.log(this.keyword);
        this.gotoResult(this.keyword);
      } else {
        this.gotoResult(keyword);
      }
    }
  }

  gotoResult(searchItem: string) {
    //进入搜索界面
    this.isHomeP = false;
    this.searchProvider
      .addSearchHis(searchItem)
      .then(data => console.log(data), error => console.log(error));
    this.getSearchHist();

    //调用接口搜索
    var params = { type: "0", keywords: searchItem };
    this.restProvider.GET("bbsearch", params, (res, err) => {
      if (err) {
        console.log(err);
        this.isHasResult = false;
      }
      if (res) {
        console.log(res);
        this.searchResultdata = res.body.food;
        console.log(this.searchResultdata);

        if (this.searchResultdata != null && this.searchResultdata.length > 0) {
          this.isHasResult = true;
        } else {
          this.isHasResult = false;
        }
      }
    });
  }

  /**
   *删除所有本地记录
   *
   * @memberof SearchhomePage
   */
  deleteAll() {
    this.searchProvider.deleteAllSearchHis();
    this.getSearchHist();
  }

  showDetail(id: any) {
    this.navCtrl.push(RecipedetailPage, { foodid: id });
  }
}
