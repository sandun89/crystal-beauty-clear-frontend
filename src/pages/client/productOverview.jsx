import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/loader"; 
import ImageSlider from "../../components/imageSlider";
import { addToCart, getCart } from "../../utils/cart";

export default function ProductOverview(){

    const params = useParams();
    const navigate = useNavigate();

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
                        setProduct(response.data.product);
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
        {status == "loaded" && (
          <div className="w-full h-full flex flex-row">
            <div className="w-[50%] h-full">
              <ImageSlider images={product.images} />
            </div>
            <div className="w-[50%] h-full p-[50px]">
              <h1 className="text-3xl text-center font-bold">{product.name}</h1>
              <h2 className="text-2xl text-gray-500 text-center font-semibold">
                {product.altName.join(" | ")}
              </h2>
              <div className="w-full flex justify-center text-2xl font-semibold my-[40px]">
                {product.labledPrice > product.price ? (
                  <>
                    <h2 className="mx-[5px]">
                      LKR: {product.price.toFixed(2)}
                    </h2>
                    <h2 className="line-through text-gray-500">
                      LKR: {product.labledPrice.toFixed(2)}
                    </h2>
                  </>
                ) : (
                  <h2>LKR: {product.price.toFixed(2)}</h2>
                )}
              </div>
              <h2 className="text-gray-600">{product.description}</h2>
              <div className="w-full flex justify-center my-[40px]">
                <button
                  onClick={() => {
                    addToCart(product, 1);
                    toast.success("Product Added to the Cart");
                  }}
                  className="w-[200px] bg-amber-800 text-white border cursor-pointer border-amber-700 p-[10px] mx-[10px] rounded hover:bg-amber-100 hover:text-gray-900"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => {
                    navigate("/checkout", {
                      state: { items: [
                        {
                          productId: product.productId,
                          name: product.name,
                          altName: product.altName,
                          price: product.price,
                          labledPrice: product.labledPrice,
                          image: product.images[0],
                          quantity: 1
                        }
                      ] }
                    });
                  }}
                  className="w-[200px] bg-amber-800 text-white border cursor-pointer border-amber-700 p-[10px] mx-[10px] rounded hover:bg-amber-100 hover:text-gray-900"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        )}
        {status == "error" && <div>Error</div>}
      </div>
    );
}