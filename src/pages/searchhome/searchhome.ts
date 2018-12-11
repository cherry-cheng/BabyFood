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
  keyword: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    //装载测试数据
    for (let i = 0; i < 12; i++) {
      this.items.push("test" + i);
    }
  }

  ionViewDidLoad() {
    this.keyword = this.navParams.get("keyword");
    console.log(this.keyword);

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
}
