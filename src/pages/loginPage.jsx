import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    function handleLogin() {
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
        })
        .catch((error) => {
          toast.error(error.response.data.message || "Login Failed")
        });
    }

  return (
    <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
      <div className="w-[50%] h-full"></div>
      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[450px] h-[450px] p-[10px] flex flex-col backdrop-blur-md shadow-2xl rounded-xl">
          <div className="w-[50%]  text-xl border border-white p-[10px] rounded-t-2xl text-center">Login</div>
          <div className="w-full h-full flex justify-center flex-col items-center my-[10px]">
            <input onChange={(evt)=>{ setEmail( evt.currentTarget.value)}} type="email" placeholder="Email" className="w-[90%] h-[40px] rounded-full text-center border m-[8px] border-white"/>
            <input onChange={(evt)=>{ setPassword( evt.currentTarget.value)}} type="password" placeholder="Password" className="w-[90%] h-[40px] rounded-full text-center border m-[8px] border-white" />
            <button onClick={handleLogin} className="w-[90%] h-[40px] m-[8px] rounded-full bg-green-700 text-white">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}
