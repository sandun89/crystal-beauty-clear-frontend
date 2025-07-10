import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import AdminProductsPage from "./admin/products";
import AddProduct from "./admin/addProduct";
import EditProduct from "./admin/editProduct";
import AdminOrders from "./admin/adminOrders";
import { useEffect, useState } from "react";
import Loader from "../components/loader";
import toast from "react-hot-toast";
import axios from "axios";
import Users from "./admin/users";

export default function AdminPage() {
  const location = useLocation();
  const currentPath = location.pathname;
  const [userValidated, setUserValidated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token == null) {
      toast.error("You are not Logged in");
      navigate("/login");
    } else {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((response) => {
          if (response.data.user.role == "admin") {
            setUserValidated(true);
          } else {
            toast.error("You are not an Admin");
            navigate("/login");
          }
        })
        .catch((error) => {
          toast.error("Something Went Wrong Please Login Again as an Admin");
          navigate("/login");
        });
    }
  }, []);

  
  return (
    <div className="w-full h-screen flex p-2 bg-gradient-to-r from-white to-blue-500">
      {userValidated ? (
        <>
          <div className="w-[300px] h-full ps-[5px]">
            <Link
              to="/admin/users"
              className={
                currentPath === "/admin/users"
                  ? "header-item-active bg-amber-100"
                  : "header-item"
              }
            >
              <i className="bi bi-people"></i>
              <span className="mx-[5px]">Users</span>
            </Link>

            <Link
              to="/admin/products"
              className={
                currentPath === "/admin/products"
                  ? "header-item-active bg-amber-100"
                  : "header-item"
              }
            >
              <i className="bi bi-card-checklist"></i>
              <span className="mx-[5px]">Products</span>
            </Link>
            <Link
              to="/admin/orders"
              className={
                currentPath === "/admin/orders"
                  ? "header-item-active bg-amber-100"
                  : "header-item"
              }
            >
              <i className="bi bi-receipt"></i>
              <span className="mx-[5px]">Orders</span>
            </Link>
          </div>
          <div className="w-[calc(100vw-300px)] h-full rounded-lg shadow-2xl bg-white bg-cover bg-center">
            <Routes path="/*">
              <Route path="/products" element={<AdminProductsPage />} />
              <Route path="/addProduct" element={<AddProduct />} />
              <Route path="/editProduct" element={<EditProduct />} />
              <Route path="/orders" element={<AdminOrders />} />
              <Route path="/users" element={<Users />} />
            </Routes>
          </div>
        </>
      ) : (
        <Loader />
      )}
    </div>
  );
}
