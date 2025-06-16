import { getCart } from "../../utils/cart"
import { GoTrash } from "react-icons/go";

export default function CartView(){
    const cart = getCart();
    return(
        <div className="w-full h-full flex justify-center p-[20px]">
            <div className="w-[700px]">
                {
                    cart.map((item, index) => {
                        return(
                            <div key={index} className="w-full h-[110px] my-[5px] shadow-xl shadow-blue-200 flex justify-between items-center relative">
                                <button className="absolute right-[-50px] rounded-full w-[40px] h-[40px] flex justify-center items-center text-white bg-red-500 cursor-pointer shadow-red-400">
                                    <GoTrash />
                                </button>
                                <img src={item.image} alt="" className="h-full aspect-square object-cover rounded" />
                                <div className="h-full max-w-[400px] w-[450px] ml-[5px] overflow-hidden">
                                    <h1 className="text-xl font-bold">{item.name}</h1>
                                    <h2 className="text-lg text-gray-500">{item.altName.join(" | ")}</h2>
                                    <h2 className="text-lg text-gray-500">{item.price.toFixed(2)}</h2>
                                </div>
                                <div className="h-full w-[100px] flex justify-center items-center">
                                    <h1 className="text-xl">{item.quantity}</h1>
                                </div>
                                <div className="h-full w-[100px] flex justify-center items-center">
                                    <h1 className="text-xl">{(item.price * item.quantity)}</h1>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}