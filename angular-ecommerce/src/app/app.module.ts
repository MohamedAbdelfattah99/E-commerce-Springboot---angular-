import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductService } from './services/product.service';
import { Routes ,RouterModule } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component';

import { ProductDetailsComponent } from './components/porduct-details/porduct-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarStatusComponent } from './components/car-status/car-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes:Routes=[

  {path:'cart-details', component:CartDetailsComponent},
  {path:'checkout', component:CheckoutComponent},

  {path:'products/:id', component:ProductDetailsComponent},

  {path:'search/:keyword', component:ProductListComponent},

  {path:'category/:id', component:ProductListComponent},
  {path:'category/', component:ProductListComponent},
  {path:'products', component:ProductListComponent},
  {path:'', redirectTo:'/products',pathMatch:'full'},
  {path:'**', redirectTo:'/products',pathMatch:'full'}

];


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent,
    ProductDetailsComponent,
    CarStatusComponent,
    CartDetailsComponent,
    CheckoutComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule , 
    ReactiveFormsModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
