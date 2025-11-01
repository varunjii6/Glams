
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { mockOrders, mockUsers, mockProducts } from '../../data/mockData';
import { Icons } from '../../components/ui/Icons';
import { Order } from '../../types';

const StatCard: React.FC<{ title: string; value: string; icon: React.ElementType; color: string }> = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow flex items-center gap-6">
    <div className={`p-3 rounded-full ${color}`}>
      <Icon className="h-6 w-6 text-white" />
    </div>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const SalesChart = () => {
    const data = [
        { name: 'Mon', sales: 4000 }, { name: 'Tue', sales: 3000 },
        { name: 'Wed', sales: 2000 }, { name: 'Thu', sales: 2780 },
        { name: 'Fri', sales: 1890 }, { name: 'Sat', sales: 2390 },
        { name: 'Sun', sales: 3490 },
    ];
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="font-semibold mb-4">Weekly Sales</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.2)" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip contentStyle={{ backgroundColor: 'black', border: 'none', borderRadius: '0.5rem' }}/>
                    <Legend />
                    <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

const RecentOrders: React.FC<{orders: Order[]}> = ({ orders }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="font-semibold mb-4">Recent Orders</h3>
        <div className="space-y-4">
            {orders.slice(0, 5).map(order => (
                <div key={order.id} className="flex justify-between items-center text-sm">
                    <div>
                        <p className="font-medium">Order #{order.id}</p>
                        <p className="text-gray-500 dark:text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <p className="font-semibold">${order.totalAmount.toFixed(2)}</p>
                </div>
            ))}
        </div>
    </div>
);

const AdminDashboardPage: React.FC = () => {
    const totalRevenue = mockOrders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalSales = mockOrders.length;
    const totalCustomers = mockUsers.filter(u => u.role === 'user').length;
    const totalProducts = mockProducts.length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={`$${totalRevenue.toFixed(2)}`} icon={Icons.Analytics} color="bg-blue-500" />
        <StatCard title="Total Sales" value={totalSales.toString()} icon={Icons.Order} color="bg-green-500" />
        <StatCard title="Total Customers" value={totalCustomers.toString()} icon={Icons.Users} color="bg-purple-500" />
        <StatCard title="Total Products" value={totalProducts.toString()} icon={Icons.Product} color="bg-yellow-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
            <SalesChart />
        </div>
        <div className="lg:col-span-1">
            <RecentOrders orders={mockOrders}/>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
