import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { CollectPage } from '../collect/collect';
import { MyPage } from '../my/my';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tabHome = HomePage;
  tabCollect = CollectPage;
  tabMy = MyPage;

  //public navCtrl: NavController, public navParams: NavParams
  constructor() {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
