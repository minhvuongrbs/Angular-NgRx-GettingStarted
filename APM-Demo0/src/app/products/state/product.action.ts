import { Product } from './../product';
import { Action } from '@ngrx/store';

export enum ProductActionTypes {
  TOGGLE_PRODUCT_CODE = '[PRODUCT] TOGGLE_PRODUCT_CODE',
  GET_CURRENT_PRODUCT = '[PRODUCT] GET_CURRENT_PRODUCT',
  CLEAR_CURRENT_PRODUCT = '[PRODUCT] CLEAR_CURRENT_PRODUCT',
  INITIALIZE_CURRENT_PRODUCT = '[PRODUCT] INITIALIZE_CURRENT_PRODUCT',
  LOAD = '[PRODUCT] LOAD',
  LOAD_SUCCESS = '[PRODUCT] LOAD_SUCCESS',
  LOAD_FAIL = '[PRODUCT] LOAD_FAIL',
}

export class ToggleProductCode implements Action {
  readonly type = ProductActionTypes.TOGGLE_PRODUCT_CODE;
  constructor(public payload: boolean) {}
}

export class SetCurrentProduct implements Action {
  readonly type = ProductActionTypes.GET_CURRENT_PRODUCT;
  constructor(public payload: Product) {}
}

export class ClearCurrentProduct implements Action {
  readonly type = ProductActionTypes.CLEAR_CURRENT_PRODUCT;
  constructor() {}
}

export class InitializeCurrentProduct implements Action {
  readonly type = ProductActionTypes.INITIALIZE_CURRENT_PRODUCT;
  constructor() {}
}

export class Load implements Action {
  readonly type = ProductActionTypes.LOAD;
  constructor() {}
}
export class LoadSuccess implements Action {
  readonly type = ProductActionTypes.LOAD_SUCCESS;
  constructor(public payload: Product[]) {}
}
export class LoadFail implements Action {
  readonly type = ProductActionTypes.LOAD_FAIL;
  constructor(public payload: string) {}
}

export type ProductAcions =
  | ToggleProductCode
  | SetCurrentProduct
  | ClearCurrentProduct
  | Load
  | LoadSuccess
  | LoadFail
  | InitializeCurrentProduct;
