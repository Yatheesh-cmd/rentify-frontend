import React from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer
      className="py-4"
      style={{
        background: "linear-gradient(to right, rgb(233, 180, 180), rgb(248, 207, 215))",
        color: "#0A192F"
      }}
    >
      <div className="container">
        <div className="row">
          {/* Rentify Brand Info */}
          <div className="col-md-4 mb-3">
            <h4 className="fw-bold text-danger">Rentify</h4>
            <p style={{ fontSize: "14px", lineHeight: "1.6" }}>
              Your trusted rental platform for <strong>Laptops, Smartphones, Tablets, Headphones, and Smartwatches</strong>.  
              Rent your favorite gadgets at the best prices!
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-md-4 mb-3">
            <h4 className="fw-bold text-dark">Quick Links</h4>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-danger text-decoration-none">Home</Link></li>
              <li><Link to="/browse" className="text-danger text-decoration-none">Rentals</Link></li>
              <li><Link to="/about" className="text-danger text-decoration-none">About</Link></li>
              {/* <li><Link to="/payments" className="text-danger text-decoration-none">Payments</Link></li> */}
              {/* <li><Link to="/tracking" className="text-danger text-decoration-none">Tracking</Link></li> */}
              <li><Link to="/contact" className="text-danger text-decoration-none">Contact</Link></li>

           
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-md-4">
            <h4 className="fw-bold text-dark">Follow Us</h4>
            <div className="d-flex">
              <a href="#" className="text-dark me-3"><FaFacebook size={20} /></a>
              <a href="#" className="text-dark me-3"><FaInstagram size={20} /></a>
              <a href="#" className="text-dark me-3"><FaTwitter size={20} /></a>
              <a href="#" className="text-dark me-3"><FaLinkedin size={20} /></a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center mt-3">
          <p style={{ fontSize: "12px", marginBottom: "0", color: "#333" }}>
            © {new Date().getFullYear()} Rentify. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
