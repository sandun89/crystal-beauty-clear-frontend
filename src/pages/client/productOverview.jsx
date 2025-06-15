import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/loader"; 
import ImageSlider from "../../components/imageSlider";

export default function ProductOverview(){

    const params = useParams();

    if (params.id == null) {
        window.location.href = "/products"
    }

    const [product, setProduct] = useState(null);
    const [status, setStatus] = useState("loading"); //loaded, error

    useEffect(
        () => {
            if(status == "loading") {
                axios.get(import.meta.env.VITE_BACKEND_URL + "/api/product/" + params.id).then(
                    (response) => {
                        setProduct(response.data);
                        setStatus("loaded");
                    }
                ).catch(
                    () => {
                        toast.error("Product not Available");
                        setStatus("error");
                    }
                )
            }
        }, [status]
    );

    
    return (
      <div className="w-full h-full">
        {status == "loading" && <Loader />}
        {status == "loaded" && 
        <div className="w-full h-full flex flex-row">
            <div className="w-[50%] h-full bg-blue-400">
                <ImageSlider images={product.images}/>
            </div>
            <div className="w-[50%] h-full bg-amber-400"></div>
        </div>}
        {status == "error" && <div>Error</div>}
      </div>
    );
}