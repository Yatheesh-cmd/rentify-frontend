import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Spinner, Badge } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { allRentalsApi } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaBox, FaPhone } from 'react-icons/fa';

function Orders() {
  const [rentals, setRentals] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRentals = async () => {
      setLoading(true);
      try {
        const response = await allRentalsApi();
        console.log('Fetched rentals:', response.data);
        if (response.data && response.data.length > 0) {
          console.log('First rental userId:', response.data[0].userId);
        }
        setRentals(response.data || []);
      } catch (error) {
        toast.error('Failed to fetch rentals: ' + error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRentals();
  }, []);

  const filteredRentals = rentals.filter(rental => {
    if (filter === 'all') return true;
    return rental.status.toLowerCase() === filter;
  });

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return <Badge bg="warning" text="dark">Pending</Badge>;
      case 'completed':
        return <Badge bg="success">Completed</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  return (
    <div>
      <Navbar />
      <Container className="py-5">
        <h2 className="mb-4">
          <FaBox /> Orders Management
        </h2>
        
        <Row className="mb-4">
          <Col>
            <div className="d-flex flex-wrap gap-2">
              <Button
                variant={filter === 'all' ? 'primary' : 'outline-primary'}
                onClick={() => setFilter('all')}
              >
                All Orders
              </Button>
              <Button
                variant={filter === 'pending' ? 'primary' : 'outline-primary'}
                onClick={() => setFilter('pending')}
              >
                Pending Orders
              </Button>
              <Button
                variant={filter === 'completed' ? 'primary' : 'outline-primary'}
                onClick={() => setFilter('completed')}
              >
                Completed Orders
              </Button>
            </div>
          </Col>
        </Row>

        {loading ? (
          <div className="text-center my-5">
            <Spinner animation="border" />
            <p className="mt-2">Loading orders...</p>
          </div>
        ) : filteredRentals.length > 0 ? (
          <div className="table-responsive">
            <Table striped bordered hover className="mt-3">
              <thead className="table-dark">
                <tr>
                  <th>User</th>
                  {/* <th><FaPhone /> Phone</th> */}
                  <th>Gadgets</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Order Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredRentals.map(rental => {
                  // Log the raw userId object for this rental
                  console.log(`Raw userId for rental ${rental._id}:`, rental.userId);
                  return (
                    <tr key={rental._id}>
                      <td>
                        <strong>{rental.userId?.username || 'N/A'}</strong>
                        <div className="text-muted small">{rental.userId?.email || ''}</div>
                      </td>
                      {/* <td>
                        {rental.userId?.phone ? (
                          <a href={`tel:${rental.userId.phone}`} className="text-decoration-none">
                            {rental.userId.phone}
                          </a>
                        ) : (
                          <span className="text-muted">Not provided</span>
                        )}
                      </td> */}
                      <td>
                        <ul className="list-unstyled mb-0">
                          {rental.gadgets.map((g, index) => (
                            <li key={index}>
                              {g.name} <small>({g.rentalDays} days)</small>
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="fw-bold">₹{rental.total.toLocaleString()}</td>
                      <td>{getStatusBadge(rental.status)}</td>
                      <td>{new Date(rental.createdAt).toLocaleDateString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        ) : (
          <div className="text-center py-5">
            <h4 className="text-muted">No {filter === 'all' ? '' : filter} orders found</h4>
            <Button variant="outline-primary" onClick={() => setFilter('all')} className="mt-3">
              Show All Orders
            </Button>
          </div>
        )}
      </Container>
      <Footer />
    </div>
  );
}

export default Orders;