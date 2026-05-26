import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { 
  useGetOrderDetailsQuery, 
  usePayOrderMutation, 
  useDeliverOrderMutation,
  useCreateRazorpayOrderMutation,
  useVerifyRazorpayPaymentMutation
} from '../slices/ordersApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { CheckCircle2, Clock, Truck, ShieldCheck, MapPin, History, Send } from 'lucide-react';
import { useUpdateOrderStatusMutation } from '../slices/ordersApiSlice';
import { useState } from 'react';

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const [updateOrderStatus, { isLoading: loadingStatusUpdate }] = useUpdateOrderStatusMutation();
  const [createRazorpayOrder] = useCreateRazorpayOrderMutation();
  const [verifyRazorpayPayment] = useVerifyRazorpayPaymentMutation();

  const [status, setStatus] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const { userInfo } = useSelector((state) => state.auth) || {};

  useEffect(() => {
    if (order) {
      setStatus(order.status);
      setLocation(order.currentLocation || '');
    }
  }, [order]);

  const updateStatusHandler = async (e) => {
    e.preventDefault();
    try {
      await updateOrderStatus({ orderId, status, location, description }).unwrap();
      refetch();
      toast.success('Order status updated');
      setDescription('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  // Load Razorpay Script (avoid duplicate loading)
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        console.log('Razorpay script already loaded');
        return resolve(true);
      }
      const existingScript = document.querySelector('script[src="https://checkout.razorpay.com/v1/checkout.js"]');
      if (existingScript) {
        existingScript.onload = () => resolve(true);
        existingScript.onerror = () => resolve(false);
        return;
      }
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        console.log('Razorpay script loaded');
        resolve(true);
      };
      script.onerror = () => {
        console.error('Failed to load Razorpay script');
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    console.log('Initiating payment for order:', orderId);
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      toast.error('Razorpay SDK failed to load. Please check internet connection.');
      return;
    }
    if (!window.Razorpay) {
      toast.error('Razorpay SDK not available.');
      return;
    }
    try {
      // Ensure amount is an integer (paise) and non-zero
      const amount = Math.round(parseFloat(order.totalPrice) * 100);
      console.log('Payment amount (paise):', amount);
      if (!amount || amount <= 0) {
        toast.error('Invalid order amount for payment.');
        return;
      }
      // Create Razorpay order on backend (use totalPrice, backend will convert to paise)
      const razorpayOrder = await createRazorpayOrder(order.totalPrice).unwrap();
      console.log('Razorpay order created:', razorpayOrder);
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'स्वाद बिहार का',
        description: 'पारंपरिक बिहारी स्वाद',
        order_id: razorpayOrder.id,
        handler: async (response) => {
          console.log('Payment successful, verifying...', response);
          try {
            await verifyRazorpayPayment(response).unwrap();
            await payOrder({
              orderId,
              details: {
                id: response.razorpay_payment_id,
                status: 'success',
                update_time: Date.now().toString(),
                email_address: userInfo.email,
              },
            });
            refetch();
            toast.success('Payment successful!');
          } catch (err) {
            console.error('Payment verification error:', err);
            toast.error(err?.data?.message || err.error);
          }
        },
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
          contact: order.shippingAddress.phone,
        },
        theme: { color: '#8B4513' },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.error('Razorpay order creation error:', err);
      toast.error(err?.data?.message || err.error);
    }
  };

  const deliverHandler = async () => {
    try {
      await deliverOrder(orderId);
      refetch();
      toast.success('Order marked as delivered');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Order Details</p>
          <h1 className="text-2xl md:text-3xl font-bold font-hindi flex items-center gap-2">
            ID: <span className="text-primary">{order._id}</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            to={`/track-order?id=${order._id}`} 
            className="village-button-secondary py-3 px-8 flex items-center gap-2 text-sm"
          >
            <Truck size={18} /> Track Order
          </Link>
          <div className={`px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest shadow-sm ${order.isDelivered ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
            {order.status}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Info */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-2xl font-bold font-hindi flex items-center gap-3">
              <Truck className="text-primary" /> Shipping Details
            </h2>
            <div className="space-y-3">
              <p className="text-xl font-bold text-gray-800">{order.user.name}</p>
              <div className="space-y-1">
                <p className="flex items-center gap-2 text-gray-600">
                    <span className="font-black text-[10px] uppercase tracking-widest text-gray-400 w-20">Address:</span>
                    <span className="font-medium">{order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}</span>
                </p>
                {order.shippingAddress.landmark && (
                    <p className="flex items-center gap-2 text-gray-600">
                        <span className="font-black text-[10px] uppercase tracking-widest text-gray-400 w-20">Landmark:</span>
                        <span className="font-bold text-primary">{order.shippingAddress.landmark}</span>
                    </p>
                )}
                <p className="flex items-center gap-2 text-gray-600">
                    <span className="font-black text-[10px] uppercase tracking-widest text-gray-400 w-20">Mobile:</span>
                    <span className="font-medium">+91 {order.shippingAddress.phone}</span>
                </p>
                <p className="flex items-center gap-2 text-gray-600">
                    <span className="font-black text-[10px] uppercase tracking-widest text-gray-400 w-20">Email:</span>
                    <span className="font-medium">{order.user.email}</span>
                </p>
              </div>
            </div>
            {order.isDelivered ? (
              <Message variant='success'>Delivered on: {order.deliveredAt.substring(0, 10)}</Message>
            ) : (
              <Message variant='warning'>Not Delivered</Message>
            )}
          </div>

          {/* Payment Info */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-2xl font-bold font-hindi flex items-center gap-3">
              <ShieldCheck className="text-primary" /> Payment Details
            </h2>
            <p className="text-lg">
              <span className="font-bold text-gray-500">Method: </span>
              {order.paymentMethod === 'Razorpay' ? 'Online (Razorpay)' : 'Cash On Delivery (COD)'}
            </p>
            {order.isPaid ? (
              <Message variant='success'>Paid on: {order.paidAt.substring(0, 10)}</Message>
            ) : (
              <Message variant='danger'>Not Paid</Message>
            )}
          </div>

          {/* Tracking History */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-2xl font-bold font-hindi flex items-center gap-3">
              <History className="text-primary" /> Tracking History
            </h2>
            <div className="relative pl-8 border-l-2 border-village space-y-8 py-2">
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-white"></div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="font-bold text-gray-800">Order Placed</h4>
                  <span className="text-xs text-gray-400 font-bold">
                    {new Date(order.createdAt).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-sm text-gray-500">Warehouse</p>
                <p className="text-sm text-gray-600 mt-1 italic">"We have received your order."</p>
              </div>

              {order.trackingHistory?.length > 0 && (
                order.trackingHistory.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className={`absolute -left-[41px] top-1 w-4 h-4 rounded-full border-4 border-white ${idx === order.trackingHistory.length - 1 ? 'bg-primary' : 'bg-gray-300'}`}></div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <h4 className="font-bold text-gray-800">{step.status}</h4>
                      <span className="text-xs text-gray-400 font-bold">
                        {new Date(step.timestamp).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <MapPin size={12} className="text-primary" /> {step.location}
                    </p>
                    <p className="text-sm text-gray-600 mt-1 italic">"{step.description}"</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Admin Tracking Update */}
          {userInfo && userInfo.isAdmin && !order.isDelivered && (
            <div className="bg-village p-8 rounded-3xl space-y-6">
              <h3 className="text-xl font-bold font-hindi">Update Tracking Info</h3>
              <form onSubmit={updateStatusHandler} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Status</label>
                    <select 
                      className="w-full p-3 bg-white border border-gray-100 rounded-xl focus:outline-none focus:border-primary transition font-bold"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Packed">Packed</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Location</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Patna Hub"
                      className="w-full p-3 bg-white border border-gray-100 rounded-xl focus:outline-none focus:border-primary transition"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2">Description</label>
                  <textarea 
                    rows="2"
                    placeholder="e.g. Dispatched from hub..."
                    className="w-full p-3 bg-white border border-gray-100 rounded-xl focus:outline-none focus:border-primary transition"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <button 
                  disabled={loadingStatusUpdate}
                  type="submit" 
                  className="village-button-primary w-full flex items-center justify-center gap-2"
                >
                  <Send size={18} /> Update Tracking
                </button>
              </form>
            </div>
          )}

          {/* Order Items */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-2xl font-bold font-hindi">Order Items</h2>
            <div className="space-y-4">
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex items-center gap-4 py-4 border-b border-gray-50 last:border-0">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <Link to={`/product/${item.product}`} className="font-bold hover:text-primary transition">{item.name}</Link>
                    <p className="text-sm text-gray-500">{item.qty} x ₹{item.price}</p>
                  </div>
                  <div className="font-bold">₹{(item.qty * item.price).toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="h-fit space-y-6">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 space-y-6">
            <h2 className="text-2xl font-bold font-hindi border-bottom pb-4">Order Summary</h2>
            
            <div className="space-y-4 text-lg">
              <div className="flex justify-between">
                <span className="text-gray-500">Items:</span>
                <span className="font-bold">₹{order.itemsPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping:</span>
                <span className="font-bold">₹0</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax:</span>
                <span className="font-bold">₹{order.taxPrice}</span>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between text-2xl">
                <span className="font-bold font-hindi">Total:</span>
                <span className="font-bold text-primary">₹{order.totalPrice}</span>
              </div>
            </div>

            {!order.isPaid && order.paymentMethod === 'Razorpay' && (
              <button 
                onClick={handlePayment}
                className="w-full village-button-primary"
              >
                Pay Now
              </button>
            )}

            {loadingPay && <Loader />}

            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
              <button 
                onClick={deliverHandler}
                className="w-full village-button-secondary"
              >
                Mark As Delivered
              </button>
            )}
            {loadingDeliver && <Loader />}
          </div>

          <div className="p-6 bg-white rounded-3xl border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-green-50 rounded-full text-green-600">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <p className="font-bold font-hindi">Secure Payment</p>
              <p className="text-sm text-gray-500">Your data is safe</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderScreen;
