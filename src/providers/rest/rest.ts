import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { isObject } from "rxjs/util/isObject";
import { Md5 } from "ts-md5/dist/md5";

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export const baseUrl = "http://fs.api2.vweizhan.com/v1.0.2/";
@Injectable()
export class RestProvider {
  constructor(public http: HttpClient) {
    console.log("Hello RestProvider Provider");
  }

  getauthsign(): string {
    let timestamp: string = new Date().getTime() + "";
    let time: string;
    timestamp = timestamp.substring(0, 10);
    time = timestamp;
    console.log(timestamp);
    timestamp = Md5.hashStr(timestamp + "bbfs") + "";
    console.log(timestamp);
    timestamp = time + Md5.hashStr(timestamp);
    console.log(timestamp);
    return timestamp;
  }

  // getFoodCategory() {
  //   let headers = new HttpHeaders();
  //   headers = headers.append("authsign", "" + this.getauthsign());
  //   return new Promise(resolve => {
  //     this.http.get(this.urlFoodCategory, {headers: headers}).subscribe(
  //       data => {
  //         resolve(data);
  //       },
  //       err => {
  //         console.log(err);
  //       }
  //     );
  //   });
  // }

  /**
   *封装的get和post方法，备用
   *
   * @param {*} params
   * @param {(res: any, error: any) => void} [callback]
   * @memberof RestProvider
   */
  GET(
    url: string,
    params: any,
    callback?: (res: any, error: any) => void
  ): void {
    let headers1 = new HttpHeaders();
    headers1 = headers1.append('authsign', this.getauthsign());
    let absoluteUrl = baseUrl + url;
    this.http
      .get(absoluteUrl, {
        headers: headers1,
        params: this.encodeComplexHttpParams(params)
      })
      .subscribe(
        res => {
          callback && callback(res, null);
        },
        error => {
          callback && callback(null, error);
        }
      );
  }

  /**
   *POST请求
   *
   * @param {string} url
   * @param {*} params
   * @param {(res: any, error: any) => void} [callback]
   * @memberof RestProvider
   */
  POST(
    url: string,
    params: any,
    callback?: (res: any, error: any) => void
  ): void {
    let URL = baseUrl + url;
    this.http.post(URL, this.encodeComplexHttpParams(params)).subscribe(
      res => {
        callback && callback(res, null);
      },
      error => {
        callback && callback(null, error);
      }
    );
  }

  // 将复杂的参数组装成字符串
  private paramsString(params: any): string {
    if (!params) return null;

    let str = "";

    for (let key in params) {
      if (params.hasOwnProperty(key)) {
        let value = params[key];
        if (value === null) continue;

        if (Array.isArray(value)) {
          if (value.length === 0) continue;

          for (let index = 0; index < value.length; index++) {
            let k = key + "[" + index + "]";
            let v = value[index];
            if (str.length > 1) str += "&";
            str += k + "=" + v;
          }
        } else if (isObject(value)) {
          for (let subKey in value) {
            if (value.hasOwnProperty(subKey)) {
              let v = value[subKey];
              if (v === null) continue;

              let k = key + "[" + subKey + "]";
              if (str.length > 1) str += "&";
              str += k + "=" + v;
            }
          }
        } else {
          if (str.length > 1) str += "&";
          str += key + "=" + value;
        }
      }
    }
    return str;
  }

  private encodeComplexHttpParams(params: any): any {
    if (!params) return null;
    return new HttpParams({ fromString: this.paramsString(params) });
  }
}
