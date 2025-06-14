import Header from "../components/header";
import { Route, Routes } from "react-router-dom";
import ProductPage from "./client/productpage";

export default function HomePage(){
    return(
        <div className="w-full h-screen max-h-screen">
            <Header/>
            <div className="w-full h-[calc(100vh-75px)]">
                <Routes path="/">
                    <Route path="/products" element={<ProductPage/>} />
                    <Route path="/" element={<h1>homw</h1>} />
                    <Route path="/*" element={<h1>Test</h1>} />
                </Routes>
            </div>
        </div>
    );
}