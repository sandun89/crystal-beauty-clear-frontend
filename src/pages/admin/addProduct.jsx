import { Link } from "react-router-dom";


export default function AddProduct(){
    return(
        <div className="w-full h-full flex justify-center items-center rounded-lg">
            <div className="w-[500px] h-[450px] flex flex-col items-center rounded-lg shadow-lg shadow-blue-400 backdrop-blur-lg">
                <h1 className="text-2xl my-[10px]">Add Products</h1>
                <input type="email" placeholder="Product Name" className="w-[90%] h-[40px] rounded-lg text-center border m-[8px] border-gray-400"/>
                <input type="email" placeholder="Alternative Names" className="w-[90%] h-[40px] rounded-lg text-center border m-[8px] border-gray-400"/>
                <input type="email" placeholder="Price" className="w-[90%] h-[40px] rounded-lg text-center border m-[8px] border-gray-400"/>
                <input type="email" placeholder="Labelled Price" className="w-[90%] h-[40px] rounded-lg text-center border m-[8px] border-gray-400"/>
                <textarea type="email" placeholder="Description" className="w-[90%] h-[40px] rounded-lg text-center border m-[8px] border-gray-400"/>
                <input type="email" placeholder="Stock" className="w-[90%] h-[40px] rounded-lg text-center border m-[8px] border-gray-400"/>
                <div className="w-[90%] my-[8px] flex justify-between items-center">
                    <Link to="/admin/products" className="w-[48%] h-[40px] p-[5px] rounded-lg text-center bg-green-500 hover:bg-green-600">Submit</Link>
                    <Link to="/admin/products" className="w-[48%] h-[40px] p-[5px] rounded-lg text-center bg-red-500 hover:bg-red-600">Cancel</Link>
                </div>
            </div>
        </div>
    )
}