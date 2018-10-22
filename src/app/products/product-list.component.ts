import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import { toTypeScript } from '@angular/compiler';

@Component({
    selector: 'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Product List';
  imageWidth = 40;
  imageMargin = 2;
  showImage = false;

  products: Product[];
  filteredProducts: Product[];

  private _listFilter: string;
  get listFilter() {
    return this._listFilter;
  }
  set listFilter(value) {
    this._listFilter = value;
    this.filteredProducts = this.filter(this.listFilter);
    console.log('Filtered products: ' + this.filteredProducts);
  }

  private filter(filterBy: string): Product[] {
    filterBy = !filterBy ? '' : filterBy.toLocaleLowerCase();
    console.log('Filter criteria: ' + filterBy);
    return this.products.filter(
      (p: Product) => p.productName.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Product List: ' + message;
    console.log(message);
  }

  constructor(private _productService: ProductService) {
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    console.log('OnInit');
    // OnInit provides the best place to retrieve the data and initialize the component
    this.products = this._productService.getProducts();
    this.filteredProducts = this.filter(this.listFilter);
  }
  ngOnDestroy(): void {
    console.log('OnDestroy');
  }
}
