import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  recipeList: string[] = [];

  recipiItem: string = '6-7个月'
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public event: Events) {
      for(let i=0; i < 12; i ++) {
        this.recipeList.push(this.recipiItem);
      }
  }


  gotoSearch(ev: any) {
    
  }

}
