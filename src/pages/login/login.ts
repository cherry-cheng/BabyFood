import { Component } from '@angular/core';
import { NavController, ViewController, NavParams,ModalController } from 'ionic-angular';
import { RestProvider } from "../../providers/rest/rest";
import { Storage } from '@ionic/storage';
import { ProtocolPage } from './../protocol/protocol';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public restProvider: RestProvider,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private storageData: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  dismiss() {
    this.viewCtrl.dismiss();
  }

  // {
  //   "status": 200,
  //   "code": 0,
  //   "msg": "success",
  //   "timestamp": 1546951814,
  //   "body": {
  //     "id": 3202934697,
  //     "idstr": "3202934697",
  //     "class": 1,
  //     "screen_name": "蓝夕流水",
  //     "name": "蓝夕流水",
  //     "province": "100",
  //     "city": "1000",
  //     "location": "其他",
  //     "description": "",
  //     "url": "",
  //     "profile_image_url": "http://tvax3.sinaimg.cn/crop.0.0.512.512.50/bee8e7a9ly8feen76ng3xj20e80e8dg6.jpg",
  //     "cover_image_phone": "http://ww1.sinaimg.cn/crop.0.0.640.640.640/549d0121tw1egm1kjly3jj20hs0hsq4f.jpg",
  //     "profile_url": "u/3202934697",
  //     "domain": "",
  //     "weihao": "",
  //     "gender": "m",
  //     "followers_count": 55,
  //     "friends_count": 99,
  //     "pagefriends_count": 1,
  //     "statuses_count": 108,
  //     "video_status_count": 0,
  //     "favourites_count": 235,
  //     "created_at": "Mon Dec 10 10:12:21 +0800 2012",
  //     "following": false,
  //     "allow_all_act_msg": false,
  //     "geo_enabled": true,
  //     "verified": false,
  //     "verified_type": -1,
  //     "remark": "",
  //     "insecurity": {
  //       "sexual_content": false
  //     }

  weiboLogin() {
    let that = this;
    console.log("wang+微博");
    console.log('wang' + 13);
    this.restProvider.microclog((res, openid, errors) => {
      if (res) {
        console.log('wang' + 500);
        console.log('wang' + JSON.stringify(res));
        if (res.status == 200) {
          let username = res.body.name;
          let header_img = res.body.profile_image_url;
          let sex: string;
          if (res.body.gender == 'm') {
            sex = "1";
            console.log(1);
          } else if (res.body.gender == 'f') {
            sex = "2";
            console.log(2);
          } else {
            console.log(0);
            sex = "0";
          }
          let type = "1";
          let signID = openid;
          let cid = '';

          var Option = {
            'type': type,
            'username': username,
            'header_img': header_img,
            'openid': signID,
            'cid': 0,
            'sex': sex,
          };
          console.log('wang参数' + JSON.stringify(Option));
          that.restProvider.POST('userlogin', null, Option, (res, error) => {
            if (error) {
              console.log('wang1' + JSON.stringify(error));
            }
            if (res) {
              console.log('wang2' + JSON.stringify(res));
              if (res.code == 0) {
                // {
                //   "status": 200,
                //   "code": 0,
                //   "msg": "success",
                //   "timestamp": 1546956855,
                //   "body": {
                //     "bobyinfo": [{
                //       "id": 4145,
                //       "bbname": "宝宝",
                //       "birthday": 1545062400,
                //       "sex": 0,
                //       "relationship": "2",
                //       "bbimgurl": "http://cdn.data.vweizhan.com/data/bbfushi/abc.png",
                //       "type": 1
                //     }],
                //     "userinfo": {
                //       "uid": "14b844c77cb9d991016ca362a3649ec1",
                //       "username": "蓝夕流水",
                //       "place": "",
                //       "imgurl": "",
                //       "header_img": "https://tvax3.sinaimg.cn/crop.0.0.512.512.180/bee8e7a9ly8feen76ng3xj20e80e8dg6.jpg",
                //       "sex": 1
                //     }
                //   }
                // }
                let userName = res.body.userinfo.username;
                let userID = res.body.userinfo.uid;
                let userHeader_img = res.body.userinfo.header_img;
                console.log('wang' + userName + userID + userHeader_img);

                this.storageData.set('isLogin', '1');
                this.storageData.set('userName', res.body.userinfo.username);
                this.storageData.set('userID', res.body.userinfo.uid);
                this.storageData.set('userHeader_img', res.body.userinfo.header_img);
                setTimeout(()=>{
                  this.viewCtrl.dismiss();
                },500)
                
              }
            }
          })

        }

      } else {
        console.log('wang' + 501);
        console.log('wang' + JSON.stringify(errors));
      }
    })

  }

  //微信登录
  wechatLogin() {
    console.log("wang+微信");
    //let that = this;
    this.restProvider.wechatLogin("snsapi_userinfo", (res, openid,errors) => {
      if (res) {
        console.log('wang' + 500);
        console.log('wang' + JSON.stringify(res));
        if (res.status == 200) {
          let username = res.body.nickname;
          let header_img = res.body.headimgurl;
          let sex: string;
          if (res.body.sex == 1) {
            sex = "1";
            console.log(1);
          } else if (res.body.sex == 2) {
            sex = "2";
            console.log(2);
          } else {
            console.log(0);
            sex = "0";
          }
          let type = "1";
          let signID = openid;

          var Option = {
            'type': type,
            'username': username,
            'header_img': header_img,
            'openid': signID,
            'cid': 0,
            'sex': sex,
          };
          console.log('wang参数' + JSON.stringify(Option));
          this.restProvider.POST('userlogin', null, Option, (res, error) => {
            if (error) {
              console.log('wang1' + JSON.stringify(error));
            }
            if (res) {
              console.log('wang2' + JSON.stringify(res));
              if (res.code == 0) {
                // {
                //   "status": 200,
                //   "code": 0,
                //   "msg": "success",
                //   "timestamp": 1546955487,
                //   "body": {
                //     "bobyinfo": [],
                //     "userinfo": {
                //       "uid": "f87c3d97ed2234268237c0b3184cfb9c",
                //       "username": "小生南瞧",
                //       "place": "",
                //       "imgurl": "",
                //       "header_img": "http://qzapp.qlogo.cn/qzapp/1107974869/44A6F4E970F7DDE061711CBE36174025/50",
                //       "sex": 1
                //     }
                //   }
                // }
                
                let userName = res.body.userinfo.username;
                let userID = res.body.userinfo.uid;
                let userHeader_img = res.body.userinfo.header_img;
                console.log('wang' + userName + userID + userHeader_img);

                this.storageData.set('isLogin', '1');
                this.storageData.set('userName', res.body.userinfo.username);
                this.storageData.set('userID', res.body.userinfo.uid);
                this.storageData.set('userHeader_img', res.body.userinfo.header_img);
                setTimeout(()=>{
                  this.viewCtrl.dismiss();
                },500)
              }
            }
          })
        }
      
      }

    })

  }

  // {
  // 	"status": 200,
  // 	"code": 0,
  // 	"msg": "success",
  // 	"timestamp": 1546951762,
  // 	"body": {
  // 		"ret": 0,
  // 		"msg": "",
  // 		"is_lost": 0,
  // 		"nickname": "小生南瞧",
  // 		"gender": "男",
  // 		"province": "浙江",
  // 		"city": "",
  // 		"year": "1992",
  // 		"constellation": "",
  // 		"figureurl": "http://qzapp.qlogo.cn/qzapp/1107974869/44A6F4E970F7DDE061711CBE36174025/30",
  // 		"figureurl_1": "http://qzapp.qlogo.cn/qzapp/1107974869/44A6F4E970F7DDE061711CBE36174025/50",
  // 		"figureurl_2": "http://qzapp.qlogo.cn/qzapp/1107974869/44A6F4E970F7DDE061711CBE36174025/100",
  // 		"figureurl_qq_1": "http://thirdqq.qlogo.cn/qqapp/1107974869/44A6F4E970F7DDE061711CBE36174025/40",
  // 		"figureurl_qq_2": "http://thirdqq.qlogo.cn/qqapp/1107974869/44A6F4E970F7DDE061711CBE36174025/100",
  // 		"is_yellow_vip": "0",
  // 		"vip": "0",
  // 		"yellow_vip_level": "0",
  // 		"level": "0",
  // 		"is_yellow_year_vip": "0"
  // 	}
  // }
  //QQ登录
  qqLogin() {
    let that = this;
    console.log("wang+点击登陆1");
    this.restProvider.qqLogin((res, openid, errors) => {
      if (res) {
        console.log('wang' + 500);
        console.log('wang' + JSON.stringify(res));
        if (res.status == 200) {
          let username = res.body.nickname;
          let header_img = res.body.figureurl_1;
          let sex: string;
          if (res.body.gender == '男') {
            sex = "1";
            console.log(1);
          } else if (res.body.gender == '女') {
            sex = "2";
            console.log(2);
          } else {
            console.log(0);
            sex = "0";
          }
          let type = "1";
          let signID = openid;
          let cid = res.body.nickname;


          var Option = {
            'type': type,
            'username': username,
            'header_img': header_img,
            'openid': signID,
            'cid': 0,
            'sex': sex,
          };
          console.log('wang参数' + JSON.stringify(Option));
          this.restProvider.POST('userlogin', null, Option, (res, error) => {
            if (error) {
              console.log('wang1' + JSON.stringify(error));
            }
            if (res) {
              console.log('wang2' + JSON.stringify(res));
              if (res.code == 0) {
                // {
                //   "status": 200,
                //   "code": 0,
                //   "msg": "success",
                //   "timestamp": 1546955487,
                //   "body": {
                //     "bobyinfo": [],
                //     "userinfo": {
                //       "uid": "f87c3d97ed2234268237c0b3184cfb9c",
                //       "username": "小生南瞧",
                //       "place": "",
                //       "imgurl": "",
                //       "header_img": "http://qzapp.qlogo.cn/qzapp/1107974869/44A6F4E970F7DDE061711CBE36174025/50",
                //       "sex": 1
                //     }
                //   }
                // }
                
                let userName = res.body.userinfo.username;
                let userID = res.body.userinfo.uid;
                let userHeader_img = res.body.userinfo.header_img;
                console.log('wang' + userName + userID + userHeader_img);

                this.storageData.set('isLogin', '1');
                this.storageData.set('userName', res.body.userinfo.username);
                this.storageData.set('userID', res.body.userinfo.uid);
                this.storageData.set('userHeader_img', res.body.userinfo.header_img);
                setTimeout(()=>{
                  this.viewCtrl.dismiss();
                },500)
              }
            }
          })
        }
      } else {
        console.log('wang' + 501);
        console.log('wang' + JSON.stringify(errors));
      }
    })
  }

  protocalClick(){
    console.log(2222222);
    let modal = this.modalCtrl.create(ProtocolPage);
    modal.onDidDismiss(() => {

      // console.log('退出');
      // this.loadUserPage();
    });
    modal.present();

  }
}
