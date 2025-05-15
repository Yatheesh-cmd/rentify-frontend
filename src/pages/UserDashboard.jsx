import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { createReviewApi, getRentalReviewsApi } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaUser, FaStar } from 'react-icons/fa';
import './UserDashboard.css';

function UserDashboard() {
  const [user] = useState({
    username: sessionStorage.getItem('user') || '',
    email: sessionStorage.getItem('email') || '',
  });
  const [loading, setLoading] = useState(false);
  const [review, setReview] = useState({ rentalId: '', rating: 1, comment: '' });
  const [reviews, setReviews] = useState([]);
  const [fetchRentalId, setFetchRentalId] = useState('');

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await createReviewApi(review);
      if (result.status === 201) {
        toast.success('Review submitted successfully');
        setReview({ rentalId: '', rating: 1, comment: '' });
        if (fetchRentalId === review.rentalId) {
          fetchReviews(review.rentalId);
        }
      }
    } catch (error) {
      toast.error('Review submission failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (rentalId) => {
    setLoading(true);
    try {
      const response = await getRentalReviewsApi(rentalId);
      setReviews(response.data || []);
    } catch (error) {
      toast.error(`Failed to fetch reviews: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchReviews = (e) => {
    e.preventDefault();
    if (fetchRentalId) {
      fetchReviews(fetchRentalId);
    } else {
      toast.error('Please enter a rental ID');
    }
  };

  return (
    <div className="user-dashboard">
      <Navbar />
      <Container className="py-5">
        <h2 className="mb-5 text-center fw-bold">
          <FaUser className="me-2" /> User Dashboard
        </h2>
        <Row className="justify-content-center">
          {/* Left Column: Profile and View Reviews */}
          <Col md={6} lg={5} className="mb-4">
            {/* Profile Section */}
            <div className="profile-box mb-4">
              <h4 className="mb-4">Your Profile</h4>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    value={user.username}
                    disabled
                    className="modern-input"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    value={user.email}
                    disabled
                    className="modern-input"
                  />
                </Form.Group>
              </Form>
            </div>

            {/* View Reviews Section */}
            <div className="review-box">
              <h4 className="mb-4">View Your Reviews</h4>
              <Form onSubmit={handleFetchReviews} className="mb-4">
                <Form.Group className="mb-3">
                  <Form.Label>Rental ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={fetchRentalId}
                    onChange={(e) => setFetchRentalId(e.target.value)}
                    placeholder="Enter rental ID"
                    className="modern-input"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  className="modern-button"
                >
                  {loading ? <Spinner animation="border" size="sm" /> : 'Fetch Reviews'}
                </Button>
              </Form>
              <div className="reviews-container">
                {reviews.length > 0 ? (
                  reviews.map((rev, index) => (
                    <div key={index} className="review-card">
                      <div className="review-header">
                        <div className="avatar-placeholder">
                          <FaUser />
                        </div>
                        <div>
                          <div className="d-flex align-items-center">
                            <FaStar className="text-warning me-2" />
                            <span className="fw-bold">{rev.rating} / 5</span>
                          </div>
                          <small className="text-muted">
                            By {rev.userId?.username || 'Anonymous'} on {new Date(rev.createdAt).toLocaleDateString()}
                          </small>
                        </div>
                      </div>
                      <p className="review-comment">{rev.comment || 'No comment'}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-muted text-center">No reviews found</p>
                )}
              </div>
            </div>
          </Col>

          {/* Right Column: Submit Review */}
          <Col md={6} lg={7} className="mb-4">
            <div className="review-box">
              <h4 className="mb-4">Submit a Review</h4>
              <Form onSubmit={handleReviewSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Rental ID</Form.Label>
                  <Form.Control
                    type="text"
                    value={review.rentalId}
                    onChange={(e) => setReview({ ...review, rentalId: e.target.value })}
                    placeholder="Enter rental ID"
                    required
                    className="modern-input"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Rating</Form.Label>
                  <Form.Select
                    value={review.rating}
                    onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}
                    className="modern-input"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={review.comment}
                    onChange={(e) => setReview({ ...review, comment: e.target.value })}
                    placeholder="Write your review"
                    className="modern-input"
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={loading}
                  className="modern-button"
                >
                  {loading ? <Spinner animation="border" size="sm" /> : 'Submit Review'}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default UserDashboard;