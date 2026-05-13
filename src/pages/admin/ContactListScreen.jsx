import { useGetContactsQuery, useDeleteContactMutation, useMarkContactAsReadMutation } from '../../slices/contactApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { toast } from 'react-hot-toast';
import { Trash2, CheckCircle, Mail, Clock, User } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactListScreen = () => {
  const { data: contacts, isLoading, error, refetch } = useGetContactsQuery();
  const [deleteContact] = useDeleteContactMutation();
  const [markAsRead] = useMarkContactAsReadMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await deleteContact(id).unwrap();
        toast.success('Message deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const readHandler = async (id) => {
    try {
      await markAsRead(id).unwrap();
      toast.success('Marked as read');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold font-hindi text-primary">Inquiries & Feedback</h1>
        <div className="bg-village px-4 py-2 rounded-full text-xs font-bold text-primary uppercase tracking-widest border border-primary/20">
          {contacts?.length || 0} Messages
        </div>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error.error}</Message>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {contacts.map((contact) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              key={contact._id}
              className={`bg-white p-6 rounded-[32px] shadow-sm border ${contact.isRead ? 'border-gray-100 opacity-75' : 'border-primary/30 bg-primary/5 shadow-md shadow-primary/5'} transition-all`}
            >
              <div className="flex flex-col md:flex-row justify-between gap-6">
                <div className="flex-1 space-y-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="flex items-center gap-1.5 text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full uppercase tracking-wider">
                      <User size={14} /> {contact.name}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wider">
                      <Mail size={14} /> {contact.email}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-gray-400">
                      <Clock size={14} /> {new Date(contact.createdAt).toLocaleDateString()}
                    </span>
                    {!contact.isRead && (
                      <span className="animate-pulse bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">New</span>
                    )}
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-gray-800 uppercase tracking-tight">{contact.subject}</h3>
                    <p className="text-gray-600 leading-relaxed italic">"{contact.message}"</p>
                  </div>
                </div>

                <div className="flex md:flex-col gap-2 justify-end">
                  {!contact.isRead && (
                    <button
                      onClick={() => readHandler(contact._id)}
                      className="p-3 bg-green-50 text-green-600 rounded-2xl hover:bg-green-600 hover:text-white transition-all shadow-sm"
                      title="Mark as read"
                    >
                      <CheckCircle size={20} />
                    </button>
                  )}
                  <button
                    onClick={() => deleteHandler(contact._id)}
                    className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                    title="Delete message"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {contacts.length === 0 && (
            <div className="text-center py-20 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-200">
              <Mail size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 font-hindi">No messages yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContactListScreen;
