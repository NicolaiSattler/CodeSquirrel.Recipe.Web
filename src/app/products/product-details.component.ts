import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from '../model/product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
  host: {
    class: 'container'
  }
})
export class ProductDetailsComponent implements OnInit {
  private _pageTitle: string;
  private _errorMessage: string;
  private _product: IProduct;

  public get pageTitle() : string {
    return this._pageTitle;
  } 
  public get product() : IProduct{
    return this._product;
  }

  constructor(private route: ActivatedRoute, private router: Router, private _service : ProductService) { 
    this._pageTitle = "Product: "
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

  ngOnInit() {
    var id = this.route.snapshot.paramMap.get('id');
    this._service.getProductByID(id).subscribe(result =>
    {
      if (result)
      {
        this._product = result
      }
      else 
      {
        this._pageTitle = 'No product found...';
      }
    },
    error => this._errorMessage = <any>error)
  }
}
