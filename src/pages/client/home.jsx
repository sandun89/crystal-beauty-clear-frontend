import { useEffect, useState } from "react";
import axios from "axios";
import { getRandomNumber } from "../../utils/helperUtils";

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
              id: products[i].productId,
              url: products[i].images[0],
            };
            productImages.push(data);
          }
          setImages(productImages);
          setImagesLoaded(true);
        });
    }

    const idx=[];
    for (let i = 0; i < 3; i++) {
      idx.push(getRandomNumber(images.length));
    }
    setRandomImgIdx(idx);
  
    const interval = setInterval(() => {
      nextSlide();
    }, 10000); // Auto-slide every 4 seconds
    return () => clearInterval(interval);

  }, [imagesLoaded]);

  console.log(randomImgIdx);

  return (
    <div className="w-full h-full">
      <div className="w-full h-[60%] relative top-0 bg-amber-500">
        {
          imagesLoaded && (
            images.map((item, index)=>{
              return(
              <div key={index} className="h-full w-full absolute top-0 left-0">
                {/* <h1 className="text-3xl">abcd</h1> */}
                <img src={item.url} alt="No Image" className={`w-full h-full object-cover transition-opacity duration-1500 ${index === currentIndex ? "opacity-100" : "opacity-0"}`}/>
              </div>
              );
            })
          )
        }

      </div>
      <div className="w-full h-[35%] flex justify-center">
        { imagesLoaded && (
        <div className="w-full h-full lg:w-[900px] flex justify-evenly items-center">
            <div className="w-[30%] aspect-square p-[5px] rounded border border-gray-400 relative bg-amber-100">
              <img src={images[randomImgIdx[1].url]} alt="" className="w-full h-full object-cover"/>
              <div className="top-[5px] left-[5px] text-center text-blue-600">Product Name</div>
            </div>
            <div className="w-[30%] aspect-square p-[5px] rounded border border-gray-400 relative bg-amber-100">
              <img src={images[getRandomNumber(images.length)].url} alt="" className="w-full h-full object-cover"/>
            </div>
            <div className="w-[30%] aspect-square p-[5px] rounded border border-gray-400 relative bg-amber-100">
              <img src={images[getRandomNumber(images.length)].url} alt="" className="w-full h-full object-cover"/>
            </div>
        </div>
        )}
      </div>
    </div>
  );
}
