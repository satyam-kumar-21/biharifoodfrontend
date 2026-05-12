import { Link } from 'react-router-dom';
import { useGetOrdersQuery } from '../../slices/ordersApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Eye, Check, X } from 'lucide-react';

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-hindi">Order Management</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 font-bold text-sm uppercase">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">User</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Paid</th>
                  <th className="px-6 py-4">Delivered</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium">#{order._id.substring(18)}</td>
                    <td className="px-6 py-4">{order.user && order.user.name}</td>
                    <td className="px-6 py-4">{order.createdAt.substring(0, 10)}</td>
                    <td className="px-6 py-4 font-bold">₹{order.totalPrice}</td>
                    <td className="px-6 py-4">
                      {order.isPaid ? (
                        <span className="text-green-600 flex items-center gap-1"><Check size={16} /> {order.paidAt.substring(0, 10)}</span>
                      ) : (
                        <span className="text-red-500 flex items-center gap-1"><X size={16} /></span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {order.isDelivered ? (
                        <span className="text-green-600 flex items-center gap-1"><Check size={16} /> {order.deliveredAt.substring(0, 10)}</span>
                      ) : (
                        <span className="text-red-500 flex items-center gap-1"><X size={16} /></span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold">{order.status}</span>
                    </td>
                    <td className="px-6 py-4">
                      <Link to={`/order/${order._id}`} className="p-2 text-primary hover:bg-primary/5 rounded-lg inline-block">
                        <Eye size={20} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderListScreen;
