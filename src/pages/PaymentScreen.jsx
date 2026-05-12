import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import { useGetSettingsQuery } from '../slices/settingsApiSlice';
import Loader from '../components/Loader';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const { data: settings, isLoading } = useGetSettingsQuery();

  const [paymentMethod, setPaymentMethod] = useState('Razorpay');

  useEffect(() => {
    if (!shippingAddress.address) {
      navigate('/shipping');
    }
  }, [navigate, shippingAddress]);

  useEffect(() => {
    if (settings) {
      if (!settings.isOnlinePaymentEnabled && settings.isCodEnabled) {
        setPaymentMethod('COD');
      } else if (settings.isOnlinePaymentEnabled) {
        setPaymentMethod('Razorpay');
      }
    }
  }, [settings]);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate('/placeorder');
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <CheckoutSteps step1 step2 step3 />
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
        <h1 className="text-3xl font-bold font-hindi text-center mb-8">Payment Method</h1>

        {isLoading ? (
          <Loader />
        ) : (
          <form onSubmit={submitHandler} className="space-y-8">
            <div className="space-y-4">
              {settings?.isOnlinePaymentEnabled && (
                <div 
                  className={`p-6 rounded-2xl border-2 transition cursor-pointer flex items-center gap-4 ${paymentMethod === 'Razorpay' ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'}`}
                  onClick={() => setPaymentMethod('Razorpay')}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Razorpay"
                    checked={paymentMethod === 'Razorpay'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-6 h-6 text-primary focus:ring-primary"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-xl font-hindi">Online Payment (Razorpay)</h3>
                    <p className="text-sm text-gray-500">Cards, UPI, Net Banking</p>
                  </div>
                </div>
              )}

              {settings?.isCodEnabled && (
                <div 
                  className={`p-6 rounded-2xl border-2 transition cursor-pointer flex items-center gap-4 ${paymentMethod === 'COD' ? 'border-primary bg-primary/5' : 'border-gray-100 hover:border-gray-200'}`}
                  onClick={() => setPaymentMethod('COD')}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === 'COD'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-6 h-6 text-primary focus:ring-primary"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-xl font-hindi">Cash On Delivery (COD)</h3>
                    <p className="text-sm text-gray-500">Pay when you receive the order</p>
                  </div>
                </div>
              )}

              {!settings?.isOnlinePaymentEnabled && !settings?.isCodEnabled && (
                <div className="p-8 text-center bg-red-50 rounded-2xl text-red-600 font-bold">
                  No payment methods are currently available. Please contact support.
                </div>
              )}
            </div>

            <button 
              type="submit" 
              disabled={!settings?.isOnlinePaymentEnabled && !settings?.isCodEnabled}
              className="w-full village-button-primary"
            >
              Continue
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default PaymentScreen;
