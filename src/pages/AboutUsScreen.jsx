import { motion } from 'framer-motion';
import { Heart, Globe, Users, ShieldCheck } from 'lucide-react';
import Meta from '../components/Meta';

const AboutUsScreen = () => {
  return (
    <>
      <Meta 
        title="Our Story - Kitchen Bihar Ka" 
        description="Learn about our mission to bring the authentic taste of Bihar's heritage to your doorstep. We support local women artisans and preserve traditional recipes."
        keywords="about Kitchen Bihar Ka, Bihari food culture, traditional Bihari recipes, support local artisans Bihar, women empowerment Bihar, authentic Bihari taste"
      />
      <div className="space-y-24 pb-20">
        {/* Hero Section */}
        <section className="relative h-[350px] md:h-[500px] rounded-[40px] md:rounded-[60px] overflow-hidden">
          <img 
            src="/thekua.png" 
            alt="Traditional Bihari Culture" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-center">
            <div className="max-w-3xl px-6 space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-7xl font-bold text-white font-hindi"
              >
                Our Story <span className="block md:inline text-2xl md:text-6xl opacity-80">(हमारी कहानी)</span>
              </motion.h1>
              <p className="text-lg md:text-xl text-gray-200 font-light italic">
                "Bringing the authentic taste of Bihar's heritage to every doorstep in India."
              </p>
            </div>
          </div>
        </section>

        {/* Rest of the sections... */}
        {/* ... (keeping the rest the same) */}
        <section className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="space-y-8 order-2 lg:order-1">
            <div className="inline-block px-4 py-2 bg-village rounded-full text-primary font-black uppercase tracking-widest text-xs">
              Who We Are (हम कौन हैं)
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-hindi text-primary leading-tight">
              More than just food, <br className="hidden md:block" /> it's an emotion.
            </h2>
            <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
              <p>
                Kitchen Bihar Ka was born out of a simple longing—the longing for the authentic, unadulterated flavors of home. We realized that while Bihari cuisine is rich in variety and nutrition, it's often hard to find the genuine taste outside the village borders.
              </p>
              <p>
                Founded in 2024, our mission is to preserve the traditional recipes of our grandmothers and provide sustainable livelihoods to local artisans and women's self-help groups across Bihar.
              </p>
              <p>
                Every batch of Thekua, every jar of pickle, and every pack of Khaja is crafted with patience and love, using the finest ingredients sourced directly from local farmers.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-village">
              <div className="space-y-2">
                <h4 className="text-3xl md:text-4xl font-bold text-primary">50+</h4>
                <p className="text-gray-500 font-medium">Traditional Products</p>
              </div>
              <div className="space-y-2">
                <h4 className="text-3xl md:text-4xl font-bold text-primary">1000+</h4>
                <p className="text-gray-500 font-medium">Happy Families</p>
              </div>
            </div>
          </div>
          
          <div className="relative order-1 lg:order-2">
            <div className="aspect-[4/5] md:aspect-square rounded-[40px] md:rounded-[60px] overflow-hidden shadow-2xl">
              <img 
                src="/gujiya.png" 
                alt="Local Artisan" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 md:-bottom-10 md:-left-10 bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-village hidden sm:block max-w-[250px] md:max-w-xs">
              <Heart className="text-primary mb-4" size={32} />
              <p className="text-gray-600 italic text-sm md:text-base">"We ensure that every bite connects you directly to the soul of Bihar."</p>
            </div>
          </div>
        </section>

        {/* The Traditional Process */}
        <section className="container mx-auto px-6 space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold font-hindi text-primary">
              The Traditional Process <span className="block md:inline text-xl md:text-5xl opacity-80">(पारंपरिक प्रक्रिया)</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">How we maintain the authentic taste of home in every bite.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Sourcing Ingredients",
                desc: "We source our grains, jaggery, and spices directly from small-scale farmers in Bihar who follow natural farming practices."
              },
              {
                step: "02",
                title: "Handmade in Batches",
                desc: "Our products are not mass-produced in factories. Local women artisans craft each item in small batches to ensure consistency and taste."
              },
              {
                step: "03",
                title: "Sustainable Packaging",
                desc: "We use eco-friendly and food-grade packaging that keeps the products fresh while being kind to the environment."
              }
            ].map((item, idx) => (
              <div key={idx} className="relative p-10 bg-white rounded-[40px] shadow-sm border border-village/20 hover:shadow-xl transition-all">
                <span className="absolute top-6 right-8 text-6xl font-black text-village/40 font-sans italic">{item.step}</span>
                <h3 className="text-2xl font-bold font-hindi text-primary mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Core Values */}
        <section className="bg-village/30 rounded-[40px] md:rounded-[60px] p-8 md:p-24 space-y-12 md:space-y-16 mx-4 md:mx-0">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold font-hindi text-primary">
              Our Core Values <span className="block md:inline text-xl md:text-5xl opacity-80">(हमारे मुख्य मूल्य)</span>
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">The principles that guide every package we ship.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: <ShieldCheck size={32} />,
                title: "100% Purity",
                desc: "No preservatives, no artificial colors. Just pure, natural ingredients."
              },
              {
                icon: <Globe size={32} />,
                title: "Global Reach",
                desc: "Bringing local village flavors to Biharis living across the globe."
              },
              {
                icon: <Users size={32} />,
                title: "Empowerment",
                desc: "Supporting over 200 local women artisans in their craft."
              },
              {
                icon: <Heart size={32} />,
                title: "Authenticity",
                desc: "Every recipe is verified by the elders of the community."
              }
            ].map((value, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[40px] shadow-sm hover:shadow-xl transition-all group">
                <div className="w-16 h-16 bg-village rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold font-hindi mb-3">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-primary rounded-[40px] md:rounded-[60px] p-8 md:p-20 text-center text-white space-y-8 overflow-hidden relative mx-4 md:mx-0">
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl md:text-6xl font-bold font-hindi">Taste the Tradition Today</h2>
            <p className="text-gray-200 text-lg max-w-2xl mx-auto">
              Join us in our journey to celebrate the flavors of Bihar. Order now and experience the taste of home.
            </p>
            <button className="bg-secondary text-primary px-10 py-4 rounded-full font-black uppercase tracking-widest hover:bg-white transition-colors">
              Start Shopping
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full -ml-32 -mb-32"></div>
        </section>
      </div>
    </>
  );
};

export default AboutUsScreen;
