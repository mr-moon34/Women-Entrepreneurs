export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'buyer' | 'seller' | 'admin';
  profileImage?: string;
  isApproved?: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'food' | 'clothing' | 'handicrafts' | 'services';
  image: string;
  sellerId: string;
  sellerName: string;
  rating: number;
  reviews: number;
  available: boolean;
}

export interface Order {
  id: string;
  buyerId: string;
  sellerId: string;
  products: CartItem[];
  total: number;
  status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled';
  deliveryMethod: 'pickup' | 'delivery';
  address?: string;
  createdAt: string;
  customerName: string;
  sellerName: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface SellerStats {
  totalEarnings: number;
  totalOrders: number;
  activeProducts: number;
  rating: number;
}

export interface AdminStats {
  totalSellers: number;
  totalBuyers: number;
  totalSales: number;
  weeklyGrowth: number;
}