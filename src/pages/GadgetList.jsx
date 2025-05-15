import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, InputGroup, Button, Spinner } from 'react-bootstrap';
import { allGadgetsApi } from '../services/api';
import { toast } from 'react-toastify';
import GadgetCard from '../components/GadgetCard';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaSearch, FaTimes } from 'react-icons/fa';
import { useSpring, animated } from 'react-spring'; // For animations
import './GadgetList.css'; // Custom CSS for modern styling

function GadgetList() {
  const [gadgets, setGadgets] = useState([]);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('default'); // For sorting
  const [loading, setLoading] = useState(false); // For loading state

  useEffect(() => {
    fetchGadgets();
  }, [search, sort]);

  const fetchGadgets = async () => {
    setLoading(true);
    try {
      const result = await allGadgetsApi(search || '');
      if (result.status === 200) {
        let sortedGadgets = [...result.data];
        if (sort === 'price-asc') {
          sortedGadgets.sort((a, b) => a.price - b.price);
        } else if (sort === 'price-desc') {
          sortedGadgets.sort((a, b) => b.price - a.price);
        }
        setGadgets(sortedGadgets);
      }
    } catch (error) {
      toast.error('Failed to fetch gadgets: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Animation for cards
  const cardAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(20px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: { tension: 200, friction: 20 },
    delay: 100,
  });

  const handleClearSearch = () => {
    setSearch('');
  };

  return (
    <div className="gadget-list-page">
      <Navbar />
      <Container fluid className="py-5">
        {/* Heading and Search Bar Section */}
        <Row className="mb-5 justify-content-center">
          <Col md={8} lg={6} className="text-center">
            <h2 className="mb-4 fw-bold text-dark">Explore All Gadgets</h2>
            <Form.Group>
              <InputGroup className="modern-search-bar">
                <InputGroup.Text className="bg-white border-0">
                  <FaSearch className="text-primary" />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by category"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="border-0 shadow-sm"
                />
                {search && (
                  <InputGroup.Text className="bg-white border-0">
                    <FaTimes
                      className="text-muted cursor-pointer"
                      onClick={handleClearSearch}
                      title="Clear search"
                    />
                  </InputGroup.Text>
                )}
              </InputGroup>
            </Form.Group>
            <Form.Group className="mt-3 d-flex justify-content-center">
              <Form.Select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                style={{ maxWidth: '200px' }}
                className="shadow-sm"
              >
                <option value="default">Sort By: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Gadgets Section */}
        <Container>
          <Row>
            {loading ? (
              <Col className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <p className="text-muted mt-2">Loading gadgets...</p>
              </Col>
            ) : gadgets.length > 0 ? (
              gadgets.map((gadget, index) => (
                <Col xs={12} sm={6} md={4} lg={3} key={gadget._id} className="mb-4">
                  <animated.div style={{ ...cardAnimation, delay: index * 100 }}>
                    <div className="modern-card-container shadow-sm">
                      <GadgetCard gadget={gadget} />
                    </div>
                  </animated.div>
                </Col>
              ))
            ) : (
              <Col>
                <p className="text-muted text-center">No gadgets found</p>
              </Col>
            )}
          </Row>
        </Container>
      </Container>
      <Footer />
    </div>
  );
}

export default GadgetList;