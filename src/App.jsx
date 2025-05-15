// src/App.js
import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './bootstrap.min (12).css';
import './App.css';
import ContextApi from './context/ContextApi';
import { authContext } from './context/ContextApi';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Browse from './pages/Browse';
import GadgetDetails from './pages/GadgetDetails';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import MyRentals from './pages/MyRentals';
import About from './pages/About';
import Contact from './pages/Contact';
import GadgetList from './pages/GadgetList';
import Cart from './components/Cart';
import Orders from './pages/Orders';

// ProtectedRoute component to restrict access to authenticated users
function ProtectedRoute({ children }) {
  const { auth } = useContext(authContext);
  
  if (!auth) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function App() {
  return (
    <ContextApi>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth isLogin={true} />} />
          <Route path="/register" element={<Auth isLogin={false} />} />
          <Route path="/browse" element={
            <ProtectedRoute>
              <Browse />
            </ProtectedRoute>
          } />
          <Route path="/browse/:category" element={
            <ProtectedRoute>
              <Browse />
            </ProtectedRoute>
          } />
          <Route path="/gadget/:id" element={
            <ProtectedRoute>
              <GadgetDetails />
            </ProtectedRoute>
          } />
          <Route path="/gadgetlist" element={
            <ProtectedRoute>
              <GadgetList />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<UserDashboard />} />
          <Route path="/admin-dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } />
          <Route path="/myrentals" element={<MyRentals />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <ToastContainer position="top-center" autoClose={100} />
      </BrowserRouter>
    </ContextApi>
  );
}

export default App;