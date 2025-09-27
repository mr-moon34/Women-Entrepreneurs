import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Star, Heart, Plus } from 'lucide-react';
import { useApp, mockProducts } from '../../context/AppContext';
import ProductCard from '../Common/ProductCard';
import { Product } from '../../types';

export default function BuyerHome() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { addToCart } = useApp();

  const categories = [
    { id: 'all', label: 'All Products' },
    { id: 'food', label: 'Food' },
    { id: 'clothing', label: 'Clothing' },
    { id: 'handicrafts', label: 'Handicrafts' },
    { id: 'services', label: 'Services' },
  ];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory && product.available;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-coral-500 to-emerald-500 rounded-2xl p-6 text-white mb-6">
        <h1 className="text-2xl font-bold mb-2">Support Local Women</h1>
        <p className="opacity-90 mb-4">Discover amazing products made by talented women entrepreneurs in your community</p>
        <div className="flex items-center space-x-4 text-sm">
          <span className="bg-white/20 px-3 py-1 rounded-full">🌟 Quality Guaranteed</span>
          <span className="bg-white/20 px-3 py-1 rounded-full">📦 Local Delivery</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products, sellers, or categories..."
          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
        />
        <button className="absolute right-3 top-3 p-1 text-gray-400 hover:text-coral-600 transition-colors">
          <Filter className="h-5 w-5" />
        </button>
      </div>

      {/* Categories */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-colors ${
              selectedCategory === category.id
                ? 'bg-coral-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onProductClick={(product) => navigate(`/product/${product.id}`)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search or browse different categories</p>
        </div>
      )}

      {/* Featured Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Featured Sellers</h2>
          <button className="text-coral-600 font-medium hover:text-coral-700">View All</button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {['Fatima Khan', 'Ayesha Ahmed', 'Zara Ali'].map((seller, index) => (
            <div key={seller} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="flex items-center space-x-3">
                <img
                  src={`https://images.pexels.com/photos/${1239291 + index}/pexels-photo-${1239291 + index}.jpeg?auto=compress&cs=tinysrgb&w=100&h=100`}
                  alt={seller}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{seller}</h3>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span>{(4.7 + Math.random() * 0.3).toFixed(1)}</span>
                    <span>• {Math.floor(15 + Math.random() * 20)} products</span>
                  </div>
                </div>
                <button className="p-2 text-coral-600 hover:bg-coral-50 rounded-full transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}