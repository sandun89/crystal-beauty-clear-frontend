import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    function handleLogin() {
      setLoading(true);
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/user/login", {
          email: email,
          password: password,
        })
        .then((response) => {
          toast.success(response.data.message || "Login Successfull")
          localStorage.setItem("authToken", response.data.token);

          const user = response.data.user;
          if (user.role == "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
          setLoading(false);
        })
        .catch((error) => {
          toast.error(error.response.data.message || "Login Failed");
          setLoading(false);
        });
    }

  return (
    <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
      <div className="w-[50%] h-full"></div>
      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[450px] h-[450px] p-[10px] border border-blue-200 flex flex-col backdrop-blur-md shadow-2xl rounded-xl">
          {/* <div className="w-full text-center text-3xl border-b-[2px] p-[4px] border-white">Login</div>       */}
          <div className="w-full h-full flex justify-center flex-col items-center my-[10px]">
            <input onChange={(evt)=>{ setEmail( evt.currentTarget.value)}} type="email" placeholder="Email" className="w-[90%] h-[40px] rounded-full text-center border m-[8px] border-white"/>
            <input onChange={(evt)=>{ setPassword( evt.currentTarget.value)}} type="password" placeholder="Password" className="w-[90%] h-[40px] rounded-full text-center border m-[8px] border-white" />
            <button onClick={handleLogin} className="w-[90%] h-[40px] m-[8px] rounded-full bg-green-700 text-white">
              {
                loading ? "Loading..." : "Login" 
              }
            </button>
            <div className="mt-[5px]">
              <span>Don't Have an Account yet? </span>
              <Link to={"/register"} className="text-blue-600 hover:animate-pulse hover:text-blue-800">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
