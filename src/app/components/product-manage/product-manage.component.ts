import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product-model';
import { ProductService } from 'src/app/services/product.service';
import { HeaderService } from 'src/app/services/header.service';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

@Component({
  selector: 'app-product-manage',
  templateUrl: './product-manage.component.html',
  styleUrls: ['./product-manage.component.css']
})
export class ProductManageComponent implements OnInit {
  cols: number = 5;
  products: Product[] = []
  loader = true;
  constructor(private productService: ProductService, private router: Router, private headerService: HeaderService, breakpointObserver: BreakpointObserver) {
    headerService.headerData = {
      title: 'Gerenciar Produtos',
      icon: 'shop_two',
      routeUrl: '/products/manage'
    }
    window.scrollTo(0, 0);
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
      this.products = products;
      this.loader = false;
    });

  }
  navigateToCreateProduct() {
    this.router.navigateByUrl('/products/create')
  }

}
