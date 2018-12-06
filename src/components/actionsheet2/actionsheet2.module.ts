import { NgModule } from '@angular/core';
import { PopupboxComponent } from './popupbox';
import { IonicModule } from 'ionic-angular';
import { Actionsheet2controllerProvider } from './actionsheet2controller';

@NgModule({
    declarations: [
        PopupboxComponent
    ],
    imports: [
        IonicModule
    ],
    entryComponents: [
        PopupboxComponent
      ],
    providers: [
        Actionsheet2controllerProvider
    ],
   
})
export class ActionSheet2Module { }
