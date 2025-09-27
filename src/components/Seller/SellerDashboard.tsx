import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Package, DollarSign, Star, Plus, Eye, CreditCard as Edit, Trash2 } from 'lucide-react';
import { useApp, mockProducts } from '../../context/AppContext';
import { SellerStats } from '../../types';

export default function SellerDashboard() {
  const navigate = useNavigate();
  const { currentUser } = useApp();
  const [timeRange, setTimeRange] = useState('week');

  // Mock seller stats
  const stats: SellerStats = {
    totalEarnings: 12500,
    totalOrders: 48,
    activeProducts: 12,
    rating: 4.8,
  };

  // Mock recent orders
  const recentOrders = [
    { id: '1', customer: 'Sarah Ahmed', product: 'Homemade Biryani', amount: 500, status: 'completed', date: '2024-01-15' },
    { id: '2', customer: 'Fatima Khan', product: 'Embroidered Shawl', amount: 1200, status: 'pending', date: '2024-01-14' },
    { id: '3', customer: 'Zara Ali', product: 'Clay Pottery Set', amount: 800, status: 'in-progress', date: '2024-01-13' },
  ];

  // Mock seller's products
  const sellerProducts = mockProducts.filter(p => p.sellerId === 's1').slice(0, 4);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser?.name}!</p>
        </div>
        <button
          onClick={() => navigate('/seller/products/add')}
          className="bg-coral-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-coral-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Earnings</p>
              <p className="text-2xl font-bold text-gray-900">Rs. {stats.totalEarnings.toLocaleString()}</p>
              <p className="text-sm text-emerald-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12% from last month
              </p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-full">
              <DollarSign className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
              <p className="text-sm text-blue-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +8% from last week
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Products</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeProducts}</p>
              <p className="text-sm text-gray-500 mt-1">3 need attention</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-full">
              <Package className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Average Rating</p>
              <p className="text-2xl font-bold text-gray-900">{stats.rating}</p>
              <div className="flex items-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= Math.floor(stats.rating) ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="bg-amber-100 p-3 rounded-full">
              <Star className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Sales Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Sales Overview</h2>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="text-sm border border-gray-300 rounded-lg px-3 py-1"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
            </select>
          </div>
          
          {/* Simple bar chart representation */}
          <div className="space-y-3">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <div key={day} className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-600 w-8">{day}</span>
                <div className="flex-1 bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-coral-500 to-emerald-500 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${Math.random() * 80 + 20}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-900 w-12">Rs. {Math.floor(Math.random() * 2000 + 500)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category Performance */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Category Performance</h2>
          <div className="space-y-4">
            {[
              { category: 'Food', sales: 8500, percentage: 68 },
              { category: 'Clothing', sales: 2800, percentage: 22 },
              { category: 'Handicrafts', sales: 1200, percentage: 10 },
            ].map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.category}</span>
                  <span className="text-sm text-gray-900">Rs. {item.sales.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-coral-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders and Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            <button 
              onClick={() => navigate('/seller/orders')}
              className="text-coral-600 font-medium hover:text-coral-700"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-medium text-gray-900">{order.customer}</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{order.product}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">Rs. {order.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Products */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">My Products</h2>
            <button 
              onClick={() => navigate('/seller/products')}
              className="text-coral-600 font-medium hover:text-coral-700"
            >
              Manage All
            </button>
          </div>
          
          <div className="space-y-4">
            {sellerProducts.map((product) => (
              <div key={product.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{product.name}</h3>
                  <p className="text-sm text-gray-600">Rs. {product.price}</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-emerald-600 transition-colors">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}