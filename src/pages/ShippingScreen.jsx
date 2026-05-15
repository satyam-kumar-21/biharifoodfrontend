import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress, setCartSettings } from '../slices/cartSlice';
import { useCalculateShippingMutation } from '../slices/shippingApiSlice';
import CheckoutSteps from '../components/CheckoutSteps';
import { MapPin, Loader2, Phone, Home, Building2, MapPinHouse, Truck } from 'lucide-react';
import { toast } from 'react-hot-toast';

const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems } = cart;

  const [address, setAddress] = useState(shippingAddress.address || '');
  const [landmark, setLandmark] = useState(shippingAddress.landmark || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || 'India');
  const [phone, setPhone] = useState(shippingAddress.phone || '');
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [shippingInfo, setShippingInfo] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [calculateShipping, { isLoading: isCalculating }] = useCalculateShippingMutation();

  // Calculate weight in KG (assume 1 unit = 0.5kg if not specified)
  const totalWeight = cartItems.reduce((acc, item) => {
    // Try to extract weight from unit string like "500g"
    const weightMatch = item.unit?.match(/(\d+)(g|kg)/i);
    if (weightMatch) {
      const value = parseInt(weightMatch[1]);
      const unit = weightMatch[2].toLowerCase();
      return acc + (unit === 'kg' ? value : value / 1000) * item.qty;
    }
    return acc + 0.5 * item.qty;
  }, 0);

  useEffect(() => {
    if (postalCode.length === 6) {
      handleCalculateShipping();
    }
  }, [postalCode]);

  const handleCalculateShipping = async () => {
    try {
      const res = await calculateShipping({
        destination_pincode: postalCode,
        weight: totalWeight || 0.5,
        cod: true // Assume COD is possible for rate check
      }).unwrap();
      
      setShippingInfo(res);
      dispatch(setCartSettings({
        freeShippingThreshold: cart.freeShippingThreshold,
        shippingPrice: res.rate
      }));
      toast.success(`Shipping: ₹${res.rate} via ${res.courier_name}`);
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to calculate shipping');
    }
  };

  const fetchLocation = () => {
    setLoadingLocation(true);
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      setLoadingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          if (data.address) {
            const { road, suburb, neighbourhood, city: addrCity, town, village, postcode, state, country: addrCountry } = data.address;

            // Construct a readable address
            const displayAddress = [road, suburb, village].filter(Boolean).join(', ');
            setAddress(displayAddress || 'Current Location');
            setLandmark(neighbourhood || suburb || '');
            setCity(addrCity || town || village || '');
            setPostalCode(postcode || '');
            setCountry(addrCountry || 'India');

            toast.success('Location detected successfully!');
          }
        } catch (error) {
          toast.error('Error fetching address from coordinates');
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        toast.error('Error getting location: ' + error.message);
        setLoadingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (phone.length !== 10) {
      toast.error('Please enter a valid 10-digit mobile number');
      return;
    }
    dispatch(saveShippingAddress({ address, landmark, city, postalCode, country, phone }));
    navigate('/payment');
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6">
      <CheckoutSteps step1 step2 />

      <div className="mt-8 bg-white p-6 md:p-10 rounded-[40px] shadow-2xl border border-gray-100 transition-all hover:shadow-primary/5">
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
            <MapPinHouse size={32} />
          </div>
          <h1 className="text-3xl md:text-4xl font-black font-hindi text-gray-800 text-center">Where should we deliver?</h1>
          <p className="text-gray-500 mt-2 text-sm">Please provide your delivery details</p>
        </div>

        <div className="mb-8">
          <button
            type="button"
            onClick={fetchLocation}
            disabled={loadingLocation}
            className="w-full flex items-center justify-center gap-3 p-5 border-2 border-dashed border-primary/30 rounded-3xl text-primary font-bold hover:bg-primary/5 transition-all group"
          >
            {loadingLocation ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <MapPin className="group-hover:scale-110 transition-transform" size={24} />
            )}
            {loadingLocation ? 'Finding your location...' : 'Use Current Location'}
          </button>
        </div>

        <form onSubmit={submitHandler} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 px-2">
                <Home size={14} /> Full Address
              </label>
              <textarea
                rows="3"
                placeholder="House number, Street, Locality"
                className="w-full p-5 bg-village/30 border border-transparent rounded-[24px] focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 px-2">
                <MapPin size={14} /> Nearby Landmark
              </label>
              <textarea
                rows="3"
                placeholder="e.g. Near Hanuman Temple or School"
                className="w-full p-5 bg-village/30 border border-transparent rounded-[24px] focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                value={landmark}
                onChange={(e) => setLandmark(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 px-2">
                <Building2 size={14} /> City
              </label>
              <input
                type="text"
                placeholder="Enter city"
                className="w-full p-5 bg-village/30 border border-transparent rounded-[24px] focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 px-2">
                <MapPin size={14} /> Postal Code
              </label>
              <div className="relative">
                <input
                  type="text"
                  maxLength="6"
                  placeholder="6-digit postal code"
                  className="w-full p-5 bg-village/30 border border-transparent rounded-[24px] focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, ''))}
                  required
                />
                {isCalculating && (
                  <div className="absolute right-5 top-1/2 -translate-y-1/2">
                    <Loader2 className="animate-spin text-primary" size={20} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {shippingInfo && (
            <div className="bg-primary/5 border border-primary/10 p-4 rounded-2xl flex items-center gap-4 animate-pulse">
                <div className="p-3 bg-white rounded-xl text-primary shadow-sm">
                    <Truck size={24} />
                </div>
                <div>
                    <p className="text-xs font-black uppercase tracking-widest text-gray-400">Shipping Rate</p>
                    <p className="font-bold text-gray-800">₹{shippingInfo.rate} via {shippingInfo.courier_name}</p>
                    <p className="text-[10px] text-gray-500">Estimated Delivery: {shippingInfo.estimated_delivery}</p>
                </div>
            </div>
          )}

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-400 px-2">
              <Phone size={14} /> Mobile Number
            </label>
            <div className="relative">
              <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-gray-400 border-r pr-3 border-gray-200">+91</span>
              <input
                type="tel"
                maxLength="10"
                placeholder="10 digit mobile number"
                className="w-full p-5 pl-20 bg-village/30 border border-transparent rounded-[24px] focus:outline-none focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/5 transition-all"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isCalculating}
            className={`w-full village-button-primary py-6 text-xl shadow-xl shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98] transition-all ${isCalculating ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isCalculating ? 'Calculating Shipping...' : 'Save and Continue'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingScreen;
