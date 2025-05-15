import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Carousel, Modal, Badge } from 'react-bootstrap';
import { sampleGadgetsApi } from '../services/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  FaLaptop, FaClock, FaShieldAlt, FaStar, FaRocket, FaHeadset, FaLeaf, 
  FaRupeeSign, FaCogs, FaShippingFast, FaMobileAlt, FaCamera, FaGamepad 
} from 'react-icons/fa'; // Replaced FaDollarSign with FaRupeeSign
import './Home.css';

function Home() {
  const [sampleGadgets, setSampleGadgets] = useState([]);
  const [loginStatus, setLoginStatus] = useState(!!sessionStorage.getItem('token'));
  const [showModal, setShowModal] = useState(false);
  const [selectedGadget, setSelectedGadget] = useState(null);

  useEffect(() => {
    fetchSampleGadgets();
  }, []);

  const fetchSampleGadgets = async () => {
    try {
      const response = await sampleGadgetsApi();
      if (response.status === 200) {
        setSampleGadgets(response.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch sample gadgets:', error);
      setSampleGadgets([]);
    }
  };

  const handleShowModal = (gadget) => {
    setSelectedGadget(gadget);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedGadget(null);
    setShowModal(false);
  };

  const getCategoryIcon = (category) => {
    switch (category?.toLowerCase()) {
      case 'laptops & computers':
        return <FaLaptop className="me-2 text-primary" />;
      case 'smartphones':
        return <FaMobileAlt className="me-2 text-primary" />;
      case 'cameras':
        return <FaCamera className="me-2 text-primary" />;
      case 'gaming':
        return <FaGamepad className="me-2 text-primary" />;
      default:
        return <FaCogs className="me-2 text-primary" />;
    }
  };

  return (
    <div>
      <Navbar />
      {/* Hero Section */}
      <section className="py-5 bg-light" style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="fw-bold mb-4 slide-in-left">Rent the Latest Gadgets with Ease</h1>
              <p className="lead slide-in-left" style={{ animationDelay: '0.3s' }}>
                Rentify brings you premium gadgets for short-term use at affordable prices.
              </p>
              <div className="d-flex gap-3 mb-4 slide-in-left" style={{ animationDelay: '0.5s' }}>
                <div className="d-flex align-items-center">
                  <FaRupeeSign className="text-primary me-2" /> {/* Updated to FaRupeeSign */}
                  <span>Affordable Rates</span>
                </div>
                <div className="d-flex align-items-center">
                  <FaCogs className="text-primary me-2" />
                  <span>Wide Variety</span>
                </div>
                <div className="d-flex align-items-center">
                  <FaRocket className="text-primary me-2" />
                  <span>Fast & Easy</span>
                </div>
              </div>
              <Link
                to={loginStatus ? '/gadgetlist' : '/login'}
                className="btn btn-primary mt-3 px-5 py-2 fw-semibold slide-in-left"
                style={{ animationDelay: '0.6s' }}
              >
                <FaRocket className="me-2" /> Start Renting
              </Link>
            </Col>
            <Col md={6}>
              <Carousel id="carouselExample" interval={3000} className="shadow-lg rounded">
                <Carousel.Item>
                  <img
                    src="https://img.freepik.com/premium-photo/gadget-showcase-minimalist-tech-sale-background-with-room-text-generativeai_1258360-12002.jpg"
                    className="d-block w-100 rounded carousel-img"
                    alt="Tech 1"
                    style={{ maxHeight: "400px", objectFit: "cover" }}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    src="https://c4.wallpaperflare.com/wallpaper/535/789/206/new-smartphones-wallpaper-preview.jpg"
                    className="d-block w-100 rounded carousel-img"
                    alt="Tech 2"
                    style={{ maxHeight: "400px", objectFit: "cover" }}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    src="https://img.freepik.com/premium-photo/wireless-headphones-hd-8k-wallpaper-stock-photographic-image_853645-35557.jpg?w=360"
                    className="d-block w-100 rounded carousel-img"
                    alt="Tech 3"
                    style={{ maxHeight: "400px", objectFit: "cover" }}
                  />
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Popular Gadgets Section */}
      {/* Popular Gadgets Section - Updated Design */}
<section className="py-5 bg-white">
  <Container>
    <h2 className="text-center mb-5 fw-bold slide-in-bottom">Popular Gadgets</h2>
    <Row xs={1} md={2} lg={4} className="g-4">
      {sampleGadgets.length > 0 ? (
        sampleGadgets.map((gadget, index) => (
          <Col key={gadget._id || index}>
            <Card className="h-100 border-0 shadow-sm gadget-card" 
              style={{
                transition: 'all 0.3s ease',
                borderRadius: '12px',
                overflow: 'hidden'
              }}>
              {/* Ribbon for trending items */}
              {index % 3 === 0 && (
                <div className="position-absolute top-0 end-0">
                  <div className="ribbon ribbon-top-right">
                    <span className="bg-success">Trending</span>
                  </div>
                </div>
              )}
              
              {/* Card Image with hover zoom effect */}
              <div className="card-img-wrapper" style={{
                height: '120px',
                overflow: 'hidden'
              }}>
                <Card.Img
                  variant="top"
                  src={gadget.image || 'https://via.placeholder.com/150'}
                  style={{
                    height: '100%',
                    width: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease'
                  }}
                />
              </div>
              
              <Card.Body className="d-flex flex-column p-3">
                <Card.Title className="d-flex align-items-center mb-2" style={{
                  fontSize: '0.95rem',
                  minHeight: '40px'
                }}>
                  {getCategoryIcon(gadget.category)}
                  <span className="text-truncate">{gadget.name}</span>
                </Card.Title>
                
                <Card.Text className="text-muted small mb-2" style={{
                  fontSize: '0.8rem',
                  minHeight: '40px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {gadget.description}
                </Card.Text>
                
                <div className="d-flex align-items-center mb-2">
                  <div className="text-warning me-2" style={{ fontSize: '0.8rem' }}>
                    <FaStar /> 4.8
                  </div>
                  <small className="text-muted">(120 reviews)</small>
                </div>
                
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <h5 className="mb-0 text-primary" style={{ fontSize: '1rem' }}>
                    <FaRupeeSign className="me-1" /> {gadget.price}/day
                  </h5>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => handleShowModal(gadget)}
                    className="px-3"
                  >
                    Details
                  </Button>
                </div>
              </Card.Body>
              
              {/* Decorative bottom border */}
              <div style={{
                height: '4px',
                background: 'linear-gradient(90deg, #3498db, #2ecc71)',
                width: '100%'
              }}></div>
            </Card>
          </Col>
        ))
      ) : (
        <Col>
          <div className="text-center py-5">
            <h4>Loading gadgets...</h4>
          </div>
        </Col>
      )}
    </Row>
  </Container>
</section>

      {/* Modal with Updated Icon */}
      {selectedGadget && (
        <Modal show={showModal} onHide={handleCloseModal} centered size="lg" className="modern-modal">
          <Modal.Header closeButton className="border-0 pb-0">
            <Modal.Title className="text-dark fw-bold">{selectedGadget.name || 'N/A'}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="p-4">
            <Row>
              <Col md={6}>
                <div className="modal-image-wrapper">
                  <img
                    src={selectedGadget.image || 'https://via.placeholder.com/400'}
                    alt={selectedGadget.name}
                    className="w-100 rounded shadow-sm modal-image"
                    style={{ maxHeight: '350px', objectFit: 'cover' }}
                  />
                </div>
              </Col>
              <Col md={6}>
                <p className="text-muted mb-2">
                  <strong>Category:</strong> {getCategoryIcon(selectedGadget.category)} {selectedGadget.category || 'N/A'}
                </p>
                <h4 className="text-primary mb-3">
                  <FaRupeeSign className="me-1" /> {selectedGadget.price || 0}/day {/* Updated to FaRupeeSign */}
                </h4>
                <div className="d-flex align-items-center mb-3">
                  <div className="text-warning me-2">
                    <FaStar /> 4.8
                  </div>
                  <small>(Based on 120 reviews)</small>
                </div>
                <p className="text-dark">{selectedGadget.description || 'No description available'}</p>
                <div className="mt-4">
                  <h6 className="fw-semibold text-dark">Why Choose This Gadget?</h6>
                  <ul className="list-unstyled text-muted small">
                    <li className="mb-2 d-flex align-items-start">
                      <FaRocket className="text-primary me-2 mt-1" />
                      Experience cutting-edge technology with {selectedGadget.name || 'this gadget'}. Perfect for professionals, students, or tech enthusiasts.
                    </li>
                    <li className="d-flex align-items-start">
                      <FaLeaf className="text-primary me-2 mt-1" />
                      Renting this gadget gives you access to premium features without the commitment of ownership. Ideal for short-term projects or travel.
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="border-0 pt-0">
            <Button variant="outline-dark" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}

      {/* Features Section */}
    {/* Features Section - Updated Design */}
<section className="py-5" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)' }}>
  <Container>
    <h2 className="text-center mb-5 fw-bold" style={{ color: '#2c3e50' }}>Why Rent with Us?</h2>
    <Row className="g-4">
      <Col md={4}>
        <Card className="h-100 border-0 shadow-sm hover-effect" style={{ 
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}>
          <Card.Body className="text-center p-4">
            <div className="icon-wrapper mb-3" style={{
              width: '70px',
              height: '70px',
              margin: '0 auto',
              borderRadius: '50%',
              background: 'linear-gradient(145deg, #3498db 0%, #2c3e50 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaLaptop className="fs-3 text-white" />
            </div>
            <Card.Title style={{ color: '#2c3e50' }}>Wide Selection</Card.Title>
            <Card.Text style={{ color: '#7f8c8d' }}>
              Laptops, smartphones, cameras, and more – find the perfect gadget for your needs.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="h-100 border-0 shadow-sm hover-effect" style={{ 
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}>
          <Card.Body className="text-center p-4">
            <div className="icon-wrapper mb-3" style={{
              width: '70px',
              height: '70px',
              margin: '0 auto',
              borderRadius: '50%',
              background: 'linear-gradient(145deg, #e74c3c 0%, #c0392b 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaClock className="fs-3 text-white" />
            </div>
            <Card.Title style={{ color: '#2c3e50' }}>Flexible Plans</Card.Title>
            <Card.Text style={{ color: '#7f8c8d' }}>
              Rent for a day, a week, or a month – plans that suit your schedule.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="h-100 border-0 shadow-sm hover-effect" style={{ 
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}>
          <Card.Body className="text-center p-4">
            <div className="icon-wrapper mb-3" style={{
              width: '70px',
              height: '70px',
              margin: '0 auto',
              borderRadius: '50%',
              background: 'linear-gradient(145deg, #2ecc71 0%, #27ae60 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaShieldAlt className="fs-3 text-white" />
            </div>
            <Card.Title style={{ color: '#2c3e50' }}>Secure Rentals</Card.Title>
            <Card.Text style={{ color: '#7f8c8d' }}>
              Safe, reliable, and secure transactions every time.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="h-100 border-0 shadow-sm hover-effect" style={{ 
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}>
          <Card.Body className="text-center p-4">
            <div className="icon-wrapper mb-3" style={{
              width: '70px',
              height: '70px',
              margin: '0 auto',
              borderRadius: '50%',
              background: 'linear-gradient(145deg, #9b59b6 0%, #8e44ad 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaShippingFast className="fs-3 text-white" />
            </div>
            <Card.Title style={{ color: '#2c3e50' }}>Fast Delivery</Card.Title>
            <Card.Text style={{ color: '#7f8c8d' }}>
              Get your gadget delivered to your doorstep in no time.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="h-100 border-0 shadow-sm hover-effect" style={{ 
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}>
          <Card.Body className="text-center p-4">
            <div className="icon-wrapper mb-3" style={{
              width: '70px',
              height: '70px',
              margin: '0 auto',
              borderRadius: '50%',
              background: 'linear-gradient(145deg, #f39c12 0%, #d35400 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaHeadset className="fs-3 text-white" />
            </div>
            <Card.Title style={{ color: '#2c3e50' }}>24/7 Support</Card.Title>
            <Card.Text style={{ color: '#7f8c8d' }}>
              Our support team is here to assist you anytime, anywhere.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card className="h-100 border-0 shadow-sm hover-effect" style={{ 
          background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}>
          <Card.Body className="text-center p-4">
            <div className="icon-wrapper mb-3" style={{
              width: '70px',
              height: '70px',
              margin: '0 auto',
              borderRadius: '50%',
              background: 'linear-gradient(145deg, #1abc9c 0%, #16a085 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <FaLeaf className="fs-3 text-white" />
            </div>
            <Card.Title style={{ color: '#2c3e50' }}>Eco-Friendly</Card.Title>
            <Card.Text style={{ color: '#7f8c8d' }}>
              Renting reduces waste and promotes sustainability.
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
</section>

{/* Discover Rentify Section - Updated Design */}
<section className="py-5" style={{ background: 'linear-gradient(135deg, #2c3e50 0%, #1a252f 100%)' }}>
  <Container>
    <h2 className="text-center mb-5 fw-bold text-white">Discover Rentify</h2>
    <Row className="g-4">
      <Col md={6}>
        <div className="p-4 rounded feature-card-hover" style={{ 
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'transform 0.3s ease'
        }}>
          <div className="d-flex align-items-start">
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'linear-gradient(145deg, #3498db 0%, #2980b9 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginRight: '15px'
            }}>
              <FaRocket className="fs-4 text-white" />
            </div>
            <div>
              <h4 className="fw-semibold text-white">Seamless Rental Experience</h4>
              <p className="text-light" style={{ opacity: 0.9 }}>
                Rentify makes renting gadgets as easy as a few clicks. Choose your gadget, select your rental period, and have it delivered to your doorstep. No hassle, no stress.
              </p>
            </div>
          </div>
        </div>
      </Col>
      <Col md={6}>
        <div className="p-4 rounded feature-card-hover" style={{ 
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'transform 0.3s ease'
        }}>
          <div className="d-flex align-items-start">
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'linear-gradient(145deg, #2ecc71 0%, #27ae60 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginRight: '15px'
            }}>
              <FaRupeeSign className="fs-4 text-white" />
            </div>
            <div>
              <h4 className="fw-semibold text-white">Save Money, Stay Updated</h4>
              <p className="text-light" style={{ opacity: 0.9 }}>
                Why buy when you can rent? Get access to the latest gadgets without breaking the bank. Perfect for trying out new tech before committing to a purchase.
              </p>
            </div>
          </div>
        </div>
      </Col>
      <Col md={6}>
        <div className="p-4 rounded feature-card-hover" style={{ 
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'transform 0.3s ease'
        }}>
          <div className="d-flex align-items-start">
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'linear-gradient(145deg, #f39c12 0%, #e67e22 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginRight: '15px'
            }}>
              <FaHeadset className="fs-4 text-white" />
            </div>
            <div>
              <h4 className="fw-semibold text-white">Dedicated Support</h4>
              <p className="text-light" style={{ opacity: 0.9 }}>
                Our team is available 24/7 to assist with any questions or issues. From setup to troubleshooting, we've got you covered.
              </p>
            </div>
          </div>
        </div>
      </Col>
      <Col md={6}>
        <div className="p-4 rounded feature-card-hover" style={{ 
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          transition: 'transform 0.3s ease'
        }}>
          <div className="d-flex align-items-start">
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: 'linear-gradient(145deg, #1abc9c 0%, #16a085 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              marginRight: '15px'
            }}>
              <FaLeaf className="fs-4 text-white" />
            </div>
            <div>
              <h4 className="fw-semibold text-white">Eco-Friendly Choice</h4>
              <p className="text-light" style={{ opacity: 0.9 }}>
                Renting with Rentify reduces electronic waste and promotes a sustainable lifestyle. Join us in making a positive impact on the planet.
              </p>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  </Container>
</section>

      <Footer />
    </div>
  );
}

export default Home;