import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  // State to store the registration details
  const [registration, setRegistration] = useState({ email: "", password: "" });
  // Function to handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegistration({ ...registration, [name]: value });
  };
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle registration submission goes here
    console.log("Submitted registration:", registration);
  };
  return (
    <div className="d-flex justify-content-center mt-5 pt-5">
      <div className="card p-4 w-50">
        <h2 className="text-center mb-4">Sign up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={registration.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={registration.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign up
          </button>
        </form>
        <p className="mt-3 text-center">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
