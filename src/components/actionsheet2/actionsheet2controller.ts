import { PopupboxComponent } from './popupbox';
import { Injectable, ComponentFactoryResolver, Injector, ApplicationRef} from '@angular/core';

/*
  Generated class for the Actionsheet2controllerProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Actionsheet2controllerProvider {
  private ref :any
  constructor(private appRef: ApplicationRef, private componentFactoryResolver: ComponentFactoryResolver, private injector: Injector) {
    let factory = this.componentFactoryResolver.resolveComponentFactory(PopupboxComponent);
    let newNode = document.createElement('div');
    document.getElementsByTagName("ion-app")[0].appendChild(newNode);
    this.ref = factory.create(this.injector, [], newNode);
    this.appRef.attachView(this.ref.hostView)
  }

  init() {

  }
  create(button : any) {
    this.ref.instance.setbutton.emit(button);
    this.ref.instance.pop.emit();
  }

  present() {

  }


}
