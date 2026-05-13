import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useProfileMutation } from '../slices/usersApiSlice';
import { useGetMyOrdersQuery } from '../slices/ordersApiSlice';
import { setCredentials } from '../slices/authSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { Link } from 'react-router-dom';
import { User, Package, Settings, ChevronRight } from 'lucide-react';
import Meta from '../components/Meta';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth) || {};

  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated!');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-8">
      <Meta title={`${userInfo.name}'s Profile - Kitchen Bihar Ka`} />
      
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold font-hindi text-primary">My Account</h1>
        <div className="flex justify-center">
          <span className="w-24 h-1 bg-primary rounded-full"></span>
        </div>
        <p className="text-gray-500 italic">Welcome back to your Bihari kitchen</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Sidebar / User Info */}
        <div className="lg:col-span-4 space-y-8">
          {/* User Card */}
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100 flex flex-col items-center text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-village/30 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>
            
            <div className="relative">
              <div className="w-32 h-32 bg-primary/10 rounded-[40px] flex items-center justify-center text-primary mb-6 rotate-3 border-4 border-white shadow-xl">
                <User size={64} />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-4 border-white shadow-md"></div>
            </div>

            <div className="space-y-1">
              <h2 className="text-3xl font-bold font-hindi">{userInfo.name}</h2>
              <p className="text-gray-500 font-medium">{userInfo.email}</p>
            </div>

            <div className="mt-8 pt-8 border-t border-village w-full grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-black text-primary">{orders?.length || 0}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Orders</p>
              </div>
              <div>
                <p className="text-2xl font-black text-primary">₹{orders?.reduce((acc, order) => acc + (order.isPaid ? order.totalPrice : 0), 0).toFixed(0)}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Spent</p>
              </div>
            </div>
          </div>

          {/* Update Profile Form */}
          <div className="bg-white p-10 rounded-[40px] shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold font-hindi mb-8 flex items-center gap-3">
              <Settings size={24} className="text-primary" /> Settings
            </h3>
            <form onSubmit={submitHandler} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full p-4 bg-village border border-gray-100 rounded-2xl focus:outline-none focus:border-primary transition font-bold"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Email Address</label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full p-4 bg-village border border-gray-100 rounded-2xl focus:outline-none focus:border-primary transition font-bold"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Change Password</label>
                <input
                  type="password"
                  placeholder="Leave blank to keep current"
                  className="w-full p-4 bg-village border border-gray-100 rounded-2xl focus:outline-none focus:border-primary transition font-bold"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Confirm password"
                  className="w-full p-4 bg-village border border-gray-100 rounded-2xl focus:outline-none focus:border-primary transition font-bold"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button 
                disabled={loadingUpdateProfile}
                type="submit" 
                className="w-full village-button-primary py-4 text-lg mt-4"
              >
                {loadingUpdateProfile ? 'Updating...' : 'Save Changes'}
              </button>
            </form>
          </div>
        </div>

        {/* Order History */}
        <div className="lg:col-span-8">
          <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100 min-h-[700px]">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
              <h3 className="text-3xl font-bold font-hindi flex items-center gap-3">
                <Package size={28} className="text-primary" /> My Orders
              </h3>
              <Link to="/menu" className="text-sm font-black uppercase tracking-widest text-primary hover:underline">
                Shop More Delicacies →
              </Link>
            </div>

            {isLoading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error?.data?.message || error.error}</Message>
            ) : orders.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-6">
                <div className="w-24 h-24 bg-village rounded-full flex items-center justify-center text-gray-300">
                  <Package size={48} />
                </div>
                <div className="text-center">
                  <h4 className="text-xl font-bold font-hindi text-gray-400">No orders yet</h4>
                  <p className="text-gray-400">Your taste buds are waiting for some Bihari magic!</p>
                </div>
                <Link to="/menu" className="village-button-secondary px-10 py-4">Explore Menu</Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6">
                {orders.map((order) => (
                  <div key={order._id} className="p-8 bg-village/30 rounded-[32px] border border-transparent hover:border-primary/10 transition-all group relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[60px] translate-x-12 -translate-y-12 group-hover:translate-x-8 group-hover:-translate-y-8 transition-transform"></div>
                    
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-white rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm border border-gray-100">
                            #{order._id.substring(18)}
                          </span>
                          <span className="text-xs text-gray-400 font-bold">
                            {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                        
                        <div className="space-y-1">
                          <p className="text-3xl font-black text-primary">₹{order.totalPrice.toFixed(0)}</p>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                            {order.orderItems.length} {order.orderItems.length === 1 ? 'Item' : 'Items'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Payment</p>
                          <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {order.isPaid ? 'Paid' : 'Pending'}
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Status</p>
                          <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${order.isDelivered ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                            {order.status}
                          </div>
                        </div>
                        
                        <div className="md:pl-4">
                          <Link 
                            to={`/order/${order._id}`} 
                            className="bg-white w-14 h-14 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shadow-hover"
                          >
                            <ChevronRight size={28} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
