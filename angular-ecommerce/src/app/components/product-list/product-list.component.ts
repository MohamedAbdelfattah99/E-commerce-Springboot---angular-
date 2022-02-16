import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { CartItem } from 'src/app/common/cart-item';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  searchMode: boolean = false;
  previousKeyword:string="";
  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  constructor(private productService: ProductService,
              private route: ActivatedRoute, private cartService: CartService) { 
              
              }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    
    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }

  }
  handleSearchProducts() {

        const theKeyword: String =String( this.route.snapshot.paramMap.get('keyword'));
     
        if (this.previousKeyword != theKeyword) {
          this.thePageNumber = 1;
        }
    
        this.previousKeyword = String(theKeyword);

    // now search for the products using keyword
  //  this.productService.getProductListPaginate(this.thePageNumber -1,this.thePageSize,Number(theKeyword)).subscribe(this.processResult);
  this.productService.searchProducts(String(theKeyword)).subscribe(
    data => {
      this.products = data;
    }
  )
  
  }

  handleListProducts() {

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = Number( this.route.snapshot.paramMap.get('id'));
    }

    else {
      this.currentCategoryId = 2;
    }

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
    if (this.previousCategoryId != this.currentCategoryId) {
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

    // now get the products for the given category id
    this.productService.getProductListPaginate(this.thePageNumber - 1,
                                               this.thePageSize,
                                               this.currentCategoryId)
                                               .subscribe(this.processResult());

  }
/*
  listProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = Number( this.route.snapshot.paramMap.get('id'));
    }

    else {
      this.currentCategoryId = 2;
    }

    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }
*/
processResult() {
  return data => {
    this.products = data._embedded.products;
    this.thePageNumber = data.page.number + 1;
    this.thePageSize = data.page.size;
    this.theTotalElements = data.page.totalElements;
  };
}

updatePageSize(pageSize: number) {
  this.thePageSize = pageSize;
  this.thePageNumber = 1;
  this.listProducts();
}

addToCart(theProduct: Product) {
    
  console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

  const theCartItem = new CartItem(theProduct);

  this.cartService.addToCart(theCartItem);
}
}
