import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { MenuItem } from "../../components/MenuItem";

const Cart = (props) => {
  const [userEmail, setUserEmail] = useState("test@test.com");
  const [pickupTime, setPickupTime] = useState("20-30 minutes");
  const [totalWithoutTax, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState([  ])
  const tax = Math.ceil(totalWithoutTax * 8) / 100;
  const totalWithTax = totalWithoutTax + tax;

  // toggle auth for menu
  const [isLogged, showIsLogged] = useState(false);
  const [isLoading, updateLoading] = useState(true);

  function checkStorage() {
    if (!localStorage.getItem("token")) {
      window.location = "/login"
    }
  };

  //when cart loads grab users cart from server
  useEffect(() => {
    checkStorage();
    getCart();
  }, [deleteFromCart]);

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
  }

  async function completePurchase(e){
    e.preventDefault();
    const url = '/api/cart/purchase';
    const {data:res} = await axios.post(url, null,{ headers: { Authorization: 'Bearer ' + localStorage.getItem('token') } });
    if(res.success){
      window.location = '/';
    }
  }

  return (
    <div>
      <div className="p-5 text-center">
        <h1 className="mb-3">Cart</h1>
      </div>
      {isLoading ? <div>Please wait while the cart loads</div> :
      cartItems && cartItems.length > 0?
        <div>
          <div> 
            {cartItems.map((item, index) => (
              <MenuItem className="col-lg-4 col-md-6 mb-4" isLogged={isLogged} item={item} deleteFromCart={deleteFromCart} />
            ))}
          </div>
          <div className="checkout-window">
            <div className='checkout'>
              Account Details
              <h3>{userEmail}</h3>
              <div>
                Order ready for pickup in: <span>{pickupTime}</span>
              </div>
              <div>
                <span>
                  <div>Standard</div>
                  <div>{pickupTime}</div>
                </span>
                <span>
                  <div>Schedule for later</div>
                  <div>Choose a time</div>
                </span>
              </div>
              <div>
                <div>
                  Total Order Amount: <span>{totalWithoutTax.toFixed(2)}</span>
                </div>
                <div>
                  Taxes: <span>{tax.toFixed(2)}</span>
                </div>
                <div>
                  Total With Tax: <span>{totalWithTax.toFixed(2)}</span>
                </div>
                <button className='btn btn-success m-3' onClick={completePurchase}>Complete Order</button>
              </div>
            </div>
          </div>
        </div>
        :<div>Your cart is currently empty. <Link to='/menu'>Go choose some food.</Link></div>
      }
    </div>
  )
};

export default Cart;
