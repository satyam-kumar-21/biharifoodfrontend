import { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Loader from './components/Loader';

const App = () => {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <ScrollToTop />
      {!isAdminPath && <Header />}
      <main className={`${isAdminPath ? 'min-h-screen' : 'min-h-[80vh]'} ${['/', '/about-us', '/contact'].includes(location.pathname) ? 'pb-8' : 'py-8'}`}>
        <div className={isAdminPath ? '' : 'container mx-auto px-4'}>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </main>
      {!isAdminPath && <Footer />}
    </>
  );
};

export default App;
