import { useState } from "react";

export default function ImageSlider(props){

    const images = props.images;
    const [activeImage, setActiveImage] = useState(images[0]);

    return(
        <div className="w-full h-full flex justify-center items-center">
            <div className="w-[80%] aspect-square rounded-lg relative">
                <img src={activeImage} alt="" className="w-full h-full object-cover rounded-xl" />
                <div className="w-full h-[100px] absolute bottom-0 left-0 flex justify-center backdrop-blur-3xl">
                    {
                        images.map(
                            (image, index) => {
                                    return (
                                      <img
                                        onClick={
                                            () => {
                                                setActiveImage(image);
                                            }
                                        }
                                        key={index}
                                        src={image}
                                        className="h-full mx-[5px] aspect-square cursor-pointer hover:animate-pulse"
                                      />
                                    );
                            }
                        )
                    }
                </div>
            </div>
        </div>
    );
}