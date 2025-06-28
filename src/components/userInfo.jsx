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
        <button
          onClick={() => {
            setUserView(true);
          }}
          className="btn-user-view"
        >
          {user == null ? (<i className="bi bi-person-circle"></i>) : (<span className="btn-user-icon">{user.firstName.charAt(0)}</span>)}
        </button>ame
      </div>

      {userView && (
        <div className="user-view-container">
          <button onClick={()=>{setUserView(false)}} className="btn-user-close">
            <i className="bi bi-x"></i>
          </button>
          <h1 className="font-bold">Welcome to Crystal Beauty Clear</h1>

          {user != null ? (
            <div className="w-full flex flex-col">
              <h1 className="m-[5px] text-gray-800">
                Hi, {user.firstName} {user.lastName}
              </h1>
              <h1 className="m-[5px] text-gray-500">{user.email}</h1>
              <button
                onClick={() => {
                  localStorage.removeItem("authToken");
                  setUser(null);
                  navigate("/login");
                }}
                className="btn-logout"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className=" mt-[10px] flex flex-row justify-evenly text-center">
              <Link
                to="/login"
                className="btn-login"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn-register"
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
