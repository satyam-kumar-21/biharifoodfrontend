import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { ShoppingCart, ArrowLeft, Plus, Minus, ShieldCheck, Truck } from 'lucide-react';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth) || {};

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    toast.success('Added to cart!');
    navigate('/cart');
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success('Review submitted successfully');
      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="space-y-8">
      <Link to="/" className="inline-flex items-center gap-2 text-primary font-bold hover:underline mb-4">
        <ArrowLeft size={20} /> Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-lg bg-white">
              <img 
                src={product.images[0]?.url} 
                alt={product.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <div key={idx} className="aspect-square rounded-xl overflow-hidden border-2 border-transparent hover:border-primary cursor-pointer">
                  <img src={img.url} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold font-hindi">{product.hindiName || product.name}</h1>
              <div className="flex items-center gap-4">
                <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                <span className={`px-3 py-1 rounded-full text-sm font-bold ${product.countInStock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            <div className="border-y border-gray-100 py-6">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-bold text-primary">₹{product.price}</span>
                {product.discount > 0 && (
                  <span className="text-xl text-gray-400 line-through">₹{(product.price / (1 - product.discount/100)).toFixed(0)}</span>
                )}
              </div>
              <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100">
                <ShieldCheck className="text-primary" />
                <div>
                  <h4 className="font-bold text-sm">Pure and Fresh</h4>
                  <p className="text-xs text-gray-500">No Preservatives</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-gray-100">
                <Truck className="text-primary" />
                <div>
                  <h4 className="font-bold text-sm">Fast Delivery</h4>
                  <p className="text-xs text-gray-500">Across India</p>
                </div>
              </div>
            </div>

            {/* Quantity and Actions */}
            {product.countInStock > 0 && (
              <div className="space-y-6">
                <div className="flex items-center gap-6">
                  <span className="font-bold">Quantity:</span>
                  <div className="flex items-center bg-white border border-gray-200 rounded-full overflow-hidden">
                    <button 
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="p-3 hover:bg-gray-50 transition"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="w-12 text-center font-bold">{qty}</span>
                    <button 
                      onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                      className="p-3 hover:bg-gray-50 transition"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={addToCartHandler}
                    className="flex-1 village-button-primary flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={20} /> Add to Cart
                  </button>
                  <button className="flex-1 village-button-secondary">Buy Now</button>
                </div>
              </div>
            )}

            {/* Details Tabs */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 space-y-4">
              <h3 className="text-xl font-bold font-hindi">Details</h3>
              <div className="grid grid-cols-2 gap-y-4 text-sm">
                <span className="text-gray-500">Weight:</span>
                <span className="font-medium font-hindi">500g</span>
                <span className="text-gray-500">Shelf Life:</span>
                <span className="font-medium font-hindi">{product.shelfLife || '3 Months'}</span>
                <span className="text-gray-500">Ingredients:</span>
                <span className="font-medium font-hindi">{product.ingredients || 'Natural Ingredients'}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Section */}
      <section className="mt-16 space-y-8">
        <h2 className="text-3xl font-bold font-hindi">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Review List */}
          <div className="space-y-6">
            {product?.reviews.length === 0 && <Message>No Reviews Yet</Message>}
            {product?.reviews.map((review) => (
              <div key={review._id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-bold">{review.name}</span>
                  <Rating value={review.rating} />
                </div>
                <p className="text-gray-600">{review.comment}</p>
                <p className="text-xs text-gray-400 mt-4">{review.createdAt.substring(0, 10)}</p>
              </div>
            ))}
          </div>

          {/* Write a Review */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-fit">
            <h3 className="text-xl font-bold font-hindi mb-6">Write a Review</h3>
            {loadingProductReview && <Loader />}
            {userInfo ? (
              <form onSubmit={submitHandler} className="space-y-4">
                <div className="space-y-2">
                  <label className="font-bold">Rating</label>
                  <select
                    className="w-full p-3 bg-village border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-bold">Review</label>
                  <textarea
                    rows="4"
                    className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                </div>
                <button 
                  disabled={loadingProductReview}
                  type="submit" 
                  className="village-button-primary w-full"
                >
                  Submit
                </button>
              </form>
            ) : (
              <Message>
                Please <Link to="/login" className="underline font-bold">login</Link> to write a review.
              </Message>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductScreen;
