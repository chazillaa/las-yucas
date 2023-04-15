import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";

export const Navbar = (props) => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/login";
  };

  const [isLogged, showIsLogged] = useState(false);

  useEffect(() => {
    checkStorage();
    return () => { };
  }, [isLogged]);
  function checkStorage() {
    if (localStorage.getItem("token")) {
      showIsLogged(true);
    } else {
      showIsLogged(false);
    }
  }

  // const [itemCount, setItemCount] = React.useState(1);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand"><img src='/LAS-YUCAS.png' /></a>
          <div className="navbar-right" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/">
                  <a className="nav-link active">
                    <button className="btn btn-success">Home</button>
                  </a>
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/menu">
                  <a className="nav-link active">
                    <button className="btn btn-success">Menu</button>
                  </a>
                </Link>
              </li>

              <li className="nav-item">
                {!isLogged ? (
                  <Link to="/login">
                    <a className="nav-link active">
                      <button className="btn btn-success">Login</button>
                    </a>
                  </Link>
                ) : (
                  <a className="nav-link active">
                    <button className="btn btn-success" onClick={handleLogout}>
                      Logout
                    </button>
                  </a>
                )}
              </li>

              <li className="nav-item">
                {isLogged ? (
                  <Link to="/cart">
                    <a className="nav-link active">
                      <button className="btn btn-success">
                        {props.count > 0 ?
                          <Badge color='secondary' badgeContent={props.count}>
                            <ShoppingCartIcon />
                          </Badge>
                          : <ShoppingCartIcon />}
                      </button>
                    </a>
                  </Link>
                ) : (
                  <div></div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
