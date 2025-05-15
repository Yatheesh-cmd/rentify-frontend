import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getGadgetByIdApi } from '../services/api';
import { cartContext } from '../context/ContextApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaShoppingCart, FaStar } from 'react-icons/fa';

function GadgetDetails() {
  const { id } = useParams();
  const [gadget, setGadget] = useState(null);
  const { cart, setCart } = useContext(cartContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGadget();
  }, [id]);

  const fetchGadget = async () => {
    try {
      const response = await getGadgetByIdApi(id);
      if (response.status === 200) {
        setGadget(response.data);
      }
    } catch (error) {
      toast.error('Failed to fetch gadget details: ' + error.message);
      navigate('/browse');
    }
  };

  const handleAddToCart = () => {
    if (!gadget) return;
    const existingItem = cart.find(item => item._id === gadget._id);
    if (existingItem) {
      setCart(cart.map(item =>
        item._id === gadget._id ? { ...item, rentalDays: (item.rentalDays || 1) + 1 } : item
      ));
    } else {
      setCart([...cart, { ...gadget, rentalDays: 1 }]);
    }
    toast.success(`${gadget.name} added to cart`);
  };

  if (!gadget) {
    return (
      <div>
        <Navbar />
        <Container className="py-5 text-center">
          <h3>Loading...</h3>
        </Container>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Container className="py-5">
        <Row>
          <Col md={6}>
            <Card className="shadow-sm">
              <Card.Img
                src={gadget.image || 'https://via.placeholder.com/400'}
                style={{ height: '400px', objectFit: 'cover' }}
              />
            </Card>
          </Col>
          <Col md={6}>
            <h2>{gadget.name}</h2>
            <p className="text-muted">{gadget.category}</p>
            <div className="d-flex align-items-center mb-3">
              <h4 className="text-primary me-3">₹{gadget.price}/day</h4>
              <div className="text-warning">
                <FaStar /> 4.8
              </div>
            </div>
            <p>{gadget.description}</p>
            <Button variant="primary" onClick={handleAddToCart}>
              <FaShoppingCart className="me-2" /> Add to Cart
            </Button>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default GadgetDetails;