import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Globe, User, ShoppingCart, Bell, Search, MessageCircle } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import logo from '../../assets/logo.png';

interface HeaderProps {
  onSearchClick?: () => void;
  onChatClick?: () => void;
  onNotificationsClick?: () => void;
}

export default function Header({ onSearchClick, onChatClick, onNotificationsClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, language, setLanguage, cartItems, setCurrentUser } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    setCurrentUser(null);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate('/')}
              className="flex-shrink-0 flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <img
                src={logo}
                alt="Women's Co-Op Logo"
                className="h-8 w-8 object-contain"
              />
              <h1 className="text-xl font-bold text-coral-600">
                Women's Co-Op
              </h1>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              {/* Language Toggle */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
                className="flex items-center space-x-1 text-gray-600 hover:text-coral-600 transition-colors"
              >
                <Globe className="h-4 w-4" />
                <span>{language.toUpperCase()}</span>
              </button>

              {currentUser && (
                <>
                  {/* Search Icon */}
                  <button
                    onClick={onSearchClick}
                    className="p-2 text-gray-600 hover:text-coral-600 transition-colors"
                  >
                    <Search className="h-6 w-6" />
                  </button>

                  {/* Cart Icon (Buyers only) */}
                  {currentUser.role === 'buyer' && (
                    <button
                      onClick={() => navigate('/cart')}
                      className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-coral-600 transition-colors" />
                      {cartItems.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-coral-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {cartItems.length}
                        </span>
                      )}
                    </button>
                  )}

                  {/* Chat Icon */}
                  <button
                    onClick={onChatClick}
                    className="p-2 text-gray-600 hover:text-coral-600 transition-colors"
                  >
                    <MessageCircle className="h-6 w-6" />
                  </button>

                  {/* Notifications */}
                  <div className="relative">
                    <button
                      onClick={onNotificationsClick}
                      className="p-2 text-gray-600 hover:text-coral-600 transition-colors"
                    >
                      <Bell className="h-6 w-6" />
                    </button>
                    <span className="absolute -top-1 -right-1 bg-red-500 h-3 w-3 rounded-full"></span>
                  </div>

                  {/* User Menu */}
                  <div className="relative">
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="flex items-center space-x-2 text-gray-600 hover:text-coral-600 transition-colors"
                    >
                      <User className="h-6 w-6" />
                      <span className="text-sm font-medium">{currentUser.name}</span>
                    </button>

                    {isMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                        <div className="px-4 py-2 text-sm text-gray-700 border-b">
                          {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                        </div>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-coral-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <button
              onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-coral-600"
            >
              <Globe className="h-4 w-4" />
              <span>Language: {language.toUpperCase()}</span>
            </button>
            
            {currentUser && (
              <button
                onClick={handleLogout}
                className="block px-3 py-2 text-gray-600 hover:text-coral-600 w-full text-left"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}