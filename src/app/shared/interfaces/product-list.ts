export interface IProduct {
  id: string;
  productName: string;
  price: number;
  amount: number;
}

export interface iProductsState {
  products: IProduct[]
}

export interface pageRequest {
  page: number;
  row: number
  search: string | undefined | null;
  sort:string
 
}