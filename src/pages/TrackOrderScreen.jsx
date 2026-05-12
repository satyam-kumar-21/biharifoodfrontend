import { useState, useEffect } from 'react';
import { useGetOrderDetailsQuery } from '../slices/ordersApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Search, MapPin, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const TrackOrderScreen = () => {
  const [orderId, setOrderId] = useState('');
  const [searchId, setSearchId] = useState('');
  
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    if (id) {
      setOrderId(id);
      setSearchId(id);
    }
  }, [location]);

  const { data: order, isLoading, error } = useGetOrderDetailsQuery(searchId, {
    skip: !searchId,
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (orderId.trim()) {
      setSearchId(orderId.trim());
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckCircle className="text-green-500" />;
      case 'Shipped': return <Truck className="text-blue-500" />;
      case 'Packed': return <Package className="text-orange-500" />;
      default: return <Clock className="text-gray-400" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold font-hindi text-primary">Track Your Order</h1>
        <p className="text-gray-500">Enter your Order ID to see the real-time status of your Bihari flavors.</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-8 rounded-[40px] shadow-xl border border-gray-100">
        <form onSubmit={submitHandler} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Enter Order ID (e.g. 6612...)" 
              className="w-full pl-12 pr-4 py-4 bg-village border border-gray-100 rounded-2xl focus:outline-none focus:border-primary transition font-bold"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
            />
          </div>
          <button type="submit" className="village-button-primary px-10 py-4">
            Track Now
          </button>
        </form>
      </div>

      {isLoading && <Loader />}

      {error && (
        <Message variant='danger'>
          Order not found. Please check your ID and try again.
        </Message>
      )}

      {order && (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl border border-gray-100 space-y-10">
            {/* Current Status Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-village pb-8">
              <div className="space-y-1">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Current Status</p>
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-bold text-primary">{order.status}</h2>
                  <div className="animate-pulse w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Order ID</p>
                <p className="font-bold text-gray-800">#{order._id}</p>
              </div>
            </div>

            {/* Tracking Visualizer */}
            <div className="relative">
              <div className="space-y-0 relative">
                {/* We combine the manual history with the initial 'Order Placed' step */}
                {[
                  { 
                    status: 'Order Placed', 
                    location: 'Warehouse', 
                    description: 'We have received your order and are preparing it for packing.', 
                    timestamp: order.createdAt,
                    isInitial: true 
                  },
                  ...(order.trackingHistory || [])
                ].map((step, index, allSteps) => (
                  <div key={index} className="flex gap-8 group">
                    {/* Stepper Line and Icon */}
                    <div className="flex flex-col items-center">
                      <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center border-4 border-white shadow-lg transition-all duration-500 ${index === allSteps.length - 1 ? 'bg-primary text-white scale-125 ring-4 ring-primary/20' : 'bg-village text-gray-400'}`}>
                        {index === allSteps.length - 1 ? <div className="animate-bounce">{getStatusIcon(step.status)}</div> : getStatusIcon(step.status)}
                      </div>
                      {index !== allSteps.length - 1 && (
                        <div className="w-1 h-20 bg-gradient-to-b from-primary/50 to-village transition-all"></div>
                      )}
                    </div>

                    {/* Step Content */}
                    <div className={`flex-1 pb-12 transition-all ${index === allSteps.length - 1 ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}>
                      <div className="bg-village/30 p-6 rounded-[32px] border border-transparent hover:border-primary/10 hover:bg-white hover:shadow-xl transition-all group-hover:-translate-y-1">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className={`text-xl font-black ${index === allSteps.length - 1 ? 'text-primary' : 'text-gray-800'}`}>
                            {step.status}
                          </h3>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-white px-3 py-1 rounded-full shadow-sm">
                            {new Date(step.timestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-gray-500 flex items-center gap-1 mb-3">
                          <MapPin size={14} className="text-primary" /> {step.location}
                        </p>
                        <div className="bg-white/50 p-4 rounded-2xl border border-white/50 italic text-gray-600 text-sm leading-relaxed">
                          "{step.description}"
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8 border-t border-village flex justify-center">
              <Link to={`/order/${order._id}`} className="text-primary font-bold hover:underline">View Full Order Details</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrderScreen;
