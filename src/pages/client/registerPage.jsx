import { useState } from "react";
import { Link } from "react-router-dom";


export default function RegisterPage(){

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  })

  function handleChange(){

  }

    return (
      <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
        <div className="w-[50%] h-full"></div>
        <div className="w-[50%] h-full flex justify-center items-center">
          <div className="w-[450px] h-[550px] p-[10px] border border-white flex flex-col backdrop-blur-lg shadow-2xl rounded-xl">
            <div className="w-full h-full flex justify-center flex-col items-center my-[10px]">
              <input
                type="text"
                placeholder="First Name"
                className="w-[90%] h-[40px] rounded-full text-center border m-[8px] border-white"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-[90%] h-[40px] rounded-full text-center border m-[8px] border-white"
              />
              <input
                type="text"
                placeholder="email"
                className="w-[90%] h-[40px] rounded-full text-center border m-[8px] border-white"
              />
              <input
                type="text"
                placeholder="Phone Number"
                className="w-[90%] h-[40px] rounded-full text-center border m-[8px] border-white"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-[90%] h-[40px] rounded-full text-center border m-[8px] border-white"
              />
              <input
                type="text"
                placeholder="Confirm Password"
                className="w-[90%] h-[40px] rounded-full text-center border m-[8px] border-white"
              />
              <button className="w-[90%] h-[40px] m-[8px] rounded-full bg-green-700 text-white">Register</button>
              <div className="mt-[5px]">
                <span>Already Have an Account? </span>
                <Link to={"/login"} className="text-blue-600 hover:animate-pulse hover:text-blue-800" >Login</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}