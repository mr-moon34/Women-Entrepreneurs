import { Home, Search, ShoppingBag, User, BarChart3, Package } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function BottomNavigation() {
  const { currentUser } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  if (!currentUser) return null;

  const getNavItems = () => {
    switch (currentUser.role) {
      case 'buyer':
        return [
          { id: 'home', label: 'Home', icon: Home, path: '/' },
          { id: 'search', label: 'Search', icon: Search, path: '/search' },
          { id: 'cart', label: 'Cart', icon: ShoppingBag, path: '/cart' },
          { id: 'orders', label: 'Orders', icon: Package, path: '/orders' },
          { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
        ];
      case 'seller':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/seller' },
          { id: 'products', label: 'Products', icon: Package, path: '/seller/products' },
          { id: 'orders', label: 'Orders', icon: ShoppingBag, path: '/seller/orders' },
          { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
        ];
      case 'admin':
        return [
          { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/admin' },
          { id: 'community', label: 'Community', icon: User, path: '/admin/community' },
          { id: 'analytics', label: 'Analytics', icon: BarChart3, path: '/admin/analytics' },
          { id: 'profile', label: 'Profile', icon: User, path: '/profile' },
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
      <div className="flex justify-around items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || 
                          (item.path === '/' && location.pathname === '/') ||
                          (item.path !== '/' && location.pathname.startsWith(item.path));
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'text-coral-600 bg-coral-50'
                  : 'text-gray-600 hover:text-coral-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}