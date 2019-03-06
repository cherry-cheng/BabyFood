import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { isObject } from "rxjs/util/isObject";
import { Md5 } from "ts-md5/dist/md5";
import { QQSDK, QQShareOptions } from '@ionic-native/qqsdk';
import { Storage } from '@ionic/storage';
// import { Config } from "ionic-angular";

declare var Wechat: any;
declare var WeiboSDK: any;
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

// export const baseUrl = "http://fs.api2.vweizhan.com/v1.0.2/";
//http://vweizhan.test.opencodes.top:9001/v1.0.2/
export const baseUrl = "http://vweizhan.test.opencodes.top:9001/v1.0.2/";//http://vweizhan.test.opencodes.top:9001/v1.0.2/

@Injectable()
export class RestProvider {
  //userID : any;
  constructor(public http: HttpClient, private QQ: QQSDK, private storageData: Storage) {
    console.log("Hello RestProvider Provider");
  }

  getauthsign(): string {
    let timestamp: string = new Date().getTime() + "";
    let time: string;
    timestamp = timestamp.substring(0, 10);
    time = timestamp;
    // console.log(timestamp);
    timestamp = Md5.hashStr(timestamp + "bbfs") + "";
    // console.log(timestamp);
    timestamp = time + Md5.hashStr(timestamp);
    // console.log(timestamp);
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
    let that = this;
    //let userID = this.getUserID();
    let headers1 = new HttpHeaders();
    headers1 = headers1.append('authsign', this.getauthsign());
    this.storageData.get('userID').then((val) => {
      
      if(val != null) {
        // console.log('wang2222222');
        // var lenth= val.length();
        // console.log('wang取出 存储' + lenth);
        if(val.length)
        console.log('wang取出存储 ' + val);
        headers1 = headers1.append('uid', val);
      } else {
        console.log('wang取出存储2');
      }
      console.log('wang1' + JSON.stringify(headers1));
        let absoluteUrl = baseUrl + url;
      this.http.get(absoluteUrl, {
        headers: headers1,
        // {
        //   "authsign": this.getauthsign(),
        //   // "uid": userID,
        //   "uid": '9b2de8dae213a0a6e1d6e9cfa4101ea2'
        // },
        params: this.encodeComplexHttpParams(params)
      })
        .subscribe(
          res => {
            console.log('wang11' + JSON.stringify(res));
            callback && callback(res, null);
          },
          error => {
            console.log('wang111' + JSON.stringify(error));
            callback && callback(null, error);
          }
        );
    });




    // console.log('wang1用户UID ' + userID);

    // if (userID) {
    //   console.log('wang1用户UID存在 ' + userID);

    // } else {
    //   console.log('wang1用户UID不存在 ' + userID);
    // }
    // let userID: string = "9b2de8dae213a0a6e1d6e9cfa4101ea2";

    //let headers2 = new HttpHeaders();

    // headers1 = headers1.append ('uid',userID);
    // console.log(''+headers1);

    // this.http.get(absoluteUrl, {
    //   headers: headers1,
    //   // {
    //   //   "authsign": this.getauthsign(),
    //   //   // "uid": userID,
    //   //   "uid": '9b2de8dae213a0a6e1d6e9cfa4101ea2'
    //   // },
    //   params: this.encodeComplexHttpParams(params)
    // })
    //   .subscribe(
    //     res => {
    //       console.log('wang11' + JSON.stringify(res));
    //       callback && callback(res, null);
    //     },
    //     error => {
    //       console.log('wang111' + JSON.stringify(error));
    //       callback && callback(null, error);
    //     }
    //   );
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
    option: any,
    callback?: (res: any, error: any) => void
  ): void {
    let that = this;
    //let userID = this.getUserID();
    //console.log('wang1用户UIDPOST' + userID);

    let headers1 = new HttpHeaders();
    headers1 = headers1.append('authsign', this.getauthsign());
    this.storageData.get('userID').then((val) => {
      // var lenth= val.length();
      if(val != null) {
        console.log('wang取出存储 ' + val);
        headers1 = headers1.append('uid', val);
      } else {
        console.log('wang取出存储2');
      }
      console.log('wang' + JSON.stringify(option));
      let absoluteUrl = baseUrl + url;
      this.http.post(absoluteUrl, option, {
        headers: headers1,
        // {
        //   "authsign": that.getauthsign(),
        //   "uid":'9b2de8dae213a0a6e1d6e9cfa4101ea2'
        // },
      }
      )
        .subscribe(
          res => {
            console.log('wang1post请求返回数据' + JSON.stringify(res));
            callback && callback(res, null);
          },
          error => {
            console.log('wang1post请求返回错误' + JSON.stringify(error));
            callback && callback(null, error);
          }
        );

    });



    // // let userID: string = "9b2de8dae213a0a6e1d6e9cfa4101ea2";
    // // let headers1 = new HttpHeaders();
    // // headers1 = headers1.append('authsign', this.getauthsign());
    // // headers1 = headers1.append ('uid',userID);
    // // console.log(''+headers1);
    // console.log('wang' + JSON.stringify(option));
    // let absoluteUrl = baseUrl + url;
    // this.http.post(absoluteUrl, option, {
    //   headers: headers1,
    //   // {
    //   //   "authsign": that.getauthsign(),
    //   //   "uid":'9b2de8dae213a0a6e1d6e9cfa4101ea2'
    //   // },
    // }
    // )
    //   .subscribe(
    //     res => {
    //       console.log('wang1post请求返回数据' + JSON.stringify(res));
    //       callback && callback(res, null);
    //     },
    //     error => {
    //       console.log('wang1post请求返回错误' + JSON.stringify(error));
    //       callback && callback(null, error);
    //     }
    //   );
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
    console.log('post请求参数2' + str);
    return str;
  }

