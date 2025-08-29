export interface CartItem {
  id: string;
  productId: string;
  name: string;
  brand: string;
  price: number;
  priceCents: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  imageUrl?: string;
}

export interface CartContextType {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  totalItems: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  subtotal: number;
  total: number;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string | null;
  price: number;
  estimated_days_min: number | null;
  estimated_days_max: number | null;
}

export interface ShippingAddress {
  first_name: string;
  last_name: string;
  address_line_1: string;
  address_line_2: string;
  city: string;
  postal_code: string;
  country: string;
  phone: string;
}
