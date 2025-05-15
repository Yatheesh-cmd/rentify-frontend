import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaInfoCircle, FaUsers, FaLaptop } from 'react-icons/fa';

function About() {
  return (
    <div>
      <Navbar />
      <Container className="py-5">
        <h2 className="text-center mb-5 slide-in-bottom">
          <FaInfoCircle /> About Rentify
        </h2>
        <Row className="mb-5">
          <Col md={6}>
            <h3 className="mb-3 slide-in-left">Our Mission</h3>
            <p className="lead slide-in-left" style={{ animationDelay: '0.3s' }}>
              At Rentify, we aim to make technology accessible to everyone by providing a seamless gadget rental experience.
            </p>
            <p className="slide-in-left" style={{ animationDelay: '0.6s' }}>
              Whether you need a laptop for a project, a smartphone for a trip, or any other gadget for a short period, Rentify has got you covered.
            </p>
          </Col>
          <Col md={6}>
            <img
              src="https://img.freepik.com/premium-photo/gadget-showcase-minimalist-tech-sale-background-with-room-text-generativeai_1258360-12002.jpg"
              alt="About Rentify"
              className="img-fluid rounded shadow slide-in-right"
              style={{ maxHeight: '300px', objectFit: 'cover' }}
            />
          </Col>
        </Row>
        <Row>
          <Col md={4}>
            <Card className="text-center shadow-sm zoom-in">
              <Card.Body>
                <FaUsers className="fs-1 text-primary mb-3" />
                <Card.Title>Trusted by Thousands</Card.Title>
                <Card.Text>
                  Join a community of users who trust Rentify for their tech needs.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm zoom-in" style={{ animationDelay: '0.2s' }}>
              <Card.Body>
                <FaLaptop className="fs-1 text-primary mb-3" />
                <Card.Title>Wide Range of Gadgets</Card.Title>
                <Card.Text>
                  From laptops to smartwatches, we have it all.available each item
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="text-center shadow-sm zoom-in" style={{ animationDelay: '0.4s' }}>
              <Card.Body>
                <FaInfoCircle className="fs-1 text-primary mb-3" />
                <Card.Title>Easy Process</Card.Title>
                <Card.Text>
                  Rent gadgets in just a few clicks with our user-friendly platform.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default About;