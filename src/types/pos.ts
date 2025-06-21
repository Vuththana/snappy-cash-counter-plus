
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image?: string;
  sku?: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
}
