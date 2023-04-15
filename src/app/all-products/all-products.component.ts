import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { product } from '../model/product';
import { map } from 'rxjs';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {
  constructor(private http:HttpClient) {}


  allproducts:product[] = [];

  ngOnInit() {
    this.fetchData();
  }
  productFetch() {
    this.fetchData();
  }





  private fetchData() {
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
    })
  }

}
