import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import Header from './components/Layout/Header';
import BottomNavigation from './components/Layout/BottomNavigation';
import LoginScreen from './components/Auth/LoginScreen';
import SignupScreen from './components/Auth/SignupScreen';
import BuyerHome from './components/Buyer/BuyerHome';
import ProductDetail from './components/Buyer/ProductDetail';
import Cart from './components/Buyer/Cart';
import Checkout from './components/Buyer/Checkout';
import OrderHistory from './components/Buyer/OrderHistory';
import SellerDashboard from './components/Seller/SellerDashboard';
import OrderManagement from './components/Seller/OrderManagement';
import ProductManagement from './components/Seller/ProductManagement';
import AddProduct from './components/Seller/AddProduct';
import AdminDashboard from './components/Admin/AdminDashboard';
import UserProfile from './components/Common/UserProfile';
import AddressManagement from './components/Common/AddressManagement';
import SearchFilter from './components/Common/SearchFilter';
import Chat from './components/Common/Chat';
import Notifications from './components/Common/Notifications';
import { mockProducts } from './context/AppContext';
import logo from './assets/logo.png';

// Splash Screen Component
function SplashScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-coral-400 via-emerald-400 to-amber-400 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="bg-white/20 backdrop-blur-sm w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <img
            src={logo}
            alt="Women's Co-Op Logo"
            className="h-16 w-16 object-contain"
          />
        </div>
        <h1 className="text-4xl font-bold mb-2">Women's Co-Op</h1>
        <p className="text-lg opacity-90 mb-8">Community Co-Op for Women Entrepreneurs</p>
        <div className="flex space-x-4 justify-center">
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
}

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { currentUser } = useApp();
  return currentUser ? <>{children}</> : <Navigate to="/login" replace />;
}

// Role-based Route Component
function RoleRoute({ allowedRoles, children }: { allowedRoles: string[], children: React.ReactNode }) {
  const { currentUser } = useApp();
  
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/unauthorized" replace />;
  }
  
  return <>{children}</>;
}

// Main App Content Component
function AppContent() {
  const { currentUser } = useApp();
  const [showSearchFilter, setShowSearchFilter] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  if (!currentUser) {
    return null; // Auth screen will be shown by parent component
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onSearchClick={() => setShowSearchFilter(true)}
        onChatClick={() => setShowChat(true)}
        onNotificationsClick={() => setShowNotifications(true)}
      />
      <main>
        <Routes>
          {/* Buyer Routes */}
          <Route path="/" element={
            <RoleRoute allowedRoles={['buyer']}>
              <BuyerHome />
            </RoleRoute>
          } />
          <Route path="/search" element={
            <RoleRoute allowedRoles={['buyer']}>
              <div className="p-8 text-center">
                <button 
                  onClick={() => setShowSearchFilter(true)}
                  className="bg-coral-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-coral-700 transition-colors"
                >
                  Open Search & Filter
                </button>
              </div>
            </RoleRoute>
          } />
          <Route path="/product/:id" element={
            <RoleRoute allowedRoles={['buyer']}>
              <ProductDetail />
            </RoleRoute>
          } />
          <Route path="/cart" element={
            <RoleRoute allowedRoles={['buyer']}>
              <Cart />
            </RoleRoute>
          } />
          <Route path="/checkout" element={
            <RoleRoute allowedRoles={['buyer']}>
              <Checkout />
            </RoleRoute>
          } />
          <Route path="/orders" element={
            <RoleRoute allowedRoles={['buyer']}>
              <OrderHistory />
            </RoleRoute>
          } />

          {/* Seller Routes */}
          <Route path="/seller" element={
            <RoleRoute allowedRoles={['seller']}>
              <SellerDashboard />
            </RoleRoute>
          } />
          <Route path="/seller/products" element={
            <RoleRoute allowedRoles={['seller']}>
              <ProductManagement />
            </RoleRoute>
          } />
          <Route path="/seller/products/add" element={
            <RoleRoute allowedRoles={['seller']}>
              <AddProduct />
            </RoleRoute>
          } />
          <Route path="/seller/orders" element={
            <RoleRoute allowedRoles={['seller']}>
              <OrderManagement />
            </RoleRoute>
          } />

          {/* Admin Routes */}
          <Route path="/admin" element={
            <RoleRoute allowedRoles={['admin']}>
              <AdminDashboard />
            </RoleRoute>
          } />
          <Route path="/admin/community" element={
            <RoleRoute allowedRoles={['admin']}>
              <div className="p-8 text-center">Community management coming soon...</div>
            </RoleRoute>
          } />
          <Route path="/admin/analytics" element={
            <RoleRoute allowedRoles={['admin']}>
              <div className="p-8 text-center">Analytics page coming soon...</div>
            </RoleRoute>
          } />

          {/* Common Routes */}
          <Route path="/profile" element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          } />
          <Route path="/addresses" element={
            <ProtectedRoute>
              <AddressManagement />
            </ProtectedRoute>
          } />

          {/* Fallback Routes */}
          <Route path="/unauthorized" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Unauthorized Access</h1>
                <p className="text-gray-600">You don't have permission to access this page.</p>
              </div>
            </div>
          } />
          <Route path="*" element={
            <div className="min-h-screen flex items-center justify-center">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Page Not Found</h1>
                <p className="text-gray-600">The page you're looking for doesn't exist.</p>
              </div>
            </div>
          } />
        </Routes>
      </main>
      <BottomNavigation />
      
      {/* Modals */}
      {showSearchFilter && (
        <SearchFilter onClose={() => setShowSearchFilter(false)} />
      )}
      {showChat && (
        <Chat onClose={() => setShowChat(false)} />
      )}
      {showNotifications && (
        <Notifications onClose={() => setShowNotifications(false)} />
      )}
    </div>
  );
}

// Main App Component
function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  // Auto-hide splash screen after 3 seconds
  useState(() => {
    const timer = setTimeout(() => setShowSplash(false), 3000);
    return () => clearTimeout(timer);
  });

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <Router>
      <AppProvider>
        <AuthWrapper authMode={authMode} setAuthMode={setAuthMode} />
      </AppProvider>
    </Router>
  );
}

// Auth Wrapper Component
function AuthWrapper({ 
  authMode, 
  setAuthMode 
}: { 
  authMode: 'login' | 'signup';
  setAuthMode: (mode: 'login' | 'signup') => void;
}) {
  const { currentUser } = useApp();

  return (
    <Routes>
      <Route path="/login" element={
        !currentUser ? (
          authMode === 'login' ? (
            <LoginScreen onSwitchToSignup={() => setAuthMode('signup')} />
          ) : (
            <SignupScreen onSwitchToLogin={() => setAuthMode('login')} />
          )
        ) : (
          <Navigate to={currentUser.role === 'buyer' ? '/' : currentUser.role === 'seller' ? '/seller' : '/admin'} replace />
        )
      } />
      <Route path="/signup" element={
        !currentUser ? (
          <SignupScreen onSwitchToLogin={() => setAuthMode('login')} />
        ) : (
          <Navigate to={currentUser.role === 'buyer' ? '/' : currentUser.role === 'seller' ? '/seller' : '/admin'} replace />
        )
      } />
      <Route path="/*" element={
        currentUser ? <AppContent /> : <Navigate to="/login" replace />
      } />
    </Routes>
  );
}

export default App;