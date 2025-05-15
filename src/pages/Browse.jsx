import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { allGadgetsApi } from '../services/api';
import { toast } from 'react-toastify';
import GadgetCard from '../components/GadgetCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaSearch } from 'react-icons/fa';
import Cart from '../components/Cart';

function Browse() {
  const { category } = useParams();
  const [gadgets, setGadgets] = useState([]);
  const [search, setSearch] = useState(category || '');

  useEffect(() => {
    fetchGadgets();
  }, [search, category]);

  const fetchGadgets = async () => {
    try {
      const result = await allGadgetsApi(search || category);
      if (result.status === 200) {
        setGadgets(result.data);
      }
    } catch (error) {
      toast.error('Failed to fetch gadgets: ' + error.message);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#f8f9fa', // Light background for consistency
      }}
    >
      <Navbar />
      <Container fluid className="py-5 flex-grow-1">
        {/* Search Bar Section */}
        <Container>
          <Row className="justify-content-center mb-5">
            <Col md={8} lg={6}>
              <Card className="shadow-lg p-3" style={{ borderRadius: '12px' }}>
                <Card.Body>
                  <h2 className="text-center mb-4 fw-bold">
                    {category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Gadgets` : 'Browse Gadgets'}
                  </h2>
                  <Form.Group>
                    <InputGroup>
                      <InputGroup.Text>
                        <FaSearch />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Search by category"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        style={{ borderRadius: '8px' }}
                      />
                    </InputGroup>
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Gadgets and Cart Section */}
        <Container>
          <Row>
            {/* Gadgets Grid (Main Content) */}
            <Col lg={8} className="mb-4">
              <Row>
                {gadgets.length > 0 ? (
                  gadgets.map(gadget => (
                    <Col xs={12} sm={6} md={4} lg={4} key={gadget._id} className="mb-4">
                      <GadgetCard gadget={gadget} />
                    </Col>
                  ))
                ) : (
                  <Col>
                    <p className="text-muted text-center">No gadgets found</p>
                  </Col>
                )}
              </Row>
            </Col>

            {/* Cart Sidebar */}
            <Col lg={4} className="mb-4">
              <div className="sticky-top" style={{ top: '20px' }}>
                <Cart />
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Footer />
    </div>
  );
}

export default Browse;