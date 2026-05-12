import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
  useUpdateProductMutation, 
  useGetProductDetailsQuery, 
  useUploadProductImageMutation 
} from '../../slices/productsApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { ArrowLeft, Upload } from 'lucide-react';

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [hindiName, setHindiName] = useState('');
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);

  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setHindiName(product.hindiName);
      setPrice(product.price);
      setImages(product.images);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        hindiName,
        price,
        images,
        brand,
        category,
        countInStock,
        description,
      }).unwrap();
      toast.success('Product updated');
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('images', e.target.files[i]);
    }
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success('Images uploaded');
      setImages(res);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link to="/admin/productlist" className="inline-flex items-center gap-2 text-primary font-bold hover:underline">
        <ArrowLeft size={20} /> Back to Product List
      </Link>

      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100">
        <h1 className="text-3xl font-bold font-hindi text-center mb-8">Edit Product</h1>

        {loadingUpdate && <Loader />}
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error?.data?.message || error.error}</Message>
        ) : (
          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-bold">Name (English)</label>
                <input
                  type="text"
                  className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-bold">Name (Hindi)</label>
                <input
                  type="text"
                  className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none"
                  value={hindiName}
                  onChange={(e) => setHindiName(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="font-bold">Price (₹)</label>
                <input
                  type="number"
                  className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-bold">Stock</label>
                <input
                  type="number"
                  className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-bold">Category</label>
                <input
                  type="text"
                  className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-bold">Image</label>
              <div className="flex items-center gap-4">
                <input
                  type="text"
                  placeholder="Enter URL or choose file"
                  className="flex-1 p-4 bg-village border border-gray-200 rounded-xl focus:outline-none"
                  value={images.map(img => img.url).join(', ')}
                  readOnly
                />
                <label className="cursor-pointer bg-primary text-white p-4 rounded-xl hover:bg-primary-dark transition">
                  <Upload size={24} />
                  <input type="file" multiple className="hidden" onChange={uploadFileHandler} />
                </label>
              </div>
              {loadingUpload && <Loader />}
            </div>

            <div className="space-y-2">
              <label className="font-bold">Description</label>
              <textarea
                rows="5"
                className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="w-full village-button-primary">
              Update Product
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProductEditScreen;
