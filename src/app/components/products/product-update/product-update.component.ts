import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Product } from 'src/app/models/product-model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  product: Product = {
    name: '',
    description: '',
    price: 0,
    img: ''
  }
  oldImg = '';
  formData = new FormData();
  @ViewChild('fileInput') fileInput?: ElementRef ;
  dataimage: any;
  fileAttr = 'Imagem';
  constructor(private router: Router, private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.productService.show(id).subscribe((product) => {
      this.product = product;
      this.oldImg = product.img;
    })
  }

  updateProduct(): void {
    const btn = document.getElementById('btn-submit');
    if(btn){
      btn.innerHTML = `<img style="width: 40px; height: 30px; vertical-align: top;" src="../../../assets/img/loads.svg" />`
    }
    if(!this.dataimage){
      this.update();
    }
    else {
      this.productService.upload(this.formData).subscribe((file) =>{
        this.product.img = file.data.link;
        this.update();
     })
     setTimeout(function(){  if(btn){btn.innerHTML = 'Salvar' }}, 2000);
    }
  }
  update(){
    this.productService.update(this.product).subscribe((product) => {
      this.productService.showMsg('Produto Atualizado')
      this.router.navigate(['/products/manage'])
    })
  }

  cancel():void {
    this.router.navigate(['/products/manage'])
  }

  uploadFileEvt(imgFile: any) {
    if (imgFile.target.files && imgFile.target.files[0]) {
      this.fileAttr = '';
      Array.from(imgFile.target.files).forEach((file: any) => {
        this.fileAttr += file.name + ' - ';
        this.formData.append('image',  file)
      });
      let reader = new FileReader();
      reader.onload = (e: any) => {
        let image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          let imgBase64Path = e.target.result;
          this.dataimage = imgBase64Path;
        };
      };
      reader.readAsDataURL(imgFile.target.files[0]);
      if( this.fileInput){
        this.fileInput.nativeElement.value = '';
      }
    }
    else {
      this.fileAttr = 'Imagem';
    }
  }

}
