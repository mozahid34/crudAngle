import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { clippingParents } from '@popperjs/core';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {
  constructor(private http:HttpClient) {}

  
  onProductCreate(product: {pname:string, des:string, price:number}) {
    console.log(product);
    this.http.post('https://angularfirst-3d22c-default-rtdb.firebaseio.com/products.json', product)
    .subscribe((res) => {
      console.log(res);
    })
    
    }

    
    
  }


