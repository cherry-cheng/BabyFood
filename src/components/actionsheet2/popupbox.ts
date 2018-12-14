import { Component, EventEmitter, Output } from '@angular/core';
declare var document:any;
/**
 * yangkaixuan
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: "popupbox",
  template:
  `<div (click)="cancelbut()" class="contantback" style="display:none;width:100%;height:100%;position:absolute;z-index: 999999;background-color:black ;opacity: 0; background-size: 100% auto;">
  </div>
  <div class="contant" style="bottom :-182px">
    <img src='assets/imgs/img_alert_tips.svg' class="bg_tips" />
    <div class="contantbut">
      <div style="display: flex;margin: 0 auto;" *ngFor="let items of button; let idx=index">
        <div style="flex: 1;display: inline-block;" *ngFor="let item of items.value; let idx=index"
          (click)="buttonclick(item)">
          <div *ngIf="item" style="width: 44px;margin: 24px 0 6px;display: inline-block;position: relative;height: 44px;">
            <img style="position: absolute;top: 50%;left: 50%;transform: translate(-50%,-50%);width: 100%;" [src]="item.imgurl">
          </div>
          <div>{{item.text}}</div>
        </div>
      </div>
    </div>
    <div class="cancelbut" (click)="cancelbut()">取消</div>`,
    styles:[
      `.contant{
          height:182px;
          background:#fff;
          z-index:999999;
          border-radius:16px 16px 0 0;
        }
        .bg_tips{
          position:absolute;
          top:-55px;
          left:34px;
          z-index:99999999;
          display:none;
        }
      .cancelbut{
        background-color: #F5F5F5;
        width: 95%;
        height: 48px;
        border-radius:24px;
        margin: 0 auto;
        text-align: center;
        font-size: 17px;
        line-height: 48px;
        position: absolute;
        z-index: 9999999;
        display: block;
        transform: translateX(-50%);
        color: #464646;
        left: 50%;
        bottom: 16px;
      }
      .contantbut {
        height:118px;
        width: 100%;
        background-color: #fff;
        margin: 0 auto;
        text-align: center;
        font-size: 14px;
        line-height: 20px;
        position: absolute;
        z-index: 9999999;
        transform: translateX(-50%);
        color: #464646;
        left: 50%;
        justify-content: center;
        border-radius:16px 16px 0 0;

      }

      .contant {
        position: absolute;
        bottom: 3px;
        width: 100%;
        transition: 300ms;
      }

      .contantback {
        transition: 300ms;
      }
    `]
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
    this.pop.subscribe(() => {
      document.getElementsByClassName("contantback")[0].style.display =
        "initial";
      setTimeout(() => {
        document.getElementsByClassName("contantback")[0].style.opacity = "0.5";
      }, 0);
      document.getElementsByClassName("contant")[0].style.bottom = "0px";
      document.getElementsByClassName("bg_tips")[0].style.display = "block";

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
      for (var j = 0; j < this.button.length && this.button.length != 1; j++) {
        if (this.button[j].value.length != 4) {
          var tem_b = 4 - this.button[j].value.length;
          for (var w = 0; w < tem_b; w++) {
            this.button[j].value.push("");
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
    document.getElementsByClassName("contant")[0].style.bottom = "-182px";
    document.getElementsByClassName("bg_tips")[0].style.display = "none";
    setTimeout(() => {
      document.getElementsByClassName("contantback")[0].style.display = "none";
    }, 300);
  }
}
