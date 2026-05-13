import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useCreateOrderMutation } from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import Loader from '../components/Loader';
import Message from '../components/Message';

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate('/shipping');
    } else if (!cart.paymentMethod) {
      navigate('/payment');
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems.map((item) => ({
          name: item.name,
          qty: item.qty,
          image: item.images[0]?.url,
          price: item.price,
          product: item._id,
        })),
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="space-y-8">
      <CheckoutSteps step1 step2 step3 step4 />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Shipping Info */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-2xl font-bold font-hindi">Shipping</h2>
            <p className="text-lg">
              <span className="font-bold text-gray-500">Address: </span>
              {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
            <p className="text-lg">
              <span className="font-bold text-gray-500">Mobile: </span>
              {cart.shippingAddress.phone}
            </p>
          </div>

          {/* Payment Info */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-2xl font-bold font-hindi">Payment Method</h2>
            <p className="text-lg">
              <span className="font-bold text-gray-500">Method: </span>
              {cart.paymentMethod === 'Razorpay' ? 'Online (Razorpay)' : 'Cash On Delivery (COD)'}
            </p>
          </div>

          {/* Order Items */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 space-y-6">
            <h2 className="text-2xl font-bold font-hindi">Order Items</h2>
            {cart.cartItems.length === 0 ? (
              <Message>Your cart is empty</Message>
            ) : (
              <div className="space-y-4">
                {cart.cartItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 py-4 border-b border-gray-50 last:border-0">
                    <img src={item.images[0]?.url} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div className="flex-1">
                      <Link to={`/product/${item._id}`} className="font-bold hover:text-primary transition">
                        {item.name} {item.unit && `(${item.unit})`}
                      </Link>
                      <p className="text-sm text-gray-500">{item.qty} x ₹{item.price}</p>
                    </div>
                    <div className="font-bold">₹{(item.qty * item.price).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Order Summary */}
        <div className="h-fit">
          <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 space-y-6">
            <h2 className="text-2xl font-bold font-hindi border-bottom pb-4">Order Summary</h2>
            
            <div className="space-y-4 text-lg">
              <div className="flex justify-between">
                <span className="text-gray-500">Items:</span>
                <span className="font-bold">₹{cart.itemsPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping:</span>
                <span className="font-bold">₹{cart.shippingPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Tax:</span>
                <span className="font-bold">₹{cart.taxPrice}</span>
              </div>
              <div className="border-t border-gray-100 pt-4 flex justify-between text-2xl">
                <span className="font-bold font-hindi">Total:</span>
                <span className="font-bold text-primary">₹{cart.totalPrice}</span>
              </div>
            </div>

            {error && <Message variant='danger'>{error?.data?.message || error.error}</Message>}

            <button 
              type="button"
              disabled={cart.cartItems.length === 0 || isLoading}
              onClick={placeOrderHandler}
              className="w-full village-button-primary"
            >
              Place Order
            </button>
            {isLoading && <Loader />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
