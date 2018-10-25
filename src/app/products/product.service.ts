import { Product } from './product';
import { Injectable } from '@angular/core';
import { Observable, ObservableInput, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    productsUrl = 'api/products/products.json';

    constructor(private _http: HttpClient) {
    }
    getProducts(): Observable<Product[]> {
        return this._http.get<Product[]>(this.productsUrl).pipe (
            tap(data => console.log('Tapped products:' + JSON.stringify(data))),
            catchError(this.handleError)
        );
    }

    getProduct(id: number): Observable<Product | undefined> {
        return this.getProducts().pipe (
            map((data: Product[]) => data.find(p => p.productId === id)),
        );
    }

    private handleError(err: HttpErrorResponse) {
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
            // a client-side or network error occured. Handle t accordingly
            errorMessage = `An error occurred: ${err.error.message}`;
        } else {
            // the backend returned an unsuccessful response code
            // the response body my contain clues as what went wrong
            errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
}

