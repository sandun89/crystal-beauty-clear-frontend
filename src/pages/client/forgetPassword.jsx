import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  async function sendEmail() {
    if (email) {
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/user/send_otp", {
          email: email,
        })
        .then((response) => {
          setEmailSent(true);
          toast.success("Email Sent Successfully");
        })
        .catch((error) => {
          toast.error("Something Went Wrong");
        });
    } else {
      toast.error("Email is Required for Continue");
    }
  }

  function changePassword() {
    if(password === "") {
      toast.error("Invalid Password");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Password Does not Match");
      return;
    }

    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/user/change_pass", {
      email: email,
      password: password,
      otp: otp
    }).then((resonse)=>{
      toast.success("Password Changed Successfully");
      navigate("/login");
    }).catch((error)=>{
      toast.error("Something Went Wrong");
      window.location.reload();
    })
  }

  return (
    <div className="w-full h-screen bg-gray-200 flex flex-row justify-center items-center">
      <div className="w-[400px] h-auto p-[15px] shadow-2xl shadow-blue-300 text-center rounded-xl bg-white">
        {emailSent ? (
          <div>
            <h1 className="text-2xl text-start font-bold mb-[20px]">
              Reset Password
            </h1>
            <input
              onChange={(event) => {
                setOtp(event.target.value);
              }}
              type="text"
              className="w-full border rounded p-[10px] my-[10px]"
              value={otp}
              placeholder="OTP"
            />
            <input
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              name="password"
              type="password"
              className="w-full border rounded p-[10px] my-[10px]"
              value={password}
              placeholder="New Password"
            />
            <input
              onChange={(event) => {
                setConfirmPassword(event.target.value);
              }}
              name="confirmPassword"
              type="password"
              className="w-full border rounded p-[10px] my-[10px]"
              value={confirmPassword}
              placeholder="Confirm Password"
            />
            <button onClick={changePassword} className="w-full my-[5px] p-[10px] rounded bg-green-600 border border-green-600 text-white cursor-pointer hover:bg-green-200 hover:text-black">
              Reset Password
            </button>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl text-start font-bold mb-[20px]">
              Forget Password
            </h1>
            <input
              type="email"
              name="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              value={email}
              className="w-full border rounded p-[10px] my-[10px]"
              placeholder="Email"
            />
            <button
              onClick={sendEmail}
              className="w-full my-[5px] p-[10px] rounded bg-blue-600 border border-blue-600 text-white cursor-pointer hover:bg-blue-200 hover:text-black"
            >
              Sent OTP
            </button>
          </div>
        )}
        <Link to="/login" className="text-blue-600 cursor-pointer">
              Back to Login
            </Link>
      </div>
    </div>
  );
}
