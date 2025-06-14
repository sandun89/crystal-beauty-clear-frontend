import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader"; 

export default function ProductPage(){

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
        {productsLoaded ? 
        <div className="w-full h-full">
            {
                productList.map(
                    (product, index) => {
                        return(
                            <span key={product.productId}>{product.productId}</span>
                        );
                    }
                )
            }
        </div> 
        : <Loader />}
      </div>
    );
}