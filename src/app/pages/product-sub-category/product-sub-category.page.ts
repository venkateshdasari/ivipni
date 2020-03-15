// all clear
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from "ionic-angular";
import { SearchProductsPage } from "../search-products/search-products.page";
import { CategoryProductDetailsPage } from "../category-product-details/category-product-details.page";
import { Logger } from "../../../providers/logger/logger";

@Component({
  selector: 'app-product-sub-category',
  templateUrl: './product-sub-category.page.html',
  styleUrls: ['./product-sub-category.page.scss'],
})
export class ProductSubCategoryPage implements OnInit {
  catName=[];
  headerName;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public logger: Logger
  ) {
    var _this = this;
    _this.catName = this.navParams.get("subSubCategories");
    _this.headerName = this.navParams.get("sub_category_name");
    _this.logger.debug(
      "printing data catName " + JSON.stringify(_this.catName)
    );
  }

  subcategoryName(catNames) {
    this.logger.info("invoking subcategoryName ");
    this.navCtrl.push(CategoryProductDetailsPage, catNames);
    this.logger.debug(
      "checking the parameter of subcategoryName fn " + catNames
    );
  }
  quickOrderFn() {
    this.navCtrl.push(SearchProductsPage, {});
  }

  ngOnInit() {
  }

}
