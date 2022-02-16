import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';
@Component({
  selector: 'app-porduct-details',
  templateUrl: './porduct-details.component.html',
  styleUrls: ['./porduct-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private productService: ProductService,
              private route: ActivatedRoute ,private cartService:CartService, ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {

    const theProductId: number = Number (this.route.snapshot.paramMap.get('id'));

    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )
  }
  addToCart(theproduct:Product) {

    console.log(`Adding to cart: ${this.product.name}, ${this.product.unitPrice}`);
    const theCartItem = new CartItem(theproduct);
    this.cartService.addToCart(theCartItem);
    
  }


}
