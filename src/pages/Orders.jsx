// src/pages/Orders.js
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { allRentalsApi } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaBox } from 'react-icons/fa';

function Orders() {
  const [rentals, setRentals] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed'
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRentals();
  }, []);

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

  const filteredRentals = rentals.filter(rental => {
    if (filter === 'all') return true;
    return rental.status.toLowerCase() === filter;
  });

  return (
    <div>
      <Navbar />
      <Container className="py-5">
        <h2 className="mb-4">
          <FaBox /> Orders
        </h2>
        <Row className="mb-3">
          <Col>
            <Button
              variant={filter === 'all' ? 'primary' : 'outline-primary'}
              onClick={() => setFilter('all')}
              className="me-2"
            >
              All Orders
            </Button>
            <Button
              variant={filter === 'pending' ? 'primary' : 'outline-primary'}
              onClick={() => setFilter('pending')}
              className="me-2"
            >
              Pending Orders
            </Button>
            <Button
              variant={filter === 'completed' ? 'primary' : 'outline-primary'}
              onClick={() => setFilter('completed')}
            >
              Completed Orders
            </Button>
          </Col>
        </Row>
        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" />
          </div>
        ) : filteredRentals.length > 0 ? (
          <Table responsive striped bordered hover>
            <thead>
              <tr>
                <th>User</th>
                <th>Gadgets</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredRentals.map(rental => (
                <tr key={rental._id}>
                  <td>{rental.userId?.username || 'N/A'}</td>
                  <td>
                    {rental.gadgets.map(g => `${g.name} (${g.rentalDays} days)`).join(', ')}
                  </td>
                  <td>₹{rental.total}</td>
                  <td>{rental.status}</td>
                  <td>{new Date(rental.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p className="text-center mt-4">No {filter === 'all' ? '' : filter} orders found</p>
        )}
      </Container>
      <Footer />
    </div>
  );
}

export default Orders;