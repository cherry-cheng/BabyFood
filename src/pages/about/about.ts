import { Component } from '@angular/core';
import { NavController, ViewController,NavParams } from 'ionic-angular';
import {AppVersion} from '@ionic-native/app-version';

/**
 * Generated class for the AboutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {
  versionCode: any;

  constructor(public navCtrl: NavController, 
    public viewCtr:ViewController,
    public appVersion: AppVersion,
    public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutPage');
    this.appVersion.getVersionNumber().then(v => {
      console.log('wang'+4444);
      console.log('wang'+v);
      this.versionCode = v;
    });
  }

  dismiss(){
    this.viewCtr.dismiss();
  }

}
