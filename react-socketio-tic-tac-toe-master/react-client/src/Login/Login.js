import "./login.css";
import { useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Home from "../Home/Home";
import axios from "axios";
function a(otp){
  return (
    <form>
      <textarea name="name">lalith</textarea>
      <textarea name="message">{otp}</textarea>
    </form>
  )
}
export default function Login() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [isSubmit, setIsSubmit] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    checkuser(formValues);
    console.log(formValues);
  };
 

  const checkuser = async (e) => {
    const allusers = await axios.get("http://localhost:5000/users");
    console.log(allusers)
    for (let i of allusers.data) {
      if (i.email === e.email && i.password === e.password) {
        console.log(i);
        localStorage.setItem("current-user", JSON.stringify(i));
        // sendEmail();
        
        navigate("/Home");
        // <Home></Home>
        break;
      }
    }
  };
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    }
    return errors;
  };
  useEffect(() => {
    axios.get("http://localhost:5000/users").then((res) => {
      console.log(formValues);

      checkuser(formValues, res.data);
    });
  }, []);
  return (
    <>
    <div className="logcir"></div>
    <div className="loginpage">
      <img className="logipic" src="https://raw.githubusercontent.com/trananhtuat/animated-login-registration/353a7bb31a0e21f6344af06868805656476d26d3/assets/undraw_creative_team_r90h.svg" alt="" />
          <Link to="/">
            <button className="homebutton">
          <i class="fa fa-home" aria-hidden="true">
            HOME
            </i></button>
          </Link>
          <div className="login">
            <div className="drop">
            <form className="loginForm" onSubmit={handleSubmit}>
            <span className="loginTitle">LOGIN</span>
              <label>Email</label>
              <input
                className="loginInput"
                type="text"
                placeholder="Enter your email..."
                name="email"
                value={formValues.email}
                onChange={handleChange}
              />
              <p className="error">{formErrors.email}</p>
              <label>Password</label>
              <input
                className="loginInput"
                type="password"
                placeholder="Enter your password..."
                name="password"
                value={formValues.password}
                onChange={handleChange}
              />
              <p className="error">{formErrors.password}</p>

              <button className="loginButton">Login</button>
            </form>
            </div>

            <Link to="/Register">
              <button className="loginRegisterButton">Register</button>
            </Link>
          </div>
          </div>
      </>
  );
}