  private encodeComplexHttpParams(params: any): any {
    if (!params) return null;
    console.log('post请求参数1' + JSON.stringify(params));
    return new HttpParams({ fromString: this.paramsString(params) });
  }

  //QQ登录
  qqLogin(callback?: (res: any, openid: any, error: any) => void) {
    let that = this;
    let clientOptions: QQShareOptions = {
      client: this.QQ.ClientType.QQ
    };
    this.QQ.ssoLogin(clientOptions).then(result => {
      // Success
      if (result) {
        console.log('wang' + 9);
        console.log('wang' + JSON.stringify(result));
        let absoluteUrl = baseUrl + 'getuserinfobyother';
        var Option = { "code": result.userid, "auth_token": result.access_token, "loginType": "qq" };
        console.log('wangQQpost请求' + JSON.stringify(absoluteUrl));
        console.log('wangQQpost请求' + JSON.stringify(Option));
        that.http.post(absoluteUrl, Option, {
          headers:
          {
            // "content-type":"text/html",
            "authsign": this.getauthsign(),
          },
        }).subscribe(
          res => {
            console.log('wangQQpost请求返回数据' + JSON.stringify(res));
            callback && callback(res, result.userid, null);
          },
          error => {
            console.log('wangQQpost请求返回错误' + JSON.stringify(error));
            callback && callback(null, result.userid, error);
          }
        );
      }
    })
      .catch(errors => {

        callback && callback(null, null, errors);
      });
  }

  // //QQ分享
  // qqShare(info, callback ? : (res: any, error: any) => void) {
  // 	let that=this;
  // 	let args = {};
  // 	args['client'] = this.QQ.ClientType.QQ; //this.QQ.ClientType.QQ,this.QQ.ClientType.TIM;
  // 	args['scene'] = this.QQ.Scene.QQ; //this.QQ.Scene.QQZone,this.QQ.Scene.Favorite;
  // 	args['url'] =baseUrl+"index.php/Home/Share/share_invite.html?uid=" + info.id;
  // 	args['title'] = '微果淘';
  // 	args['description'] = '欢迎你的加入';
  // 	args['image'] = info.logo;
  // 	this.QQ.shareNews(args).then(result => {
  // 		callback && callback(result, null);
  // 	}).catch(errors => {
  // 		callback && callback(null, errors);
  // 	});
  // }

