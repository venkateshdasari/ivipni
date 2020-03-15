// has no errors.....!

import { Component, OnInit } from '@angular/core';
import {
  NavController,
  NavParams,
  ToastController,
  LoadingController
} from "@ionic/angular";
import { Products } from "../../../providers/commerce/products";
import { HomePage } from "../../home/home.page";
import { ShoppingcartPage } from "../shoppingcart/shoppingcart.page";
import { Users } from "../../../providers/commerce/users";
import { CategoryProductDetailsInfoPage } from "../category-product-details-info/category-product-details-info.page";
import { NetworkService } from "../../../providers/network-service/network-service";
import { Logger } from "../../../providers/logger/logger";
import { Holders } from "../../../providers/holders/holders";
import { PhotoViewer } from '@ionic-native/photo-viewer';

import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-category-product-details',
  templateUrl: './category-product-details.page.html',
  styleUrls: ['./category-product-details.page.scss'],
})
export class CategoryProductDetailsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
