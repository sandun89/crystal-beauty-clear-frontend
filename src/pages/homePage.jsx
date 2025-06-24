import Header from "../components/header";
import { Route, Routes } from "react-router-dom";
import ProductsPage from "./client/productsPage";
import ProductOverview from "./client/productOverview";
import CartView from "./client/cart";
import CheckoutPage from "./client/checkout";
import AboutUs from "./client/aboutUs";

export default function HomePage(){
    return(
        <div className="w-full h-screen relative">
            <Header/>
            <div className="w-full h-[calc(100vh-75px)] min-h-[calc(100vh-75px)] top-[75px] fixed overflow-y-scroll">
                <Routes path="/">
                    <Route path="/products" element={<ProductsPage/>} />
                    <Route path="/overview/:id" element={<ProductOverview/>} />
                    <Route path="/aboutus" element={<AboutUs/>}/>
                    <Route path="/cart" element={<CartView/>} />
                    <Route path="/checkout" element={<CheckoutPage/>} />
                    <Route path="/*" element={<h1>Test</h1>} />
                </Routes>
            </div>
        </div>
    );
}