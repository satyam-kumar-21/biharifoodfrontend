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
    <div className="space-y-12">
      <h1 className="text-3xl md:text-4xl font-bold font-hindi">My Account</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* User Info & Settings */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
              <User size={48} />
            </div>
            <h2 className="text-2xl font-bold font-hindi">{userInfo.name}</h2>
            <p className="text-gray-500">{userInfo.email}</p>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
            <h3 className="text-xl font-bold font-hindi mb-6 flex items-center gap-2">
              <Settings size={20} className="text-primary" /> Update Profile
            </h3>
            <form onSubmit={submitHandler} className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-500">Name</label>
                <input
                  type="text"
                  className="w-full p-3 bg-village border border-gray-200 rounded-xl focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-500">Email</label>
                <input
                  type="email"
                  className="w-full p-3 bg-village border border-gray-200 rounded-xl focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-500">New Password</label>
                <input
                  type="password"
                  className="w-full p-3 bg-village border border-gray-200 rounded-xl focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-bold text-gray-500">Confirm Password</label>
                <input
                  type="password"
                  className="w-full p-3 bg-village border border-gray-200 rounded-xl focus:outline-none"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <button 
                disabled={loadingUpdateProfile}
                type="submit" 
                className="w-full village-button-primary mt-4"
              >
                Update Profile
              </button>
            </form>
          </div>
        </div>

        {/* Order History */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 min-h-[500px]">
            <h3 className="text-xl font-bold font-hindi mb-8 flex items-center gap-2">
              <Package size={20} className="text-primary" /> My Order History
            </h3>

            {isLoading ? (
              <Loader />
            ) : error ? (
              <Message variant='danger'>{error?.data?.message || error.error}</Message>
            ) : orders.length === 0 ? (
              <div className="text-center py-20 text-gray-500">
                You haven't placed any orders yet.
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="p-6 bg-village rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6 hover:shadow-md transition group">
                    <div className="space-y-1 text-center md:text-left">
                      <p className="font-bold">ID: #{order._id.substring(18)}</p>
                      <p className="text-sm text-gray-500">Date: {order.createdAt.substring(0, 10)}</p>
                      <p className="text-lg font-bold text-primary">₹{order.totalPrice}</p>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className={`px-4 py-1 rounded-full text-sm font-bold ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {order.isPaid ? 'Paid' : 'Pending'}
                      </div>
                      <div className={`px-4 py-1 rounded-full text-sm font-bold ${order.isDelivered ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                        {order.status}
                      </div>
                    </div>

                    <Link to={`/order/${order._id}`} className="bg-white p-3 rounded-full shadow-sm group-hover:bg-primary group-hover:text-white transition">
                      <ChevronRight size={24} />
                    </Link>
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
