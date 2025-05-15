// src/pages/AdminDashboard.js
import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Table, Button, Spinner, Dropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { allGadgetsApi, deleteGadgetApi, allRentalsApi, allReviewsApi } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { gadgetResponseContext } from '../context/ContextApi';
import AddGadget from '../components/AddGadget';
import EditGadget from '../components/EditGadget';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaTrash, FaBox, FaStar, FaEllipsisV } from 'react-icons/fa';

function AdminDashboard() {
  const [gadgets, setGadgets] = useState([]);
  const [rentals, setRentals] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const { gadgetResponse } = useContext(gadgetResponseContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGadgets();
    fetchRentals();
    fetchReviews();
  }, [gadgetResponse]);

  const fetchGadgets = async () => {
    setLoading(true);
    try {
      const response = await allGadgetsApi();
      setGadgets(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch gadgets: ' + error.message);
      if (error.message === 'No token provided' || error.message === 'Invalid token') {
        sessionStorage.clear();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchRentals = async () => {
    setLoading(true);
    try {
      const response = await allRentalsApi();
      setRentals(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch rentals: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await allReviewsApi();
      setReviews(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch reviews: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this gadget?')) {
      setLoading(true);
      try {
        const response = await deleteGadgetApi(id);
        if (response.status === 200) {
          toast.success('Gadget deleted successfully');
          setGadgets(gadgets.filter(gadget => gadget._id !== id));
        }
      } catch (error) {
        toast.error('Failed to delete gadget: ' + error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <Navbar />
      <Container className="py-5">
        <h2 className="mb-4">Admin Dashboard</h2>
        <Row>
          <Col>
            <h4 className="mb-3">Manage Gadgets</h4>
            <div className="d-flex gap-2 mb-3">
              <AddGadget />
              <Button variant="outline-warning" onClick={() => navigate('/orders')}>
                View Orders
              </Button>
            </div>
            {loading ? (
              <div className="text-center my-5">
                <Spinner animation="border" />
              </div>
            ) : gadgets.length > 0 ? (
              <Table responsive striped bordered hover className="mt-3">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price/Day</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {gadgets.map(gadget => (
                    <tr key={gadget._id}>
                      <td>{gadget.name}</td>
                      <td>{gadget.category}</td>
                      <td>₹{gadget.price}</td>
                      <td>
                        <EditGadget gadget={gadget} />
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(gadget._id)}
                          className="ms-2"
                        >
                          <FaTrash />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p className="text-center mt-4">No gadgets available</p>
            )}
          </Col>
        </Row>

        {/* Reviews Section with Dropdown */}
        <Row className="mt-5">
          <Col>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4 className="mb-0">
                <FaStar /> All Reviews
              </h4>
              <Dropdown>
                <Dropdown.Toggle variant="outline-secondary" id="dropdown-reviews">
                  <FaEllipsisV />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => setShowReviews(!showReviews)}>
                    {showReviews ? 'Hide Reviews' : 'Show Reviews'}
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => fetchReviews()}>
                    Refresh Reviews
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            {showReviews && (
              reviews.length > 0 ? (
                <div className="table-responsive">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Order ID</th>
                        <th>Rating</th>
                        <th>Comment</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reviews.map(review => (
                        <tr key={review._id}>
                          <td>{review.userId?.username || 'N/A'}</td>
                          <td className="text-monospace">{review.rentalId?._id?.substring(0, 8) || 'N/A'}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              <FaStar className="text-warning me-1" />
                              {review.rating}/5
                            </div>
                          </td>
                          <td style={{ maxWidth: '300px' }}>
                            <div className="text-truncate" style={{ maxWidth: '100%' }} title={review.comment}>
                              {review.comment || 'No comment'}
                            </div>
                          </td>
                          <td>{new Date(review.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              ) : (
                <p className="text-center mt-4">No reviews found</p>
              )
            )}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default AdminDashboard;