import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../slices/cartSlice';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || 'India');
  const [phone, setPhone] = useState(shippingAddress.phone || '');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country, phone }));
    navigate('/payment');
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <CheckoutSteps step1 step2 />
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
        <h1 className="text-3xl font-bold font-hindi text-center mb-8">Shipping Address</h1>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="space-y-2">
            <label className="font-bold font-hindi">Full Address</label>
            <input
              type="text"
              placeholder="House number, Street, Locality"
              className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="font-bold font-hindi">City</label>
              <input
                type="text"
                placeholder="Enter city"
                className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="font-bold font-hindi">Postal Code</label>
              <input
                type="text"
                placeholder="Postal code"
                className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="font-bold font-hindi">Mobile Number</label>
            <input
              type="text"
              placeholder="10 digit mobile number"
              className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="w-full village-button-primary">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingScreen;
