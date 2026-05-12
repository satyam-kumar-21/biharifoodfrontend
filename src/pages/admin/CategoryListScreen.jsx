import { useState } from 'react';
import { 
  useGetCategoriesQuery, 
  useCreateCategoryMutation, 
  useDeleteCategoryMutation,
  useUpdateCategoryMutation
} from '../../slices/categoriesApiSlice';
import { useUploadProductImageMutation } from '../../slices/productsApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Trash2, Plus, Grid, Upload, Image as ImageIcon, Eye, EyeOff } from 'lucide-react';
import { toast } from 'react-hot-toast';

const CategoryListScreen = () => {
  const [name, setName] = useState('');
  const [hindiName, setHindiName] = useState('');
  const [image, setImage] = useState(null);

  const { data: categories, isLoading, error, refetch } = useGetCategoriesQuery(true); // true for admin view
  const [createCategory, { isLoading: loadingCreate }] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory, { isLoading: loadingDelete }] = useDeleteCategoryMutation();

  const toggleVisibilityHandler = async (category) => {
    try {
      await updateCategory({
        _id: category._id,
        isActive: !category.isActive,
      }).unwrap();
      refetch();
      toast.success(`Category ${!category.isActive ? 'visible' : 'hidden'}`);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  const [uploadImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('images', e.target.files[0]); // Category only has one image
    try {
      const res = await uploadImage(formData).unwrap();
      setImage(res[0]); // res is an array
      toast.success('Image uploaded');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error('Please upload an image for the category');
      return;
    }
    try {
      await createCategory({ 
        name, 
        hindiName, 
        image 
      }).unwrap();
      toast.success('Category created');
      setName('');
      setHindiName('');
      setImage(null);
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await deleteCategory(id).unwrap();
        toast.success('Category deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold font-hindi">Manage Categories</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Category Form */}
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Plus size={20} className="text-primary" /> Add New Category
          </h2>
          <form onSubmit={submitHandler} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500">Name (English)</label>
              <input
                type="text"
                placeholder="e.g. Pickles"
                className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500">Name (Hindi)</label>
              <input
                type="text"
                placeholder="उदा. अचार"
                className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none focus:border-primary transition"
                value={hindiName}
                onChange={(e) => setHindiName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-gray-500">Category Image</label>
              <div className="flex flex-col gap-4">
                {image ? (
                  <div className="relative aspect-video rounded-xl overflow-hidden border border-village">
                    <img src={image.url} alt="Preview" className="w-full h-full object-cover" />
                    <button 
                      type="button" 
                      onClick={() => setImage(null)}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full shadow-lg"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="aspect-video flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:bg-village transition group">
                    <Upload size={24} className="text-gray-400 group-hover:text-primary transition" />
                    <span className="text-xs text-gray-400 mt-2 font-bold group-hover:text-primary transition">Choose Image</span>
                    <input type="file" className="hidden" onChange={uploadFileHandler} />
                  </label>
                )}
                {loadingUpload && <Loader />}
              </div>
            </div>

            <button 
              disabled={loadingCreate}
              type="submit" 
              className="w-full village-button-primary mt-4"
            >
              {loadingCreate ? 'Creating...' : 'Create Category'}
            </button>
          </form>
        </div>

        {/* Category List */}
        <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Grid size={20} className="text-primary" /> Existing Categories
          </h2>

          {loadingDelete && <Loader />}
          {isLoading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error?.data?.message || error.error}</Message>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {categories.map((category) => (
                <div 
                  key={category._id} 
                  className={`flex items-center gap-6 p-6 bg-village/50 rounded-[32px] group hover:shadow-xl hover:bg-white border border-transparent hover:border-village transition-all duration-300 ${!category.isActive ? 'opacity-70 grayscale-[0.5]' : ''}`}
                >
                  <div className="w-24 h-24 rounded-3xl overflow-hidden bg-white shrink-0 shadow-lg group-hover:scale-105 transition-transform">
                    {category.image ? (
                      <img src={category.image.url} alt={category.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <ImageIcon size={32} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-xl text-primary">{category.name}</p>
                    <p className="text-sm text-gray-500 font-hindi font-bold mt-1">{category.hindiName}</p>
                    <div className="mt-4 flex gap-2">
                      <button 
                        onClick={() => toggleVisibilityHandler(category)}
                        className={`p-3 rounded-2xl transition-all shadow-sm ${category.isActive ? 'bg-green-100 text-green-600 hover:bg-green-600 hover:text-white' : 'bg-gray-200 text-gray-500 hover:bg-gray-600 hover:text-white'}`}
                        title={category.isActive ? 'Hide Category' : 'Show Category'}
                      >
                        {category.isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                      </button>
                      <button 
                        onClick={() => deleteHandler(category._id)}
                        className="p-3 bg-red-100 text-red-500 rounded-2xl shadow-sm transition-all hover:bg-red-600 hover:text-white"
                        title="Delete Category"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {categories.length === 0 && (
                <div className="col-span-full py-10 text-center text-gray-400 italic">
                  No categories found.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryListScreen;
