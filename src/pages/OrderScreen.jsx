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
import { CheckCircle2, Clock, Truck, ShieldCheck } from 'lucide-react';

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();
  const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation();
  const [createRazorpayOrder] = useCreateRazorpayOrderMutation();
  const [verifyRazorpayPayment] = useVerifyRazorpayPaymentMutation();

  const { userInfo } = useSelector((state) => state.auth) || {};

  // Load Razorpay Script
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    const res = await loadRazorpayScript();

    if (!res) {
      toast.error('Razorpay SDK failed to load. Are you online?');
      return;
    }

    try {
      const razorpayOrder = await createRazorpayOrder(order.totalPrice).unwrap();
      
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'स्वाद बिहार का',
        description: 'पारंपरिक बिहारी स्वाद',
        order_id: razorpayOrder.id,
        handler: async (response) => {
          try {
            await verifyRazorpayPayment(response).unwrap();
            await payOrder({ orderId, details: { id: response.razorpay_payment_id, status: 'success', update_time: Date.now().toString(), email_address: userInfo.email } });
            refetch();
            toast.success('Payment successful!');
          } catch (err) {
            toast.error(err?.data?.message || err.error);
          }
        },
        prefill: {
          name: userInfo.name,
          email: userInfo.email,
          contact: order.shippingAddress.phone,
        },
        theme: {
          color: '#8B4513',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold font-hindi">Order ID: #{order._id.substring(18)}</h1>
        <div className={`px-6 py-2 rounded-full font-bold text-lg ${order.isDelivered ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
          {order.status}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Info */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-2xl font-bold font-hindi flex items-center gap-3">
              <Truck className="text-primary" /> Shipping Details
            </h2>
            <div className="space-y-2">
              <p className="text-lg font-bold">{order.user.name}</p>
              <p className="text-gray-600">{order.user.email}</p>
              <p className="text-gray-600">
                {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              <p className="text-gray-600">Phone: {order.shippingAddress.phone}</p>
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
                <span className="font-bold">₹{order.shippingPrice}</span>
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
