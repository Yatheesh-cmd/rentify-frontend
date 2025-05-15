import React, { useState, useContext } from 'react';
import { Modal, Button, Row, Col, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { addGadgetApi } from '../services/api';
import { gadgetResponseContext } from '../context/ContextApi';

function AddGadget() {
  const [show, setShow] = useState(false);
  const [gadget, setGadget] = useState({ name: "", description: "", category: "", price: "", image: "" });
  const [loading, setLoading] = useState(false);
  const { setGadgetResponse } = useContext(gadgetResponseContext);

  const handleSubmit = async () => {
    const { name, description, category, price, image } = gadget;
    if (!name || !description || !category || !price || !image) {
      toast.warning("Please fill in all fields");
      return;
    }
    if (isNaN(price) || Number(price) <= 0) {
      toast.warning("Price must be a positive number");
      return;
    }
    setLoading(true);

    try {
      const result = await addGadgetApi(gadget);
      if (result.status === 200) {
        toast.success("Gadget added successfully");
        setGadgetResponse(result);
        handleClose();
      } else {
        toast.error(result.data?.message || "Failed to add gadget");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShow(false);
    setGadget({ name: "", description: "", category: "", price: "", image: "" });
  };

  return (
    <>
      <Button variant="outline-success" onClick={() => setShow(true)}>Add Gadget</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Gadget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Image URL"
                value={gadget.image}
                onChange={(e) => setGadget({ ...gadget, image: e.target.value })}
              />
              <img
                src={gadget.image || "https://via.placeholder.com/150"}
                alt="Gadget preview"
                className="img-fluid"
              />
            </Col>
            <Col>
              <input
                className="form-control mb-3"
                placeholder="Name"
                value={gadget.name}
                onChange={(e) => setGadget({ ...gadget, name: e.target.value })}
              />
              <input
                className="form-control mb-3"
                placeholder="Description"
                value={gadget.description}
                onChange={(e) => setGadget({ ...gadget, description: e.target.value })}
              />
              <input
                className="form-control mb-3"
                placeholder="Category"
                value={gadget.category}
                onChange={(e) => setGadget({ ...gadget, category: e.target.value })}
              />
              <input
                className="form-control mb-3"
                placeholder="Price per Day"
                type="number"
                min="0"
                value={gadget.price}
                onChange={(e) => setGadget({ ...gadget, price: e.target.value })}
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose} disabled={loading}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Add Gadget"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddGadget;