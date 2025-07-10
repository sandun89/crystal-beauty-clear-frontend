import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { getRandomNumber } from "../../utils/helperUtils";
import Loader from "../../components/loader";

export default function Home() {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState({});
  const [randomImgIdx, setRandomImgIdx] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const nextSlide = ()=>{
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(()=>{
    if (!imagesLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/product/random")
        .then((response) => {
          const products = response.data.products;
          let productImages = [];
          for (let i = 0; i < products.length; i++) {
            const data = {
              name: products[i].name,
              altNames: products[i].altName,
              pId: products[i].productId,
              url: products[i].images[0],
            };
            productImages.push(data);
          }
          setImages(productImages);
          setImagesLoaded(true);
        });
    }
  
    const interval = setInterval(() => {
      nextSlide();
    }, 10000); // Auto-slide every 4 seconds
    return () => clearInterval(interval);

  }, [imagesLoaded]);

  return (
    <div className="w-full h-full">

      { imagesLoaded ? (
        <>
      <div className="w-full h-[70%] relative top-0 bg-amber-500">
        {imagesLoaded &&
          images.map((item, index) => {
            return (
              <Link  key={index} className="h-full w-full absolute top-0 left-0">
                <img
                  src={item.url}
                  alt="No Image"
                  className={`w-full h-full object-cover transition-opacity duration-1500 ${
                    index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            );
          })}
      </div>

      <div className="w-full h-[30%] flex justify-center">
        {imagesLoaded && (
          <div className="w-full h-full lg:w-[700px] flex justify-evenly items-center">
            <Link
              to={"/overview/" + images[0].pId}
              className="w-[30%] aspect-square p-[5px] rounded border border-gray-400 relative shadow-xl"
            >
              <img
                src={images[0].url}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="top-[5px] left-[5px] text-center text-blue-600">
                {images[0].name}
              </div>
            </Link>
            <Link
              to={"/overview/" + images[1].pId}
              className="w-[30%] aspect-square p-[5px] rounded border border-gray-400 relative bg-amber-100"
            >
              <img
                src={images[1].url}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="top-[5px] left-[5px] text-center text-blue-600">
                {images[1].name}
              </div>
            </Link>
            <Link
              to={"/overview/" + images[2].pId}
              className="w-[30%] aspect-square p-[5px] rounded border border-gray-400 relative bg-amber-100"
            >
              <img
                src={images[2].url}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="top-[5px] left-[5px] text-center text-blue-600">
                {images[2].name}
              </div>
            </Link>
          </div>
        )}
      </div>
      </>
      ) : (
        <Loader/>
      )}
    </div>
  );
}
