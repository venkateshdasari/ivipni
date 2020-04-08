import { Component, ViewChild } from "@angular/core";
import {
  NavController,
  PopoverController,
  LoadingController,
  ToastController,
} from "@ionic/angular";
import { MenuController } from "@ionic/angular";

import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  mySlideOptions = {
    initialSlide: 2,
    loop: true,
    autoplay: 1000,
    pager: true,
  };

  mySlideOptionsCategory = {
    slidesPerView: 4,
  };

  mySlideOptionsProduct = {
    slidesPerView: 2,
  };

  public topProducts = [];
  public brandName = [];
  public productCategory = [];
  public shopProductCategory = [];

  public subBrandItem: any;
  cartCount;
  wishlistCount;
  appVersionnumber;
  toastMessage;
  loginData;
  manufacturer;
  model;
  platforms;
  osVersion;
  cordova;
  vernumber;
  cat_id;
  device_token;
  public player_id: any;

  constructor(
    private menu: MenuController,
    private router: Router,
    public toastCtrl: ToastController
  ) {}

  async presentToast() {
    let toast = await this.toastCtrl.create({
      message: this.toastMessage,
      duration: 1000,
      position: "middle",
    });
    toast.present();
  }

  aboutUs() {
    // todo uncomment this
    //this.logger.info("invoking aboutus page");
    return this.router.navigateByUrl("/about-us");
  }

  //my account
  account() {
    // this.logger.info("invoking account page");
    this.router.navigateByUrl("/account");
  }

  cartFn() {
    // this.logger.info("invoking Shopingcart page");
    this.router.navigateByUrl("/shoppingcart");
  }
  call() {
    // window.location = "tel:8310914770";
    // lets give number on toast
    var _this = this;
    _this.toastMessage = "tel:8310914770";
    _this.presentToast();
  }

  logout() {
    // this.storage.remove("loginId");
    // this.storage.remove("passwd");
    this.router.navigateByUrl("/login");
  }

  quickOrderFn() {
    this.router.navigateByUrl("/search-products");
  }

  sellerinfo() {
    // this.logger.info("invoking aboutus page");
    this.router.navigateByUrl("/seller-info");
  }

  wishListFn() {
    var _this = this;
    if (_this.wishlistCount == 0) {
      _this.toastMessage = "There are no products in your wishlist";
      _this.presentToast();
    } else {
      _this.router.navigateByUrl("/wish-list");
    }
  }
}
