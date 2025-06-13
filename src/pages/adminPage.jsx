import { Link, Route, Routes } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import { TiThListOutline } from "react-icons/ti";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import AdminProductsPage from "./admin/products";
import AddProduct from "./admin/addProduct";
import EditProduct from "./admin/editProduct";

export default function AdminPage(){
    return(
        <div className="w-full h-screen flex p-2 bg-gradient-to-r from-white to-blue-500">
            <div className="w-[300px] h-full ps-[5px]">
                <Link to="/admin/users" className="flex items-center p-2"><FaUsers className="mr-2" />Users</Link>
                <Link to="/admin/products" className="flex items-center p-2"><TiThListOutline className="mr-2" />Products</Link>
                <Link to="/admin/orders" className="flex items-center p-2"><LiaFileInvoiceSolid className="mr-2" />Orders</Link>
            </div>
            <div className="w-[calc(100vw-300px)] h-full rounded-lg shadow-2xl bg-[url(/admin-bg.jpg)] bg-cover bg-center">
                <Routes path="/*">
                    <Route path="/users" element={<h1>users</h1>} />
                    <Route path="/products" element={<AdminProductsPage/>} />
                    <Route path="/addProduct" element={<AddProduct/>} />
                    <Route path="/editProduct" element={<EditProduct/>} />
                    <Route path="/orders" element={<h1>orders</h1>} />
                </Routes>
            </div>
        </div>
    )
}