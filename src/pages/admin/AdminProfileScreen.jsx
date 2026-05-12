import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useProfileMutation } from '../../slices/usersApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { toast } from 'react-hot-toast';
import Loader from '../../components/Loader';
import { 
  User, 
  Mail, 
  ShieldCheck, 
  Save, 
  Key,
  Briefcase,
  Calendar,
  Settings as SettingsIcon
} from 'lucide-react';

const AdminProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();

  const dispatch = useDispatch();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);

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
        toast.success('Admin profile updated successfully');
        setPassword('');
        setConfirmPassword('');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-primary text-white rounded-2xl shadow-lg shadow-primary/20">
          <ShieldCheck size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold font-hindi">Administrative Profile</h1>
          <p className="text-gray-500 text-sm">Manage your administrator account and credentials</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Admin Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 overflow-hidden text-center p-10 relative">
            <div className="absolute top-0 left-0 w-full h-24 bg-primary opacity-5"></div>
            <div className="relative">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-white shadow-lg">
                <User size={48} className="text-primary" />
              </div>
              <h2 className="text-2xl font-bold">{userInfo.name}</h2>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className="bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-primary/20">
                  System Administrator
                </span>
              </div>
            </div>

            <div className="mt-10 space-y-4 text-left">
              <div className="flex items-center gap-4 p-4 bg-village/50 rounded-2xl border border-gray-50">
                <Mail className="text-primary" size={20} />
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Email Address</p>
                  <p className="font-bold text-sm truncate">{userInfo.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-village/50 rounded-2xl border border-gray-50">
                <Briefcase className="text-primary" size={20} />
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Role</p>
                  <p className="font-bold text-sm">Full Access Admin</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-village/50 rounded-2xl border border-gray-50">
                <Calendar className="text-primary" size={20} />
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase">Last Login</p>
                  <p className="font-bold text-sm">{new Date().toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[40px] shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-8 border-b border-gray-50 flex items-center gap-3">
              <SettingsIcon size={20} className="text-gray-400" />
              <h3 className="font-bold text-lg">Account Configuration</h3>
            </div>
            
            <form onSubmit={submitHandler} className="p-8 md:p-12 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-2 flex items-center gap-1">
                    <User size={12} /> Administrator Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-primary transition font-bold"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-2 flex items-center gap-1">
                    <Mail size={12} /> Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-primary transition font-bold"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-50">
                <h4 className="flex items-center gap-2 font-bold text-gray-700">
                  <Key size={18} className="text-primary" /> Security Update
                </h4>
                <p className="text-xs text-gray-500 italic">Leave password fields empty to keep your current password.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-2">New Password</label>
                    <input
                      type="password"
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-primary transition font-bold"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 px-2">Confirm New Password</label>
                    <input
                      type="password"
                      className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-primary transition font-bold"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="pt-8 flex justify-end">
                <button
                  type="submit"
                  disabled={loadingUpdateProfile}
                  className="village-button-primary px-12 py-5 flex items-center gap-3 shadow-2xl shadow-primary/30"
                >
                  {loadingUpdateProfile ? <Loader size={20} /> : <Save size={20} />}
                  Update Administrative Account
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfileScreen;
