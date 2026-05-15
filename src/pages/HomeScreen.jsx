import { Link } from 'react-router-dom';
import { Heart, Truck, Users } from 'lucide-react';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Hero from '../components/Hero';
import Meta from '../components/Meta';

const HomeScreen = () => {
  const { data, isLoading, error } = useGetProductsQuery({});

  return (
    <>
      <Meta />
      <div className="space-y-24 pb-20">
        <Hero />

      {/* Featured Products */}
      <section className="space-y-8 px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <h2 className="text-3xl md:text-5xl font-bold font-hindi text-primary">Popular Products</h2>
            <p className="text-gray-600 italic">Our customer's favorite delicacies</p>
          </div>
          <Link to="/menu" className="village-button-secondary py-2 px-6 text-lg font-bold hover:text-primary transition inline-block">
            View All →
          </Link>
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

      {/* Heritage Section */}
      <section className="relative overflow-hidden bg-village-dark/5 py-24 mx-4 rounded-[60px]">
        <div className="container mx-auto px-8 lg:px-20">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs font-black uppercase tracking-[0.2em]">
                Heritage & Tradition
              </div>
              <h2 className="text-4xl md:text-6xl font-bold font-hindi text-primary leading-tight">
                A Taste of Bihar's <br /> <span className="text-accent">Rich History</span>
              </h2>
              <div className="space-y-6 text-gray-700 leading-relaxed text-lg italic font-medium opacity-90">
                <p>
                  Bihar is not just a place; it's a legacy of flavors that have survived centuries. From the ancient kitchens of Magadh to the vibrant streets of modern Patna, the <strong>best Bihari food</strong> has always been about purity and patience.
                </p>
                <p>
                  Our <strong>traditional Bihari snacks</strong> like the crunchy <strong>Thekua</strong>, savory <strong>Nimki</strong>, and the winter-special <strong>Tilkut</strong> are more than just food—they are stories of our grandmother's love. We preserve this <strong>history of Bihar</strong> by using stone-ground flour and organic jaggery, just as it was done in the villages.
                </p>
                <p>
                  Whether it's the legendary <strong>Deoghar Peda</strong> or the crispy <strong>Khaja from Silao</strong>, we bring you the authentic taste that defines the true essence of Bihar.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link to="/about-us" className="village-button-primary">Learn Our Story</Link>
                <Link to="/menu" className="village-button-secondary">Explore Menu</Link>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative group">
              <div className="absolute inset-0 bg-primary/10 rounded-[40px] rotate-3 group-hover:rotate-1 transition-transform"></div>
              <img 
                src="/heritage-collage.png" 
                alt="Bihari Food Heritage" 
                loading="lazy"
                decoding="async"
                width="800"
                height="500"
                className="relative rounded-[40px] shadow-2xl -rotate-2 group-hover:rotate-0 transition-transform duration-500 w-full h-[250px] sm:h-[350px] md:h-[500px] object-cover"
              />
              {/* Floating badges */}
              <div className="absolute -top-6 -right-6 bg-white p-6 rounded-full shadow-xl border border-village hidden md:block animate-bounce">
                <span className="text-2xl">🍯</span>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white px-6 py-3 rounded-2xl shadow-xl border border-village hidden md:block">
                <p className="text-primary font-black text-sm uppercase tracking-widest">100% Authentic</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-white rounded-[60px] p-12 md:p-24 shadow-sm border border-gray-100 mx-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold font-hindi text-primary">The Village Promise</h2>
          <p className="text-gray-500 max-w-2xl mx-auto italic">Why thousands of families across India trust Bihar wala taste for their traditional delicacies.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
          <div className="space-y-6 group">
            <div className="bg-village w-24 h-24 rounded-[32px] flex items-center justify-center mx-auto text-primary rotate-3 group-hover:rotate-6 transition-transform shadow-sm">
              <Heart size={48} />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold font-hindi text-gray-800">100% Pure</h3>
              <p className="text-gray-600 leading-relaxed text-sm">Made with stone-ground flour and organic jaggery. No preservatives, ever.</p>
            </div>
          </div>
          <div className="space-y-6 group">
            <div className="bg-village w-24 h-24 rounded-[32px] flex items-center justify-center mx-auto text-primary -rotate-3 group-hover:-rotate-6 transition-transform shadow-sm">
              <Truck size={48} />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold font-hindi text-gray-800">Freshly Made</h3>
              <p className="text-gray-500 leading-relaxed text-sm">Every batch is prepared only after you order, ensuring the crunch remains intact.</p>
            </div>
          </div>
          <div className="space-y-6 group">
            <div className="bg-village w-24 h-24 rounded-[32px] flex items-center justify-center mx-auto text-primary rotate-6 group-hover:rotate-12 transition-transform shadow-sm">
              <Users size={48} />
            </div>
            <div className="space-y-3">
              <h3 className="text-2xl font-bold font-hindi text-gray-800">Women Led</h3>
              <p className="text-gray-500 leading-relaxed text-sm">Supporting over 50+ local women artisans in Bihar, preserving heritage.</p>
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

      {/* Newsletter Section */}
      <section className="bg-primary rounded-[40px] md:rounded-[60px] p-8 md:p-24 text-center text-white space-y-10 overflow-hidden relative mx-4 mb-20 shadow-2xl">
        <div className="relative z-10 space-y-6 max-w-4xl mx-auto">
          <div className="inline-block px-4 py-2 bg-white/10 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-4">
            Join the Village Club
          </div>
          <h2 className="text-3xl md:text-7xl font-bold font-hindi leading-tight">
            Get the Taste of Home <br /> <span className="text-secondary">Delivered to You</span>
          </h2>
          <p className="text-gray-200 text-base md:text-xl max-w-2xl mx-auto font-light">
            Subscribe to get exclusive discounts, new product launches, and stories from the heart of Bihar.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto pt-4 md:pt-8">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              aria-label="Email address for newsletter"
              className="flex-grow p-4 md:p-5 rounded-2xl md:rounded-3xl bg-white/10 border border-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:bg-white/20 transition-all font-bold"
            />
            <button className="bg-secondary text-primary px-8 md:px-10 py-4 md:py-5 rounded-2xl md:rounded-3xl font-black uppercase tracking-widest hover:bg-white transition-all shadow-xl">
              Subscribe
            </button>
          </form>
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">No spam. Only authentic sweetness.</p>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full -ml-48 -mb-48 blur-3xl"></div>
      </section>
      </div>
    </>
  );
};

export default HomeScreen;

