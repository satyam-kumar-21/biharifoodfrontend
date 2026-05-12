import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Header />
      <main className="min-h-[80vh] py-8">
        <div className="container mx-auto px-4">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
