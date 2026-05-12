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
  X
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/admin/dashboard' },
    { name: 'Products', icon: <ShoppingBag size={20} />, path: '/admin/productlist' },
    { name: 'Categories', icon: <Grid size={20} />, path: '/admin/categorylist' },
    { name: 'Orders', icon: <ClipboardList size={20} />, path: '/admin/orderlist' },
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
        <div className="flex flex-col h-full">
          {/* Logo/Toggle Area */}
          <div className="p-6 flex items-center justify-between">
            <h2 className={`font-bold text-primary text-xl transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
              Admin Panel
            </h2>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-village rounded-xl transition"
            >
              {isSidebarOpen ? <X size={20} className="lg:hidden" /> : <Menu size={20} />}
              <span className="hidden lg:block">{isSidebarOpen ? <X size={20} /> : <Menu size={20} />}</span>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2 mt-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 p-3 rounded-2xl transition group ${
                  location.pathname === item.path 
                    ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                    : 'text-gray-500 hover:bg-village'
                }`}
              >
                <div className={`${location.pathname === item.path ? 'text-white' : 'text-primary'}`}>
                  {item.icon}
                </div>
                <span className={`font-medium transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 hidden'}`}>
                  {item.name}
                </span>
                {isSidebarOpen && location.pathname === item.path && (
                  <ChevronRight size={16} className="ml-auto" />
                )}
              </Link>
            ))}
          </nav>

          {/* Settings/Footer */}
          <div className="p-4 border-t border-gray-50">
            <Link
              to="/admin/settings"
              className={`flex items-center gap-4 p-3 rounded-2xl text-gray-500 hover:bg-village transition ${!isSidebarOpen && 'justify-center'}`}
            >
              <Settings size={20} />
              <span className={`font-medium ${!isSidebarOpen && 'hidden'}`}>Settings</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-x-hidden">
        {/* Mobile Header (only visible when sidebar is collapsed/on mobile) */}
        <div className="lg:hidden flex items-center justify-between mb-8">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-3 bg-white shadow-sm rounded-2xl border border-gray-100"
          >
            <Menu size={24} />
          </button>
          <h2 className="font-bold text-xl">Admin</h2>
          <div className="w-12 h-12 rounded-full bg-primary/10" />
        </div>

        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
