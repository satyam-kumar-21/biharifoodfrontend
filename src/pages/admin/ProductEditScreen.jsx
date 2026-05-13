import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  useUpdateProductMutation,
  useGetProductDetailsQuery,
  useUploadProductImageMutation
} from '../../slices/productsApiSlice';
import { useGetCategoriesQuery } from '../../slices/categoriesApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import { ArrowLeft, Upload, Plus, Trash2 } from 'lucide-react';

const ProductEditScreen = () => {
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState(null);
  const [shortDescription, setShortDescription] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState([{ name: '', value: '' }]);
  const [isActive, setIsActive] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
  const { data: categories, isLoading: loadingCategories } = useGetCategoriesQuery();

  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (product && !isInitialized) {
      setName(product.name || '');
      setUnit(product.unit || '');
      setPrice(product.price || 0);
      setImages(product.images || []);
      setBrand(product.brand || '');
      setCategory(product.category || '');
      setCountInStock(product.countInStock || 0);
      setDescription(product.description || '');
      setShortDescription(product.shortDescription || '');
      setAdditionalInfo(product.additionalInfo?.length > 0 ? product.additionalInfo : [{ name: '', value: '' }]);
      setIsActive(product.isActive !== undefined ? product.isActive : true);
      setIsInitialized(true);
    }
  }, [product, isInitialized]);

  const addInfoRow = () => {
    setAdditionalInfo([...additionalInfo, { name: '', value: '' }]);
  };

  const removeInfoRow = (index) => {
    const newInfo = [...additionalInfo];
    newInfo.splice(index, 1);
    setAdditionalInfo(newInfo);
  };

  const updateInfoRow = (index, field, value) => {
    const newInfo = [...additionalInfo];
    newInfo[index] = { ...newInfo[index], [field]: value };
    setAdditionalInfo(newInfo);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        unit,
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

  const deleteImage = (index) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const setAsThumbnail = (index) => {
    const newImages = [...images];
    const thumb = newImages.splice(index, 1)[0];
    newImages.unshift(thumb);
    setImages(newImages);
  };

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('images', e.target.files[i]);
    }
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success('Images uploaded');
      setImages([...images, ...res]);
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
                <label className="font-bold text-gray-700">Product Name</label>
                <input
                  type="text"
                  placeholder="Enter name in English or Hindi"
                  className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="font-bold text-gray-700">Quantity / Unit</label>
                <input
                  type="text"
                  placeholder="e.g. 500g, 1kg, Pack of 2"
                  className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition"
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
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
                <select
                  className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories && categories.map((cat) => (
                    <option key={cat._id} value={cat.name}>
                      {cat.name} ({cat.hindiName})
                    </option>
                  ))}
                </select>
                {loadingCategories && <p className="text-[10px] text-gray-400 italic">Loading categories...</p>}
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
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={() => setAsThumbnail(index)}
                        className="p-2 bg-white text-primary rounded-full hover:bg-primary hover:text-white transition"
                        title="Set as Thumbnail"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteImage(index)}
                        className="p-2 bg-white text-red-500 rounded-full hover:bg-red-500 hover:text-white transition"
                        title="Delete Image"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
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
                {shortDescription !== null && (
                  <ReactQuill 
                    key={`short-${productId}`}
                    theme="snow" 
                    value={shortDescription} 
                    onChange={setShortDescription} 
                    className="h-32"
                  />
                )}
              </div>
              <p className="text-xs text-gray-400 italic mt-2">* This appears at the top near the price.</p>
            </div>

            <div className="space-y-2 pt-8">
              <label className="font-bold text-gray-700">Full Description (Rich Text)</label>
              <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
                {description !== null && (
                  <ReactQuill 
                    key={`full-${productId}`}
                    theme="snow" 
                    value={description} 
                    onChange={setDescription} 
                    className="h-64"
                  />
                )}
              </div>
            </div>

            <div className="space-y-4 pt-12">
              <div className="flex items-center justify-between">
                <label className="font-bold text-gray-700">Additional Information (Rows)</label>
                <button
                  type="button"
                  onClick={addInfoRow}
                  className="flex items-center gap-2 text-primary font-bold text-sm hover:underline"
                >
                  <Plus size={16} /> Add Row
                </button>
              </div>

              <div className="space-y-3">
                {additionalInfo.map((info, index) => (
                  <div key={index} className="flex gap-4 items-start">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Label (e.g. Weight)"
                        className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition"
                        value={info.name}
                        onChange={(e) => updateInfoRow(index, 'name', e.target.value)}
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Value (e.g. 500g)"
                        className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition"
                        value={info.value}
                        onChange={(e) => updateInfoRow(index, 'value', e.target.value)}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeInfoRow(index)}
                      className="p-4 text-red-500 hover:bg-red-50 rounded-xl transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 italic mt-2">* These rows will be displayed as a specification table on the product page.</p>
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
