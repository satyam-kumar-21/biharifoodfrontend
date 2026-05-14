import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx'
import './index.css'

// User Screens
const HomeScreen = lazy(() => import('./pages/HomeScreen.jsx'));
const ProductScreen = lazy(() => import('./pages/ProductScreen.jsx'));
const CartScreen = lazy(() => import('./pages/CartScreen.jsx'));
const LoginScreen = lazy(() => import('./pages/LoginScreen.jsx'));
const RegisterScreen = lazy(() => import('./pages/RegisterScreen.jsx'));
const ShippingScreen = lazy(() => import('./pages/ShippingScreen.jsx'));
const PaymentScreen = lazy(() => import('./pages/PaymentScreen.jsx'));
const PlaceOrderScreen = lazy(() => import('./pages/PlaceOrderScreen.jsx'));
const OrderScreen = lazy(() => import('./pages/OrderScreen.jsx'));
const ProfileScreen = lazy(() => import('./pages/ProfileScreen.jsx'));
const MyOrdersScreen = lazy(() => import('./pages/MyOrdersScreen.jsx'));
const AboutUsScreen = lazy(() => import('./pages/AboutUsScreen.jsx'));
const ContactScreen = lazy(() => import('./pages/ContactScreen.jsx'));
const FAQScreen = lazy(() => import('./pages/FAQScreen.jsx'));
const PrivacyScreen = lazy(() => import('./pages/PrivacyScreen.jsx'));
const ShippingPolicyScreen = lazy(() => import('./pages/ShippingPolicyScreen.jsx'));
const NotFoundScreen = lazy(() => import('./pages/NotFoundScreen.jsx'));
const MenuScreen = lazy(() => import('./pages/MenuScreen.jsx'));
const TrackOrderScreen = lazy(() => import('./pages/TrackOrderScreen.jsx'));
const BlogScreen = lazy(() => import('./pages/BlogScreen.jsx'));
const BlogDetailScreen = lazy(() => import('./pages/BlogDetailScreen.jsx'));
const ReturnPolicyScreen = lazy(() => import('./pages/ReturnPolicyScreen.jsx'));
const TermsScreen = lazy(() => import('./pages/TermsScreen.jsx'));

// Admin Screens
const OrderListScreen = lazy(() => import('./pages/admin/OrderListScreen.jsx'));
const ProductListScreen = lazy(() => import('./pages/admin/ProductListScreen.jsx'));
const ProductEditScreen = lazy(() => import('./pages/admin/ProductEditScreen.jsx'));
const AdminDashboardScreen = lazy(() => import('./pages/admin/AdminDashboardScreen.jsx'));
const UserListScreen = lazy(() => import('./pages/admin/UserListScreen.jsx'));
const UserEditScreen = lazy(() => import('./pages/admin/UserEditScreen.jsx'));
const AdminProfileScreen = lazy(() => import('./pages/admin/AdminProfileScreen.jsx'));
const CategoryListScreen = lazy(() => import('./pages/admin/CategoryListScreen.jsx'));
const SettingsScreen = lazy(() => import('./pages/admin/SettingsScreen.jsx'));
const ContactListScreen = lazy(() => import('./pages/admin/ContactListScreen.jsx'));
const ReviewListScreen = lazy(() => import('./pages/admin/ReviewListScreen.jsx'));

// Route Components
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import AdminLayout from './components/AdminLayout.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/about-us' element={<AboutUsScreen />} />
      <Route path='/contact' element={<ContactScreen />} />
      <Route path='/faq' element={<FAQScreen />} />
      <Route path='/menu' element={<MenuScreen />} />
      <Route path='/privacy' element={<PrivacyScreen />} />
      <Route path='/shipping-policy' element={<ShippingPolicyScreen />} />
      <Route path='/returns' element={<ReturnPolicyScreen />} />
      <Route path='/terms' element={<TermsScreen />} />
      <Route path='/track-order' element={<TrackOrderScreen />} />
      <Route path='/blogs' element={<BlogScreen />} />
      <Route path='/blog/:id' element={<BlogDetailScreen />} />
      
      {/* Registered users */}
      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/order/:id' element={<OrderScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />
        <Route path='/myorders' element={<MyOrdersScreen />} />
      </Route>

      {/* Admin users */}
      <Route path='' element={<AdminRoute />}>
        <Route element={<AdminLayout />}>
          <Route path='/admin/dashboard' element={<AdminDashboardScreen />} />
          <Route path='/admin/orderlist' element={<OrderListScreen />} />
          <Route path='/admin/productlist' element={<ProductListScreen />} />
          <Route path='/admin/productlist/:pageNumber' element={<ProductListScreen />} />
          <Route path='/admin/product/:id/edit' element={<ProductEditScreen />} />
          <Route path='/admin/userlist' element={<UserListScreen />} />
          <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
          <Route path='/admin/profile' element={<AdminProfileScreen />} />
          <Route path='/admin/categorylist' element={<CategoryListScreen />} />
          <Route path='/admin/settings' element={<SettingsScreen />} />
          <Route path='/admin/contactlist' element={<ContactListScreen />} />
          <Route path='/admin/reviewlist' element={<ReviewListScreen />} />
        </Route>
      </Route>

      {/* 404 Page */}
      <Route path='*' element={<NotFoundScreen />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </Provider>
  </React.StrictMode>
)
