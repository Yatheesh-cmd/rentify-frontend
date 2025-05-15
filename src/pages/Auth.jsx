import React, { useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginApi, registerApi } from '../services/api';
import { authContext } from '../context/ContextApi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Auth({ isLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'user',
    address: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const { setAuth, setContextRole } = useContext(authContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : formData;

      console.log('Submitting payload:', { email: payload.email });

      const apiCall = isLogin ? loginApi : registerApi;
      const result = await apiCall(payload);

      if (result.status === 200 || result.status === 201) {
        sessionStorage.setItem('token', result.data.token);
        sessionStorage.setItem('role', result.data.user.role);
        sessionStorage.setItem('user', result.data.user.username);
        sessionStorage.setItem('email', result.data.user.email);
        setAuth(true);
        setContextRole(result.data.user.role);
        toast.success(isLogin ? 'Logged in successfully' : 'Registered successfully');
        navigate(result.data.user.role === 'admin' ? '/admin-dashboard' : '/profile');
      } else {
        toast.error(result.data?.message || 'Operation failed');
      }
    } catch (error) {
      toast.error(error.message || 'An error occurred');
      setFormData({ ...formData, password: '' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(https://img.freepik.com/free-photo/vivid-blurred-colorful-wallpaper-background_58702-3798.jpg)`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Navbar />
      <Container className="py-5">
        <Row className="justify-content-center align-items-center">
          <Col md={10} lg={8}>
            <Card className="shadow-lg" style={{ borderRadius: '15px', overflow: 'hidden' }}>
              <Row className="g-0">
                {/* Image Column */}
                <Col
                  md={6}
                  className="d-none d-md-block"
                  style={{
                    backgroundColor: '#f8f9fa',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px',
                  }}
                >
                  <img
                    src={
                      isLogin
                        ? 'https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg'
                        : 'https://img.freepik.com/free-vector/sign-concept-illustration_114360-125.jpg'
                    }
                    alt={isLogin ? 'Login Illustration' : 'Register Illustration'}
                    style={{
                      width: '100%',
                      maxWidth: '300px',
                      height: 'auto',
                      objectFit: 'contain',
                    }}
                  />
                </Col>
                {/* Form Column */}
                <Col md={6} className="p-4">
                  <Card.Body>
                    <h2 className="text-center mb-4">{isLogin ? 'Login' : 'Register'}</h2>
                    <Form onSubmit={handleSubmit}>
                      {!isLogin && (
                        <Form.Group className="mb-3">
                          <Form.Label>Username</Form.Label>
                          <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            required
                          />
                        </Form.Group>
                      )}
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter email"
                          required
                        />
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter password"
                          required
                        />
                      </Form.Group>
                      {!isLogin && (
                        <>
                          <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                              type="text"
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              placeholder="Enter address"
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                              type="text"
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="Enter phone number"
                            />
                          </Form.Group>
                          <Form.Group className="mb-3">
                            <Form.Label>Role</Form.Label>
                            <Form.Select name="role" value={formData.role} onChange={handleChange}>
                              <option value="user">User</option>
                              <option value="admin">Admin</option>
                            </Form.Select>
                          </Form.Group>
                        </>
                      )}
                      <Button
                        variant="primary"
                        type="submit"
                        disabled={loading}
                        className="w-100"
                        style={{ borderRadius: '8px', padding: '10px' }}
                      >
                        {loading ? (
                          <Spinner animation="border" size="sm" />
                        ) : isLogin ? (
                          'Login'
                        ) : (
                          'Register'
                        )}
                      </Button>
                    </Form>
                    <p className="text-center mt-3">
                      {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
                      <Button
                        variant="link"
                        onClick={() => navigate(isLogin ? '/register' : '/login')}
                        style={{ textDecoration: 'none' }}
                      >
                        {isLogin ? 'Register' : 'Login'}
                      </Button>
                    </p>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Auth;