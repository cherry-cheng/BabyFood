import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailRecipePage } from './detail-recipe';

@NgModule({
  declarations: [
    DetailRecipePage,
  ],
  imports: [
    IonicPageModule.forChild(DetailRecipePage),
  ],
})
export class DetailRecipePageModule {}
