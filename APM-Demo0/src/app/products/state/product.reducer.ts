import { ProductAcions, ProductActionTypes } from './product.action';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Product } from './../product';
import * as fromRoot from '../../state/app.state';

export interface State extends fromRoot.State {
  products: ProductState;
}

export interface ProductState {
  isCheckBoxShow: boolean;
  products: Product[];
  currentProductId: number | null;
  err: string;
}

const initialState: ProductState = {
  isCheckBoxShow: true,
  products: [],
  currentProductId: null,
  err: null,
};

const getProductState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
  getProductState,
  (state) => state.isCheckBoxShow
);

export const getCurrentProductId = createSelector(
  getProductState,
  (state) => state.currentProductId
);
export const getCurrentProduct = createSelector(
  getProductState,
  getCurrentProductId,
  (state, productId) => {
    if (productId === 0) {
      return {
        id: 0,
        productCode: 'New',
        productName: '',
        starRating: 0,
        description: '',
      };
    } else {
      return productId
        ? state.products.find((product) => product.id === productId)
        : null;
    }
  }
);

export const getProducts = createSelector(
  getProductState,
  (state) => state.products
);
export const getError = createSelector(getProductState, (state) => state.err);

export const productReducer = (
  state: ProductState = initialState,
  action: ProductAcions
): ProductState => {
  switch (action.type) {
    case ProductActionTypes.TOGGLE_PRODUCT_CODE:
      return {
        ...state,
        isCheckBoxShow: action.payload,
      };
    case ProductActionTypes.GET_CURRENT_PRODUCT:
      return {
        ...state,
        currentProductId: action.payload.id,
      };
    case ProductActionTypes.CLEAR_CURRENT_PRODUCT:
      return {
        ...state,
        currentProductId: null,
      };

    case ProductActionTypes.INITIALIZE_CURRENT_PRODUCT:
      return {
        ...state,
        currentProductId: 0,
      };
    case ProductActionTypes.LOAD_SUCCESS:
      return {
        ...state,
        products: action.payload,
        err: '',
      };
    case ProductActionTypes.LOAD_FAIL:
      return {
        ...state,
        products: [],
        err: action.payload,
      };

    default:
      return state;
  }
};
