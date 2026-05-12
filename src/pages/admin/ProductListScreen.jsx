import { Link, useParams } from 'react-router-dom';
import { useGetProductsQuery, useDeleteProductMutation, useCreateProductMutation, useUpdateProductMutation } from '../../slices/productsApiSlice';
import { toast } from 'react-hot-toast';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Edit, Trash2, Plus, Eye, EyeOff } from 'lucide-react';

const ProductListScreen = () => {
  const { pageNumber } = useParams();

  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
    admin: true,
  });

  const [updateProduct] = useUpdateProductMutation();

  const toggleVisibilityHandler = async (product) => {
    try {
      await updateProduct({
        productId: product._id,
        isActive: !product.isActive,
      }).unwrap();
      refetch();
      toast.success(`Product ${!product.isActive ? 'visible' : 'hidden'}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

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
              <thead className="bg-village text-primary font-black text-xs uppercase tracking-widest">
                <tr>
                  <th className="p-8">ID</th>
                  <th className="p-8">Product Name</th>
                  <th className="p-8">Price</th>
                  <th className="p-8">Category</th>
                  <th className="p-8 text-center">Visibility</th>
                  <th className="p-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data.products.map((product) => (
                  <tr key={product._id} className={`hover:bg-gray-50 transition-all ${!product.isActive ? 'bg-gray-50/50' : ''}`}>
                    <td className="p-8 font-bold text-gray-400 text-sm">#{product._id.substring(18)}</td>
                    <td className="p-8">
                      <div className="flex flex-col">
                        <span className="font-black text-primary text-lg font-hindi">{product.hindiName}</span>
                        <span className="text-xs text-gray-500 uppercase font-bold tracking-wider">{product.name}</span>
                      </div>
                    </td>
                    <td className="p-8 font-black text-primary text-lg">₹{product.price}</td>
                    <td className="p-8 font-bold text-gray-600">{product.category}</td>
                    <td className="p-8">
                      <div className="flex justify-center">
                        <button 
                          onClick={() => toggleVisibilityHandler(product)}
                          className={`px-4 py-2 rounded-xl flex items-center gap-2 text-[10px] font-black uppercase transition-all shadow-sm ${product.isActive ? 'text-green-600 bg-green-50 hover:bg-green-100' : 'text-gray-400 bg-gray-100 hover:bg-gray-200'}`}
                        >
                          {product.isActive ? <Eye size={16} /> : <EyeOff size={16} />}
                          {product.isActive ? 'Visible' : 'Hidden'}
                        </button>
                      </div>
                    </td>
                    <td className="p-8">
                      <div className="flex justify-end gap-3">
                        <Link to={`/admin/product/${product._id}/edit`} className="p-3 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-2xl shadow-sm transition-all">
                          <Edit size={22} />
                        </Link>
                        <button 
                          onClick={() => deleteHandler(product._id)}
                          className="p-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-2xl shadow-sm transition-all"
                        >
                          <Trash2 size={22} />
                        </button>
                      </div>
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
