import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import { useGetProductsQuery } from '../../slices/productsApiSlice';
import { useGetUsersQuery } from '../../slices/usersApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Package, Users, ShoppingBag, IndianRupee } from 'lucide-react';

const AdminDashboardScreen = () => {
  const { data: orders, isLoading: loadingOrders } = useGetOrdersQuery();
  const { data: productsData, isLoading: loadingProducts } = useGetProductsQuery({});
  const { data: users, isLoading: loadingUsers } = useGetUsersQuery();

  const isLoading = loadingOrders || loadingProducts || loadingUsers;

  const totalSales = orders?.reduce((acc, order) => acc + (order.isPaid ? order.totalPrice : 0), 0) || 0;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-hindi">Admin Dashboard</h1>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Stats Cards */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="p-4 bg-primary/10 rounded-2xl text-primary">
              <IndianRupee size={32} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-bold">Total Sales</p>
              <h3 className="text-2xl font-bold">₹{totalSales.toFixed(2)}</h3>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="p-4 bg-green-100 rounded-2xl text-green-600">
              <ShoppingBag size={32} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-bold">Total Orders</p>
              <h3 className="text-2xl font-bold">{orders?.length}</h3>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="p-4 bg-blue-100 rounded-2xl text-blue-600">
              <Package size={32} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-bold">Products</p>
              <h3 className="text-2xl font-bold">{productsData?.products.length}</h3>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-6">
            <div className="p-4 bg-purple-100 rounded-2xl text-purple-600">
              <Users size={32} />
            </div>
            <div>
              <p className="text-gray-500 text-sm font-bold">Customers</p>
              <h3 className="text-2xl font-bold">{users?.length}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Recent Orders Preview */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-2xl font-bold font-hindi mb-6">Recent Orders</h2>
        {isLoading ? <Loader /> : (
          <div className="space-y-4">
            {orders?.slice(0, 5).map(order => (
              <div key={order._id} className="flex items-center justify-between p-4 bg-village rounded-2xl">
                <div>
                  <p className="font-bold">#{order._id.substring(18)}</p>
                  <p className="text-sm text-gray-500">{order.user.name}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">₹{order.totalPrice}</p>
                  <p className="text-xs text-gray-400">{order.createdAt.substring(0, 10)}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboardScreen;
