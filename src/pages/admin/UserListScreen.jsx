import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Trash2, Edit, Check, X, User } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        toast.success('User deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-hindi">Manage Users</h1>
      </div>

      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-village text-primary">
                  <th className="p-4 font-bold">ID</th>
                  <th className="p-4 font-bold">NAME</th>
                  <th className="p-4 font-bold">EMAIL</th>
                  <th className="p-4 font-bold">ADMIN</th>
                  <th className="p-4 font-bold">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 transition">
                    <td className="p-4 text-gray-500 text-sm">#{user._id.substring(18)}</td>
                    <td className="p-4 font-medium">{user.name}</td>
                    <td className="p-4">
                      <a href={`mailto:${user.email}`} className="text-primary hover:underline flex items-center gap-2">
                        {user.email}
                      </a>
                    </td>
                    <td className="p-4">
                      {user.isAdmin ? (
                        <div className="flex items-center gap-1 text-green-600 font-bold">
                          <Check size={18} /> Yes
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-red-500">
                          <X size={18} /> No
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Link 
                          to={`/admin/user/${user._id}/edit`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-xl transition"
                        >
                          <Edit size={20} />
                        </Link>
                        <button 
                          onClick={() => deleteHandler(user._id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition"
                          disabled={user.isAdmin} // Prevent deleting admin
                        >
                          <Trash2 size={20} />
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

export default UserListScreen;
