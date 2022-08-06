import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product-model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product = {
    name: '',
    description: '',
    price: 0,
    img: ''
  }
  oldImg = '';
  constructor(private router: Router, private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.show(id).subscribe((product) => {
      this.product = product;
      this.oldImg = product.img;
    })
  }

  deleteProduct(): void {
    const btn = document.getElementById('btn-submit');
    if(btn){
      btn.innerHTML = `<img style="width: 40px; height: 30px; vertical-align: top;" src="../../../assets/img/loads.svg" />`
    }
    this.productService.delete(this.product.id).subscribe((product) => {
      this.productService.showMsg('Produto excluído')
      this.router.navigate(['/products/manage'])
    });
    setTimeout(function(){  if(btn){btn.innerHTML = 'Excluir' }}, 2000);
  }

  cancel():void {
    this.router.navigate(['/products/manage'])
  }
}
