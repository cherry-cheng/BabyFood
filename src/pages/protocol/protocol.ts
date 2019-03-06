import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController} from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the ProtocolPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
  selector: 'page-protocol',
  templateUrl: 'protocol.html',
})
export class ProtocolPage {
  urlWebPage: string;
  secUrl: any;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl:ViewController,
    public sanitizer: DomSanitizer
    ) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProtocolPage');
    this.urlWebPage = "http://fushi.vweizhan.com/img/zhengce.html";
    this.secUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.urlWebPage);
    console.log('打印url' + this.secUrl);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
