import { Product } from './../../../models/product-model';
import { CartService } from './../../../services/cart.service';
import { Component, OnInit, ViewChild } from '@angular/core';



@Component({
  selector: 'app-cart-bar',
  templateUrl: './cart-bar.component.html',
  styleUrls: ['./cart-bar.component.css']
})
export class CartBarComponent implements OnInit {
   productsCart : Product[] = []
  totalPriceProd: number = 0;

  constructor(private cartService: CartService) {
   }

  ngOnInit(): void {
    this.productsCart = this.cartService.get();

  }
  updateTotalPrice(): Number{
    this.totalPriceProd = 0;
    this.productsCart.forEach((product) =>{
      this.totalPriceProd += Number(product.price)
    })
    return this.totalPriceProd
  }
  removeProduct(product: Product): void{
    this.cartService.remove(product)
    this.productsCart = this.cartService.get();
  }

}
