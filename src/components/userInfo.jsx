import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function UserInfo() {
  const [user, setUser] = useState(null);
  const [userView, setUserView] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (token != null) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          if (response.data.user != null) {
            setUser(response.data.user);
          }
        })
        .catch((error) => {
          setUser(null);
        });
    }
  }, []);


  return (
    <>
      <div className="">
        <div
          onClick={() => {
            setUserView(true);
          }}
          className="text-[34px] mx-[10px] flex justify-center items-center cursor-pointer"
        >
          {user == null ? (<i class="bi bi-person-circle"></i>) : (<span className="text-[22px] w-[42px] h-[42px] flex justify-center items-center rounded-full bg-blue-500">{user.firstName.charAt(0)}</span>)}
        </div>
      </div>

      {userView && (
        <div className="fixed z-50 top-[80px] backdrop-blur-2xl right-[20px] p-[15px] text-primary shadow-2xl shadow-blue-400 border border-gray-400 w-[400px] h-auto rounded-xl bg-white">
          <button onClick={()=>{setUserView(false)}} className="cursor-pointer absolute top-[-16px] right-[-16px] w-[32px] h-[32px] flex justify-center items-center font-bold border border-red-600 bg-red-600 text-white rounded-full hover:bg-red-200 hover:text-black">
            <i class="bi bi-x"></i>
          </button>
          <h1 className="font-bold">Welcome to Crystal Beauty Clear</h1>

          {user != null ? (
            <div className="w-full flex flex-col">
              <h1 className="m-[5px]">
                Hi, {user.firstName} {user.lastName}
              </h1>
              <h1 className="m-[5px]">{user.email}</h1>
              <button
                onClick={() => {
                  localStorage.removeItem("authToken");
                  setUser(null);
                  navigate("/login");
                }}
                className="p-[5px] m-[10px] w-[full] border border-red-600 rounded-xl bg-red-600 text-white hover:bg-red-200 hover:text-black"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex flex-col justify-center my-[5px] text-center">
              <Link
                to="/login"
                className="p-[5px] m-[10px] w-[full] border border-green-600 rounded-xl bg-green-600 text-white hover:bg-green-200 hover:text-black"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="p-[5px] m-[10px] w-[full] border border-blue-600 rounded-xl bg-blue-600 text-white hover:bg-blue-200 hover:text-black"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
}
