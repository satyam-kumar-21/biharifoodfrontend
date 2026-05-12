import { useGetProductsQuery } from '../slices/productsApiSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { motion } from 'framer-motion';

const MenuScreen = () => {
  const { data, isLoading, error } = useGetProductsQuery({});

  return (
    <div className="space-y-12 py-8">
      <div className="text-center space-y-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold font-hindi text-primary"
        >
          Our Menu
        </motion.h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore the authentic flavors of Bihar. From sweet Thekua to savory snacks, we bring the best of Bihari tradition to your plate.
        </p>
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
    </div>
  );
};

export default MenuScreen;
