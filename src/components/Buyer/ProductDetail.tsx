import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Heart, ShoppingCart, MapPin, Truck, Clock, Shield, MessageCircle, Share2 } from 'lucide-react';
import { useApp, mockProducts } from '../../context/AppContext';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useApp();
  
  // Find product by ID from mock data
  const product = mockProducts.find(p => p.id === id) || mockProducts[0];
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  // Mock additional images
  const productImages = [
    product.image,
    'https://images.pexels.com/photos/1893556/pexels-photo-1893556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    'https://images.pexels.com/photos/1893557/pexels-photo-1893557.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
    'https://images.pexels.com/photos/1893558/pexels-photo-1893558.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750',
  ];

  // Mock reviews
  const reviews = [
    {
      id: '1',
      user: 'Sarah Ahmed',
      rating: 5,
      comment: 'Amazing quality! Exactly as described. The seller was very helpful.',
      date: '2024-01-10',
      verified: true
    },
    {
      id: '2',
      user: 'Fatima Khan',
      rating: 4,
      comment: 'Good product, fast delivery. Would recommend to others.',
      date: '2024-01-08',
      verified: true
    },
    {
      id: '3',
      user: 'Ayesha Ali',
      rating: 5,
      comment: 'Perfect! Will definitely order again from this seller.',
      date: '2024-01-05',
      verified: false
    }
  ];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Navigate to checkout
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center space-x-2 text-gray-600 hover:text-coral-600 mb-6 transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Products</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
            <img
              src={productImages[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="grid grid-cols-4 gap-2">
            {productImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? 'border-coral-500' : 'border-gray-200'
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Header */}
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="px-3 py-1 bg-coral-100 text-coral-800 text-sm font-medium rounded-full">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </span>
              <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-medium rounded-full">
                In Stock
              </span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                <span className="text-lg font-semibold text-gray-900">{product.rating}</span>
                <span className="text-gray-600">({product.reviews} reviews)</span>
              </div>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Share2 className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </div>

          {/* Price */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold text-gray-900">Rs. {product.price}</span>
                <p className="text-gray-600 mt-1">Free delivery on orders above Rs. 1000</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Seller</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-8 h-8 bg-gradient-to-br from-coral-400 to-emerald-400 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {product.sellerName.charAt(0)}
                    </span>
                  </div>
                  <span className="font-medium text-gray-900">{product.sellerName}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                -
              </button>
              <span className="w-16 text-center font-medium text-gray-900">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleBuyNow}
              className="w-full bg-coral-600 text-white py-4 px-6 rounded-xl font-semibold hover:bg-coral-700 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Buy Now</span>
            </button>
            <button
              onClick={handleAddToCart}
              className="w-full border-2 border-coral-600 text-coral-600 py-4 px-6 rounded-xl font-semibold hover:bg-coral-50 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
          </div>

          {/* Delivery Options */}
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Delivery Options</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-emerald-50 rounded-lg">
                <Truck className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="font-medium text-gray-900">Standard Delivery</p>
                  <p className="text-sm text-gray-600">2-3 business days • Rs. 100</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Express Delivery</p>
                  <p className="text-sm text-gray-600">Same day • Rs. 200</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg">
                <MapPin className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="font-medium text-gray-900">Pickup Available</p>
                  <p className="text-sm text-gray-600">Free • Seller's location</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-emerald-600" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-4 w-4 text-blue-600" />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            {[
              { id: 'description', label: 'Description' },
              { id: 'reviews', label: `Reviews (${reviews.length})` },
              { id: 'seller', label: 'Seller Info' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? 'border-coral-500 text-coral-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="py-8">
          {activeTab === 'description' && (
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Features</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Handmade with care</li>
                    <li>• Premium quality materials</li>
                    <li>• Unique design</li>
                    <li>• Eco-friendly packaging</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Care Instructions</h4>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Hand wash recommended</li>
                    <li>• Air dry only</li>
                    <li>• Store in cool, dry place</li>
                    <li>• Avoid direct sunlight</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-coral-400 to-emerald-400 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-white">
                          {review.user.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{review.user}</span>
                          {review.verified && (
                            <span className="px-2 py-1 bg-emerald-100 text-emerald-800 text-xs font-medium rounded-full">
                              Verified
                            </span>
                          )}
                        </div>
                        <div className="flex items-center space-x-1 mt-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'seller' && (
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-coral-400 to-emerald-400 rounded-full flex items-center justify-center">
                  <span className="text-xl font-medium text-white">
                    {product.sellerName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">{product.sellerName}</h3>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium text-gray-900">{product.rating}</span>
                    <span className="text-gray-600">({product.reviews} reviews)</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                Experienced seller with a passion for creating high-quality handmade products. 
                Committed to customer satisfaction and sustainable practices.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Member since:</span>
                  <span className="font-medium text-gray-900 ml-2">2023</span>
                </div>
                <div>
                  <span className="text-gray-600">Products sold:</span>
                  <span className="font-medium text-gray-900 ml-2">150+</span>
                </div>
                <div>
                  <span className="text-gray-600">Response time:</span>
                  <span className="font-medium text-gray-900 ml-2">Within 2 hours</span>
                </div>
                <div>
                  <span className="text-gray-600">Location:</span>
                  <span className="font-medium text-gray-900 ml-2">Karachi, Pakistan</span>
                </div>
              </div>
              <button className="mt-4 bg-coral-600 text-white px-4 py-2 rounded-lg hover:bg-coral-700 transition-colors">
                Contact Seller
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
