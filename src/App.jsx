import { useEffect, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetSettingsQuery } from './slices/settingsApiSlice';
import { setCartSettings } from './slices/cartSlice';
import { Toaster } from 'react-hot-toast';
import { LazyMotion } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/Loader';

const loadFeatures = () => import('./motion-features.js').then(res => res.default);

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isAdminPath = location.pathname.startsWith('/admin');

  const { data: settings } = useGetSettingsQuery();

  useEffect(() => {
    if (settings) {
      dispatch(setCartSettings({
        freeShippingThreshold: settings.freeShippingThreshold || 500,
        shippingPrice: 0 // Default fallback
      }));
    }
  }, [settings, dispatch]);

  return (
    <LazyMotion features={loadFeatures}>
      <div className="initial-load">
        <Toaster position="top-center" reverseOrder={false} />
        <ScrollToTop />
        {!isAdminPath && <Header />}
        <main className={`overflow-x-hidden ${isAdminPath ? 'min-h-screen' : 'min-h-[80vh]'} ${['/', '/about-us', '/contact'].includes(location.pathname) ? 'pb-8' : 'py-8'}`}>
          <div className={isAdminPath ? '' : 'container mx-auto px-4'}>
            <Suspense fallback={<Loader />}>
              <Outlet />
            </Suspense>
          </div>
        </main>
        {!isAdminPath && <Footer />}
      </div>
    </LazyMotion>
  );
};

export default App;
