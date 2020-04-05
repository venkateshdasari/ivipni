import { Component, ViewChild } from "@angular/core";
import {
  NavController,
  PopoverController,
  LoadingController,
  ToastController,
  Nav,
} from "ionic-angular";
import { Storage } from "@ionic/storage";
import { Users } from "../../providers/commerce/users";
import { Products } from "../../providers/commerce/products";
import { NetworkService } from "../../providers/network-service/network-service";
import { WishListPage } from "../pages/wish-list/wish-list.page";
import { LoginPage } from "../pages/login/login.page";
import { AboutUsPage } from "../pages/about-us/about-us.page";
import { TermsOfUsePage } from "../pages/terms-of-use/terms-of-use.page";
import { PrivacyPolicyPage } from "../pages/privacy-policy/privacy-policy.page";
import { ProductSubCategoryPage } from "../pages/product-sub-category/product-sub-category.page";
import { CategoryProductDetailsInfoPage } from "../pages/category-product-details-info/category-product-details-info.page";
import { CategoryProductDetailsPage } from "../pages/category-product-details/category-product-details.page";
import { ShoppingcartPage } from "../pages/shoppingcart/shoppingcart.page";
import { SellerInfoPage } from "../pages/seller-info/seller-info.page";
import { AccountPage } from "../pages/account/account.page";
//import{chartPage} from "../chart/chart";
import { SearchProductsPage } from "../pages/search-products/search-products.page";
import { Logger } from "../../providers/logger/logger";
import { PaymentremainPage } from "../pages/paymentremain/paymentremain.page";
import { Holders } from "../../providers/holders/holders";
import { AppVersion } from "@ionic-native/app-version/ngx";
import { Slides, Platform } from "ionic-angular";
import { Device } from "@ionic-native/device/ngx";
import { OneSignal } from "@ionic-native/onesignal/ngx";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  @ViewChild(Slides, { static: true }) slides: Slides;
  @ViewChild(Nav, { static: true }) nav: Nav;
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
    public navCtrl: NavController,
    public productServices: Products,
    public popoverCtrl: PopoverController,
    public user: Users,
    public networkService: NetworkService,
    public loadingCtrl: LoadingController,
    public logger: Logger,
    public toastCtrl: ToastController,
    public storage: Storage,
    public device: Device,
    public holders: Holders,
    public oneSignal: OneSignal,
    private appVersion: AppVersion,
    platform: Platform,
    public alertCtrl: AlertController
  ) {
    var _this = this;
    _this.loginData = this.holders.getLoginData();
    _this.logger.info("logdata " + JSON.stringify(_this.loginData));

    let loading = loadingCtrl.create({
      content: `<ion-spinner name="bubbles"></ion-spinner>`,
    });

    _this.appVersion.getVersionNumber().then((version) => {
      _this.appVersionnumber = version;
    });

    console.log("appvershen" + _this.appVersionnumber);
    if (_this.networkService.nullConnection()) {
      _this.networkService.showNetworkAlert();
    } else {
      loading.present();
      this.productServices.getBanners(function (data) {
        _this.logger.debug("checking Array" + JSON.stringify(data));
        _this.topProducts = data.data;
      });

      this.productServices.getBrandName(function (data) {
        _this.logger.debug("checking procutName" + data);
        _this.brandName = data.data.categories[0].sub_categories;
        console.log(" _this.brandName", _this.brandName);
      });

      this.productServices.getPromotionalProducts(function (data) {
        _this.logger.debug("checking productCategory" + JSON.stringify(data));
        _this.productCategory = data.data.products;
        _this.cat_id = data["cat_id"];
        _this.logger.debug(
          "checking productCategory" + JSON.stringify(_this.productCategory)
        );
        loading.dismiss();
      });
    }
    _this.model = _this.device.model;
    _this.osVersion = _this.device.version;
    _this.manufacturer = _this.device.manufacturer;
    _this.platforms = _this.device.platform;
    _this.cordova = _this.device.cordova;
    //platform.ready().then(() => {

    //console.log("player_id"+JSON.stringify(_this.player_id));
    // do something when notification is received

    //},);
    //_this.player_id= _this.oneSignal.addSubscriptionObserver();

    _this.device_token = _this.device.uuid;
    
    //_this.appVersion.getVersionNumber().then((version) => {
    //  _this.appVersion = version as const;
    //});
    //console.log(" _this.appVersion " + JSON.stringify(_this.appVersion));
    _this.deviceInfo();
  }
  // ngAfterViewInit() {
  //   setTimeout(() => {
  //     if(this.topProducts && this.topProducts.length > 0) {
  //       this.slides.freeMode = true;
  //       this.slides.autoplay = 5000;
  //       this.slides.speed = 3000;
  //       this.slides.loop = true;
  //       this.slides.startAutoplay();
  //     }
  //   }, 1000);
  // }
  deviceInfo() {
    var _this = this;
    _this.oneSignal.getIds().then(function (userId) {
      //console.log("player_id"+JSON.stringify(userId));
      _this.player_id = userId.userId;
      // console.log("player_id"+JSON.stringify(_this.player_id));

      let deviceInfo = {
        manufacturer: _this.manufacturer,
        model: _this.model,
        platform: _this.platforms,
        os_version: _this.osVersion,
        device_token: _this.device_token,
        player_id: _this.player_id,
        app_version: "0.0.6",
      };
      _this.logger.debug(
        "checking deviceInfo obj " + JSON.stringify(deviceInfo)
      );
      _this.user.deviceInfo(deviceInfo, function (result, data) {
        _this.logger.debug("checking the data in deviceInfo " + deviceInfo);
        if (result == "1") {
          _this.logger.info("invoking the success callback");
        } else {
          _this.logger.debug("invoking the failure callback");
        }
      });
    });
  }
  ionViewDidEnter() {
    var _this = this;
    _this.logger.info("invoking the Home page ionView did load ");

    if (_this.networkService.nullConnection()) {
      _this.networkService.showNetworkAlert();
    } else {
      this.productServices.getCartCount().subscribe((data) => {
        _this.logger.debug("checking getCartCount" + JSON.stringify(data));
        _this.cartCount = data.count;
        _this.logger.debug("getCartCount " + _this.cartCount);
      });

      this.productServices.getWishlistCount().subscribe((data) => {
        _this.logger.debug("checking getWishlistCount" + JSON.stringify(data));
        _this.wishlistCount = data.count;
        _this.logger.debug("getWishlistCount " + _this.wishlistCount);
      });
    }
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: this.toastMessage,
      duration: 1000,
      position: "middle",
    });

    toast.onDidDismiss(() => {
      this.logger.info("Dismissed toast");
    });

    toast.present();
  }

  logout() {
    this.navCtrl.setRoot(LoginPage, {});
    this.storage.remove("loginId");
    this.storage.remove("passwd");
  }

  infoBrandItem(catName) {
    this.logger.info("invoking Brand item");
    // this.logger.info("vidya"+ JSON.stringify(catName));
    this.navCtrl.push(ProductSubCategoryPage, catName);
    this.logger.debug(
      "checking the parameter of subcategoryName fn " + catName
    );
  }

  //function for both PROMOTIONAL PRODUCTS: & SHOP CATEGORY PRODUCTS:
  productCate(prodCat) {
    this.logger.info("invoking Product category FN");
    this.navCtrl.push(CategoryProductDetailsInfoPage, prodCat);
    this.logger.debug("productCat object" + JSON.stringify(prodCat));
  }

  //static pages
  aboutUs() {
    this.logger.info("invoking aboutus page");
    this.navCtrl.push(AboutUsPage, {});
  }
  amoutremain() {
    this.logger.info("invoking aboutus page");
    this.navCtrl.push(PaymentremainPage, {});
  }
  sellerinfo() {
    this.logger.info("invoking aboutus page");
    this.navCtrl.push(SellerInfoPage, {});
  }

  termsOfUs() {
    this.logger.info("invoking termsOfUs page");
    this.navCtrl.push(TermsOfUsePage, {});
  }

  async addToCart(productCategory) {
    if (productCategory.alternate_brand == "YES") {
      let alert = await this.alertCtrl.create({
        header: "Ivipni",
        message:
          "Are you fine with same product from other manufacturers (ex: Tata, SKF, FAG, etc)?",
        buttons: [
          {
            text: "No",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
              productCategory.alternate = "NO";
              this.addToCartDataInsert(productCategory);
            },
          },
          {
            text: "Yes",
            handler: () => {
              console.log("Buy clicked");
              productCategory.alternate = "YES";
              this.addToCartDataInsert(productCategory);
            },
          },
        ],
      });
      alert.present();
    } else {
      productCategory.alternate = "";
      this.addToCartDataInsert(productCategory);
    }
  }

  addToCartDataInsert(productCategory) {
    let addProduct;
    let option;
    var _this = this;
    _this.logger.info("invoking add to cart function:-");
    _this.logger.debug(
      "checking addtocart object" + JSON.stringify(productCategory)
    );
    option = productCategory.option1;
    _this.logger.debug("checking addtocart object " + JSON.stringify(option));

    addProduct = {
      product_id: productCategory.product_id,
      product_option: productCategory.option1[0]["product_option_id"],
      product_option_value:
        productCategory.option1[0]["product_option_value_id"],
      product_quantity: productCategory["required"],
      alternate_brand: productCategory.alternate,
    };

    _this.logger.debug(
      "checking addtocart object " + JSON.stringify(addProduct)
    );
    if (productCategory["required"] > 0) {
      if (productCategory.quantity_check == "NO") {
        _this.user.addToCart(addProduct, function (result, data) {
          if (result == "1") {
            var _dataObj = JSON.parse(data);
            _this.toastMessage = _dataObj.message;
            _this.cartCount = _dataObj.count;
            _this.presentToast();
          } else {
            _this.networkService.showErrorAlert();
          }
        });
      } else {
        if (
          Number(productCategory.required) <= Number(productCategory.quantity)
        ) {
          _this.user.addToCart(addProduct, function (result, data) {
            if (result == "1") {
              var _dataObj = JSON.parse(data);
              _this.toastMessage = _dataObj.message;
              _this.cartCount = _dataObj.count;
              _this.presentToast();
            } else {
              _this.networkService.showErrorAlert();
            }
          });
        } else {
          _this.networkService.showSuccessAlert(
            "We have maximum qnty of " + productCategory.quantity
          );
        }
      }
    } else {
      _this.networkService.showSuccessAlert("minimum quantity 1");
    }
  }
  //call() {
  //  window.location = "tel:8310914770";
  //}

  privacyPolicy() {
    this.logger.info("invoking privacyPolicy page");
    this.navCtrl.push(PrivacyPolicyPage, {});
  }

  cartFn() {
    this.logger.info("invoking Shopingcart page");
    this.navCtrl.push(ShoppingcartPage, {});
  }

  //my account
  account() {
    this.logger.info("invoking account page");
    this.navCtrl.push(AccountPage, {});
  }

  allProduct() {
    this.navCtrl.push(CategoryProductDetailsPage, { category_id: this.cat_id });
  }

  wishListFn() {
    var _this = this;
    if (_this.wishlistCount == 0) {
      _this.toastMessage = "There are no products in your wishlist";
      _this.presentToast();
    } else {
      _this.navCtrl.push(WishListPage, {});
    }
  }
  //   chart(){
  // this.navCtrl.push(chartPage);
  //   }

  quickOrderFn() {
    this.navCtrl.push(SearchProductsPage, {});
  }
}
