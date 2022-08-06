import { CartService } from './../../../services/cart.service';
import { ProductService } from './../../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product-model';
import { HeaderService } from 'src/app/services/header.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  animations: [
    trigger('buttonTextStateTrigger', [
      state('shown', style({
        opacity: 1
      })),
      state('transitioning', style({
        opacity: 0.3
      })),
      transition('shown => transitioning', animate('600ms ease-out')),
      transition('transitioning => shown', animate('600ms ease-in'))
    ])
  ]
})
export class ProductListComponent implements OnInit {
  cols: number = 5;
  products: Product[] = []
  loader = true;

  constructor(private productService: ProductService, private headerService: HeaderService, breakpointObserver: BreakpointObserver, private cartService: CartService,) {
    headerService.headerData = {
      title: 'Produtos',
      icon: 'storefront',
      routeUrl: '/products'
    }
    Breakpoints.XSmall = '(max-width: 710px)'
    breakpointObserver.observe([
       Breakpoints.XLarge ,Breakpoints.Large, Breakpoints.Medium, Breakpoints.Small,  Breakpoints.XSmall
    ]).subscribe(result => {
      const breakpoints = result.breakpoints;

       if (breakpoints[Breakpoints.XSmall]) {
        this.cols = 1
      }
      else if (breakpoints[Breakpoints.Small]) {
        this.cols = 2
      }
      else if (breakpoints[Breakpoints.Medium]) {
        this.cols = 3
      }
      else if (breakpoints[Breakpoints.Large]) {
        this.cols = 4
      }
      else if (breakpoints[Breakpoints.XLarge]) {
        this.cols = 5
      }
    });
  }

  ngOnInit(): void {
    this.productService.read().subscribe((products) => {
      this.products = products
      this.loader = false;
    });
  }
    toCartText = "add_shopping_cart"
    buttonText = "add_shopping_cart";
    toCartElement: any;

    onAddToCart(product: any) {
      this.toCartElement = product.id;

      setTimeout(() => {
        this.cartService.add(product);
        this.buttonText = 'add_shopping_cart';
        this.toCartText = 'done';

      }, 900 );

      setTimeout(() => {
        this.toCartElement = '';
        this.toCartText = 'add_shopping_cart'
      }, 1800);
    }

}
