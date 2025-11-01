
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProducts, mockOrders, mockUsers } from '../../data/mockData';
import { Product, Order, User } from '../../types';
import { Icons } from '../../components/ui/Icons';

const AdminManagePage: React.FC = () => {
    const { tab } = useParams<{ tab: string }>();
    const navigate = useNavigate();

    const tabs = [
        { id: 'products', label: 'Products' },
        { id: 'orders', label: 'Orders' },
        { id: 'users', label: 'Users' },
    ];
    
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold capitalize">Manage {tab}</h1>
            <div className="flex border-b dark:border-gray-700">
                {tabs.map(t => (
                    <button
                        key={t.id}
                        onClick={() => navigate(`/admin/manage/${t.id}`)}
                        className={`px-6 py-3 font-semibold ${tab === t.id ? 'text-primary-600 border-b-2 border-primary-600' : 'text-gray-500'}`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
                 {tab === 'products' && <ProductsTable />}
                 {tab === 'orders' && <OrdersTable />}
                 {tab === 'users' && <UsersTable />}
            </div>
        </div>
    );
};

const ProductsTable = () => (
    <Table<Product>
        data={mockProducts}
        columns={[
            { header: 'Name', accessor: 'name' },
            { header: 'Category', accessor: 'category' },
            { header: 'Price', accessor: 'price', render: (p) => `$${p.price.toFixed(2)}` },
            { header: 'Stock', accessor: 'stock' },
            { header: 'Rating', accessor: 'rating' },
        ]}
    />
);

const OrdersTable = () => (
     <Table<Order>
        data={mockOrders}
        columns={[
            { header: 'Order ID', accessor: 'id' },
            { header: 'User ID', accessor: 'userId' },
            { header: 'Date', accessor: 'createdAt', render: (o) => new Date(o.createdAt).toLocaleDateString() },
            { header: 'Amount', accessor: 'totalAmount', render: (o) => `$${o.totalAmount.toFixed(2)}` },
            { header: 'Status', accessor: 'status' },
        ]}
    />
);

const UsersTable = () => (
     <Table<User>
        data={mockUsers}
        columns={[
            { header: 'Name', accessor: 'name' },
            { header: 'Email', accessor: 'email' },
            { header: 'Role', accessor: 'role' },
            { header: 'Joined', accessor: 'createdAt', render: (u) => new Date(u.createdAt).toLocaleDateString() },
        ]}
    />
);


interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
}

const Table = <T extends { id: string },>(
  { data, columns }: TableProps<T>
) => {
  return (
    <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    {columns.map(col => <th key={col.header} className="px-6 py-3">{col.header}</th>)}
                    <th className="px-6 py-3 text-right">Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.map(item => (
                    <tr key={item.id} className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        {columns.map(col => (
                             <td key={String(col.accessor)} className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                {col.render ? col.render(item) : String(item[col.accessor])}
                             </td>
                        ))}
                        <td className="px-6 py-4 text-right">
                            <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-4">Edit</button>
                             <button className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default AdminManagePage;
