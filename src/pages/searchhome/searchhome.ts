import { TestPage } from './../test/test';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding } from 'ionic-angular';

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
  keywords: any;
  keyword: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.keywords = this.navParams.get("keywords");
    this.keyword = this.keywords[0];

    let length = this.keywords.length;
    console.log(length);
    for (let i = 0; i < length; i++) {
      this.items.push(this.keywords[i]);
    }
    console.log(this.keywords);
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

  deleteAll() {

  }
}
