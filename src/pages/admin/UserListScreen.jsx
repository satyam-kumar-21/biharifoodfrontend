import { useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation } from '../../slices/usersApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { Trash2, Edit, Check, X, User, Lock, Unlock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const toggleBlockHandler = async (user) => {
    if (user.isAdmin) {
      toast.error('Cannot block an admin user');
      return;
    }
    
    if (window.confirm(`Are you sure you want to ${user.isBlocked ? 'unblock' : 'block'} this user?`)) {
      try {
        await updateUser({
          userId: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          isBlocked: !user.isBlocked,
        }).unwrap();
        toast.success(`User ${!user.isBlocked ? 'blocked' : 'unblocked'}`);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

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
                  <th className="p-6 font-bold">ID</th>
                  <th className="p-6 font-bold">NAME</th>
                  <th className="p-6 font-bold">EMAIL</th>
                  <th className="p-6 font-bold">ADMIN</th>
                  <th className="p-6 font-bold">STATUS</th>
                  <th className="p-6 font-bold">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((user) => (
                  <tr key={user._id} className={`hover:bg-gray-50 transition ${user.isBlocked ? 'bg-red-50/50' : ''}`}>
                    <td className="p-6 text-gray-500 text-sm font-bold tracking-tighter">#{user._id.substring(18)}</td>
                    <td className="p-6 font-black text-primary">{user.name}</td>
                    <td className="p-6">
                      <a href={`mailto:${user.email}`} className="text-primary hover:underline font-bold">
                        {user.email}
                      </a>
                    </td>
                    <td className="p-6 text-center">
                      {user.isAdmin ? (
                        <div className="flex items-center justify-center gap-1 text-green-600 font-black">
                          <Check size={18} /> Yes
                        </div>
                      ) : (
                        <div className="flex items-center justify-center gap-1 text-red-500 font-bold">
                          <X size={18} /> No
                        </div>
                      )}
                    </td>
                    <td className="p-6">
                      {user.isBlocked ? (
                        <span className="bg-red-100 text-red-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 w-fit">
                          <Lock size={14} /> Blocked
                        </span>
                      ) : (
                        <span className="bg-green-100 text-green-600 px-4 py-2 rounded-xl text-[10px] font-black uppercase flex items-center gap-2 w-fit">
                          <Unlock size={14} /> Active
                        </span>
                      )}
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => toggleBlockHandler(user)}
                          className={`p-3 rounded-2xl transition-all shadow-sm ${user.isBlocked ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-red-50 text-red-500 hover:bg-red-100'}`}
                          title={user.isBlocked ? 'Unblock User' : 'Block User'}
                          disabled={user.isAdmin}
                        >
                          {user.isBlocked ? <Unlock size={20} /> : <Lock size={20} />}
                        </button>
                        <Link 
                          to={`/admin/user/${user._id}/edit`}
                          className="p-3 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-2xl transition-all shadow-sm"
                        >
                          <Edit size={20} />
                        </Link>
                        <button 
                          onClick={() => deleteHandler(user._id)}
                          className="p-3 bg-village text-red-500 hover:bg-red-50 rounded-2xl transition-all shadow-sm"
                          disabled={user.isAdmin}
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
