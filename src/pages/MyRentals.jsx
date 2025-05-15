import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Card, Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userRentalsApi } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaBox } from 'react-icons/fa';

function MyRentals() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRentals();
    if (location.state?.order) {
      setRentals([location.state.order, ...rentals]);
    }
  }, [location.state]);

  const fetchRentals = async () => {
    setLoading(true);
    try {
      const response = await userRentalsApi();
      setRentals(response.data || []);
    } catch (error) {
      toast.error('Failed to fetch rentals: ' + error.message);
      if (error.message === 'No token provided' || error.message === 'Invalid token') {
        sessionStorage.clear();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <Container className="py-5">
        <h2 className="mb-4">
          <FaBox /> My Rentals
        </h2>
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" />
          </div>
        ) : rentals.length > 0 ? (
          rentals.map(rental => (
            <Card key={rental._id} className="shadow-sm mb-4" style={{ borderRadius: '12px' }}>
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <h5>Rental ID: {rental._id}</h5>
                    <p><strong>Status:</strong> {rental.status}</p>
                    <p><strong>Date:</strong> {new Date(rental.createdAt).toLocaleDateString()}</p>
                    <Table responsive striped bordered hover>
                      <thead>
                        <tr>
                          <th>Gadget</th>
                          <th>Rental Days</th>
                          <th>Price/Day</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rental.gadgets.map((item, index) => (
                          <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.rentalDays}</td>
                            <td>₹{item.price}</td>
                            <td>₹{item.total}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                  <Col md={4} className="d-flex align-items-center justify-content-end">
                    <div>
                      <h5>Total: ₹{rental.total}</h5>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p className="text-center mt-4">No rentals found</p>
        )}
      </Container>
      <Footer />
    </div>
  );
}

export default MyRentals;