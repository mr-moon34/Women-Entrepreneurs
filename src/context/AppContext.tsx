import { createContext, useContext, useState, ReactNode } from 'react';
import { User, Product, Order, CartItem } from '../types';

interface AppContextType {
  // User management
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  isAuthenticated: boolean;
  
  // Cart management
  cartItems: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  
  // Language
  language: 'en' | 'ur';
  setLanguage: (lang: 'en' | 'ur') => void;
  
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Homemade Biryani',
    description: 'Authentic chicken biryani made with traditional spices',
    price: 500,
    category: 'food',
    image: 'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    sellerId: 's1',
    sellerName: 'Fatima Khan',
    rating: 4.8,
    reviews: 32,
    available: true
  },
  {
    id: '2',
    name: 'Embroidered Shawl',
    description: 'Beautiful hand-embroidered shawl with traditional patterns',
    price: 1200,
    category: 'clothing',
    image: 'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    sellerId: 's2',
    sellerName: 'Ayesha Ahmed',
    rating: 4.9,
    reviews: 18,
    available: true
  },
  {
    id: '3',
    name: 'Clay Pottery Set',
    description: 'Handmade clay pots and decorative items',
    price: 800,
    category: 'handicrafts',
    image: 'https://images.pexels.com/photos/1373736/pexels-photo-1373736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    sellerId: 's3',
    sellerName: 'Zara Ali',
    rating: 4.7,
    reviews: 25,
    available: true
  }
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [language, setLanguage] = useState<'en' | 'ur'>('en');

  const isAuthenticated = currentUser !== null;

  const addToCart = (product: Product, quantity = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.product.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const value: AppContextType = {
    currentUser,
    setCurrentUser,
    isAuthenticated,
    cartItems,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotal,
    language,
    setLanguage,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Export mock data for components to use
export { mockProducts };