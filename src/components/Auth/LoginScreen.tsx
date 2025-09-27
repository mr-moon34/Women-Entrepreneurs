import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Users, ShoppingCart, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { User } from '../../types';
import logo from '../../assets/logo.png';

interface LoginScreenProps {
  onSwitchToSignup: () => void;
}

export default function LoginScreen({ onSwitchToSignup }: LoginScreenProps) {
  const [selectedRole, setSelectedRole] = useState<'buyer' | 'seller' | 'admin'>('buyer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setCurrentUser } = useApp();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const mockUser: User = {
        id: '1',
        name: selectedRole === 'buyer' ? 'Sarah Ahmed' : selectedRole === 'seller' ? 'Fatima Khan' : 'Admin User',
        email,
        phone: '+92-300-1234567',
        role: selectedRole,
        profileImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
        isApproved: true,
      };

      setCurrentUser(mockUser);
      // Navigate based on role
      if (selectedRole === 'buyer') {
        navigate('/');
      } else if (selectedRole === 'seller') {
        navigate('/seller');
      } else if (selectedRole === 'admin') {
        navigate('/admin');
      }
      setIsLoading(false);
    }, 1500);
  };

  const roleOptions = [
    {
      id: 'buyer',
      label: 'Buyer',
      icon: ShoppingCart,
      description: 'Shop from local women entrepreneurs',
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
    },
    {
      id: 'seller',
      label: 'Seller',
      icon: Users,
      description: 'Sell your products and grow your business',
      color: 'text-coral-600 bg-coral-50 border-coral-200',
    },
    {
      id: 'admin',
      label: 'Admin',
      icon: Shield,
      description: 'Manage the community cooperative',
      color: 'text-amber-600 bg-amber-50 border-amber-200',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-coral-50 via-white to-emerald-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-coral-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <img
              src={logo}
              alt="Women's Co-Op Logo"
              className="h-10 w-10 object-contain"
            />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select your role
          </label>
          <div className="space-y-3">
            {roleOptions.map((role) => {
              const Icon = role.icon;
              return (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id as any)}
                  className={`w-full p-4 border-2 rounded-xl flex items-center space-x-3 transition-all ${
                    selectedRole === role.id
                      ? role.color
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <div className="flex-1 text-left">
                    <div className="font-medium">{role.label}</div>
                    <div className="text-sm opacity-75">{role.description}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-coral-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-coral-700 focus:ring-2 focus:ring-coral-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-coral-600 font-medium hover:text-coral-700"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}