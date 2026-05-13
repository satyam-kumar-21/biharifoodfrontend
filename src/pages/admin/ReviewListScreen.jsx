import { useGetProductsQuery, useDeleteReviewMutation } from '../../slices/productsApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-hot-toast';
import { Trash2, Star, User, Package, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const ReviewListScreen = () => {
  // Fetch all products to get their reviews
  const { data, isLoading, error, refetch } = useGetProductsQuery({ admin: 'true', pageSize: 100 });
  const [deleteReview, { isLoading: loadingDelete }] = useDeleteReviewMutation();

  const deleteHandler = async (productId, reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview({ productId, reviewId }).unwrap();
        toast.success('Review deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  // Flatten all reviews from all products
  const allReviews = data?.products?.reduce((acc, product) => {
    const productReviews = product.reviews.map(review => ({
      ...review,
      productName: product.name,
      productId: product._id
    }));
    return [...acc, ...productReviews];
  }, [])?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) || [];

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-hindi text-primary">Manage Customer Reviews</h1>
        <div className="bg-village px-4 py-2 rounded-full text-xs font-bold text-primary uppercase tracking-widest border border-primary/20">
          {allReviews.length} Total Reviews
        </div>
      </div>

      {loadingDelete && <Loader />}
      
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {allReviews.map((review) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={review._id}
              className="bg-white p-6 rounded-[32px] shadow-sm border border-gray-100 hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wider">
                      <User size={14} /> {review.name}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
                      <Package size={14} /> {review.productName}
                    </span>
                    <div className="flex items-center gap-0.5 text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-gray-400">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-gray-700 leading-relaxed italic text-lg">"{review.comment}"</p>
                  </div>
                </div>

                <div className="flex justify-end items-center">
                  <button
                    onClick={() => deleteHandler(review.productId, review._id)}
                    className="p-4 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    title="Delete Review"
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {allReviews.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
              <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 font-hindi">No reviews to manage yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewListScreen;
