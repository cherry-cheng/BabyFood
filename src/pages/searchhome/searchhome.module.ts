import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchhomePage } from './searchhome';

@NgModule({
  declarations: [
    SearchhomePage,
  ],
  imports: [
    IonicPageModule.forChild(SearchhomePage),
  ],
})
export class SearchhomePageModule {}
