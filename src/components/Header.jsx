import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import { resetCart } from '../slices/cartSlice';
import { ShoppingCart, User, Menu, X, ChevronDown, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { useGetSettingsQuery } from '../slices/settingsApiSlice';

const Header = () => {
  const { data: settings } = useGetSettingsQuery();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth) || {};

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      dispatch(resetCart());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  const whatsappPhone = settings?.phone?.replace(/\D/g, '') || '919876543210';
  const whatsappMsg = encodeURIComponent('Hi! I want to place an order from Bihar wala taste. Please help me.');
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${whatsappMsg}`;

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary text-white relative z-40">
        <div className="container mx-auto px-4 py-1.5 flex flex-col sm:flex-row items-center justify-between gap-1">
          <span className="text-[10px] md:text-xs font-black uppercase tracking-[0.15em] text-center sm:text-left">
            ✨ Free Shipping on orders above ₹999 | COD Available ✨
          </span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-green-500 hover:bg-green-400 transition-colors text-white text-[10px] md:text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full whitespace-nowrap"
          >
            <MessageCircle size={12} className="shrink-0" />
            Order on WhatsApp
          </a>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-white shadow-md">
        <nav className="container mx-auto px-4 py-2 md:py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            {settings?.logo ? (
              <img src={settings.logo} alt="Logo" className="h-12 md:h-16 w-auto object-contain" />
            ) : (
              <img
                src="/biharwalatastelogo.webp"
                alt="Bihar wala taste Logo"
                width="160"
                height="80"
                className="h-12 md:h-20 w-auto object-contain hover:scale-105 transition-transform"
              />
            )}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            <Link to="/" className="text-lg font-bold hover:text-primary transition">Home</Link>
            <Link to="/menu" className="text-lg font-bold hover:text-primary transition">Menu</Link>
            <Link to="/blogs" className="text-lg font-bold hover:text-primary transition">Blogs</Link>
            <Link to="/about-us" className="text-lg font-bold hover:text-primary transition">About</Link>
            <Link to="/contact" className="text-lg font-bold hover:text-primary transition">Contact</Link>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-primary transition">
              <ShoppingCart size={24} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-secondary text-primary text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              )}
            </Link>

            {userInfo ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-1 p-2 text-gray-700 hover:text-primary transition"
                >
                  <User size={24} />
                  <span className="hidden md:inline max-w-[150px] truncate font-bold text-primary">Hi, {userInfo.name.split(' ')[0]}</span>
                  <ChevronDown size={16} />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-lg shadow-xl py-2 z-50"
                    >
                      <Link
                        to="/profile"
                        className="block px-4 py-2 hover:bg-gray-50 transition"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Profile
                      </Link>
                      <Link
                        to="/myorders"
                        className="block px-4 py-2 hover:bg-gray-50 transition"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        My Orders
                      </Link>
                      {userInfo.isAdmin && (
                        <>
                          <div className="border-t border-gray-100 my-1"></div>
                          <Link
                            to="/admin/dashboard"
                            className="block px-4 py-2 font-bold text-primary hover:bg-gray-50 transition"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            Admin Dashboard
                          </Link>
                        </>
                      )}
                      <div className="border-t border-gray-100 my-1"></div>
                      <button
                        onClick={logoutHandler}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 transition"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-primary text-white px-5 py-2 rounded-full font-medium hover:bg-primary-dark transition"
              >
                Login
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 w-full bg-white z-40 flex flex-col p-6 gap-6 md:hidden overflow-hidden border-t border-gray-100 shadow-xl"
            >
              <Link
                to="/"
                className="text-2xl font-hindi font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/menu"
                className="text-2xl font-hindi font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                Menu
              </Link>
              <Link
                to="/blogs"
                className="text-2xl font-hindi font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/about-us"
                className="text-2xl font-hindi font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-2xl font-hindi font-bold"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              {userInfo && (
                <>
                  <div className="border-t border-gray-100 my-2"></div>
                  <Link
                    to="/profile"
                    className="text-2xl font-hindi font-bold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to="/myorders"
                    className="text-2xl font-hindi font-bold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                </>
              )}
              {userInfo?.isAdmin && (
                <Link
                  to="/admin/dashboard"
                  className="text-2xl font-hindi font-bold text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Dashboard
                </Link>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;

