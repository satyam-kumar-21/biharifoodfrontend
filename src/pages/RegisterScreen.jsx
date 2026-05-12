import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-hot-toast';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import Loader from '../components/Loader';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.auth) || {};

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await register({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Registration successful!');
        navigate(redirect);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center py-12">
      <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
        <h1 className="text-3xl font-bold font-hindi text-center mb-8">Create Account</h1>

        <form onSubmit={submitHandler} className="space-y-6">
          <div className="space-y-2">
            <label className="font-bold font-hindi">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold font-hindi">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold font-hindi">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="font-bold font-hindi">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full p-4 bg-village border border-gray-200 rounded-xl focus:outline-none focus:border-primary"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="w-full village-button-primary"
          >
            {isLoading ? 'Processing...' : 'Register'}
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link 
              to={redirect ? `/login?redirect=${redirect}` : '/login'} 
              className="text-primary font-bold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
