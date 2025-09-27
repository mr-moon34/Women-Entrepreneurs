import { useState } from 'react';
import { Package, Clock, CheckCircle, XCircle, Eye, Star, MessageCircle } from 'lucide-react';
import { Order } from '../../types';

export default function OrderHistory() {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Mock orders data
  const orders: Order[] = [
    {
      id: '1',
      buyerId: 'b1',
      sellerId: 's1',
      products: [],
      total: 500,
      status: 'completed',
      deliveryMethod: 'delivery',
      address: '123 Main Street, Karachi',
      createdAt: '2024-01-15',
      customerName: 'Sarah Ahmed',
      sellerName: 'Fatima Khan'
    },
    {
      id: '2',
      buyerId: 'b1',
      sellerId: 's2',
      products: [],
      total: 1200,
      status: 'in-progress',
      deliveryMethod: 'pickup',
      address: '456 Park Avenue, Lahore',
      createdAt: '2024-01-14',
      customerName: 'Sarah Ahmed',
      sellerName: 'Ayesha Ahmed'
    },
    {
      id: '3',
      buyerId: 'b1',
      sellerId: 's3',
      products: [],
      total: 800,
      status: 'pending',
      deliveryMethod: 'delivery',
      address: '789 Garden Road, Islamabad',
      createdAt: '2024-01-13',
      customerName: 'Sarah Ahmed',
      sellerName: 'Zara Ali'
    }
  ];

  const statusOptions = [
    { id: 'all', label: 'All Orders', count: orders.length },
    { id: 'pending', label: 'Pending', count: orders.filter(o => o.status === 'pending').length },
    { id: 'in-progress', label: 'In Progress', count: orders.filter(o => o.status === 'in-progress').length },
    { id: 'completed', label: 'Completed', count: orders.filter(o => o.status === 'completed').length },
    { id: 'cancelled', label: 'Cancelled', count: orders.filter(o => o.status === 'cancelled').length }
  ];

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-5 w-5 text-emerald-600" />;
      case 'in-progress': return <Clock className="h-5 w-5 text-blue-600" />;
      case 'pending': return <Clock className="h-5 w-5 text-amber-600" />;
      case 'cancelled': return <XCircle className="h-5 w-5 text-red-600" />;
      default: return <Package className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-emerald-100 text-emerald-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-amber-100 text-amber-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewOrder = (orderId: string) => {
    console.log('View order:', orderId);
  };

  const handleRateOrder = (orderId: string) => {
    console.log('Rate order:', orderId);
  };

  const handleContactSeller = (sellerId: string) => {
    console.log('Contact seller:', sellerId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Order History</h1>
        <p className="text-gray-600">Track and manage your orders</p>
      </div>

      {/* Status Filter */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {statusOptions.map((status) => (
          <button
            key={status.id}
            onClick={() => setSelectedStatus(status.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-colors ${
              selectedStatus === status.id
                ? 'bg-coral-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {status.label} ({status.count})
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(order.status)}
                  <div>
                    <h3 className="font-semibold text-gray-900">Order #{order.id}</h3>
                    <p className="text-sm text-gray-600">Placed on {order.createdAt}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(order.status)}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Seller</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="w-6 h-6 bg-gradient-to-br from-coral-400 to-emerald-400 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-white">
                        {order.sellerName.charAt(0)}
                      </span>
                    </div>
                    <span className="font-medium text-gray-900">{order.sellerName}</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="font-semibold text-gray-900">Rs. {order.total}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Delivery Method</p>
                  <p className="font-medium text-gray-900 capitalize">{order.deliveryMethod}</p>
                </div>
              </div>

              {order.address && (
                <div className="mb-4">
                  <p className="text-sm text-gray-600">Delivery Address</p>
                  <p className="text-gray-900">{order.address}</p>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleViewOrder(order.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  <span>View Details</span>
                </button>
                
                {order.status === 'completed' && (
                  <button
                    onClick={() => handleRateOrder(order.id)}
                    className="flex items-center space-x-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors"
                  >
                    <Star className="h-4 w-4" />
                    <span>Rate Order</span>
                  </button>
                )}
                
                <button
                  onClick={() => handleContactSeller(order.sellerId)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Contact Seller</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders found</h2>
          <p className="text-gray-600 mb-8">
            {selectedStatus === 'all' 
              ? "You haven't placed any orders yet" 
              : `No ${selectedStatus} orders found`}
          </p>
          <button className="bg-coral-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-coral-700 transition-colors">
            Start Shopping
          </button>
        </div>
      )}
    </div>
  );
}
