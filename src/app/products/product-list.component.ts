import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from './product';

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

    constructor() {
      // this.products = this.getProductList();
      this.products = [
        {
          'productId': 1,
          'productName': 'Leaf Rake',
          'productCode': 'GDN-0011',
          'releaseDate': 'March 19, 2016',
          'description': 'Leaf rake with 48-inch wooden handle.',
          'price': 19.95,
          'starRating': 3.2,
          'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/26215/Anonymous_Leaf_Rake.png'
        },
        {
          'productId': 2,
          'productName': 'Garden Cart',
          'productCode': 'GDN-0023',
          'releaseDate': 'March 18, 2016',
          'description': '15 gallon capacity rolling garden cart',
          'price': 32.99,
          'starRating': 4.2,
          'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/58471/garden_cart.png'
        },
        {
          'productId': 5,
          'productName': 'Hammer',
          'productCode': 'TBX-0048',
          'releaseDate': 'May 21, 2016',
          'description': 'Curved claw steel hammer',
          'price': 8.9,
          'starRating': 4.8,
          'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/73/rejon_Hammer.png'
        },
        {
          'productId': 8,
          'productName': 'Saw',
          'productCode': 'TBX-0022',
          'releaseDate': 'May 15, 2016',
          'description': '15-inch steel blade hand saw',
          'price': 11.55,
          'starRating': 3.7,
          'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/27070/egore911_saw.png'
        },
        {
          'productId': 10,
          'productName': 'Video Game Controller',
          'productCode': 'GMG-0042',
          'releaseDate': 'October 15, 2015',
          'description': 'Standard two-button video game controller',
          'price': 35.95,
          'starRating': 4.6,
          'imageUrl': 'https://openclipart.org/image/300px/svg_to_png/120337/xbox-controller_01.png'
        }
      ];
      this.filteredProducts = this.filter(this.listFilter);
    }

    toggleImage(): void {
      this.showImage = !this.showImage;
    }

    getProductList(): any[] {
      const file: File = new File([], '../products.json');
      const reader: FileReader = new FileReader();
      let result: any[] = [];
      reader.onload = function (e) {
        result =  JSON.parse(reader.result as string);
      };
      reader.readAsText(file);

      return result;
    }

    ngOnInit(): void {
      console.log('OnInit');
    }
    ngOnDestroy(): void {
      console.log('OnDestroy');
    }
  }
