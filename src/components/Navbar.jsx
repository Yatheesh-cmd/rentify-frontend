import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { authContext, cartContext } from "../context/ContextApi";
import { toast } from "react-toastify";
import { Dropdown } from "react-bootstrap";
import './Navbar.css';

function Navbar() {
  const { auth, setAuth, contextRole, setContextRole } = useContext(authContext);
  const { cart } = useContext(cartContext);
  const cartCount = cart.length;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const handleLinkClick = () => setSidebarOpen(false);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    setAuth(false);
    setContextRole(null);
    toast.info("Logged out successfully");
    navigate('/');
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg shadow-sm py-3"
        style={{
          background: "linear-gradient(to right, rgb(233, 180, 180), rgb(248, 207, 215))",
        }}
      >
        <div className="container">
          <div className="row w-100 align-items-center">
            <div className="col-4 d-flex align-items-center">
              <button className="btn text-dark me-2" onClick={toggleSidebar}>
                <FaBars size={22} />
              </button>
              <Link
                className="navbar-brand fw-bold fs-3 text-danger"
                to="/"
                onClick={handleLinkClick}
              >
                <i className="fa-solid fa-laptop" style={{ color: "brown" }}></i> Rentify
              </Link>
            </div>

            <div className="col-8 d-flex justify-content-end align-items-center gap-3">
              <Link
                to="/cart"
                className="text-dark d-flex align-items-center gap-1 position-relative text-decoration-none"
              >
                <FaShoppingCart size={20} />
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {cartCount}
                  </span>
                )}
              </Link>

              {auth ? (
                <Dropdown>
                  <Dropdown.Toggle variant="success" id="userMenu">
                    Profile
                  </Dropdown.Toggle>
                  <Dropdown.Menu align="end">
                    <Dropdown.Item as={Link} to="/profile">
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item as={Link} to="/myrentals">
                      My Rentals
                    </Dropdown.Item>
                    {contextRole === "admin" && (
                      <Dropdown.Item as={Link} to="/admin-dashboard">
                        Admin Dashboard
                      </Dropdown.Item>
                    )}
                    <Dropdown.Item onClick={handleLogout} className="text-danger">
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <>
                  <Link to="/login" className="btn btn-danger">
                    Login
                  </Link>
                  <Link to="/register" className="btn btn-danger">
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {sidebarOpen && (
        <div
          className="overlay position-fixed top-0 start-0 w-100 h-100"
          style={{ backgroundColor: "rgba(0,0,0,0.3)", zIndex: 1040 }}
          onClick={toggleSidebar}
        ></div>
      )}

      <div
        className={`sidebar bg-white position-fixed top-0 start-0 h-100 p-4 shadow ${sidebarOpen ? "d-block" : "d-none"}`}
        style={{ width: "250px", zIndex: 1050 }}
      >
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="fw-bold text-primary">Menu</h5>
          <button className="btn btn-sm" onClick={toggleSidebar}>
            <FaTimes size={18} />
          </button>
        </div>
        <ul className="list-unstyled">
          <li className="mb-2">
            <Link to="/" className="menu-link" onClick={handleLinkClick}>
              Home
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/browse" className="menu-link" onClick={handleLinkClick}>
              Rentals
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/gadgetlist" className="menu-link" onClick={handleLinkClick}>
              All Gadgets
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/about" className="menu-link" onClick={handleLinkClick}>
              About
            </Link>
          </li>
          <li className="mb-2">
            <Link to="/contact" className="menu-link" onClick={handleLinkClick}>
              Contact
            </Link>
          </li>
          {contextRole === "admin" && (
            <li className="mb-2">
              <Link to="/admin-dashboard" className="menu-link" onClick={handleLinkClick}>
                Admin Dashboard
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default Navbar;