import React, { useEffect, useState } from "react";
import "./menu.css";
import axios from "axios";
import Modalmenu from "./menu-modal";

const Menu = (props) => {
  
  const [menu, setMenu] = useState([]);

  // toggle auth 
  const [isLogged, showIsLogged] = useState(false);

  useEffect(() => {
    checkStorage();
    return () => {};
  }, [isLogged]);
  function checkStorage() {
    if (localStorage.getItem("token")) {
      showIsLogged(true);
    } else {
      showIsLogged(false);
    }
  }
  // toggle auth 

  useEffect(() => {
    const menuData = async () => {
      const res = await axios.get("/api/menu");
      setMenu(res.data);
    };
    menuData();
  }, []);

  const addToCart = (event) => {
    event.preventDefault();
    console.log(event);
    const postCart = async (data) => {
        try {
            const url = `/api/cart`
            const {data: res} = await axios.post(url, data, {headers: { Authorization:'Bearer ' + localStorage.getItem('token') }})
            props.setCount(res.count);//this line should be where the code calls a useState to update the cart count
        } catch (err) {
            console.log(err)
        }
    };

    const itemData = {
      _id: event.target.dataset.itemId,
      quantity: 1,
    };

    postCart(itemData);
  };

  return (
    <div>
      <div className="p-5 text-center">
        <h1 className="mb-3">Menu</h1>
      </div>
      <div>
        <div className="text-center container py-2">
          <div className="row justify-content-md-center">
            {Array.isArray(menu) ? menu.map((item) => (
              <div className="col-sm-3 mb-6 card m-3" key={item._id} data-item-id={item.id}>
                <div className="bg-image hover-zoom ripple">
                  <div className="card-body">
                    <h4 className="card-title mb-3">{item.name}</h4>

                    <img
                      src={`data:image/png;base64,${item.image}`}
                      className="w-50 mb-3"
                      alt="a"
                    />

                    <h4 className="mb-3">
                      <strong className="text-danger">{item.price}</strong>
                    </h4>

                    
                    <Modalmenu setCount={props.setCount} item={item}/>

                    {isLogged ? (
                      <button
                        className="m-3 btn btn-success"
                        data-item-id={item._id}
                        onClick={addToCart}
                      >
                        Add to Cart
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              </div>
            )):<div></div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;

//<Menu item={item}/>
