import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Modalmenu = ({item, props}) => {
 
  // modal 
  const x = item.id
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = (x) => setShowModal(x);
  const handleCloseModal = () => setShowModal(false);
  // modal

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

  // cart
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
  // cart

  return (
    <div>
        <Button variant="success" onClick={() => handleShowModal(item.id)}>
        Description
      </Button>
    
        <div>
            
          <Modal
            className="myModal"
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showModal === x}
            onHide={handleCloseModal}
          >
            <Modal.Header className="row">
              <div className='col text-center'>
                <h1>{item.name}</h1>
                <img
                  src={`data:image/png;base64,${item.image}`}
                  className="w-80 mb-3"
                  alt="b"
                />
              </div>
            </Modal.Header>
            <Modal.Body>
              <div>{item.description}</div>
            </Modal.Body>

            <Modal.Footer>
              <div>
                {isLogged ? (
                  <button className="m-3 btn btn-success" data-item-id={item._id}onClick={addToCart}>
                    Add to Cart
                  </button>
                ) : (
                  <div></div>
                )}
              </div>
            </Modal.Footer>
          </Modal>
        </div>
    </div>
  );
};

export default Modalmenu;
