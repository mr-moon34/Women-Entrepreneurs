import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Eye, Package, Search, Filter } from 'lucide-react';
import { useApp, mockProducts } from '../../context/AppContext';
import { Product } from '../../types';

export default function ProductManagement() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('name');

  // Filter products for current seller
  const sellerProducts = mockProducts.filter(p => p.sellerId === 's1');

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'food', label: 'Food' },
    { id: 'clothing', label: 'Clothing' },
    { id: 'handicrafts', label: 'Handicrafts' },
    { id: 'services', label: 'Services' },
  ];

  const sortOptions = [
    { id: 'name', label: 'Name (A-Z)' },
    { id: 'price-low', label: 'Price (Low to High)' },
    { id: 'price-high', label: 'Price (High to Low)' },
    { id: 'rating', label: 'Rating' },
    { id: 'recent', label: 'Recently Added' },
  ];

  const filteredProducts = sellerProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'recent':
        return 0; // Mock recent sorting
      default:
        return 0;
    }
  });

  const handleAddProduct = () => {
    navigate('/seller/products/add');
  };

  const handleEditProduct = (productId: string) => {
    console.log('Edit product:', productId);
  };

  const handleDeleteProduct = (productId: string) => {
    console.log('Delete product:', productId);
  };

  const handleViewProduct = (productId: string) => {
    console.log('View product:', productId);
  };

  const getCategoryBadgeColor = (category: string) => {
    switch (category) {
      case 'food': return 'bg-orange-100 text-orange-800';
      case 'clothing': return 'bg-purple-100 text-purple-800';
      case 'handicrafts': return 'bg-emerald-100 text-emerald-800';
      case 'services': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Management</h1>
          <p className="text-gray-600">Manage your product listings</p>
        </div>
        <button
          onClick={handleAddProduct}
          className="bg-coral-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-coral-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort */}
          <div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-full ${getCategoryBadgeColor(product.category)}`}>
                  {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                </span>
                <div className="absolute top-3 right-3 flex space-x-2">
                  <button
                    onClick={() => handleViewProduct(product.id)}
                    className="p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                  >
                    <Eye className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                
                {/* Rating */}
                <div className="flex items-center space-x-2 mb-3">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-gray-900">Rs. {product.price}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    product.available ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.available ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditProduct(product.id)}
                    className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-coral-100 text-coral-700 rounded-lg hover:bg-coral-200 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="flex items-center justify-center px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No products found</h2>
          <p className="text-gray-600 mb-8">
            {searchQuery || selectedCategory !== 'all' 
              ? "No products match your search criteria" 
              : "You haven't added any products yet"}
          </p>
          <button
            onClick={handleAddProduct}
            className="bg-coral-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-coral-700 transition-colors"
          >
            Add Your First Product
          </button>
        </div>
      )}

      {/* Stats Summary */}
      {sortedProducts.length > 0 && (
        <div className="mt-8 bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Product Summary</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{sortedProducts.length}</p>
              <p className="text-sm text-gray-600">Total Products</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-600">
                {sortedProducts.filter(p => p.available).length}
              </p>
              <p className="text-sm text-gray-600">In Stock</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-amber-600">
                {sortedProducts.filter(p => !p.available).length}
              </p>
              <p className="text-sm text-gray-600">Out of Stock</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {Math.round(sortedProducts.reduce((sum, p) => sum + p.rating, 0) / sortedProducts.length * 10) / 10}
              </p>
              <p className="text-sm text-gray-600">Avg Rating</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