  //微博登录
  microclog(callback?: (res: any, openid: any, error: any) => void) {
    let that = this;
    console.log('wang' + 8);
    WeiboSDK.ssoLogin(function (args) {
      //callback && callback(args, null);
      console.log('wang' + 9);
      console.log('wang' + JSON.stringify(args));
      let absoluteUrl = baseUrl + 'getuserinfobyother';
      var Option = { "code": args.userId, "auth_token": args.access_token, "loginType": "wb" };
      console.log('wang微博post请求' + JSON.stringify(absoluteUrl));
      console.log('wang微博post请求' + JSON.stringify(Option));
      that.http.post(absoluteUrl, Option, {
        headers:
        {
          "authsign": that.getauthsign(),
        },
      }).subscribe(
        res => {
          console.log('wang微博post请求返回数据' + JSON.stringify(res));
          callback && callback(res, args.userId, null);
        },
        error => {
          console.log('wang微博post请求返回错误' + JSON.stringify(error));
          callback && callback(null, null, error);
        }
      );

      //       //微博分享
      //  microclogShare(params, callback ? : (res: any, error: any) => void) {
      // 	let args =0 {};
      // 	args['url'] = this.baseurl+"index.php/Home/Share/share_invite.html?uid=" + params.id;
      // 	args['title'] = '微果淘';
      // 	args['description'] = '欢迎你的加入';
      // 	args['image'] = params.logo;
      // 	WeiboSDK.shareToWeibo(function(success) {
      // 		callback && callback(success, null);
      // 	}, function(failReason) {
      // 		callback && callback(null, failReason);

      // 	}, args);
      // }
      // var url1= 'https://api.weibo.com/2/users/show.json?uid=' + args.userId ;
      // var url = url1 + '&&access_token=' + args.access_token;
      // 	let url = 'https://api.weibo.com/2/users/show.json?uid=' + args.userId + '&&access_token=' + args.access_token;
      // //获取用户信息 
      // that.http.get(url).subscribe(respond => {
      //     if(respond) {
      //       console.log('wang'+8);
      //       console.log('wang'+respond);
      //       let params = respond;
      //       //params['access_token'] = args.access_token;
      //       console.log('clog201' + JSON.stringify(respond))
      //       callback && callback(params, null);
      //     }
      //     console.log('wang'+11);
      //     console.log('wang'+respond);
      //   }, errorss => {
      //     console.log('wang'+14);
      //     console.log('wang'+errorss);
      //     console.log('clog249' + JSON.stringify(errorss))
      //     callback && callback(null, errorss);
      //   })
    }, function (failReason) {
      console.log('wang' + 10);
      console.log('wang' + JSON.stringify(failReason));
      callback && callback(null, null, failReason);
    });
  }

  //微信分享,好友和朋友圈
  wechatShare(info, callback?: (res: any, error: any) => void) {
    let that = this;
    Wechat.share({
      // text: "This is just a plain string",
      message: {
        title: "微果淘",
        description: "欢迎你的加入",
        // thumb: info.logo,
        // url: url ?url : "http://baidu.com"
        // media: {
        // 	type: Wechat.Type.WEBPAGE,
        // 	webpageUrl: baseUrl+"index.php/Home/Share/share_invite.html?uid=" + info.id
        // }
      },
      scene: Wechat.Scene.TIMELINE //info.scene // share to Timeline 
    }, function (suc) {
      console.log('wang2' + JSON.stringify(suc));
      callback && callback(suc, null);
    }, function (reason) {
      console.log('wang2' + JSON.stringify(reason));
      callback && callback(null, reason);
    });
  }

