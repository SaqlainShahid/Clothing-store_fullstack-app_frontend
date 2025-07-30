import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

import Home from './pages/Home/Home';
import Store from './pages/Store/Store';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import CartPage from './pages/CartPage/CartPage';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Profile from './pages/Profile/Profile';
import CheckoutPage from './pages/Checkout/CheckoutPage';
import SuccessPage from './pages/Success/SuccessPage';
import AdminDashboard from './pages/Admin/AdminDashboard';

import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';



function App() {
  return (
    <Router>
      <AuthProvider>
        <ProductProvider>
          <CartProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/store" element={<Store />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/product/:id" element={<ProductDetail />} />

              <Route
                path="/checkout"
                element={
                  <PrivateRoute>
                    <CheckoutPage />
                  </PrivateRoute>
                }
              />

              <Route path="/success" element={<SuccessPage />} />

              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />

              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <AdminDashboard />
                  </AdminRoute>
                }
              />

              

            </Routes>

            <Footer />
            <ToastContainer position="top-center" />
          </CartProvider>
        </ProductProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
