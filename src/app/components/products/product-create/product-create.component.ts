import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product-model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  product: Product = {
    name: '',
    description: '',
    price: 0,
    img: ''
  }
   formData = new FormData();
  @ViewChild('fileInput') fileInput?: ElementRef ;
  dataimage: any;
  fileAttr = 'Escolha um arquivo';

  constructor(private route: Router, private productService: ProductService) { }

  ngOnInit(): void {
  }
   createProduct(){
    if(this.product.name === '' || this.product.description === '' ) {
      this.productService.showMsg('Preencha todos os campos', true)
      return
    }
    this.product.img = 'noimage'
    const btn = document.getElementById('btn-submit');
    if(btn){
      btn.innerHTML = `<img style="width: 40px; height: 30px; vertical-align: top;" src="../../../assets/img/loads.svg" />`
    }
     this.productService.upload(this.formData).subscribe((file) =>{
      this.product.img = file.data.link
      this.createProd()
   })
   setTimeout(function(){  if(btn){btn.innerHTML = 'Salvar' }}, 2000);


  }
  cancel(){
    this.route.navigateByUrl('/products/manage')
  }

  createProd(){
    this.productService.create(this.product).subscribe((product) => {
      this.productService.showMsg('Produto criado com sucesso.')
      this.route.navigateByUrl('/products/manage')
    })
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
      this.fileAttr = 'Escolha um arquivo';
    }
  }
}
