import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../product';
import { Store, select } from '@ngrx/store';

import * as fromProduct from '../state/product.reducer';
import * as productActions from '../state/product.action';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  errorMessage$: any;

  constructor(private store: Store<fromProduct.State>) {}

  ngOnInit(): void {
    this.store.dispatch(new productActions.Load());
    this.store
      .pipe(select(fromProduct.getProducts))
      .subscribe((products) => (this.products = products));

    this.store
      .pipe(select(fromProduct.getShowProductCode))
      .subscribe((isShowProductCode) => (this.displayCode = isShowProductCode));

    this.store
      .pipe(select(fromProduct.getCurrentProduct))
      .subscribe((currentProduct) => (this.selectedProduct = currentProduct));

    this.errorMessage$ = this.store.pipe(select(fromProduct.getError));
  }

  ngOnDestroy(): void {}

  checkChanged(value: boolean): void {
    this.store.dispatch(new productActions.ToggleProductCode(value));
  }

  newProduct(): void {
    this.store.dispatch(new productActions.InitializeCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(new productActions.SetCurrentProduct(product));
  }
}
