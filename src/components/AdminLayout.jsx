import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  ClipboardList, 
  Grid, 
  Settings,
  ChevronRight,
  Menu,
  X,
  User as UserIcon,
  MessageSquare,
  Mail
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    if (window.confirm('Are you sure you want to logout?')) {
      try {
        await logoutApiCall().unwrap();
        dispatch(logout());
        navigate('/login');
        toast.success('Logged out successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
    { name: 'Products', icon: <ShoppingBag size={20} />, path: '/admin/productlist' },
    { name: 'Categories', icon: <Grid size={20} />, path: '/admin/categorylist' },
    { name: 'Reviews', icon: <MessageSquare size={20} />, path: '/admin/reviewlist' },
    { name: 'Orders', icon: <ClipboardList size={20} />, path: '/admin/orderlist' },
    { name: 'Contacts', icon: <Mail size={20} />, path: '/admin/contactlist' },
    { name: 'Users', icon: <Users size={20} />, path: '/admin/userlist' },
  ];

  return (
    <div className="flex min-h-screen bg-village/30">
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(true)}
            className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside 
        className={`fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-100 transition-all duration-300 z-50 ${
          isSidebarOpen ? 'w-64' : 'w-20'
        } ${!isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex flex-col h-full py-4">
          {/* Logo/Toggle Area */}
          <div className="px-6 py-4 flex items-center justify-between border-b border-gray-50">
            <h2 className={`font-black text-primary text-2xl tracking-tight transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
              Bihar <span className="text-secondary">Food</span>
            </h2>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-village rounded-xl transition text-primary"
            >
              {isSidebarOpen ? <X size={20} className="lg:hidden" /> : <Menu size={20} />}
              <span className="hidden lg:block">{isSidebarOpen ? <X size={20} /> : <Menu size={20} />}</span>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-8 space-y-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 p-4 rounded-3xl transition-all duration-300 group ${
                  location.pathname === item.path 
                    ? 'bg-primary text-white shadow-2xl shadow-primary/30 scale-[1.02]' 
                    : 'text-gray-500 hover:bg-village hover:scale-[1.01]'
                }`}
              >
                <div className={`${location.pathname === item.path ? 'text-white' : 'text-primary'}`}>
                  {item.icon}
                </div>
                <span className={`font-bold transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                  {item.name}
                </span>
                {isSidebarOpen && location.pathname === item.path && (
                  <ChevronRight size={16} className="ml-auto animate-pulse" />
                )}
              </Link>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="px-4 py-6 border-t border-gray-50 space-y-3">
            <Link
              to="/admin/profile"
              className={`flex items-center gap-4 p-4 rounded-3xl text-gray-500 hover:bg-village transition-all ${
                location.pathname === '/admin/profile' ? 'bg-village text-primary font-bold' : ''
              } ${!isSidebarOpen && 'justify-center'}`}
            >
              <UserIcon size={20} className="text-primary" />
              <span className={`font-bold ${!isSidebarOpen && 'hidden'}`}>Admin Profile</span>
            </Link>
            <Link
              to="/admin/settings"
              className={`flex items-center gap-4 p-4 rounded-3xl text-gray-500 hover:bg-village transition-all ${
                location.pathname === '/admin/settings' ? 'bg-village text-primary font-bold' : ''
              } ${!isSidebarOpen && 'justify-center'}`}
            >
              <Settings size={20} className="text-primary" />
              <span className={`font-bold ${!isSidebarOpen && 'hidden'}`}>Settings</span>
            </Link>
            <button
              onClick={logoutHandler}
              className={`w-full flex items-center gap-4 p-4 rounded-3xl text-red-500 hover:bg-red-50 transition-all ${!isSidebarOpen && 'justify-center'}`}
            >
              <X size={20} />
              <span className={`font-bold ${!isSidebarOpen && 'hidden'}`}>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 lg:p-10 overflow-x-hidden">
        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between mb-10">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-4 bg-white shadow-xl rounded-[24px] border border-gray-50 text-primary"
          >
            <Menu size={24} />
          </button>
          <h2 className="font-black text-2xl tracking-tight">Bihar <span className="text-secondary">Food</span></h2>
          <div className="w-12 h-12 rounded-[20px] bg-primary/10 flex items-center justify-center">
            <UserIcon size={24} className="text-primary" />
          </div>
        </div>

        <div className="w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
