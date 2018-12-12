import { Platform } from 'ionic-angular/platform/platform';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeStorage } from "@ionic-native/native-storage";

import { HttpHeaders, HttpParams } from "@angular/common/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { isObject } from "rxjs/util/isObject";
import { e } from '@angular/core/src/render3';

/*
  Generated class for the SearchhistoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchhistoryProvider {
  data:{searchvalue:string}[]=[];

  constructor(public http: HttpClient,
    public platform: Platform,
    private nativeStorage: NativeStorage,
    public storage: Storage) {
   platform.ready().then(() => {
      this.storage.ready().then(_ => {
        this.nativeStorage.getItem('searchHis').then((d)=>{
          this.data = (d != null)?d:[];
        })
      })
   })
  }

  public getSearchHis() {
    console.log(this.data);
    return this.data;
  }

  public addSearchHis(value:string):Promise<any> {
    let temp: { searchvalue: string } [] = [];
    let isExsite: boolean = false;
    temp = this.getSearchHis();
    if(temp != null && temp.length>0) {
    for(var i=0; i<temp.length;i++) {
      if(value == temp[i].searchvalue) {
        this.data.splice(i, 1);
        this.data.unshift({searchvalue:value});
        isExsite = true;
        break;
      }
    }

    if(isExsite) {

    } else {
      this.data.unshift({searchvalue:value});
    }

  } else {
    this.data.push({searchvalue:value});
  }
    if (this.data.length > 10) {
      this.data.pop();
    }
    return this.nativeStorage.setItem('searchHis', this.data);
  }
}
