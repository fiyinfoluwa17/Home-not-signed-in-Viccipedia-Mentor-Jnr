import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';
import axios from 'axios';
import pic1 from '../assets/images/BLOGG.png'
import pic2 from '../assets/images/Frame 1000002375.png';
import pic4 from '../assets/images/logos_facebook.png';
import pic5 from '../assets/images/mdi_apple.png';
import pic6 from '../assets/images/devicon_google.png';
import './Signup.css';
import { useNavigate } from "react-router-dom";


const Home = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate()


  const api_url = import.meta.env.VITE_REACT_APP_BACKEND_API;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.elements.email.value.trim();
    const username = e.target.elements.username.value.trim();
    const password = e.target.elements.password.value.trim();

    if (!email || !username || !password) {
      toast.error('Please fill in all the fields.');
      return;
    }
    if (password.length < 6) {
        toast.error("Strong password required");
        return; // Exit early if the password is weak
      }
      
    try {
        setLoading(true)
        const response = await axios.post(`${api_url}/register`, {
          username,
          email,
          password,
        });
        const result = response.data
        console.log(result)
        toast.success("Registration Successful");
        setLoading(false)
        navigate('/signin')
      } catch (err) {
        console.log(err);
        if (err.response && err.response.status === 409) {
          // Handle the case where the email already exists
          const er = err.response
          toast.error(er.data.error);
        //   alert(er.data.error)
        } else {
          console.log(err);
          toast.error("Registration failed");
        }
      }finally{
        setLoading(false);
      }
    };

  return (
    <>
    {/* <div className="All-container"> */}
      <div className='open container'>
        <div className='col-md-6'>
          <img src={pic2} alt="" className='img1' />
        </div>
        <div className='col-md-6 mt-3'>
          <div className='logo text-center'>
            <img src={pic1} alt="" />
          </div>

          <div className='text-center'>
            <h2 className='join text-center'>Join Blogg</h2>
            <p className='text-center'>Enter your email address to create an account with us</p>
          </div>
            <form className=' text-center' onSubmit={handleSubmit}>
             
              <input type="text" placeholder="name@example.com" name="email" className='ps-4 work' /><br /> <br />
              
              <input type="text" placeholder="username" name="username" className='ps-4 back' /><br /> <br />
              <div className='form-group'>
                
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    name="password"
                    className='ps-4 tree'
                  />
                  <FontAwesomeIcon
                    icon={showPassword ? faEye : faEyeSlash}
                    className="password-toggle-icon"
                    onClick={togglePasswordVisibility}
                  />
                </div>
              </div>
              <button className="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
            </form>
            <div className="socials1">
            <div className="line">
                <div className='line2'></div> <span>Or</span> <div className='line2'></div>
              </div>

                <div className="">
                <h4 className='sign'>sign up with</h4>
              <div className='social-icons'>
                <a href="https://www.facebook.com/" target='_blank' className='social-link'> <img src={pic4} alt="" /> </a>
                <a href="https://www.icloud.com/" target='_blank' className='social-link2'> <img src={pic5} alt="" /> </a>
                <a href="https://mail.google.com/" target='_blank' className='social-link3'> <img src={pic6} alt="" /> </a>
              </div>
                </div>
            </div>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default Home;
