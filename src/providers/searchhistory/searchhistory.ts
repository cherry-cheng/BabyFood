import { Platform } from 'ionic-angular/platform/platform';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NativeStorage } from "@ionic-native/native-storage";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

/*
  Generated class for the SearchhistoryProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SearchhistoryProvider {
  data: { searchvalue: string }[] = [];
  lookData = [];

  constructor(public http: HttpClient,
    public platform: Platform,
    private nativeStorage: NativeStorage,
    public storage: Storage) {
    platform.ready().then(() => {
      this.storage.ready().then(_ => {
        this.nativeStorage.getItem('searchHis').then((d) => {
          this.data = (d != null) ? d : [];
        })

        this.nativeStorage.getItem('lookHis').then((d) => {
          this.lookData = (d != null) ? d : [];
        })
      })
    })
  }

  public getSearchHis() {
    console.log(this.data);
    return this.data;
  }

  public getLookHis() {
    console.log(this.lookData);
    return this.lookData;
  }

  public deleteAllSearchHis() {
    let length = this.data.length;
    this.data.splice(0, length);
    this.nativeStorage.clear();
  }

  public addSearchHis(value: string): Promise<any> {
    let temp: { searchvalue: string }[] = [];
    let isExsite: boolean = false;
    temp = this.getSearchHis();
    if (temp != null && temp.length > 0) {
      for (var i = 0; i < temp.length; i++) {
        if (value == temp[i].searchvalue) {
          this.data.splice(i, 1);
          this.data.unshift({ searchvalue: value });
          isExsite = true;
          break;
        }
      }

      if (isExsite) {

      } else {
        this.data.unshift({ searchvalue: value });
      }

    } else {
      this.data.push({ searchvalue: value });
    }
    if (this.data.length > 10) {
      this.data.pop();
    }
    return this.nativeStorage.setItem('searchHis', this.data);
  }


  public addLookHis(value: any): Promise<any> {
    let temp = [];
    let isExsite: boolean = false;
    temp = this.getLookHis();
    console.log('本地保存的数据' + JSON.stringify(temp))
    if (temp != null && temp.length > 0) {
      for (var i = 0; i < temp.length; i++) {
        let foodmodel;
        foodmodel = temp[i];
        console.log('食谱id2' + foodmodel.id)
        console.log('食谱id2' + value.id)
        if (value.id == foodmodel.id) {
          this.lookData.splice(i, 1);
          this.lookData.unshift(value);
          isExsite = true;
          break;
        }
      }
      console.log('食谱id2')

      if (isExsite) {

      } else {
        console.log('食谱id' + value.id)
        this.lookData.unshift(value);
      }

    } else {
      console.log('食谱1id' + JSON.stringify(value))
      this.lookData.push(value);

    }
    console.log('食谱详情数组' + JSON.stringify(this.lookData))
    return this.nativeStorage.setItem('lookHis', this.lookData);
  }
}
