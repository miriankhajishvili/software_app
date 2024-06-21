export interface myData {
  first: number;
  prev: number;
  next: number;
  last: number;
  pages: number;
  items: number;
  data: IProduct[];

}


export interface IProduct {
  id: string;
  productName: string;
  price: number;
  amount: number;
}

export interface iProductsState {
  products: IProduct[];
  items: number;
}

export interface pageRequest {
  page: number;
  row: number;
  search: string | undefined | null;
  sort: string;
}
