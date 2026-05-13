import React from 'react'
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
import HomeScreen from './pages/HomeScreen.jsx';
import ProductScreen from './pages/ProductScreen.jsx';
import CartScreen from './pages/CartScreen.jsx';
import LoginScreen from './pages/LoginScreen.jsx';
import RegisterScreen from './pages/RegisterScreen.jsx';
import ShippingScreen from './pages/ShippingScreen.jsx';
import PaymentScreen from './pages/PaymentScreen.jsx';
import PlaceOrderScreen from './pages/PlaceOrderScreen.jsx';
import OrderScreen from './pages/OrderScreen.jsx';
import ProfileScreen from './pages/ProfileScreen.jsx';
import MyOrdersScreen from './pages/MyOrdersScreen.jsx';
import AboutUsScreen from './pages/AboutUsScreen.jsx';
import ContactScreen from './pages/ContactScreen.jsx';
import FAQScreen from './pages/FAQScreen.jsx';
import PrivacyScreen from './pages/PrivacyScreen.jsx';
import ShippingPolicyScreen from './pages/ShippingPolicyScreen.jsx';
import NotFoundScreen from './pages/NotFoundScreen.jsx';
import MenuScreen from './pages/MenuScreen.jsx';
import TrackOrderScreen from './pages/TrackOrderScreen.jsx';
import BlogScreen from './pages/BlogScreen.jsx';
import BlogDetailScreen from './pages/BlogDetailScreen.jsx';

// Admin Screens
import OrderListScreen from './pages/admin/OrderListScreen.jsx';
import ProductListScreen from './pages/admin/ProductListScreen.jsx';
import ProductEditScreen from './pages/admin/ProductEditScreen.jsx';
import AdminDashboardScreen from './pages/admin/AdminDashboardScreen.jsx';
import UserListScreen from './pages/admin/UserListScreen.jsx';
import UserEditScreen from './pages/admin/UserEditScreen.jsx';
import AdminProfileScreen from './pages/admin/AdminProfileScreen.jsx';
import CategoryListScreen from './pages/admin/CategoryListScreen.jsx';
import SettingsScreen from './pages/admin/SettingsScreen.jsx';
import ContactListScreen from './pages/admin/ContactListScreen.jsx';
import ReviewListScreen from './pages/admin/ReviewListScreen.jsx';

// Route Components
import PrivateRoute from './components/PrivateRoute.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import AdminLayout from './components/AdminLayout.jsx';
import ReturnPolicyScreen from './pages/ReturnPolicyScreen.jsx';
import TermsScreen from './pages/TermsScreen.jsx';

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
