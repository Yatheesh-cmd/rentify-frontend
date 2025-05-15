import React, { useState, useContext } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import { cartContext } from '../context/ContextApi';
import { toast } from 'react-toastify';
import { initiatePaymentApi, verifyPaymentApi } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { useRazorpay } from 'react-razorpay';
import { FaShoppingCart } from 'react-icons/fa';

function Cart() {
  const { cart, setCart } = useContext(cartContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { Razorpay } = useRazorpay();

  const handleRentalDaysChange = (id, delta) => {
    const updatedCart = cart.map(item =>
      item._id === id ? { ...item, rentalDays: Math.max(1, (item.rentalDays || 1) + delta) } : item
    );
    setCart(updatedCart);
  };

  const handleRemove = (id) => {
    const updatedCart = cart.filter(item => item._id !== id);
    setCart(updatedCart);
    toast.info('Item removed from cart');
  };

  const validateCart = () => {
    if (cart.length === 0) {
      toast.warning('Cart is empty');
      return false;
    }
    const invalidItems = cart.filter(item => {
      const hasPrice = item.price && !isNaN(Number(item.price)) && Number(item.price) > 0;
      const hasRentalDays = item.rentalDays && !isNaN(Number(item.rentalDays)) && Number(item.rentalDays) > 0;
      return !hasPrice || !hasRentalDays;
    });
    if (invalidItems.length > 0) {
      toast.warning('Cart contains items with invalid price or rental days');
      return false;
    }
    return true;
  };

  const handleCheckout = async () => {
    if (!validateCart()) return;
    setLoading(true);

    try {
      const paymentCart = cart.map(item => ({
        gadgetId: item._id,
        name: item.name,
        price: Number(item.price),
        rentalDays: Number(item.rentalDays || 1),
        total: Number(item.price) * Number(item.rentalDays || 1),
      }));

      const response = await initiatePaymentApi({ gadgets: paymentCart });
      if (response.status !== 200 || !response.data.orderId) {
        throw new Error(response.data?.message || 'Failed to initiate payment');
      }

      const { orderId, amount, currency, dbOrderId } = response.data;

      const options = {
        key: 'rzp_test_BQZeGK1Esi5rzS',
        amount,
        currency,
        order_id: orderId,
        name: 'Rentify',
        description: 'Gadget Rental Payment',
        handler: async (response) => {
          try {
            const verifyResponse = await verifyPaymentApi({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              dbOrderId,
            });
            if (verifyResponse.status === 200 && verifyResponse.data.order) {
              toast.success('Payment successful!');
              setCart([]);
              navigate('/myrentals', { state: { order: verifyResponse.data.order } });
            } else {
              throw new Error(verifyResponse.data?.message || 'Payment verification failed');
            }
          } catch (error) {
            toast.error(error.message || 'Payment verification failed');
          }
        },
        prefill: {
          name: sessionStorage.getItem('user') || 'User Name',
          email: sessionStorage.getItem('email') || 'user@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#ffc0cb',
        },
      };

      const rzp = new Razorpay(options);
      rzp.on('payment.failed', (response) => {
        toast.error(`Payment failed: ${response.error.description}`);
      });
      rzp.open();
    } catch (error) {
      toast.error(error.message || 'Payment initiation failed');
      if (error.message === 'No token provided' || error.message === 'Invalid token') {
        sessionStorage.clear();
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  const total = cart.reduce((sum, item) => sum + Number(item.price) * (item.rentalDays || 1), 0);

  return (
    <div className="p-4 bg-white shadow-sm rounded">
      <h4>
        <FaShoppingCart /> Your Cart ({cart.length})
      </h4>
      {cart.length === 0 ? (
        <p className="text-muted text-center my-4">Your cart is empty</p>
      ) : (
        <>
          <Table responsive striped bordered hover className="align-middle">
            <thead>
              <tr>
                <th>Image</th>
                <th>Gadget</th>
                <th>Price per Day</th>
                <th>Rental Days</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map(item => (
                <tr key={item._id}>
                  <td>
                    <img
                      src={item.image || 'https://via.placeholder.com/50'}
                      alt={item.name}
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>₹{Number(item.price).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleRentalDaysChange(item._id, -1)}
                      style={{ borderRadius: '50%', width: '32px', height: '32px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      -
                    </Button>
                    <span className="mx-2">{item.rentalDays || 1}</span>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleRentalDaysChange(item._id, 1)}
                      style={{ borderRadius: '50%', width: '32px', height: '32px', padding: '0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      +
                    </Button>
                  </td>
                  <td>₹{(Number(item.price) * (item.rentalDays || 1)).toFixed(2)}</td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleRemove(item._id)}
                      style={{ borderRadius: '20px', padding: '0.25rem 0.75rem' }}
                    >
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <h5>Total: ₹{total.toFixed(2)}</h5>
            <Button
              variant="success"
              onClick={handleCheckout}
              disabled={loading}
            >
              {loading ? <Spinner animation="border" size="sm" /> : 'Checkout'}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;