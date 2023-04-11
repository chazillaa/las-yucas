import React, { useEffect, useState } from "react";
import axios from "axios";

const Menu = () => {

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/login";
  };

  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const menuData = async () => {
      const res = await axios.get("http://localhost:3001/api/menu");
      console.log(res.data);
      setMenu(res.data);
    };
    menuData();
  }, []);

  return (
    <div>
      <nav>
        <button onClick={handleLogout}>Logout</button>
      </nav>

      <h1>Menu</h1>
      {menu.map((item) => 
      <div key={item._id}>
        {item.name} {item.price}
        </div>
        )}
      
    </div>
  );
};

export default Menu;


//<Menu item={item}/>