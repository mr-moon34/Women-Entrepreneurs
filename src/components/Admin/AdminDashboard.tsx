import { useState } from 'react';
import { Users, TrendingUp, DollarSign, UserCheck, AlertCircle, CheckCircle } from 'lucide-react';
import { AdminStats } from '../../types';

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState('month');

  // Mock admin stats
  const stats: AdminStats = {
    totalSellers: 156,
    totalBuyers: 2340,
    totalSales: 450000,
    weeklyGrowth: 15.2,
  };

  // Mock pending approvals
  const pendingApprovals = [
    { id: '1', name: 'Amna Hassan', email: 'amna@email.com', type: 'seller', date: '2024-01-15' },
    { id: '2', name: 'Saba Ahmed', email: 'saba@email.com', type: 'seller', date: '2024-01-14' },
    { id: '3', name: 'Rafia Khan', email: 'rafia@email.com', type: 'seller', date: '2024-01-13' },
  ];

  // Mock recent activities
  const recentActivities = [
    { id: '1', type: 'approval', message: 'Approved seller: Fatima Ali', time: '2 hours ago' },
    { id: '2', type: 'complaint', message: 'New complaint from buyer about order #1234', time: '4 hours ago' },
    { id: '3', type: 'registration', message: 'New buyer registration: Sarah Khan', time: '6 hours ago' },
    { id: '4', type: 'sale', message: 'High-value sale: Rs. 5,000 by Ayesha Ahmed', time: '8 hours ago' },
  ];

  const handleApproval = (id: string, approve: boolean) => {
    // Handle approval logic here
    console.log(`${approve ? 'Approved' : 'Rejected'} seller with ID: ${id}`);
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'approval': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'complaint': return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'registration': return <UserCheck className="h-5 w-5 text-blue-600" />;
      case 'sale': return <DollarSign className="h-5 w-5 text-emerald-600" />;
      default: return <AlertCircle className="h-5 w-5 text-gray-600" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Manage your community cooperative</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Sellers</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalSellers}</p>
              <p className="text-sm text-emerald-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +12 this month
              </p>
            </div>
            <div className="bg-coral-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-coral-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Buyers</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalBuyers.toLocaleString()}</p>
              <p className="text-sm text-blue-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +{stats.weeklyGrowth}% this week
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <UserCheck className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Sales</p>
              <p className="text-2xl font-bold text-gray-900">Rs. {stats.totalSales.toLocaleString()}</p>
              <p className="text-sm text-emerald-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +8.5% from last month
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
              <p className="text-sm text-gray-600 mb-1">Pending Approvals</p>
              <p className="text-2xl font-bold text-gray-900">{pendingApprovals.length}</p>
              <p className="text-sm text-amber-600 mt-1">Needs attention</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-full">
              <AlertCircle className="h-6 w-6 text-amber-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Growth Chart */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Community Growth</h2>
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
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">New Sellers</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-coral-500 h-2 rounded-full w-3/4"></div>
                </div>
                <span className="text-sm text-gray-900 w-8">75%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">New Buyers</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-4/5"></div>
                </div>
                <span className="text-sm text-gray-900 w-8">80%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Sales Volume</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div className="bg-emerald-500 h-2 rounded-full w-5/6"></div>
                </div>
                <span className="text-sm text-gray-900 w-8">85%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Sales by Category</h2>
          <div className="space-y-4">
            {[
              { category: 'Food', sales: 180000, percentage: 40, color: 'bg-orange-500' },
              { category: 'Clothing', sales: 135000, percentage: 30, color: 'bg-purple-500' },
              { category: 'Handicrafts', sales: 90000, percentage: 20, color: 'bg-emerald-500' },
              { category: 'Services', sales: 45000, percentage: 10, color: 'bg-blue-500' },
            ].map((item) => (
              <div key={item.category}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.category}</span>
                  <span className="text-sm text-gray-900">Rs. {item.sales.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`${item.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Seller Approvals</h2>
          <div className="space-y-4">
            {pendingApprovals.map((approval) => (
              <div key={approval.id} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{approval.name}</h3>
                  <p className="text-sm text-gray-600">{approval.email}</p>
                  <p className="text-xs text-gray-500">Applied: {approval.date}</p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleApproval(approval.id, true)}
                    className="px-3 py-1 bg-emerald-600 text-white text-sm rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleApproval(approval.id, false)}
                    className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                {getActivityIcon(activity.type)}
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 text-coral-600 font-medium hover:text-coral-700 transition-colors">
            View All Activities
          </button>
        </div>
      </div>
    </div>
  );
}