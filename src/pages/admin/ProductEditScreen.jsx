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
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { ArrowLeft, Upload, Plus, Trash2 } from 'lucide-react';

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
  const [shortDescription, setShortDescription] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [isActive, setIsActive] = useState(true);

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
      setShortDescription(product.shortDescription || '');
      setAdditionalInfo(product.additionalInfo || '');
      setIsActive(product.isActive !== undefined ? product.isActive : true);
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
        shortDescription,
        additionalInfo,
        isActive,
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
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
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
          <form onSubmit={submitHandler} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-bold text-gray-700">Name (English)</label>
                <input
                  type="text"
                  className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-bold text-gray-700">Name (Hindi)</label>
                <input
                  type="text"
                  className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition"
                  value={hindiName}
                  onChange={(e) => setHindiName(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="font-bold text-gray-700">Price (₹)</label>
                <input
                  type="number"
                  className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-bold text-gray-700">Stock</label>
                <input
                  type="number"
                  className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-bold text-gray-700">Category</label>
                <input
                  type="text"
                  className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </div>

            {/* Visibility Toggle */}
            <div className="bg-village/30 p-6 rounded-3xl border border-village flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-700">Product Visibility</h3>
                <p className="text-xs text-gray-500">Hide this product from the customer view without deleting it.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsActive(!isActive)}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold uppercase text-xs transition-all ${isActive ? 'bg-green-600 text-white shadow-lg shadow-green-200' : 'bg-gray-400 text-white shadow-lg shadow-gray-200'}`}
              >
                {isActive ? 'Visible' : 'Hidden'}
              </button>
            </div>

            <div className="space-y-4">
              <label className="font-bold text-gray-700">Product Images</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {images.map((img, index) => (
                  <div key={index} className="relative aspect-square rounded-xl overflow-hidden border-2 border-village group">
                    <img src={img.url} alt={`Product ${index}`} className="w-full h-full object-cover" />
                    {index === 0 && (
                      <span className="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Thumbnail</span>
                    )}
                  </div>
                ))}
                <label className="aspect-square flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-village/50 transition group">
                  <Upload size={32} className="text-gray-400 group-hover:text-primary transition" />
                  <span className="text-xs text-gray-400 mt-2 font-bold uppercase group-hover:text-primary transition">Upload New</span>
                  <input type="file" multiple className="hidden" onChange={uploadFileHandler} />
                </label>
              </div>
              {loadingUpload && <Loader />}
              <p className="text-xs text-gray-400 italic">* First image will be used in cart and listings.</p>
            </div>

            <div className="space-y-2">
              <label className="font-bold text-gray-700">Short Description (Rich Text)</label>
              <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
                <ReactQuill 
                  theme="snow" 
                  value={shortDescription} 
                  onChange={setShortDescription} 
                  className="h-32"
                />
              </div>
              <p className="text-xs text-gray-400 italic mt-2">* This appears at the top near the price.</p>
            </div>

            <div className="space-y-2 pt-8">
              <label className="font-bold text-gray-700">Full Description (Rich Text)</label>
              <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
                <ReactQuill 
                  theme="snow" 
                  value={description} 
                  onChange={setDescription} 
                  className="h-64"
                />
              </div>
            </div>

            <div className="space-y-2 pt-12">
              <label className="font-bold text-gray-700">Additional Information (Rich Text / Table)</label>
              <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
                <ReactQuill 
                  theme="snow" 
                  value={additionalInfo} 
                  onChange={setAdditionalInfo} 
                  className="h-64"
                />
              </div>
              <p className="text-xs text-gray-400 italic mt-2">* You can use the editor to create tables or formatted text.</p>
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
