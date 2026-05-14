import { Link } from 'react-router-dom';
import Rating from './Rating';
import { ShoppingCart, Eye } from 'lucide-react';

const ProductCard = ({ product }) => {
  const getFirstSentence = (html) => {
    if (!html) return "Authentic village taste, made with traditional recipes.";
    
    // Strip HTML tags using regex (faster than DOMParser in a loop)
    const text = html.replace(/<[^>]*>/g, '').trim();
    
    // Match everything up to the first Hindi Purna Viram (।) or English period (.)
    const match = text.match(/.*?[।.][”"']?/);
    
    return match ? match[0] : (text.slice(0, 100) + (text.length > 100 ? "..." : ""));
  };

  return (
    <div className="bg-white rounded-[32px] shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-500 group flex flex-col h-full relative">
      {/* Category Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span className="bg-white/90 backdrop-blur-md text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-sm border border-gray-100">
          {product.category}
        </span>
      </div>

      {/* Image Section */}
      <Link to={`/product/${product._id}`} className="relative h-72 overflow-hidden block">
        <img
          src={product.images[0]?.url}
          alt={product.name}
          width="400"
          height="300"
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
          <div className="bg-white p-3 rounded-full text-primary shadow-xl transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 delay-75">
            <Eye size={20} />
          </div>
        </div>

        {product.discount > 0 && (
          <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
            {product.discount}% OFF
          </div>
        )}
      </Link>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow bg-white">
        <div className="space-y-1">
          <Link to={`/product/${product._id}`}>
            <h3 className="text-[1.2rem] font-black font-hindi group-hover:text-primary transition-colors leading-tight flex items-baseline gap-2">
              <span className="truncate">{product.name}</span>
              {product.unit && (
                <span className="text-xs text-gray-400 font-bold whitespace-nowrap">
                  ({product.unit})
                </span>
              )}
            </h3>
          </Link>
          <div className="flex items-center gap-2">
            <Rating value={product.rating} color="#FFD700" />
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">({product.numReviews})</span>
          </div>
        </div>
        
        <div className="mt-3 flex-grow">
          <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed font-medium opacity-80">
            {getFirstSentence(product.shortDescription)}
          </p>
        </div>

        <div className="pt-3 mt-4 border-t border-village/50 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] leading-none mb-1">Price</span>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold text-primary">₹</span>
              <span className="text-2xl font-black text-primary tracking-tighter">{product.price}</span>
              {product.discount > 0 && (
                <span className="text-[10px] text-gray-400 line-through ml-1">₹{(product.price / (1 - product.discount/100)).toFixed(0)}</span>
              )}
            </div>
          </div>
          
          <Link 
            to={`/product/${product._id}`}
            className="bg-secondary text-primary p-2.5 rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm hover:shadow-lg transform active:scale-95"
          >
            <ShoppingCart size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
