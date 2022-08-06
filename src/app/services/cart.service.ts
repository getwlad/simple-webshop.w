import { Injectable } from '@angular/core';
import { Product } from '../models/product-model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private productsCart : Product[] = []
  private totalPriceProd: number = 0;
  constructor() { }

  get (){
    return this.productsCart
  }
  add(product: Product): void {
    this.productsCart.push(product);
  }
  remove(product: Product): void{
    const prodInd = this.productsCart.findIndex(prod => prod.id === product.id)
    this.productsCart.splice(prodInd, 1)
  }

  getTotalPrice(): number {
    return this.totalPriceProd
  }
}
