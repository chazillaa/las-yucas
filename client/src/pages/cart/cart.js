import React, { useState, useEffect } from 'react';
import { Link, redirect } from "react-router-dom";
import axios from 'axios';
import { MenuItem } from "../../components/MenuItem";
import './cart.css'
import Modal from "react-bootstrap/Modal";

const Cart = (props) => {

  //modal 
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {setShowModal(false);
    return redirect('/')
  }

  const [userEmail, setUserEmail] = useState("test@test.com");
  const [pickupTime, setPickupTime] = useState("20-30 minutes");
  const [totalWithoutTax, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState([])
  const tax = Math.ceil(totalWithoutTax * 8) / 100;
  const totalWithTax = totalWithoutTax + tax;

  // toggle auth for menu
  const [isLogged, showIsLogged] = useState(false);
  const [isLoading, updateLoading] = useState(true);

  //when cart loads grab users cart from server
  useEffect(() => {
    getCart();
  }, []);

  async function getCart() {
    const token = localStorage.getItem('token');
    if (token) {
      const url = "/api/cart";
      const { data: cart } = await axios.get(url, { headers: { Authorization: 'Bearer ' + token } });
      if (cart) {
        updateLoading(false);
        setTotal(cart.price);
        setUserEmail(cart.user.email);
        setCartItems(cart.menuItems);
      }
    }
  }

  async function deleteFromCart(event) {
    event.preventDefault();
    const deleteCart = async (data) => {
      try {
        const url = `/api/cart/${data}`
        const { data: res } = await axios.delete(url, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } })
        props.setCount(res.count);//this line should be where the code calls a useState to update the cart count
      } catch (err) {
        console.log(err)
      }
    };

    deleteCart(event.target.dataset.itemId);
    getCart();
  }

  async function completePurchase(e) {
    e.preventDefault();
    const url = '/api/cart/purchase';
    const { data: res } = await axios.post(url, null, { headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
    if (res.success) {
      handleShowModal()
    }
  }

  return (
    <div>
      <div className="p-5 text-center">
        <h1 className="mb-3">Cart</h1>
      </div>
      {isLoading ? <div>Please wait while the cart loads</div> :
        cartItems && cartItems.length > 0 ?
          <div>
            <div className='container container-cart'>
              <div className='row'>
                {cartItems.map((item, index) => (
                  <MenuItem className="col-lg-4 col-md-6 mb-4" isLogged={isLogged} item={item} deleteFromCart={deleteFromCart} />
                ))}
              </div>
            </div>
            <div className="checkout-window d-flex flex-column flex-shrink-0 p-3 float-right sidebar">
              <div className='checkout position-sticky'>
                <span className='checkout-static checkout-first-element'>Order for:</span>
                <span>{userEmail}</span>
                <div>
                  <span className='checkout-static'>Order ready for pickup in:</span> <span>{pickupTime}</span>
                </div>
                <br />
                <div>
                  <div>
                    <span className='checkout-static'>Total Order Amount:</span> <span>${totalWithoutTax.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className='checkout-static'>Taxes:</span> <span>${tax.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className='checkout-static'>Total With Tax:</span> <span>${totalWithTax.toFixed(2)}</span>
                  </div>
                  <button className='btn btn-success m-3' onClick={completePurchase}>Complete Order</button>
                </div>
              </div>
            </div>
          </div>
          : <div>Your cart is currently empty. <Link to='/menu'>Go choose some food.</Link></div>
      }
      <Modal
            className="myModal"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showModal}
            onHide={handleCloseModal}
          >
            <Modal.Body>
              <h2 className="text-center">Order is on the way!</h2>
            </Modal.Body>
          </Modal>
    </div>
  )
};

export default Cart;
