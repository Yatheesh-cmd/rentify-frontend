import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function Contact() {
  return (
    <div>
      <Navbar />
      <Container className="py-5">
        <h2 className="text-center mb-5 slide-in-bottom">Contact Us</h2>
        <Row>
          <Col md={6} className="mb-4">
            <Card className="shadow-sm">
              <Card.Img
                src="https://dcassetcdn.com/design_img/610503/155800/155800_3962902_610503_image.jpg"
                alt="Contact Us"
                style={{ height: '280px', objectFit: 'cover' }}
              />
            </Card>
          </Col>
          <Col md={6}>
            <Card className="shadow-sm p-4 slide-in-right">
              <Card.Body>
                <h4>Get in Touch</h4>
                <p>We'd love to hear from you! Reach out with any questions or feedback.</p>
                <div className="mb-3">
                  <FaPhone className="me-2 text-primary" />
                  <strong>Phone:</strong> +91 98765 43210
                </div>
                <div className="mb-3">
                  <FaEnvelope className="me-2 text-primary" />
                  <strong>Email:</strong> support@rentify.com
                </div>
                <div className="mb-3">
                  <FaMapMarkerAlt className="me-2 text-primary" />
                  <strong>Address:</strong> 123 Tech Street, Bangalore, India
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Contact;