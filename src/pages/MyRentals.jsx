import React, { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Table, Card, Spinner, Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userRentalsApi } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaBox, FaFilePdf } from 'react-icons/fa';
import { usePDF } from 'react-to-pdf';

function MyRentals() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toPDF, targetRef } = usePDF({ filename: 'rental-details.pdf' });

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
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">
            <FaBox /> My Rentals
          </h2>
          {rentals.length > 0 && (
            <Button variant="primary" onClick={() => toPDF()}>
              <FaFilePdf className="me-2" />
              Download All as PDF
            </Button>
          )}
        </div>
        
        <div ref={targetRef}>
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
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5>Rental ID: {rental._id}</h5>
                        <Button 
                          variant="outline-primary" 
                          size="sm"
                          onClick={() => toPDF({ filename: `rental-${rental._id}.pdf` })}
                        >
                          <FaFilePdf className="me-1" />
                          Download
                        </Button>
                      </div>
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
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default MyRentals;