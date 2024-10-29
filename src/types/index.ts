export interface Book {
  id: string;
  name: string;
  image: string;
  author: string;
  description: string;
  rating: number;
  countInStock: number;
  price: number;
}

export interface CartItem extends Book {
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalAmount: number;
}

export type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "CLEAR_CART" };

export interface IOrder {
  amount: number;
  items: CartItem[];
  created: number;
  paymentId: string;
  uid: string;
}
