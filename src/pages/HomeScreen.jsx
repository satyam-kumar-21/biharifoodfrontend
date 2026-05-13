import { useGetProductsQuery } from '../slices/productsApiSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Hero from '../components/Hero';
import { Link } from 'react-router-dom';

const HomeScreen = () => {
  const { data, isLoading, error } = useGetProductsQuery({});

  return (
    <div className="space-y-24 pb-20">
      <Hero />

      {/* Featured Products */}
      <section className="space-y-8 px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-bold font-hindi text-primary">Popular Products</h2>
            <p className="text-gray-600 italic">Our customer's favorite delicacies</p>
          </div>
          <button className="village-button-secondary py-2 px-6 text-sm">
            <Link to="/menu" className="text-lg font-bold hover:text-primary transition">View All →</Link>
          </button>
        </div>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error?.data?.message || error.error}</Message>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {data.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="bg-white rounded-[60px] p-12 md:p-20 shadow-sm border border-gray-100 mx-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          <div className="space-y-6">
            <div className="bg-village w-20 h-20 rounded-3xl flex items-center justify-center mx-auto text-primary rotate-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-hindi text-gray-800">100% Pure</h3>
              <p className="text-gray-500 leading-relaxed">Made with pure ingredients, without any artificial additives or adulteration.</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-village w-20 h-20 rounded-3xl flex items-center justify-center mx-auto text-primary -rotate-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-hindi text-gray-800">Fresh Delivery</h3>
              <p className="text-gray-500 leading-relaxed">Every item is prepared fresh on order and shipped directly from our kitchen.</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-village w-20 h-20 rounded-3xl flex items-center justify-center mx-auto text-primary rotate-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-hindi text-gray-800">Village Taste</h3>
              <p className="text-gray-500 leading-relaxed">Authentic recipes passed down through generations for that real Bihar flavor.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="px-4">
        <Testimonials />
      </div>

      <div className="px-4">
        <FAQ />
      </div>
    </div>
  );
};

export default HomeScreen;
