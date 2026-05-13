import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import { Package, ChevronRight, ShoppingBag, ArrowLeft } from 'lucide-react';

const MyOrdersScreen = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4">
        <Link to="/profile" className="inline-flex items-center gap-2 text-primary font-bold hover:underline mb-2">
          <ArrowLeft size={16} /> Back to Profile
        </Link>
        <h1 className="text-4xl md:text-6xl font-bold font-hindi text-primary">My Orders</h1>
        <div className="flex justify-center">
          <span className="w-24 h-1 bg-primary rounded-full"></span>
        </div>
        <p className="text-gray-500 italic">Track your authentic Bihari treats</p>
      </div>

      <div className="bg-white p-6 md:p-10 rounded-[40px] shadow-sm border border-gray-100 min-h-[600px]">
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error?.data?.message || error.error}</Message>
        ) : orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-6 text-center">
            <div className="w-24 h-24 bg-village rounded-full flex items-center justify-center text-gray-300">
              <Package size={48} />
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold font-hindi">No orders found</p>
              <p className="text-gray-500 max-w-md">You haven't placed any orders yet. Explore our menu to discover authentic Bihari flavors!</p>
            </div>
            <Link to="/menu" className="village-button-primary px-10">Explore Menu</Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="hidden md:grid grid-cols-5 gap-4 px-6 py-4 bg-village rounded-2xl text-xs font-black uppercase tracking-widest text-gray-500">
              <div className="col-span-1">Order ID</div>
              <div>Date</div>
              <div>Total Amount</div>
              <div>Status</div>
              <div className="text-right">Action</div>
            </div>

            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="p-6 bg-white border border-gray-100 rounded-3xl flex flex-col md:grid md:grid-cols-5 items-center gap-6 hover:shadow-xl hover:border-primary/20 transition-all group">
                  <div className="col-span-1 font-black text-gray-800">
                    <span className="md:hidden text-xs text-gray-400 block mb-1">Order ID</span>
                    #{order._id.substring(18)}
                  </div>
                  
                  <div className="text-gray-600 font-bold">
                    <span className="md:hidden text-xs text-gray-400 block mb-1">Date</span>
                    {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </div>

                  <div className="text-xl font-black text-primary">
                    <span className="md:hidden text-xs text-gray-400 block mb-1">Total</span>
                    ₹{order.totalPrice}
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="md:hidden text-xs text-gray-400 block mb-1 text-center">Status</span>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                      <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {order.isPaid ? 'Paid' : 'Unpaid'}
                      </div>
                      <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${order.isDelivered ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                        {order.status || (order.isDelivered ? 'Delivered' : 'Processing')}
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-auto md:text-right">
                    <Link to={`/order/${order._id}`} className="village-button-primary w-full md:w-auto md:inline-flex py-3 px-6 text-sm">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrdersScreen;
