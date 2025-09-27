import { useState } from 'react';
import { Star, ShoppingCart, Heart, MapPin } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
}

export default function ProductCard({ product, onProductClick }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useApp();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    // You could add a toast notification here
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
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
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300 cursor-pointer group"
      onClick={() => onProductClick?.(product)}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden">
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse" />
        )}
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Category Badge */}
        <span className={`absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded-full ${getCategoryBadgeColor(product.category)}`}>
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </span>
        
        {/* Like Button */}
        <button
          onClick={handleLike}
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <Heart className={`h-4 w-4 transition-colors ${
            isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'
          }`} />
        </button>
        
        {/* Quick Add to Cart */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 p-2 bg-coral-600 text-white rounded-full opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-coral-700"
        >
          <ShoppingCart className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        
        {/* Seller Info */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="w-6 h-6 bg-gradient-to-br from-coral-400 to-emerald-400 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-white">
              {product.sellerName.charAt(0)}
            </span>
          </div>
          <span className="text-sm text-gray-600">{product.sellerName}</span>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-gray-900">{product.rating}</span>
          </div>
          <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-bold text-gray-900">Rs. {product.price}</span>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <MapPin className="h-3 w-3" />
              <span>Local delivery available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}