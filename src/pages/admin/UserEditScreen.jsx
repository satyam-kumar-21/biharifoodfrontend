import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
  useUpdateUserMutation, 
  useGetUserDetailsQuery 
} from '../../slices/usersApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { ArrowLeft, User, Mail, Shield, Lock, Unlock, Save } from 'lucide-react';

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);

  const { data: user, isLoading, error, refetch } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
      setIsBlocked(user.isBlocked || false);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin, isBlocked }).unwrap();
      toast.success('User updated successfully');
      refetch();
      navigate('/admin/userlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <Link to="/admin/userlist" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
        <ArrowLeft size={20} /> Back to User List
      </Link>

      <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 overflow-hidden">
        <div className="bg-primary p-12 text-center text-white relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 w-20 h-20 border-4 border-white rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-32 h-32 border-4 border-white rounded-full opacity-50"></div>
          </div>
          <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-6 border border-white/30">
            <User size={48} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold font-hindi">Edit User</h1>
          <p className="text-white/70 mt-2">Modify user permissions and details</p>
        </div>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error?.data?.message || error.error}</Message>
        ) : (
          <form onSubmit={submitHandler} className="p-8 md:p-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Name Field */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-2 flex items-center gap-1">
                  <User size={12} /> Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter name"
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-primary transition font-bold"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-2 flex items-center gap-1">
                  <Mail size={12} /> Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter email"
                  className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-primary transition font-bold"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Admin Privilege Toggle */}
            <div className={`p-8 rounded-[32px] border-2 transition-all cursor-pointer flex items-center justify-between group ${isAdmin ? 'border-primary bg-primary/5' : 'border-gray-100 bg-gray-50'}`}
                 onClick={() => setIsAdmin(!isAdmin)}>
              <div className="flex items-center gap-6">
                <div className={`p-5 rounded-2xl transition-all ${isAdmin ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'bg-white text-gray-400 shadow-sm'}`}>
                  <Shield size={32} />
                </div>
                <div>
                  <h3 className="font-black text-xl">Admin Access</h3>
                  <p className="text-sm text-gray-500 max-w-md">Admins can manage products, orders, categories, and other users.</p>
                </div>
              </div>
              <div className={`w-16 h-8 rounded-full relative transition-all duration-300 ${isAdmin ? 'bg-primary' : 'bg-gray-300'}`}>
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${isAdmin ? 'right-1' : 'left-1'}`}></div>
              </div>
            </div>

            {/* Block Status Toggle */}
            <div className={`p-8 rounded-[32px] border-2 transition-all cursor-pointer flex items-center justify-between group ${isBlocked ? 'border-red-500 bg-red-50' : 'border-gray-100 bg-gray-50'} ${isAdmin ? 'opacity-50 cursor-not-allowed' : ''}`}
                 onClick={() => !isAdmin && setIsBlocked(!isBlocked)}>
              <div className="flex items-center gap-6">
                <div className={`p-5 rounded-2xl transition-all ${isBlocked ? 'bg-red-500 text-white shadow-xl shadow-red-200' : 'bg-white text-gray-400 shadow-sm'}`}>
                  {isBlocked ? <Lock size={32} /> : <Unlock size={32} />}
                </div>
                <div>
                  <h3 className="font-black text-xl">Account Status</h3>
                  <p className="text-sm text-gray-500 max-w-md">Blocked users cannot log in or place orders.</p>
                </div>
              </div>
              <div className={`w-16 h-8 rounded-full relative transition-all duration-300 ${isBlocked ? 'bg-red-500' : 'bg-gray-300'}`}>
                <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${isBlocked ? 'right-1' : 'left-1'}`}></div>
              </div>
            </div>

            <div className="pt-8 flex justify-end">
              <button
                type="submit"
                disabled={loadingUpdate}
                className="village-button-primary px-12 py-5 flex items-center gap-3 shadow-2xl shadow-primary/30"
              >
                {loadingUpdate ? <Loader size={20} /> : <Save size={20} />}
                Update User Account
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UserEditScreen;
