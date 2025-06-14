import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";


export default function RegisterPage(){

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  function handleChange(evt){
    const {name, value} = evt.target;
      setFormData((prev) => ({...prev, [name]: value}));
  }

  function handleRegister(){
    if (formData.password !== formData.confirmPassword) {
      toast.error("Password Not Matched");
      return;
    }

    setLoading(true);
    const payload = formData;

      axios.post(import.meta.VITE_BACKEND_URL + "/api/user/", payload).then(
        (response) => {
          toast.success("Registration Successfull");
          navigate("/login");
        }
      ).catch ((error) => {
        console.log(error)
        toast.error("Registration Unsuccessfull !")
      }).finally(() => {
        setLoading(false)
      })    
  }


    return (
      <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
        <div className="w-[50%] h-full"></div>
        <div className="w-[50%] h-full flex justify-center items-center">
          <div className="w-[450px] h-[550px] p-[10px] border border-white flex flex-col backdrop-blur-lg shadow-2xl rounded-xl">
            <div className="w-full h-full flex justify-center flex-col items-center my-[10px]">
              <input
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First Name"
                className="w-[90%] h-[40px] rounded-full text-center border m-[8px] border-white"
              />
              <input
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-[90%] h-[40px] rounded-full text-center border m-[8px] border-white"
              />
              <input
                name="email"
                type="text"
                value={formData.email}
                onChange={handleChange}
                placeholder="email"
                className="w-[90%] h-[40px] rounded-full text-center border m-[8px] border-white"
              />
              <input
                name="phone"
                type="text"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-[90%] h-[40px] rounded-full text-center border m-[8px] border-white"
              />
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-[90%] h-[40px] rounded-full text-center border m-[8px] border-white"
              />
              <input
                name="confirmPassword"
                type="text"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-[90%] h-[40px] rounded-full text-center border m-[8px] border-white"
              />
              <button 
              onClick={handleRegister} 
              className="w-[90%] h-[40px] m-[8px] rounded-full bg-green-700 text-white">
                { loading ? "Registering..." : "Register" }
              </button>
              <div className="mt-[5px]">
                <span>Already Have an Account? </span>
                <Link
                  to={"/login"}
                  className="text-blue-600 hover:animate-pulse hover:text-blue-800"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}