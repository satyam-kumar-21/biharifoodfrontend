import { motion } from 'framer-motion';
import { Heart, Globe, Users, ShieldCheck } from 'lucide-react';

const AboutUsScreen = () => {
  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative h-[400px] md:h-[500px] rounded-[60px] overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2000&auto=format&fit=crop" 
          alt="Traditional Bihari Culture" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center">
          <div className="max-w-3xl px-6 space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold text-white font-hindi"
            >
              Our Story, Your Tradition
            </motion.h1>
            <p className="text-xl text-gray-200 font-light italic">
              "Bringing the authentic taste of Bihar's heritage to every doorstep in India."
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-block px-4 py-2 bg-village rounded-full text-primary font-black uppercase tracking-widest text-xs">
            Who We Are
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-hindi text-primary leading-tight">
            More than just food, it's an emotion.
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Swad Bihar Ka was born out of a simple longing—the longing for the authentic, unadulterated flavors of home. We realized that while Bihari cuisine is rich in variety and nutrition, it's often hard to find the genuine taste outside the village borders.
          </p>
          <p className="text-gray-600 text-lg leading-relaxed">
            Founded in 2024, our mission is to preserve the traditional recipes of our grandmothers and provide sustainable livelihoods to local artisans and women's self-help groups across Bihar.
          </p>
          
          <div className="grid grid-cols-2 gap-8 pt-6">
            <div className="space-y-2">
              <h4 className="text-3xl font-bold text-primary">50+</h4>
              <p className="text-gray-400 text-sm">Traditional Products</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-3xl font-bold text-primary">1000+</h4>
              <p className="text-gray-400 text-sm">Happy Families</p>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="aspect-square rounded-[60px] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1566454825481-4e48f80aa4d7?q=80&w=1000&auto=format&fit=crop" 
              alt="Local Artisan" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-xl border border-village hidden md:block max-w-xs">
            <Heart className="text-primary mb-4" size={32} />
            <p className="text-gray-600 italic">"We ensure that every bite connects you directly to the soul of Bihar."</p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-village/30 rounded-[60px] p-12 md:p-24 space-y-16">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold font-hindi text-primary">Our Core Values</h2>
          <p className="text-gray-600 max-w-xl mx-auto">The principles that guide every package we ship.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
      <section className="bg-primary rounded-[60px] p-12 md:p-20 text-center text-white space-y-8 overflow-hidden relative">
        <div className="relative z-10 space-y-6">
          <h2 className="text-4xl md:text-6xl font-bold font-hindi">Taste the Tradition Today</h2>
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
  );
};

export default AboutUsScreen;
