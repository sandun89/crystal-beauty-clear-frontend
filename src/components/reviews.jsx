import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { convertToTimeStamp } from "../utils/helperUtils";

export default function Reviews(){

    const params = useParams();
    const [reviewLoaded, setReviewLoaded] = useState(false);
    const [reviews, setReviews] = useState([]);
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const productId = params.id;

    async function addReview() {
        const token = localStorage.getItem("authToken");
        const reviewData = {
            productId: productId,
            review: review,
            rating: rating
        }
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/review/", reviewData, {
            headers: {
              Authorization: "Bearer " + token,
            }
        }).then((response)=>{
            toast.success('Review Added Successfully');
            setReview("");
            setRating("");
            setReviewLoaded(false);
        }).catch((error)=>{
            toast.error(error.response.data.message)
        })
    }

    useEffect(() => {
        // setProductId(props.product.productId);
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/review/" + productId).then(
        (response) => {
            if (response.data.reviews.length > 0) {
                setReviews(response.data.reviews);
            }
            setReviewLoaded(true);
        });
    },[reviewLoaded]);

    return(
        <div className="w-full h-auto p-[10px] mt-[25px] flex flex-col justify-center">
            {/* add review */}
            <div className="w-full h-auto p-[10px] border border-gray-300 rounded shadow-lg shadow-gray-300 text-end">
                <h1 className="text-start my-[5px] font-semibold">Leave a Review</h1>
                <textarea onChange={(evt)=>{ setReview(evt.target.value)}} className="w-full h-[80px] my-[5px] max-h-[100px] border border-gray-300 overflow-scroll" value={review} placeholder="Write a Review"></textarea>
                <input onChange={(evt)=>{setRating(evt.target.value)}} type="number" min="1" max="5" className="w-full p-[4px] my-[5px] border border-gray-300" value={rating} placeholder="Rating (1-5)"/>
                <button onClick={addReview} className="bg-green-500 p-[4px] rounded my-[4px]">Submit Review</button>
            </div>

            {
                reviewLoaded && (
                    reviews.map((review, index)=>{
                       return <ReviewCard review={review} key={index}/>
                    })
                )
            }
        </div>
    );
}

export function ReviewCard(props){
    const review = props.review

    let rating = "☆☆☆☆☆";
    for (let i = 0; i < review.rating; i++) {
        rating += "★";   
    }
    return(
        <div className="w-full h-auto border p-[10px] my-[10px] border-gray-300 rounded shadow-lg">
                <div className="flex">
                    <h1 className="w-[50%] font-semibold">{review.userEmail}</h1>
                    <h1 className="w-[50%] text-end italic text-gray-500">{convertToTimeStamp(review.dateCreated)}</h1>
                </div>
                <hr className="text-gray-300" />
                <p className="my-[4px] text-gray-500">{review.review}</p>
                <hr className="text-gray-300" />
                <div className="text-amber-300">
                    {
                       rating.split("").reverse().join("").substring(0, 5) 
                    }
                </div>
            </div>
    );
}