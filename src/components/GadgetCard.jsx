import React, { useContext, useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap'; // Import Modal from react-bootstrap
import { FaLaptop, FaStar } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { cartContext } from '../context/ContextApi';

function GadgetCard({ gadget }) {
  const { cart, setCart } = useContext(cartContext);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  // Handle adding to cart
  const handleAddToCart = () => {
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

  // Show the modal
  const handleShowModal = () => setShowModal(true);
  
  // Hide the modal
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      {/* Gadget Card */}
      <Card className="shadow-sm" style={{ borderRadius: '12px', overflow: 'hidden' }}>
        <Card.Img
          variant="top"
          src={gadget.image || 'https://via.placeholder.com/150'}
          style={{ height: '150px', objectFit: 'cover' }}
        />
        <Card.Body>
          <Card.Title>{gadget.name || 'N/A'}</Card.Title>
          <Card.Text>{gadget.description || 'No description'}</Card.Text>
          <Card.Text>
            <strong>Category:</strong> {gadget.category || 'N/A'}
          </Card.Text>
          <Card.Text>
            <strong>Price per Day:</strong> ₹{gadget.price || 0}
          </Card.Text>
          <div className="d-flex gap-2">
            <Button variant="primary" onClick={handleAddToCart}>
              <FaLaptop className="me-1" /> Add to Cart
            </Button>
            <Button variant="outline-secondary" onClick={handleShowModal}>
              View Details
            </Button>
          </div>
        </Card.Body>
      </Card>

      {/* Modal for Viewing Details */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{gadget.name || 'N/A'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center mb-3">
            <img
              src={gadget.image || 'https://via.placeholder.com/400'}
              alt={gadget.name}
              style={{ maxHeight: '300px', maxWidth: '100%', objectFit: 'cover' }}
            />
          </div>
          <p className="text-muted"><strong>Category:</strong> {gadget.category || 'N/A'}</p>
          <div className="d-flex align-items-center mb-3">
            <h4 className="text-primary me-3">₹{gadget.price || 0}/day</h4>
            <div className="text-warning">
              <FaStar /> 4.8
            </div>
          </div>
          <p>{gadget.description || 'No description available'}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddToCart}>
            <FaLaptop className="me-1" /> Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default GadgetCard;