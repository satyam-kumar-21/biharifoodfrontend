import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, Package, Truck, ArrowRight, Home, ShoppingBag } from 'lucide-react';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';
import Loader from '../components/Loader';
import Meta from '../components/Meta';
import { motion } from 'framer-motion';

const OrderSuccessScreen = () => {
  const { id: orderId } = useParams();
  const { data: order, isLoading } = useGetOrderDetailsQuery(orderId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
      <Meta title="Order Successful - Bihar wala taste" />
      
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-[40px] shadow-2xl shadow-green-100 border border-green-50 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 p-10 md:p-16 text-center text-white relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>
            
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-md rounded-full mb-6 animate-bounce">
              <CheckCircle2 size={48} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black font-hindi mb-4">Order Successful!</h1>
            <p className="text-green-50 text-lg md:text-xl font-medium">Thank you for choosing Bihar wala taste. Your order is being prepared with love.</p>
          </div>

          <div className="p-8 md:p-12 space-y-10">
            {/* Order Brief */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Order ID</p>
                <p className="text-xl font-bold text-gray-800">#{orderId}</p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Expected Delivery</p>
                <p className="text-xl font-bold text-gray-800">3-5 Business Days</p>
              </div>
            </div>

            {/* Steps Visual */}
            <div className="flex justify-between items-start relative px-4">
              <div className="absolute top-5 left-10 right-10 h-[2px] bg-gray-100 -z-0"></div>
              {[
                { icon: <ShoppingBag size={20} />, label: 'Placed', color: 'bg-green-500 text-white' },
                { icon: <Package size={20} />, label: 'Processing', color: 'bg-gray-100 text-gray-400' },
                { icon: <Truck size={20} />, label: 'On Way', color: 'bg-gray-100 text-gray-400' },
              ].map((step, i) => (
                <div key={i} className="flex flex-col items-center gap-3 relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${step.color} shadow-lg shadow-current/10`}>
                    {step.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-tighter text-gray-500">{step.label}</span>
                </div>
              ))}
            </div>

            {/* Delivery Details Info */}
            <div className="bg-village/20 rounded-3xl p-6 md:p-8 space-y-4 border border-village/30">
              <div className="flex items-center gap-3 text-primary">
                <Home size={20} />
                <h3 className="font-black font-hindi text-lg">Delivery Address</h3>
              </div>
              <div className="text-gray-600 leading-relaxed">
                <p className="font-bold text-gray-800">{order?.user?.name}</p>
                <p>{order?.shippingAddress?.address}</p>
                {order?.shippingAddress?.landmark && (
                  <p className="text-primary font-medium text-sm">Landmark: {order?.shippingAddress?.landmark}</p>
                )}
                <p>{order?.shippingAddress?.city}, {order?.shippingAddress?.postalCode}</p>
                <p className="mt-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Phone: +91 {order?.shippingAddress?.phone}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to={`/order/${orderId}`}
                className="flex-1 village-button-primary py-5 flex items-center justify-center gap-2 text-lg group"
              >
                View Order Details <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/"
                className="flex-1 px-8 py-5 rounded-full border-2 border-village text-gray-600 font-bold hover:bg-village transition-all flex items-center justify-center gap-2 text-lg"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
        
        <p className="text-center text-gray-400 mt-8 text-sm">
          A confirmation email has been sent to <span className="font-bold text-gray-600">{order?.user?.email}</span>
        </p>
      </div>
    </div>
  );
};

export default OrderSuccessScreen;
