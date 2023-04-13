import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

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
      const url = "http://localhost:3001/api/login";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.token);
      window.location = "/";
      console.log(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className>
      {/* <div className>
        <div className>
          <div>
            <form className="" onSubmit={handleSubmit}>
              <h1>Login</h1>
              <input
                type="email"
                placeholder="email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className
              />
              <input
                type="password"
                placeholder="password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className
              />
              <button type="submit" className="btn btn-success">
                Login
              </button>
            </form>
            <Link to="/signup">Dont have an account? Sign up Here.</Link>
          </div>
        </div>
      </div> */}
      {/* <h1>Login</h1> */}

      {/* <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5"> */}
              {/* <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          className="img-fluid" alt="Sample image"> */}
            {/* </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                  <label className="form-label" for="form3Example3">
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
                <label className="form-label" for="form3Example4">
                  Password
                </label>
                <div className="form-outline mb-3">
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

                <div className="text-center text-lg-start mt-4 pt-2">
                  <button type="submit" className="btn btn-success">
                    Login
                  </button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">
                    Don't have an account?{" "}
                    <Link to="/signup">Sign up Here.</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section> */}

      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
                      alt="login form"
                      className="img-fluid"
                    />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleSubmit}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i className="fas fa-cubes fa-2x me-3"></i>
                          {/* <span className="h1 fw-bold mb-0">Logo</span> */}
                        </div>

                        <h5 className="fw-normal mb-3 pb-3">
                          Sign into your account
                        </h5>

                        <div className="form-outline mb-4">
                          <label className="form-label" for="form2Example17">
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
                          <label className="form-label" for="form2Example27">
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
