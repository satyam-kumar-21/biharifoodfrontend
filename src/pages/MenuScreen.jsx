import { useState } from 'react';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { motion, AnimatePresence } from 'framer-motion';
import Meta from '../components/Meta';

const MenuScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const { data, isLoading, error } = useGetProductsQuery({
    category: selectedCategory === 'All' ? '' : selectedCategory
  });

  const categories = ['All', 'Snacks', 'Sweets'];

  return (
    <div className="space-y-12 pt-12 pb-8 min-h-screen">
      <Meta 
        title="Our Menu - Traditional Bihari Snacks & Sweets | Kitchen Bihar Ka" 
        description="Browse our delicious collection of Bihari delicacies. From sweet Thekua and Khaja to savory Nimki and Sattu items, explore the best of Bihar's authentic flavors."
        keywords="Bihari snacks menu, order Thekua online, Bihari sweets list, Khaja price, Nimki snacks, authentic Bihari food delivery, Bihar sweets shop online"
        url="https://kitchenbiharka.com/menu"
        image="/thekua.png"
      />
      {/* Header */}
      <div className="text-center space-y-6">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold font-hindi text-primary"
        >
          Our Delicious Menu <span className="block md:inline text-2xl md:text-5xl opacity-80">(हमारा स्वादिष्ट मेनू)</span>
        </motion.h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Explore the authentic flavors of Bihar. From sweet Thekua to savory snacks, we bring the best of Bihari tradition to your plate.
        </p>

        {/* Category Tabs */}
        <div className="flex justify-center pt-4">
          <div className="inline-flex bg-village p-1.5 rounded-[2rem] shadow-inner border border-village-dark/10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-8 py-3 rounded-[1.8rem] text-sm md:text-base font-bold transition-all duration-300 ${
                  selectedCategory === cat 
                  ? 'bg-primary text-white shadow-lg scale-105' 
                  : 'text-primary/60 hover:text-primary hover:bg-white/50'
                }`}
              >
                {cat === 'All' ? 'All Items' : cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="relative">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader />
          </div>
        ) : error ? (
          <Message variant='danger'>{error?.data?.message || error.error}</Message>
        ) : (
          <>
            {data.products.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20 space-y-4"
              >
                <div className="text-6xl text-gray-200">🍽️</div>
                <h3 className="text-xl font-bold text-gray-400">No items found in this category yet.</h3>
              </motion.div>
            ) : (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              >
                <AnimatePresence mode='popLayout'>
                  {data.products.map((product) => (
                    <motion.div
                      key={product._id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MenuScreen;
