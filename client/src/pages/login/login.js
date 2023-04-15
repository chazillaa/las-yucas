import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import axios from "../../utils/axios_config";
import axios from 'axios';

const Login = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = "/api/login";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.token);
      useNavigate("/");
      console.log(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://media.istockphoto.com/id/525498478/photo/happy-couple-eating-at-a-restaurant.jpg?s=612x612&w=0&k=20&c=7aZnDRgLLnqf5gfkviAC2T6tFJWLUqF6eEbJNKDkQ20="
                      alt="login form"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleSubmit}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i className="fas fa-cubes fa-2x me-3"></i>
                        </div>

                        <h5 className="fw-normal mb-3 pb-3">
                          Sign into your account
                        </h5>

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form2Example17">
                            Email address
                          </label>
                          <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={data.email}
                            required
                            className="form-control form-control-lg"
                            placeholder="Enter email address"
                          />
                        </div>

                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form2Example27">
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            value={data.password}
                            required
                            className="form-control form-control-lg"
                            placeholder="Enter password"
                          />
                        </div>

                        <div className="pt-1 mb-4">
                          <button type="submit" className="btn btn-success">
                            Login
                          </button>
                        </div>

                        <p className="mb-5 pb-lg-2">
                          Don't have an account?{" "}
                          <Link to="/signup">Sign up Here.</Link>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