  //微信登录请求凭证
  wechatLogin(url: string, callback?: (res: any, openid:any, error: any) => void) {
    let that = this;
    var state = "_" + (+new Date());
    console.log('wang' + state);
    Wechat.auth(url, state, function (response) {
      console.log('wang2' + JSON.stringify(response));
      if (response) {
        console.log('wang' + 3333);
        console.log('wang' + response.code);
        console.log('wang1' + JSON.stringify(response));
        let absoluteUrl = baseUrl + 'getuserinfobyother';
        var Option = { "code": response.code, "loginType": "wx" };
        console.log('wang微信post请求' + JSON.stringify(absoluteUrl));
        console.log('wang微信post请求' + JSON.stringify(Option));
        let headers1 = new HttpHeaders();
        headers1 = headers1.append('authsign', that.getauthsign());
        console.log('wang1' + JSON.stringify(headers1));
        that.http.post(absoluteUrl, Option, {
          headers: headers1,
        }).subscribe(
          res => {
            console.log('wang微信post请求返回数据' + JSON.stringify(res));
            callback && callback(res, response.code,null);
          },
          error => {
            console.log('wang微信post请求返回错误' + JSON.stringify(error));
            callback && callback(null, null,error);
          }
        );
        //callback && callback(response, null);
        // that.wechatLoginInfo('https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxda508a9092ffbe41&secret=81ee1066cd2151a1544f3a765bb8a6d2&code=' + response.code + '&grant_type=authorization_code', (res: any, error: any) => {
        // 	if(res) {
        //     console.log('wang'+4);
        //     console.log('wang' + res);
        // 		callback && callback(res, null);
        // 	}
        // 	if(error) {
        //     console.log('wang' + error);
        // 		callback && callback(null, error);
        // 	}
        // })
        // console.log(16);
        // var appId = "wxda508a9092ffbe41";
        // let appSecret = "81ee1066cd2151a1544f3a765bb8a6d2";
        // // 2. 获取token，openID
        // Wechat.auth('https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appId + '&secret=' + appSecret + '&code=' + response.code + '&grant_type=authorization_code', function (accessTokenResponse) {
        //     var accessToken = accessTokenResponse.access_token;
        //     var openId = accessTokenResponse.openid;
        //     console.log(14);
        //     console.log(accessTokenResponse);
        //     // 3. 获取用户信息
        //     Wechat.auth('https://api.weixin.qq.com/sns/userinfo?access_token=' + accessToken + '&openid=' + openId + '&lang=zh_CN', function (userInfoResponse) {
        //       console.log(15);    
        //     console.log(userInfoResponse); // 用户信息

        //         // openid    普通用户的标识，对当前开发者帐号唯一
        //         // nickname    普通用户昵称
        //         // sex    普通用户性别，1为男性，2为女性
        //         // province    普通用户个人资料填写的省份
        //         // city    普通用户个人资料填写的城市
        //         // country    国家，如中国为CN
        //         // headimgurl    用户头像，最后一个数值代表正方形头像大小（有0、46、64、96、132数值可选，0代表640*640正方形头像），用户没有头像时该项为空
        //         // privilege    用户特权信息，json数组，如微信沃卡用户为（chinaunicom）
        //         // unionid    用户统一标识。针对一个微信开放平台帐号下的应用，同一用户的unionid是唯一的。
        //     });
        //   });
      }
    }, function (errors) {
      console.log('wang' + 5);
      console.log('wang1' + JSON.stringify(errors));
      callback && callback(null, null,errors);
    });

  }

  //微博分享
  microclogShare(params, callback?: (res: any, error: any) => void) {
    let args = {};
    args['url'] = baseUrl + "index.php/Home/Share/share_invite.html?uid=" + params.id;
    args['title'] = '微果淘';
    args['description'] = '欢迎你的加入';
    args['image'] = params.logo;
    WeiboSDK.shareToWeibo(function (success) {
      callback && callback(success, null);
    }, function (failReason) {
      callback && callback(null, failReason);

    }, args);
  }
  // //微信登录用凭证获取微信信息android上可以使用iOS不能访问
  // wechatLoginInfo(url: string, callback?: (res: any, error: any) => void) {
  //   let that = this;
  //   console.log('wang' + 6);
  //   that.http.post(url, '').subscribe(response => {
  //     console.log('wang' + 77);
  //     console.log('wang' + response);
  //     console.log('wang1' + JSON.stringify(response));
  //     //alert('clog249' + JSON.stringify(response));
  //     if (response && response['openid']) {
  //       var _json = {
  //         access_token: response['access_token'], //接口调用凭证
  //         expires_in: response['expires_in'], //接口调用凭证超时时间，单位（秒）
  //         refresh_token: response['refresh_token'], //用户刷新access_token
  //         openid: response['openid'], //授权用户唯一标识
  //         scope: response['scope']
  //       }
  //       console.log('wang' + 12);
  //       that.http.post('https://api.weixin.qq.com/sns/userinfo', that.encodeComplexHttpParams(_json)).subscribe(respond => {
  //         console.log('wang' + 8);
  //         if (respond && respond['openid']) {
  //           console.log('wang' + 9);
  //           callback && callback(respond, null);
  //         }
  //       }, errors => {
  //         console.log('wang' + 11);
  //         console.log('wang1' + JSON.stringify(errors));
  //         callback && callback(null, errors);
  //       })
  //     } else {
  //       console.log('wang' + 13);
  //     }
  //   }, error => {
  //     console.log('wang' + 10);
  //     console.log('wang1' + JSON.stringify(error));
  //     console.log(error)
  //   })
  // }
}
