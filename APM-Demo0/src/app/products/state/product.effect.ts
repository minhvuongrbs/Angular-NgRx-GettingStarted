import { ProductActionTypes } from './product.action';
import { ProductService } from './../product.service';

import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError } from 'rxjs/operators';

import * as productActions from './product.action';
import { of } from 'rxjs';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
  @Effect()
  getProducts$ = this.actions$.pipe(
    ofType(productActions.ProductActionTypes.LOAD),
    mergeMap((action: productActions.Load) =>
      this.productService.getProducts().pipe(
        map((products) => new productActions.LoadSuccess(products)),
        catchError((err) => of(new productActions.LoadFail(err)))
      )
    )
  );
}
