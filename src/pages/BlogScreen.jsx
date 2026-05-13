import { Link } from 'react-router-dom';
import { blogData } from '../data/blogData';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Meta from '../components/Meta';

const BlogScreen = () => {
  return (
    <div className="space-y-12 pb-20">
      <Meta 
        title="Bihari Food Blog - Kitchen Bihar Ka" 
        description="Read about the rich culinary heritage of Bihar. From recipes to history, explore the world of authentic Bihari food through our blog."
        keywords="Bihari food blog, Thekua recipe, Litti Chokha history, Sattu benefits, Bihari food culture, traditional Indian recipes"
      />
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold font-hindi text-primary">Our Stories & Traditions</h1>
        <p className="text-gray-600">Explore the rich heritage, health benefits, and secret recipes of authentic Bihari cuisine.</p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {blogData.map((blog, index) => (
          <motion.div 
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-gray-100 group hover:shadow-xl transition-all duration-500"
          >
            <Link to={`/blog/${blog.id}`} className="block relative h-64 overflow-hidden">
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
            </Link>
            
            <div className="p-8 space-y-4">
              <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-primary/60">
                <div className="flex items-center gap-1">
                  <Calendar size={12} />
                  <span>{blog.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User size={12} />
                  <span>{blog.author}</span>
                </div>
              </div>
              
              <Link to={`/blog/${blog.id}`}>
                <h2 className="text-2xl font-bold font-hindi group-hover:text-primary transition-colors leading-tight">
                  {blog.title}
                </h2>
              </Link>
              
              <p className="text-gray-500 line-clamp-3 text-sm leading-relaxed">
                {blog.brief}
              </p>
              
              <Link 
                to={`/blog/${blog.id}`} 
                className="inline-flex items-center gap-2 text-primary font-black uppercase tracking-widest text-xs hover:gap-4 transition-all"
              >
                Read More <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BlogScreen;
