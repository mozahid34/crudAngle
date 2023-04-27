import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { product } from '../model/product';
import { map } from 'rxjs';
import { __values } from 'tslib';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  constructor(private http:HttpClient) {}


  allproducts:product[] = [];
  isFeatching:boolean = false;
  isEdit:boolean = false;

  ngOnInit() {
    this.fetchData();
  }
  productFetch() {
    this.fetchData();
  }
  onDel(id:any) {
    this.http.delete(`https://angularfirst-3d22c-default-rtdb.firebaseio.com/products/${id}.json`)
    .subscribe((res)=> {
      this.productFetch();
    })
  }
  clrAll() {
    this.http.delete(`https://angularfirst-3d22c-default-rtdb.firebaseio.com/products.json`)
    .subscribe((res)=> {
      this.productFetch();
    })
  }

  onEdit(id: string) {
    // Get product based on id
    let currentProduct = this.allproducts.find((p) => {return p.id === id} )
    console.log(currentProduct);
    this.isEdit = true;

    // Populated the form with the form details

    // Change the button value to update product



  }
  onUpdate(id:any, value:product) {
    this.http.put(`https://angularfirst-3d22c-default-rtdb.firebaseio.com/products/${id}.json`, value)
    .subscribe()
  
  }





  private fetchData() {
    this.isFeatching = true;
    this.http.get('https://angularfirst-3d22c-default-rtdb.firebaseio.com/products.json')
    .pipe(map((res:{[key:string]:product}) => {
      
      const products = [];
      for (const key in res) {
        if(res.hasOwnProperty(key)) {
          products.push({...res[key], id:key})
        }

      }
      return products;
    }))
    .subscribe((products) => {
      this.allproducts = products;
      this.isFeatching = false;
    })
  }

}
