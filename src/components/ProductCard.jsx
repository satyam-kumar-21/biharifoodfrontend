import { Link } from 'react-router-dom';
import Rating from './Rating';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <Link to={`/product/${product._id}`}>
        <div className="relative h-64 overflow-hidden">
          <img
            src={product.images[0]?.url}
            alt={product.name}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
          {product.discount > 0 && (
            <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-bold">
              {product.discount}% OFF
            </div>
          )}
        </div>
      </Link>

      <div className="p-5 space-y-3">
        <Link to={`/product/${product._id}`}>
          <h3 className="text-xl font-bold font-hindi group-hover:text-primary transition-colors">
            {product.hindiName || product.name}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between">
          <Rating value={product.rating} text={`${product.numReviews} reviews`} />
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-primary">₹{product.price}</span>
            {product.discount > 0 && (
              <span className="text-sm text-gray-400 line-through">₹{(product.price / (1 - product.discount/100)).toFixed(0)}</span>
            )}
          </div>
          <Link 
            to={`/product/${product._id}`}
            className="bg-secondary text-primary font-bold px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition-colors"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
