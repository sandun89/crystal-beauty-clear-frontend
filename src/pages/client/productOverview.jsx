import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/loader";
import ImageSlider from "../../components/imageSlider";
import { addToCart, getCart } from "../../utils/cart";
import Reviews from "../../components/reviews";

export default function ProductOverview() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [status, setStatus] = useState("loading"); //loaded, error
  const navigate = useNavigate();

  if (params.id == null) {
    window.location.href = "/products";
  }

  useEffect(() => {
    if (status == "loading") {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/product/" + params.id)
        .then((response) => {
          setProduct(response.data.product);
          setStatus("loaded");
        })
        .catch(() => {
          toast.error("Product not Available");
          setStatus("error");
        });
    }
  }, [status]);


  return(
    <div className="w-full h-full">
      {status == "loading" && <Loader />}
      {status == "loaded" && (
      <div className="w-full h-auto lg:h-[80%] flex flex-row">

        {/* image slider large */}
        <div className="w-full lg:w-[50%] lg:h-full hidden lg:block">
          <div className="w-full h-full flex flex-col justify-center items-center">
              <ImageSlider images={product.images}/>
            </div>
        </div>

        {/* product info */}
        <div className="w-full lg:w-[50%]">

          {/* product details */}
          <div className="w-full lg:h-[50%] p-[20px] ">
            <div className="w-full lg:h-full flex flex-col items-center justify-center lg:justify-end">
              <h1 className="font-bold text-[30px]">{product.name}</h1>
              <h1 className="text-gray-400">{product.altName.join(" | ")}</h1>
              <div className="flex">
                <h1 className="text-gray-400 mx-[4px]">
                  LKR: {product.price.toFixed(2)}
                </h1>
                {product.labledPrice > product.price && (
                  <h1 className="text-gray-400 mx-[4px] line-through">
                    LKR: {product.labledPrice.toFixed(2)}
                  </h1>
                )}
              </div>
            </div>
          </div>

          {/* image slider mobile */}
          <div className="w-full block lg:hidden">
            <div className="w-full  flex flex-col justify-center items-center p-[20px]">
                <ImageSlider images={product.images}/>
            </div>
          </div>

          {/* add to cart */}
          <div className="w-full lg:h-[50%]">
            <div class="w-full flex justify-center p-[20px]">
              <button
                onClick={() => {
                  addToCart(product, 1);
                  toast.success("Product Added to the Cart");
                }}
                className="w-[200px] h-[50px] btn-amber-800 btn-md"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  navigate("/checkout", {
                    state: {
                      items: [
                        {
                          productId: product.productId,
                          name: product.name,
                          altName: product.altName,
                          price: product.price,
                          labledPrice: product.labledPrice,
                          image: product.images[0],
                          quantity: 1,
                        },
                      ],
                    },
                  });
                }}
                className="w-[200px] h-[50px] btn-amber-800 btn-md"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
      )}
      <div className="w-full">
        <Reviews/>
      </div>
    </div>
  );
}