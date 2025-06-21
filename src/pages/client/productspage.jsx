import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader"; 
import ProductCard from "../../components/productCard";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";

export default function ProductsPage(){

    const [productList, setProductList] = useState([]);
    const [productsLoaded, setProductsLoaded] = useState(false);

    useEffect(() => {
      if (!productsLoaded) {
        axios
          .get(import.meta.env.VITE_BACKEND_URL + "/api/product")
          .then((response) => {
            setProductList(response.data);
            setProductsLoaded(true);
          });
      }
    }, [productsLoaded]);

    return (
      <div className="w-full h-full">
        <div className="w-full text-center my-[10px]">
          <input type="text" className="w-[400px] p-[10px] rounded-s-xl border border-accent text-center" placeholder="Enter Product Name"/>
          <button className="w-[100px] rounded-e-xl p-[10px] border border-red-800 bg-red-800 text-white hover:bg-red-200 hover:text-black cursor-pointer">Search</button>
        </div>
        { 
          productsLoaded ? 
          <div className="w-full h-full flex flex-wrap justify-center">
              {
                  productList.map(
                      (product, index) => {
                          return(
                              <ProductCard key={product.productId} product={product} />
                          );
                      }
                  )
              }
          </div> 
        : <Loader />}
      </div>
    );
}