import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../model/product';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  private _pageTitle: string;
  private _product: IProduct;

  public get pageTitle() : string {
    return this._pageTitle;
  } 
  public get product() : IProduct{
    return this._product;
  }

  constructor(private route: ActivatedRoute) { 
    this._pageTitle = 'Product Detail';
  }

  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('id');
  }
}
