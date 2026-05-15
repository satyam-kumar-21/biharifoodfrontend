import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
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
    <div className="max-w-6xl mx-auto space-y-12 pb-20 px-4">
      <div className="text-center space-y-4 pt-8">
        <div className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs px-4 py-2 bg-primary/10 rounded-full mb-2">
          <ShoppingBag size={14} /> Your Selection
        </div>
        <h1 className="text-4xl md:text-6xl font-bold font-hindi text-gray-800">Your Cart</h1>
        <p className="text-gray-500 italic max-w-md mx-auto">Review your selected Bihari treasures before we prepare them for you.</p>
      </div>

      {cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-6 bg-white rounded-[40px] border-2 border-dashed border-village shadow-inner">
          <div className="w-20 h-20 bg-village rounded-full text-primary flex items-center justify-center">
            <ShoppingBag size={40} />
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold font-hindi text-gray-800">Your cart is empty</p>
            <p className="text-gray-500 mt-2">Looks like you haven't added any treats yet.</p>
          </div>
          <Link to="/" className="village-button-primary px-10">Start Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <div key={item._id} className="bg-white p-4 sm:p-6 rounded-[32px] shadow-sm border border-gray-100 flex gap-4 sm:gap-8 relative group transition-all hover:shadow-xl hover:shadow-primary/5">
                {/* Image */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl overflow-hidden shrink-0 bg-village/20 border border-village">
                  <img src={item.images[0]?.url} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                </div>
                
                {/* Content */}
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div className="space-y-1">
                    <Link to={`/product/${item._id}`} className="text-lg sm:text-2xl font-bold font-hindi hover:text-primary transition line-clamp-1 pr-10">
                      {item.name}
                    </Link>
                    {item.unit && (
                      <span className="inline-block px-2 py-0.5 bg-gray-100 text-[10px] font-black text-gray-500 rounded uppercase tracking-wider">
                        {item.unit}
                      </span>
                    )}
                    <p className="text-sm font-bold text-gray-400 mt-1">₹{item.price}</p>
                  </div>

                  <div className="flex items-end justify-between mt-4">
                    <div className="flex items-center bg-village rounded-2xl overflow-hidden border border-gray-100 p-1">
                      <button 
                        onClick={() => addToCartHandler(item, Math.max(1, item.qty - 1))}
                        className="p-2 hover:bg-white hover:text-primary rounded-xl transition shadow-sm"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center font-black text-gray-800">{item.qty}</span>
                      <button 
                        onClick={() => addToCartHandler(item, Math.min(item.countInStock, item.qty + 1))}
                        className="p-2 hover:bg-white hover:text-primary rounded-xl transition shadow-sm"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <div className="text-xl font-black text-primary flex flex-col items-end">
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest leading-none mb-1">Subtotal</span>
                      ₹{(item.qty * item.price).toFixed(0)}
                    </div>
                  </div>
                </div>

                {/* Remove Button */}
                <button 
                  onClick={() => removeFromCartHandler(item._id)}
                  className="absolute top-4 right-4 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                  aria-label="Remove item"
                >
                  <Trash2 size={22} />
                </button>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="h-fit">
            <div className="bg-white p-8 rounded-[40px] shadow-2xl border border-gray-100 space-y-8 sticky top-24">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold font-hindi text-gray-800">Order Summary</h2>
                <div className="w-12 h-1 bg-primary rounded-full"></div>
              </div>
              
              <div className="space-y-4 text-gray-600">
                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold uppercase tracking-widest text-gray-400">Total Items</span>
                  <span className="font-black text-gray-800 bg-village px-3 py-1 rounded-lg">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Items Total</span>
                  <span className="font-bold text-gray-800">₹{cart.itemsPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Shipping</span>
                  <span className={`font-black ${cart.itemsPrice >= cart.freeShippingThreshold ? 'text-green-600' : (cart.shippingPrice === '0.00' ? 'text-gray-400 text-[10px] italic' : 'text-gray-800')}`}>
                    {cart.itemsPrice >= cart.freeShippingThreshold 
                      ? 'FREE' 
                      : (cart.shippingPrice === '0.00' ? 'Calculated at checkout' : `₹${cart.shippingPrice}`)
                    }
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Tax (GST 5%)</span>
                  <span className="font-bold text-gray-800">₹{cart.taxPrice}</span>
                </div>
                <div className="pt-6 border-t border-dashed border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-black font-hindi text-gray-800">Grand Total</span>
                    <span className="text-3xl font-black text-primary tracking-tighter">₹{cart.totalPrice}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={checkoutHandler}
                  className="w-full village-button-primary py-6 text-xl shadow-xl shadow-primary/20 flex items-center justify-center gap-3 active:scale-[0.98] transition-all"
                >
                  Proceed to Checkout <ArrowRight size={24} />
                </button>
                
                <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex gap-3 items-center">
                    <div className="p-2 bg-green-100 rounded-full text-green-600">
                        <ShoppingBag size={16} />
                    </div>
                    <div className="text-xs text-green-800 font-medium leading-tight">
                        {cart.itemsPrice >= cart.freeShippingThreshold ? (
                            "Awesome! You've unlocked FREE shipping for this order."
                        ) : (
                            <>Add <b>₹{cart.freeShippingThreshold - cart.itemsPrice}</b> more for <span className="font-black">FREE Shipping!</span></>
                        )}
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
