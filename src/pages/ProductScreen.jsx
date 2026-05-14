import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../slices/productsApiSlice';
import { addToCart } from '../slices/cartSlice';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';
import { ShoppingCart, Plus, Minus, ShieldCheck, Truck } from 'lucide-react';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [mainImage, setMainImage] = useState('');

  const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
  const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth) || {};

  useEffect(() => {
    if (product && product.images?.length > 0) {
      setMainImage(product.images[0].url);
    }
  }, [product]);

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
    <div className="space-y-8 pb-20">


      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <Meta
            title={`${product.name} - Bihar wala taste`}
            description={product.shortDescription ? product.shortDescription.replace(/<[^>]*>?/gm, '') : `Buy authentic ${product.name} online. Hand-crafted in Bihar with traditional recipes.`}
            keywords={`${product.name}, buy ${product.name} online, Bihari ${product.category}, authentic Bihari food, Bihar wala taste, Bihar sweets`}
            url={`https://BiharWalaTaste.com/product/${product._id}`}
            image={product.images && product.images.length > 0 ? product.images[0].url : '/biharwalatastelogo.png'}
            type="product"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Image Gallery */}
            <div className="flex flex-col-reverse md:flex-row gap-6">
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-4 overflow-x-auto md:overflow-y-auto max-h-[500px] scrollbar-hide">
                {product.images.map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setMainImage(img.url)}
                    className={`min-w-[80px] w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden border-2 cursor-pointer transition-all flex-shrink-0 ${mainImage === img.url ? 'border-primary shadow-md scale-105' : 'border-village hover:border-gray-300'
                      }`}
                  >
                    <img src={img.url} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1 aspect-square rounded-3xl overflow-hidden shadow-2xl bg-white border border-gray-100 p-2">
                <img
                  src={mainImage}
                  alt={product.name}
                  className="w-full h-full object-contain rounded-2xl"
                />
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold text-sm tracking-widest uppercase">
                  <span>Authentic Bihar</span>
                  <span className="w-8 h-[2px] bg-primary"></span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-hindi leading-tight">
                  {product.name}
                  {product.unit && (
                    <span className="text-xl md:text-2xl text-gray-400 font-normal ml-3 whitespace-nowrap">
                      ({product.unit})
                    </span>
                  )}
                </h1>
                <div className="flex items-center gap-4">
                  <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                  <div className="h-4 w-[1px] bg-gray-200"></div>
                  <span className={`px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest ${product.countInStock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {product.countInStock > 0 ? 'Freshly Available' : 'Currently Out'}
                  </span>
                </div>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="text-5xl font-black text-primary tracking-tighter">₹{product.price}</span>
                {product.discount > 0 && (
                  <div className="flex flex-col">
                    <span className="text-xl text-gray-400 line-through">₹{(product.price / (1 - product.discount / 100)).toFixed(0)}</span>
                    <span className="text-sm text-green-600 font-bold">{product.discount}% OFF</span>
                  </div>
                )}
              </div>

              {/* Short Description */}
              <div
                className="text-gray-600 leading-relaxed border-l-4 border-primary/20 pl-4 py-1 break-words whitespace-normal"
                dangerouslySetInnerHTML={{ __html: product.shortDescription }}
              />

              {/* Badges */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-village">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/5 rounded-lg text-primary">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs">100% Homemade</h4>
                    <p className="text-[10px] text-gray-400">Traditional Methods</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-primary/5 rounded-lg text-primary">
                    <Truck size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs">Free Delivery</h4>
                    <p className="text-[10px] text-gray-400">Orders above ₹500</p>
                  </div>
                </div>
              </div>

              {/* Quantity and Actions */}
              {product.countInStock > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-6">
                    <span className="font-black text-gray-700">Quantity:</span>
                    <div className="flex items-center bg-village rounded-2xl overflow-hidden border border-gray-100">
                      <button
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        className="p-4 hover:bg-gray-200 transition"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="w-12 text-center font-black text-lg">{qty}</span>
                      <button
                        onClick={() => setQty(Math.min(product.countInStock, qty + 1))}
                        className="p-4 hover:bg-gray-200 transition"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={addToCartHandler}
                      className="flex-[2] village-button-primary py-5 flex items-center justify-center gap-3 text-lg"
                    >
                      <ShoppingCart size={24} /> Add to Cart
                    </button>
                    <button className="flex-1 village-button-secondary py-5">Buy Now</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Detailed Info Tabs */}
          <div className="mt-20 bg-white rounded-[40px] shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex border-b border-gray-100 overflow-x-auto scrollbar-hide">
              {[
                { id: 'description', label: 'Description' },
                { id: 'additional', label: 'Additional' },
                { id: 'reviews', label: `Reviews (${product.numReviews})` }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 min-w-fit px-4 sm:px-10 py-4 sm:py-6 text-[10px] sm:text-sm font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeTab === tab.id
                      ? 'text-primary border-b-4 border-primary bg-primary/5'
                      : 'text-gray-400 hover:text-gray-600'
                    }`}
                >
                  {tab.id === 'additional' ? (
                    <>
                      <span className="hidden sm:inline">Additional Information</span>
                      <span className="sm:hidden">Info</span>
                    </>
                  ) : tab.label}
                </button>
              ))}
            </div>

            <div className="p-10 md:p-16">
              {activeTab === 'description' && (
                <div className="prose prose-primary max-w-none">
                  <div
                    className="text-gray-600 leading-relaxed space-y-4 rich-text-content break-words whitespace-normal"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                </div>
              )}

              {activeTab === 'additional' && (
                <div className="overflow-hidden rounded-2xl border border-village">
                  <table className="w-full text-left">
                    <tbody className="divide-y divide-village">
                      {product.additionalInfo && product.additionalInfo.length > 0 ? (
                        product.additionalInfo.map((info, idx) => (
                          <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-village/10'}>
                            <td className="py-4 px-6 font-black text-gray-700 text-sm w-1/3 uppercase tracking-wider break-words">{info.name}</td>
                            <td className="py-4 px-6 text-gray-600 text-sm break-words">{info.value}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td className="py-8 px-6 text-center text-gray-400 italic" colSpan="2">
                            No additional information available for this product.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  {/* Review List */}
                  <div className="space-y-8">
                    {product.reviews.length === 0 && (
                      <div className="text-center py-12 bg-village rounded-3xl">
                        <p className="text-gray-400 italic">No reviews yet. Be the first to share your experience!</p>
                      </div>
                    )}
                    {product.reviews.map((review) => (
                      <div key={review._id} className="bg-village/20 p-8 rounded-[32px] space-y-4 border border-transparent hover:border-primary/10 transition">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary text-white flex items-center justify-center rounded-full font-bold">
                              {review.name[0]}
                            </div>
                            <span className="font-black text-gray-800">{review.name}</span>
                          </div>
                          <Rating value={review.rating} />
                        </div>
                        <p className="text-gray-600 leading-relaxed italic">"{review.comment}"</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                          {new Date(review.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Review Form */}
                  <div className="bg-village/10 p-10 rounded-[40px] h-fit border border-village">
                    <h3 className="text-2xl font-bold font-hindi mb-8">Tell us what you think</h3>
                    {userInfo ? (
                      <form onSubmit={submitHandler} className="space-y-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Your Rating</label>
                          <select
                            className="w-full p-4 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:border-primary transition font-bold"
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                          >
                            <option value="">Choose a rating...</option>
                            <option value="5">5 - Excellent (Superb Taste)</option>
                            <option value="4">4 - Very Good</option>
                            <option value="3">3 - Good</option>
                            <option value="2">2 - Fair</option>
                            <option value="1">1 - Poor</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 px-2">Your Review</label>
                          <textarea
                            rows="5"
                            placeholder="How was the taste? Was it authentic?"
                            className="w-full p-6 bg-white border border-gray-200 rounded-[32px] focus:outline-none focus:border-primary transition"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                          ></textarea>
                        </div>
                        <button
                          disabled={loadingProductReview}
                          type="submit"
                          className="village-button-primary w-full py-5 text-lg"
                        >
                          {loadingProductReview ? 'Submitting...' : 'Post Review'}
                        </button>
                      </form>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 mb-6">Please login to write a review.</p>
                        <Link to="/login" className="village-button-secondary px-10">Login Now</Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductScreen;

