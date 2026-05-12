import { Link, useParams } from 'react-router-dom';
import { useGetProductsQuery, useDeleteProductMutation, useCreateProductMutation } from '../../slices/productsApiSlice';
import { toast } from 'react-hot-toast';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Edit, Trash2, Plus } from 'lucide-react';

const ProductListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });

  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteProduct(id);
        refetch();
        toast.success('Product deleted');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        await createProduct();
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-hindi">Product Management</h1>
        <button 
          onClick={createProductHandler}
          className="village-button-primary flex items-center gap-2"
        >
          <Plus size={20} /> Create Product
        </button>
      </div>

      {(loadingCreate || loadingDelete) && <Loader />}
      
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-500 font-bold text-sm uppercase">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Price</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Brand</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium">#{product._id.substring(18)}</td>
                    <td className="px-6 py-4 font-hindi font-bold">{product.hindiName || product.name}</td>
                    <td className="px-6 py-4">₹{product.price}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">{product.brand}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <Link to={`/admin/product/${product._id}/edit`} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Edit size={20} />
                      </Link>
                      <button 
                        onClick={() => deleteHandler(product._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductListScreen;
