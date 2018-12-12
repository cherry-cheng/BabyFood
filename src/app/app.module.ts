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
import { RestProvider } from '../providers/rest/rest';
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage";

import { SearchhistoryProvider } from '../providers/searchhistory/searchhistory';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailRecipePage,
    RecipedetailPage,
    SearchhomePage,
    TestPage,
    MultiPicker
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ActionSheet2Module,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
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
    SearchhistoryProvider
  ]
})
export class AppModule {}
