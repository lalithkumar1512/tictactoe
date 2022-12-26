import { useState } from "react";
import "./register.css";
import { Link } from "react-router-dom";
// import Regpic from "../img/Regpic.jpg"
import Login from "../Login/Login";
// import Navbar from "../../Components/Navbar/Navbar";
import axios from "axios";
import {
  useNavigate,
} from "react-router-dom";
function Register() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    phnumber: "",
    picture: " ",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    console.log(formValues);
    axios.post("http://localhost:5000/users", {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
      phnumber: formValues.phnumber,
      picture: formValues.picture,
    });
    localStorage.setItem("current-user", JSON.stringify(formValues));

    // alert(formValues.username);
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if (!values.phnumber) {
      errors.phnumber = "Phone number is required!";
    }

    return errors;
  };

  return (
    <div className="registration">
                  <div className="reg"></div>

      {Object.keys(formErrors).length === 0 && isSubmit ? (
        navigate("/Login")
      ) : (
        
        <div> 
          <h2 className="registermain">Join with us</h2>
          <p className="sufi">heartly thankful to join our club</p>
          {/* <img className="Regim" src={Regpic} alt="img"/> */}
          <center>
          <div className="div1">
            
          <center>
            <form className="registrationForm" onSubmit={handleSubmit}>
              <label className="registrationTitle">REGISTER</label>
              <label className="registrationitem">
                Username :&nbsp;
                <input
                  className="registrationInput"
                  type="text"
                  name="username"
                  placeholder="Your username..."
                  val={formValues.username}
                  onChange={handleChange}
                />
              </label>
              <p className="error">{formErrors.username}</p>
              <label className="registrationitem">
                Email :&nbsp;
                <input
                  className="registrationInput"
                  type="text"
                  placeholder="Enter your email..."
                  name="email"
                  val={formValues.email}
                  onChange={handleChange}
                />
              </label>
              <p className="error">{formErrors.email}</p>
              <label className="registrationitem">
                Password :&nbsp;
                <input
                  className="registrationInput"
                  type="password"
                  placeholder="Enter your password..."
                  name="password"
                  val={formValues.password}
                  onChange={handleChange}
                />
              </label>
              <p className="error">{formErrors.password}</p>
              <label className="registrationitem">
                Phone number :&nbsp;
                <input
                  className="registrationInput"
                  type="text"
                  placeholder="Enter your mobile number..."
                  name="phnumber"
                  val={formValues.phnumber}
                  onChange={handleChange}
                />
              </label>
              <p className="error">{formErrors.phnumber}</p>
              <label className="registrationitem">
                  Picture :&nbsp;
                <input
                  className="registrationInput"
                  type="text"
                  placeholder="Enter your userpic..."
                  name="picture"
                  val={formValues.picture}
                  onChange={handleChange}
                />
              </label>
              <p className="error">{formErrors.password}</p>
              <button className="registrationButton">Register</button>
            </form>
            <Link to="/Login">
              <button className="registrationLoginButton">Login</button>
            </Link>
            <Link to="/">
              <button className="homeLoginButton">Home</button>
            </Link>
            </center>
          </div>
         </center>
        </div>
      )}
    </div>
  );
}
export default Register;


