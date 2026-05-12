import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import Message from '../components/Message';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold font-hindi">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-6 bg-white rounded-3xl border border-dashed border-gray-300">
          <div className="p-6 bg-village rounded-full text-primary">
            <ShoppingBag size={48} />
          </div>
          <p className="text-xl text-gray-500 font-hindi">Your cart is empty</p>
          <Link to="/" className="village-button-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
                  <img src={item.images[0]?.url} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 space-y-1 text-center sm:text-left">
                  <Link to={`/product/${item._id}`} className="text-xl font-bold font-hindi hover:text-primary transition">
                    {item.hindiName || item.name}
                  </Link>
                  <p className="text-gray-500">₹{item.price}</p>
                </div>

                <div className="flex items-center bg-village rounded-full overflow-hidden border border-gray-200">
                  <button 
                    onClick={() => addToCartHandler(item, Math.max(1, item.qty - 1))}
                    className="p-2 hover:bg-gray-100 transition"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-10 text-center font-bold">{item.qty}</span>
                  <button 
                    onClick={() => addToCartHandler(item, Math.min(item.countInStock, item.qty + 1))}
                    className="p-2 hover:bg-gray-100 transition"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <div className="text-xl font-bold text-primary sm:w-24 text-center">
                  ₹{(item.qty * item.price).toFixed(2)}
                </div>

                <button 
                  onClick={() => removeFromCartHandler(item._id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-full transition"
                >
                  <Trash2 size={24} />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="h-fit space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 space-y-6">
              <h2 className="text-2xl font-bold font-hindi border-bottom pb-4">Order Summary</h2>
              
              <div className="space-y-4 text-lg">
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Qty:</span>
                  <span className="font-bold">{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Items:</span>
                  <span className="font-bold">₹{cart.itemsPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping:</span>
                  <span className="font-bold text-green-600">{cart.shippingPrice === '0.00' ? 'FREE' : `₹${cart.shippingPrice}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax (GST 5%):</span>
                  <span className="font-bold">₹{cart.taxPrice}</span>
                </div>
                <div className="border-t border-gray-100 pt-4 flex justify-between text-2xl">
                  <span className="font-bold font-hindi">Total:</span>
                  <span className="font-bold text-primary">₹{cart.totalPrice}</span>
                </div>
              </div>

              <button 
                onClick={checkoutHandler}
                className="w-full village-button-primary"
              >
                Checkout
              </button>
            </div>

            <div className="p-4 bg-secondary/10 border border-secondary/30 rounded-2xl text-sm">
              <p className="font-bold text-primary">💡 Tip:</p>
              <p className="text-gray-700">Free shipping on orders over ₹500!</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
