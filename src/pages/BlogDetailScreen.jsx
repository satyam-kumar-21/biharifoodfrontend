import { useParams, Link } from 'react-router-dom';
import { blogData } from '../data/blogData';
import { ArrowLeft, Calendar, User, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const BlogDetailScreen = () => {
  const { id } = useParams();
  const blog = blogData.find((b) => b.id === id);

  if (!blog) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Blog not found</h2>
        <Link to="/blogs" className="text-primary hover:underline">Back to Blogs</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <Link to="/blogs" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
        <ArrowLeft size={20} /> Back to Blogs
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-6 text-sm font-bold text-gray-400 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-primary" />
              <span>{blog.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <User size={16} className="text-primary" />
              <span>{blog.author}</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold font-hindi text-primary leading-tight">
            {blog.title}
          </h1>
        </div>

        <div className="aspect-[21/9] rounded-[40px] overflow-hidden shadow-2xl">
          <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Social Share (Sticky) */}
          <div className="hidden lg:block">
            <div className="sticky top-32 space-y-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Share Story</p>
              <div className="flex flex-col gap-4">
                <button className="p-3 bg-village rounded-full text-primary hover:bg-primary hover:text-white transition">
                  <Share2 size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <div 
              className="prose prose-primary max-w-none prose-headings:font-hindi prose-headings:text-primary prose-p:text-gray-600 prose-p:leading-relaxed text-lg rich-text-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </div>
      </motion.div>

      {/* Suggested Blogs */}
      <div className="pt-20 border-t border-village">
        <h2 className="text-3xl font-bold font-hindi mb-10 text-center">More from our Kitchen</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogData.filter(b => b.id !== id).slice(0, 2).map((other) => (
            <Link key={other.id} to={`/blog/${other.id}`} className="group flex gap-6 items-center p-4 bg-white rounded-3xl border border-transparent hover:border-village transition">
              <img src={other.image} alt="" className="w-24 h-24 rounded-2xl object-cover" />
              <div>
                <h4 className="font-bold font-hindi group-hover:text-primary transition">{other.title}</h4>
                <p className="text-xs text-gray-400 mt-1">{other.date}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogDetailScreen;
