import { useGetProductsQuery } from '../slices/productsApiSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { motion } from 'framer-motion';

const HomeScreen = () => {
  const { data, isLoading, error } = useGetProductsQuery({});

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
        <img 
          src="https://res.cloudinary.com/demo/image/upload/v1652345678/sample.jpg" // Placeholder for beautiful Bihari food hero
          alt="Bihar Food" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
          <div className="container mx-auto px-8 space-y-6 max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white font-hindi leading-tight"
            >
              The Real Taste of Bihar <br /> 
              <span className="text-secondary">Now Across India</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-200"
            >
              Thekua, Khaja, Tilkut and more... Made traditionally, directly from the village to your home.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <button className="village-button-secondary">Shop Now</button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-bold font-hindi">Popular Products</h2>
            <p className="text-gray-600">Our customer's favorite delicacies</p>
          </div>
          <button className="text-primary font-bold hover:underline">View All →</button>
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
      <section className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <div className="bg-village w-16 h-16 rounded-full flex items-center justify-center mx-auto text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold font-hindi">100% Pure</h3>
            <p className="text-gray-600">Made with pure ingredients, without any adulteration.</p>
          </div>
          <div className="space-y-4">
            <div className="bg-village w-16 h-16 rounded-full flex items-center justify-center mx-auto text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold font-hindi">Fresh Delivery</h3>
            <p className="text-gray-600">Made fresh and shipped as soon as the order is received.</p>
          </div>
          <div className="space-y-4">
            <div className="bg-village w-16 h-16 rounded-full flex items-center justify-center mx-auto text-primary">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <h3 className="text-xl font-bold font-hindi">Village Taste</h3>
            <p className="text-gray-600">Made in the traditional Bihari way.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
