import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {

  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState({});
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
              id: products[i].productId,
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
    }, 4000); // Auto-slide every 4 seconds
    return () => clearInterval(interval);

  }, [imagesLoaded]);

  

  return (
    <div className="w-full h-full">
      <div className="w-full h-[65%] bg-amber-200">
        {
          imagesLoaded && (
            images.map((item, index)=>{
              return(
              <div key={index} className="h-full w-full relative">
                {/* <h1 className="text-3xl">abcd</h1> */}
                <img src={item.url} alt="No Image" className={`absolute top-0 left-0 w-full object-cover transition-opacity duration-1000 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}/>
              </div>
              );
            })
          )
        }
        {/* <img src="https://picsum.photos/450/300"  className="w-full h-full object-cover"/> */}
      </div>
      <div className="w-full h-[35%] flex justify-center bg-amber-400">
        <div className="w-full h-full lg:w-[900px] flex justify-evenly items-center bg-lime-300">
            <div className="w-[30%] aspect-square bg-amber-100"></div>
            <div className="w-[30%] aspect-square bg-amber-100"></div>
            <div className="w-[30%] aspect-square bg-amber-100"></div>
        </div>
      </div>
    </div>
  );
}
