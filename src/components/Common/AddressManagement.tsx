import { useState } from 'react';
import { Plus, Edit, Trash2, MapPin, Home, Building, Star } from 'lucide-react';

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  address: string;
  city: string;
  postalCode: string;
  phone: string;
  isDefault: boolean;
}

export default function AddressManagement() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      type: 'home',
      name: 'Home Address',
      address: '123 Main Street, Block A',
      city: 'Karachi',
      postalCode: '75000',
      phone: '+92-300-1234567',
      isDefault: true
    },
    {
      id: '2',
      type: 'work',
      name: 'Office Address',
      address: '456 Business District, Floor 5',
      city: 'Karachi',
      postalCode: '75001',
      phone: '+92-300-7654321',
      isDefault: false
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    type: 'home' as 'home' | 'work' | 'other',
    name: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    isDefault: false
  });

  const addressTypes = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'work', label: 'Work', icon: Building },
    { id: 'other', label: 'Other', icon: MapPin }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAddress) {
      // Update existing address
      setAddresses(prev => prev.map(addr => 
        addr.id === editingAddress.id 
          ? { ...formData, id: editingAddress.id }
          : formData.isDefault ? { ...addr, isDefault: false } : addr
      ));
    } else {
      // Add new address
      const newAddress: Address = {
        ...formData,
        id: Date.now().toString()
      };
      
      setAddresses(prev => [
        ...prev.map(addr => formData.isDefault ? { ...addr, isDefault: false } : addr),
        newAddress
      ]);
    }
    
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      type: 'home',
      name: '',
      address: '',
      city: '',
      postalCode: '',
      phone: '',
      isDefault: false
    });
    setShowAddForm(false);
    setEditingAddress(null);
  };

  const handleEdit = (address: Address) => {
    setFormData(address);
    setEditingAddress(address);
    setShowAddForm(true);
  };

  const handleDelete = (addressId: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== addressId));
  };

  const handleSetDefault = (addressId: string) => {
    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    })));
  };

  const getAddressIcon = (type: string) => {
    const addressType = addressTypes.find(t => t.id === type);
    return addressType ? addressType.icon : MapPin;
  };

  const getAddressColor = (type: string) => {
    switch (type) {
      case 'home': return 'text-emerald-600 bg-emerald-100';
      case 'work': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Address Management</h1>
          <p className="text-gray-600">Manage your delivery addresses</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-coral-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-coral-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>Add Address</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <h3 className="font-semibold text-gray-900 mb-4">
            {editingAddress ? 'Edit Address' : 'Add New Address'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
                >
                  {addressTypes.map((type) => (
                    <option key={type.id} value={type.id}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
                  placeholder="e.g., Home, Office"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
                placeholder="Enter your street address"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
                  placeholder="Karachi"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
                  placeholder="75000"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral-500 focus:border-coral-500 transition-colors"
                  placeholder="+92-300-1234567"
                  required
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                name="isDefault"
                checked={formData.isDefault}
                onChange={handleInputChange}
                className="w-4 h-4 text-coral-600 border-gray-300 rounded focus:ring-coral-500"
              />
              <label className="text-sm font-medium text-gray-700">
                Set as default address
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="submit"
                className="bg-coral-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-coral-700 transition-colors"
              >
                {editingAddress ? 'Update Address' : 'Add Address'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Addresses List */}
      {addresses.length > 0 ? (
        <div className="space-y-4">
          {addresses.map((address) => {
            const Icon = getAddressIcon(address.type);
            return (
              <div key={address.id} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-full ${getAddressColor(address.type)}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-gray-900">{address.name}</h3>
                        {address.isDefault && (
                          <span className="px-2 py-1 bg-coral-100 text-coral-800 text-xs font-medium rounded-full flex items-center space-x-1">
                            <Star className="h-3 w-3 fill-current" />
                            <span>Default</span>
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 mb-1">{address.address}</p>
                      <p className="text-gray-600 mb-1">{address.city}, {address.postalCode}</p>
                      <p className="text-gray-600">{address.phone}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {!address.isDefault && (
                      <button
                        onClick={() => handleSetDefault(address.id)}
                        className="p-2 text-gray-400 hover:text-coral-600 transition-colors"
                        title="Set as default"
                      >
                        <Star className="h-5 w-5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleEdit(address)}
                      className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      title="Edit address"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(address.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      title="Delete address"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="h-12 w-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No addresses found</h2>
          <p className="text-gray-600 mb-8">Add your first delivery address to get started</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-coral-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-coral-700 transition-colors"
          >
            Add Address
          </button>
        </div>
      )}
    </div>
  );
}
