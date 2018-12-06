import { Component, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { Actionsheet2controllerProvider } from "./actionsheet2controller"
declare var document:any;
/**
 * yangkaixuan
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "popupbox",
  template: "actionsheet2.html"
})
export class PopupboxComponent {
  text: string;
  private button: any = [];
  ngAfterViewInit() {}

  buttonclick(item: any) {
    item.handler();
    this.cancelbut();
  }

  constructor() {
    this.text = "Hello World";
    var self = this;

    this.pop.subscribe(() => {
      document.getElementsByClassName("contantback")[0].style.display =
        "initial";
      setTimeout(() => {
        document.getElementsByClassName("contantback")[0].style.opacity = "0.5";
      }, 0);
      document.getElementsByClassName("contant")[0].style.bottom = "1px";
    });

    this.setbutton.subscribe((button: any) => {
      this.button = [];
      var a = [];
      for (var i = 0; i < button.buttons.length; i++) {
        if (a.length >= 4) {
          this.button.push({ value: a });
          a = [];
        }
        a.push(button.buttons[i]);
      }
      if (a.length) this.button.push({ value: a });
      for (var i = 0; i < this.button.length && this.button.length != 1; i++) {
        if (this.button[i].value.length != 4) {
          var tem_b = 4 - this.button[i].value.length;
          for (var w = 0; w < tem_b; w++) {
            this.button[i].value.push("");
          }
        }
      }
    });
  }

  //圈子评论
  @Output() pop = new EventEmitter<any>();
  @Output() setbutton = new EventEmitter<any>();

  cancelbut() {
    this.button = [];
    document.getElementsByClassName("contantback")[0].style.opacity = "0";
    document.getElementsByClassName("contant")[0].style.bottom = "-132px";
    setTimeout(() => {
      document.getElementsByClassName("contantback")[0].style.display = "none";
    }, 300);
  }
}
