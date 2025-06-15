import { Link } from "react-router-dom";

export default function ProductCard(props){

    const product = props.product;
    return(
        <Link to={"/overview/" + product.productId} className="w-[250px] h-[280px] m-[10px] shadow-2xl shadow-blue-200 rounded-md border-blue-400">
            <img src={product.images[0] } className="w-full h-[150px] object-cover" />
            <div className="w-full h-[130px] flex flex-col px-[5px">
                <p className="text-gray-400 text-sm">{product.productId}</p>
                <p className="text-xl font-bold">{product.name}</p>
                <p>
                    { product.price.toFixed(2) } 
                    <span className="mx-1 text-sm line-through">{product.price < product.labledPrice && product.labledPrice.toFixed(2)}</span>
                </p>
            </div>
        </Link>
    );
}