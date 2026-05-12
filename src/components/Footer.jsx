import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

import { useGetSettingsQuery } from '../slices/settingsApiSlice';

const Footer = () => {
  const { data: settings } = useGetSettingsQuery();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand Section */}
        <div className="space-y-6">
          {settings?.logo ? (
            <img src={settings.logo} alt="Logo" className="h-12 w-auto object-contain brightness-0 invert" />
          ) : (
            <Link to="/" className="text-3xl font-bold font-hindi text-secondary">Swaad Bihar Ka</Link>
          )}
          <p className="text-gray-200 leading-relaxed">
            An effort to bring the traditional taste and culture of Bihar to your doorstep. Pure, authentic, and traditional.
          </p>
          <div className="flex gap-4">
            <a href="#" className="bg-primary-dark p-2 rounded-full hover:bg-secondary hover:text-primary transition">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="bg-primary-dark p-2 rounded-full hover:bg-secondary hover:text-primary transition">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="bg-primary-dark p-2 rounded-full hover:bg-secondary hover:text-primary transition">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="bg-primary-dark p-2 rounded-full hover:bg-secondary hover:text-primary transition">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>
        
        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-bold mb-6 font-hindi">Quick Links</h4>
          <ul className="space-y-4 text-gray-200">
            <li><Link to="/" className="hover:text-secondary transition">Home</Link></li>
            <li><Link to="/menu" className="hover:text-secondary transition">Menu</Link></li>
            <li><Link to="/story" className="hover:text-secondary transition">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-secondary transition">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-secondary transition">FAQ</Link></li>
          </ul>
        </div>

        {/* Policies */}
        <div>
          <h4 className="text-xl font-bold mb-6 font-hindi">Policies</h4>
          <ul className="space-y-4 text-gray-200">
            <li><Link to="/privacy" className="hover:text-secondary transition">Privacy Policy</Link></li>
            <li><Link to="/shipping-policy" className="hover:text-secondary transition">Shipping Policy</Link></li>
            <li><Link to="/track-order" className="hover:text-secondary transition">Track Order</Link></li>
            <li><Link to="/returns" className="hover:text-secondary transition">Return Policy</Link></li>
            <li><Link to="/terms" className="hover:text-secondary transition">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h4 className="text-xl font-bold mb-6 font-hindi">Contact Details</h4>
          <div className="flex items-start gap-3">
            <MapPin className="text-secondary shrink-0" />
            <p>{settings?.address || 'Bihar, India'}</p>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="text-secondary shrink-0" />
            <p>{settings?.phone || '+91 0000000000'}</p>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="text-secondary shrink-0" />
            <p>{settings?.email || 'contact@swadbiharka.com'}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-light mt-16 pt-8 text-center text-gray-300">
        <p>© {currentYear} Swaad Bihar Ka. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
