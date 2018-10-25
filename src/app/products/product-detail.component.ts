import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: Product;
  _errorMessage: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService) {
  }

  ngOnInit() {
    console.log('OnInit');
    // OnInit provides the best place to retrieve the data and initialize the component
    const id = +this._route.snapshot.paramMap.get('id'); // + unary operator casts the string to number
    this.pageTitle += `: ${id}`;

    this._productService.getProduct(id).subscribe(
      product => {
          this.product = product;
        },
      error => this._errorMessage = error
    );
  }

  onBack(): void {
    this._router.navigate(['/products']);
  }
}
