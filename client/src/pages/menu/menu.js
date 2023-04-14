import React, { useEffect, useState } from "react";
import axios from "axios";

const Menu = () => {
  const [menu, setMenu] = useState([
    {
      name: "",
      price: "",
      image: "",
    },
  ]);

  // toggle auth for menu
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
  // toggle auth for menu

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
            console.log(res)//this line should be where the code calls a useState to update the cart count
        } catch (err) {
            console.log(err)
        }
    };

    const itemData = {
      _id: event.target.parentNode.parentNode.parentNode.dataset.itemId,
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
        <div className="col text-center container py-5">
          <div className="col-lg-4 col-md-6 mb-4">
            {menu.map((item) => (
              <div className="card m-3" key={item._id} data-item-id={item._id}>
                <div className="bg-image hover-zoom ripple">
                  <div className="card-body">
                    <h5 className="card-title mb-3">{item.name}</h5>

                    <img
                      src={`data:image/png;base64,${item.image}`}
                      className="w-50 mb-3"
                      alt="a"
                    />

                    <h6 className="mb-3">
                      <strong className="text-danger">{item.price}</strong>
                    </h6>

                    {isLogged ? (
                      <button
                        className="m-3 btn btn-success"
                        onClick={addToCart}
                      >
                        {" "}
                        Add to Cart{" "}
                      </button>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;

//<Menu item={item}/>
