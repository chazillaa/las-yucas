import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
       <div class="container col-xxl-8 px-4 py-5">
    <div class="row flex-lg-row-reverse align-items-center g-5 py-5">
      <div class="col-10 col-sm-8 col-lg-6">
        <img src="/interior.jpg" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
      </div>
      <div class="col-lg-6">
        <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-3">Welcome to Las Yuccas.</h1>
        <p class="lead">We specializes in traditional dishes made with fresh ingredients, including yucca-based dishes like yucca fries and yucca tortillas. Customers can conveniently place online orders for pickup or delivery through the restaurant's website or app, allowing them to enjoy their favorite Mexican dishes from the comfort of their own homes. Las Yuccas also offers catering services for events and special occasions, making it a go-to choice for authentic Mexican cuisine in the local area.</p>
        <div class="d-grid gap-2 d-md-flex justify-content-center">
          <Link to="/menu"><button type="button" class="btn btn-primary btn-lg px-4 me-md-2" >Order Now</button></Link>
        </div>
      </div>
    </div>
  </div>

  <div class="container col-l-8 px-4">
    <div class="row flex-lg-row-align-items-center g-5 py-5">
      <div class="row-lg-6 ">
      <h1 class="display-5 fw-bold text-body-emphasis lh-1 mb-5">Unique flavors from traditional ingredients.</h1>
        <img src="/plant.jpg" class="d-block mx-lg-auto img-fluid" alt="Bootstrap Themes" width="700" height="500" loading="lazy"/>
      </div>
      <div class="row-lg-6 ">
        <p class="lead">Yucca tortillas are a type of flatbread made from yucca root that has been peeled, grated, and then mixed with water to form a dough. The dough is then flattened into thin circles and cooked on a griddle or comal until lightly browned on both sides. Yucca tortillas are gluten-free and have a slightly nutty flavor, making them a popular alternative to traditional corn or wheat tortillas in Latin American cuisine.</p>
      </div>
    </div>
  </div>


    </div>
  );
};

export default Home;
