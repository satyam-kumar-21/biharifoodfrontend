import { useState, useEffect } from 'react';
import { useGetSettingsQuery, useUpdateSettingsMutation } from '../../slices/settingsApiSlice';
import { useUploadProductImageMutation } from '../../slices/productsApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-hot-toast';
import { 
  Settings as SettingsIcon, 
  CreditCard, 
  Banknote, 
  Save, 
  Image as ImageIcon, 
  MapPin, 
  Mail, 
  Phone,
  Store
} from 'lucide-react';

const SettingsScreen = () => {
  const { data: settings, isLoading, error, refetch } = useGetSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] = useUpdateSettingsMutation();
  const [uploadImage, { isLoading: isUploading }] = useUploadProductImageMutation();

  const [isCodEnabled, setIsCodEnabled] = useState(true);
  const [isOnlinePaymentEnabled, setIsOnlinePaymentEnabled] = useState(true);
  const [logo, setLogo] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [authMode, setAuthMode] = useState('mobile_otp');

  useEffect(() => {
    if (settings) {
      setIsCodEnabled(settings.isCodEnabled);
      setIsOnlinePaymentEnabled(settings.isOnlinePaymentEnabled);
      setLogo(settings.logo || '');
      setAddress(settings.address || '');
      setEmail(settings.email || '');
      setPhone(settings.phone || '');
      setAuthMode(settings.authMode || 'mobile_otp');
    }
  }, [settings]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      setLogo(res.image);
      toast.success('Logo uploaded successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateSettings({ 
        isCodEnabled, 
        isOnlinePaymentEnabled, 
        logo, 
        address, 
        email, 
        phone,
        authMode
      }).unwrap();
      toast.success('Settings updated successfully');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary/10 rounded-2xl text-primary">
          <SettingsIcon size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-hindi">Store Settings</h1>
          <p className="text-gray-500">Manage brand identity, contact info, and payment methods</p>
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 overflow-hidden">
          <form onSubmit={submitHandler} className="divide-y divide-gray-100">
            {/* Brand Identity Section */}
            <div className="p-8 md:p-12 space-y-8">
              <h2 className="text-xl font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Store size={20} /> Brand Identity
              </h2>
              
              <div className="space-y-4">
                <label className="block text-sm font-bold text-gray-700">Store Logo</label>
                <div className="flex items-center gap-8">
                  <div className="w-32 h-32 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200 flex items-center justify-center overflow-hidden">
                    {logo ? (
                      <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                    ) : (
                      <ImageIcon size={32} className="text-gray-300" />
                    )}
                  </div>
                  <div className="space-y-3 flex-1">
                    <input 
                      type="text" 
                      placeholder="Logo URL" 
                      value={logo}
                      onChange={(e) => setLogo(e.target.value)}
                      className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:border-primary transition"
                    />
                    <div className="flex items-center gap-4">
                      <label className="village-button-secondary py-2 px-6 text-sm cursor-pointer inline-block">
                        {isUploading ? 'Uploading...' : 'Upload New Logo'}
                        <input type="file" className="hidden" onChange={uploadFileHandler} />
                      </label>
                      <p className="text-xs text-gray-400">Recommended: Transparent PNG, 512x512px</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="p-8 md:p-12 space-y-8">
              <h2 className="text-xl font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <MapPin size={20} /> Contact Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 flex items-center gap-1">
                    <Mail size={12} /> Email Address
                  </label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-primary transition font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 flex items-center gap-1">
                    <Phone size={12} /> Phone Number
                  </label>
                  <input 
                    type="text" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-primary transition font-bold"
                  />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest px-2 flex items-center gap-1">
                    <MapPin size={12} /> Store Address
                  </label>
                  <textarea 
                    rows="3"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-primary transition font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Authentication Mode Section */}
            <div className="p-8 md:p-12 space-y-8">
              <h2 className="text-xl font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <SettingsIcon size={20} /> Authentication Method
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div 
                  className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col gap-4 ${authMode === 'mobile_otp' ? 'border-primary bg-primary/5' : 'border-gray-100 bg-gray-50'}`}
                  onClick={() => setAuthMode('mobile_otp')}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${authMode === 'mobile_otp' ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-400'}`}>
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Mobile OTP</p>
                    <p className="text-xs text-gray-500">Fastest login via MSG91 SMS</p>
                  </div>
                </div>

                <div 
                  className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col gap-4 ${authMode === 'mobile_password' ? 'border-primary bg-primary/5' : 'border-gray-100 bg-gray-50'}`}
                  onClick={() => setAuthMode('mobile_password')}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${authMode === 'mobile_password' ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-400'}`}>
                    <Store size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Mobile + Password</p>
                    <p className="text-xs text-gray-500">Standard mobile registration</p>
                  </div>
                </div>

                <div 
                  className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex flex-col gap-4 ${authMode === 'email_password_otp' ? 'border-primary bg-primary/5' : 'border-gray-100 bg-gray-50'}`}
                  onClick={() => setAuthMode('email_password_otp')}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${authMode === 'email_password_otp' ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-400'}`}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Email + Password</p>
                    <p className="text-xs text-gray-500">OTP via Brevo for signup only</p>
                  </div>
                </div>
              </div>
            </div>

             {/* Payment Methods Section */}
            <div className="p-8 md:p-12 space-y-8">
              <h2 className="text-xl font-black uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <CreditCard size={20} /> Payment Gateways
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* COD Toggle */}
                <div className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex items-center justify-between group ${isCodEnabled ? 'border-primary bg-primary/5' : 'border-gray-100 bg-gray-50'}`}
                     onClick={() => setIsCodEnabled(!isCodEnabled)}>
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-2xl transition-all ${isCodEnabled ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-400'}`}>
                      <Banknote size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Cash On Delivery</p>
                      <p className="text-sm text-gray-500">Allow doorstep payments</p>
                    </div>
                  </div>
                  <div className={`w-12 h-6 rounded-full relative transition-all ${isCodEnabled ? 'bg-primary' : 'bg-gray-300'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isCodEnabled ? 'right-1' : 'left-1'}`}></div>
                  </div>
                </div>

                {/* Online Payment Toggle */}
                <div className={`p-6 rounded-3xl border-2 transition-all cursor-pointer flex items-center justify-between group ${isOnlinePaymentEnabled ? 'border-primary bg-primary/5' : 'border-gray-100 bg-gray-50'}`}
                     onClick={() => setIsOnlinePaymentEnabled(!isOnlinePaymentEnabled)}>
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-2xl transition-all ${isOnlinePaymentEnabled ? 'bg-primary text-white shadow-lg' : 'bg-white text-gray-400'}`}>
                      <CreditCard size={24} />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Online Payment</p>
                      <p className="text-sm text-gray-500">Razorpay/Cards/UPI</p>
                    </div>
                  </div>
                  <div className={`w-12 h-6 rounded-full relative transition-all ${isOnlinePaymentEnabled ? 'bg-primary' : 'bg-gray-300'}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isOnlinePaymentEnabled ? 'right-1' : 'left-1'}`}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer / Save Button */}
            <div className="p-8 bg-gray-50 flex justify-end">
              <button 
                type="submit" 
                disabled={isUpdating}
                className="village-button-primary px-12 py-4 flex items-center gap-2"
              >
                {isUpdating ? <Loader size={20} /> : <Save size={20} />}
                Save All Settings
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default SettingsScreen;
