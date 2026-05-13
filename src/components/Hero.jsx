import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-white rounded-[60px] overflow-hidden shadow-sm border border-gray-100 min-h-[600px] flex flex-col lg:flex-row items-center">
      {/* Left Content */}
      <div className="w-full lg:w-1/2 p-8 lg:p-20 space-y-8 text-center lg:text-left order-2 lg:order-1">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-block px-4 py-1.5 bg-village text-primary font-black uppercase tracking-[0.2em] text-xs rounded-full"
          >
            Authentic Bihari Heritage
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl lg:text-6xl font-black text-gray-900 font-hindi leading-tight"
          >
            बिहार का <span className="text-primary">असली स्वाद</span>, <br />
            अब आपके घर तक।
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-xl text-gray-500 font-light leading-relaxed max-w-xl mx-auto lg:mx-0"
        >
          ठेकुआ, खाजा, तिलकुट और बहुत कुछ... <br />
          शुद्ध देसी घी और परंपरा के साथ सीधे गांव से आपके द्वार।
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
        >
          <Link to="/menu" className="village-button-secondary py-5 px-12 text-lg shadow-2xl hover:scale-105 transition-transform flex items-center justify-center gap-2">
            अभी आर्डर करें <ArrowRight size={20} />
          </Link>
          <Link to="/about-us" className="px-12 py-5 rounded-full border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all flex items-center justify-center">
            About Us
          </Link>
        </motion.div>
      </div>

      {/* Right Image Album - Creative Masonry */}
      <div className="w-full lg:w-1/2 min-h-[400px] sm:min-h-[500px] lg:h-[750px] p-4 sm:p-6 lg:p-12 order-1 lg:order-2 bg-village/20">
        <div className="relative h-full w-full min-h-[350px]">
          {/* Main Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute top-0 left-0 w-[70%] lg:w-[65%] h-[65%] lg:h-[70%] rounded-[30px] sm:rounded-[50px] overflow-hidden shadow-2xl z-20 border-4 sm:border-8 border-white"
          >
            <img src="/thekua.png" alt="Bihari Thekua" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
          </motion.div>

          {/* Secondary Image - Bottom Right */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="absolute bottom-2 sm:bottom-4 right-0 w-[65%] lg:w-[60%] h-[55%] lg:h-[50%] rounded-[30px] sm:rounded-[50px] overflow-hidden shadow-xl z-10 border-4 sm:border-8 border-white"
          >
            <img src="/nimki.png" alt="Bihari Nimki" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
          </motion.div>

          {/* Small Decorative Image - Top Right */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="absolute top-4 sm:top-10 right-2 sm:right-4 w-[40%] lg:w-[35%] h-[35%] lg:h-[30%] rounded-[25px] sm:rounded-[40px] overflow-hidden shadow-lg z-30 border-2 sm:border-4 border-white"
          >
            <img src="/gujiya.png" alt="Bihari Gujiya" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
          </motion.div>

          {/* Badge Decor */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.7 }}
            className="absolute bottom-[30%] sm:bottom-[35%] left-[0%] sm:left-[5%] z-40 bg-secondary text-primary w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-center p-2 shadow-xl border-2 sm:border-4 border-white rotate-12"
          >
            <span className="text-[10px] sm:text-xs font-black uppercase leading-tight">Handmade with Love</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
