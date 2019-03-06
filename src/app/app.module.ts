import { NativeStorage } from '@ionic-native/native-storage';
import { TestPage } from './../pages/test/test';
import { SearchhomePage } from './../pages/searchhome/searchhome';
import { ActionSheet2Module } from './../components/actionsheet2/actionsheet2.module';
import { RecipedetailPage } from './../pages/recipedetail/recipedetail';
import { MultiPicker } from './../pages/multi-picker/multi-picker';
import { DetailRecipePage } from './../pages/detail-recipe/detail-recipe';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CollectPage } from '../pages/collect/collect';
import { MyPage } from '../pages/my/my';
import { LoginPage } from '../pages/login/login'
import { SettingPage} from '../pages/setting/setting'
import { AboutPage} from '../pages/about/about'
import { ProtocolPage } from '../pages/protocol/protocol'
import { RestProvider } from '../providers/rest/rest';
import { HttpClientModule } from "@angular/common/http";
import { AppVersion } from '@ionic-native/app-version';
import { IonicStorageModule } from "@ionic/storage";

// import { QQSDK, QQShareOptions } from '@ionic-native/qqsdk';
import { QQSDK } from '@ionic-native/qqsdk';
import { SearchhistoryProvider } from '../providers/searchhistory/searchhistory';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CollectPage,
    MyPage,
    TabsPage,
    LoginPage,
    SettingPage,
    AboutPage,
    ProtocolPage,
    DetailRecipePage,
    RecipedetailPage,
    SearchhomePage,
    TestPage,
    MultiPicker
  ],
  // imports: [
  //   BrowserModule,
  //   HttpClientModule,
  //   ActionSheet2Module,
  //   IonicStorageModule.forRoot(),
  //   IonicModule.forRoot(MyApp)
  // ],
  imports: [ 
    BrowserModule,
    HttpClientModule,
    ActionSheet2Module,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp,{
    tabsHideOnSubPages: 'true' ,
    // iconMode: 'ios',
    // mode: 'ios',
    // modalEnter: 'modal-slide-in',
    // modalLeave: 'modal-slide-out',
    }) ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CollectPage,
    MyPage,
    TabsPage,
    LoginPage,
    SettingPage,
    AboutPage,
    ProtocolPage,
    DetailRecipePage,
    RecipedetailPage,
    SearchhomePage,
    TestPage,
    MultiPicker
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    RestProvider,
    SearchhistoryProvider,
    QQSDK,
    AppVersion,
  ]
})
export class AppModule {}
