import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController } from '@ionic/angular';
import {Users} from '../../../providers/commerce/users';
import {NetworkService} from '../../../providers/network-service/network-service';
import { Logger } from '../../../providers/logger/logger';



@Component({
  selector: 'app-category-product-details-info',
  templateUrl: './category-product-details-info.page.html',
  styleUrls: ['./category-product-details-info.page.scss'],
})
export class CategoryProductDetailsInfoPage implements OnInit {
  product_id
  name
  description
  model
  meta_description
  wishlist_check
  image
  options=[];
  price
  quantity
  place
  optionEvent
  requestedQty=1;
  toastMessage

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public users: Users,
    public toastCtrl:ToastController,
   public networkService: NetworkService,
   public logger: Logger) {
var _this = this;


_this.product_id = _this.navParams.get('product_id'); 
_this.name = _this.navParams.get('name'); 
_this.description = _this.navParams.get('description'); 
//_this.meta_title = _this.navParams.get('meta_title'); 
_this.meta_description = _this.navParams.get('meta_description'); 
_this.wishlist_check = _this.navParams.get('wishlist_check'); 
_this.price = _this.navParams.get('price'); 
_this.model = _this.navParams.get('model'); 
_this.image = _this.navParams.get('image'); 
_this.options=_this.navParams.get("options");
_this.quantity = _this.navParams.get('quantity'); 
_this.optionEvent= _this.options[0];
}

  ngOnInit() {}
  optionsFn(ev) {
    var _this=this;
    _this.place=ev.name;
    _this.logger.debug("checking options item " +_this.place);
    _this.logger.debug("ev "+ev);
    _this.optionEvent=ev;    
  }
   presentToast() {
    let toast = this.toastCtrl.create({
      message: this.toastMessage,
      duration: 1000,
      position: 'middle'
    });
    toast.onDidDismiss(() => {
      this.logger.info('Dismissed toast');
    });
    toast.present();
  }
  addToCart() {
    
    var _this = this;
    _this.logger.info("invoking add to cart function:-");
   
    let addProduct = {
      product_id: _this.product_id,
      product_option: _this.optionEvent.product_option_id,
      product_option_value: _this.optionEvent.product_option_value_id,
      product_quantity: _this.requestedQty
    }
    _this.logger.debug("requestedQty "+JSON.stringify(_this.requestedQty));
    _this.logger.debug("addProduct "+addProduct);
    if(_this.requestedQty > 0){
    if(_this.requestedQty <= _this.optionEvent.quantity){
      this.users.addToCart(addProduct,function(result,data){
        if(result == '1') {
          var _dataObj = JSON.parse(data);
            _this.toastMessage=_dataObj.message;
            _this.presentToast();   
        }
        else {
          _this.networkService.showErrorAlert();
        }
      })
    }
    else{
      _this.networkService.showSuccessAlert("There is no qnty");
    }
  }else{ _this.networkService.showSuccessAlert("minimum quantity 1");}
  }
  setWishlist() {
    var _this = this;
    var productId = {
      product_id : _this.product_id,
    };

    if(_this.wishlist_check == 1){
      _this.networkService.showSuccessAlert("already add to wish list");
    }
    else{
      this.users.setWishlist(productId, function(result,data){

        if(result == '1') {
        _this.wishlist_check = 0;
          _this.networkService.showSuccessAlert("sucess "+data.toString());  
        }
        else {
          _this.networkService.showErrorAlert();
        }
      })
    }  
  }




}
