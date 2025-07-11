import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const loginWithGoogle = useGoogleLogin({
      onSuccess: (response) => {
        setLoading(true);
        axios
          .post(import.meta.env.VITE_BACKEND_URL + "/api/user/google", {
            accessToken: response.access_token,
          })
          .then((response) => {
            toast.success("Login Successful with Google");
            localStorage.setItem("authToken", response.data.token);

            const user = response.data.user;
            if (user.role == "admin") {
              navigate("/admin");
            } else {
              navigate("/");
            }
            setLoading(false);
          });
      },
    });

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
    <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex justify-center">
      <div className="lg:w-[50%] lg:ml-[50%] h-full flex justify-center items-center">
        <div className="w-[400px] h-[450px] p-[10px] border border-blue-200 flex flex-col backdrop-blur-md shadow-2xl rounded-xl">
          <h1 className="w-full font-bold text-xl text-center">Sign In</h1>
          <div className="w-full h-full flex justify-center flex-col items-center my-[10px]">
            <input
              onChange={(evt) => {
                setEmail(evt.currentTarget.value);
              }}
              type="email"
              placeholder="Email"
              className="w-[90%] h-[40px] rounded-xl text-center border m-[8px] border-white"
            />
            <input
              onChange={(evt) => {
                setPassword(evt.currentTarget.value);
              }}
              type="password"
              placeholder="Password"
              className="w-[90%] h-[40px] rounded-xl text-center border m-[8px] border-white"
            />
            <button
              onClick={handleLogin}
              className="w-[90%] h-[40px] m-[4px] flex justify-center items-center rounded-xl bg-green-700 border border-green-700 text-white cursor-pointer hover:bg-green-200 hover:text-black"
            >
              {loading ? "Loading..." : "Login"}
            </button>
            <button
              onClick={loginWithGoogle}
              className="w-[90%] h-[40px] m-[4px] flex justify-center items-center rounded-xl bg-blue-700 border border-blue-700 text-white cursor-pointer hover:bg-blue-200 hover:text-black"
            >
              <i className="bi bi-google mx-2"></i>
              {loading ? "Loading..." : "Login with Google"}
            </button>
            <div className="mt-[5px]">
              <span>Don't Have an Account yet? </span>
              <Link
                to={"/register"}
                className="text-blue-600 hover:animate-pulse hover:text-blue-800"
              >
                Register Now
              </Link>
            </div>
            <div className="w-full text-center mt-[5px]">
              <span>Forgot Your Password? </span>
              <Link to={"/forgetpass"} className="text-blue-600 hover:animate-pulse hover:text-blue-800">Reset Password</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
