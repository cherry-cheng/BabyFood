import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  constructor(public http: HttpClient) {
    console.log("Hello RestProvider Provider");
  }

  private baseUrl = "http://192.168.1.155:9001/v1.0.2/";
  private urlFoodCategory = this.baseUrl + "getfoodcategory";

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
  }

  getFoodCategory() {
    return new Promise(resolve => {
      this.http.get(this.urlFoodCategory).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  // /**
  //  *全局获取HTTP请求的方法
  //  *
  //  * @private
  //  * @param {string} url
  //  * @returns {Observable<string[]>}
  //  * @memberof RestProvider
  //  */
  // private getUrlReturn(url: string): Observable<string[]> {
  //   return this.http
  //     .get(url)
  //     .map(this.extractData)
  //     .catch(this.handleError);
  // }

  // /**
  //  *处理接口返回的数据，处理成 json 格式
  //  *
  //  * @private
  //  * @param {Response} res
  //  * @returns
  //  * @memberof RestProvider
  //  */
  // private extractData(res: Response) {
  //   let body = res.json();
  //   return JSON.parse(body) || {};
  // }

  // /**
  //  *处理请求中的错误，考虑了各种情况的错误处理并在 console 中显示
  //  *
  //  * @private
  //  * @param {(Response | any)} error
  //  * @returns
  //  * @memberof RestProvider
  //  */
  // private handleError(error: Response | any) {
  //   let errMsg: string;
  //   if (error instanceof Response) {
  //     const body = error.json() || "";
  //     const err = body.error || JSON.stringify(body);
  //     errMsg = `${error.status} - ${error.statusText || ""} ${err}`;
  //   } else {
  //     errMsg = error.message ? error.message : error.toString();
  //   }
  //   console.error(errMsg);
  //   return Observable.throw(errMsg);
  // }
}
