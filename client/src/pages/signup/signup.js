import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

//   const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const url = "http://localhost:3001/api/signup";
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
            <form className onSubmit={handleSubmit}>
              <h1>Sign Up</h1>
              <input
                type="text"
                placeholder="username"
                name="username"
                onChange={handleChange}
                value={data.username}
                required
                className
              />
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
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div> */}

      <section className="vh-100 bg-image">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card">
                  <div className="card-body p-5">
                    <h2 className="text-center mb-5">Sign Up</h2>

                    <form className onSubmit={handleSubmit}>
                      <div className="form-outline mb-4">
                        <label className="form-label" for="form3Example1cg">
                          Your Name
                        </label>
                        <input
                          type="text"
                          placeholder="Username"
                          name="username"
                          onChange={handleChange}
                          value={data.username}
                          required
                          className="form-control form-control-lg"
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" for="form3Example3cg">
                          Your Email
                        </label>
                        <input
                          type="email"
                          placeholder="Email"
                          name="email"
                          onChange={handleChange}
                          value={data.email}
                          required
                          className="form-control form-control-lg"
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label className="form-label" for="form3Example4cg">
                          Password
                        </label>
                        <input
                          type="password"
                          placeholder="password"
                          name="password"
                          onChange={handleChange}
                          value={data.password}
                          required
                          className="form-control form-control-lg"
                        />
                      </div>

                      <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-success">
                          Sign Up
                        </button>
                      </div>

                      <p className="text-center text-muted mt-5 mb-0">
                        Have already an account?{" "}
                        <a href="#!" className="fw-bold text-body">
                          <Link to="/login">Login Here.</Link>
                        </a>
                      </p>
                    </form>
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

export default Signup;
