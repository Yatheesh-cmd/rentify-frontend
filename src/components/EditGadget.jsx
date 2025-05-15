import React, { useState, useEffect, useContext } from 'react';
import { Button, Modal, Row, Col, Spinner } from 'react-bootstrap';
import { updateGadgetApi } from '../services/api';
import { toast } from 'react-toastify';
import { gadgetResponseContext } from '../context/ContextApi';

function EditGadget({ gadget }) {
  const [show, setShow] = useState(false);
  const [gadgetData, setGadgetData] = useState({ name: "", description: "", category: "", price: "", image: "" });
  const [loading, setLoading] = useState(false);
  const { setGadgetResponse } = useContext(gadgetResponseContext);

  useEffect(() => {
    setGadgetData(gadget);
  }, [gadget]);

  const handleEdit = async () => {
    const { name, description, category, price, image } = gadgetData;
    if (!name || !description || !category || !price || !image) {
      toast.warning("Please fill in all fields");
      return;
    }
    if (isNaN(price) || Number(price) <= 0) {
      toast.warning("Price must be a positive number");
      return;
    }
    if (JSON.stringify(gadgetData) === JSON.stringify(gadget)) {
      toast.info("No changes detected");
      return;
    }
    if (window.confirm("Are you sure you want to update this gadget?")) {
      setLoading(true);
      try {
        const result = await updateGadgetApi(gadget._id, gadgetData);
        if (result.status === 200) {
          toast.success("Gadget updated successfully");
          setGadgetResponse(result);
          handleClose();
        } else {
          toast.error(result.data?.message || "Update failed");
        }
      } catch (error) {
        toast.error(error.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClose = () => {
    setShow(false);
    setGadgetData(gadget);
  };

  return (
    <>
      <button className="btn" onClick={() => setShow(true)}>
        <i className="fa-solid fa-pen-to-square fa-lg text-warning"></i>
      </button>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Gadget</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <input
                type="text"
                className="form-control mb-3"
                placeholder="Image URL"
                value={gadgetData.image}
                onChange={(e) => setGadgetData({ ...gadgetData, image: e.target.value })}
              />
              <img
                src={gadgetData.image || "https://via.placeholder.com/150"}
                alt="Gadget preview"
                className="img-fluid my-3"
              />
            </Col>
            <Col>
              <input
                type="text"
                value={gadgetData.name}
                onChange={(e) => setGadgetData({ ...gadgetData, name: e.target.value })}
                className="form-control mb-3"
                placeholder="Name"
              />
              <input
                type="text"
                value={gadgetData.description}
                onChange={(e) => setGadgetData({ ...gadgetData, description: e.target.value })}
                className="form-control mb-3"
                placeholder="Description"
              />
              <input
                type="text"
                value={gadgetData.category}
                onChange={(e) => setGadgetData({ ...gadgetData, category: e.target.value })}
                className="form-control mb-3"
                placeholder="Category"
              />
              <input
                type="number"
                value={gadgetData.price}
                onChange={(e) => setGadgetData({ ...gadgetData, price: e.target.value })}
                className="form-control mb-3"
                placeholder="Price per Day"
                min="0"
              />
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose} disabled={loading}>
            Close
          </Button>
          <Button variant="info" onClick={handleEdit} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditGadget;