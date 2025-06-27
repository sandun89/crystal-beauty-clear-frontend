export default function Reviews(){

    return(
        <div className="w-full h-auto p-[10px] mt-[25px] flex flex-col justify-center">
            {/* add review */}
            <div className="w-full h-auto p-[10px] border border-gray-300 rounded shadow-lg shadow-gray-300 text-end">
                <h1 className="text-start my-[5px] font-semibold">Leave a Review</h1>
                <textarea className="w-full h-[80px] my-[5px] max-h-[100px] border border-gray-300 overflow-scroll" placeholder="Write a Review"></textarea>
                <input type="number" min="1" max="5" className="w-full p-[4px] my-[5px] border border-gray-300" placeholder="Rating (1-5)"/>
                <button className="bg-green-500 p-[4px] rounded my-[4px]">Submit Review</button>
            </div>

            <ReviewCard/>
            <ReviewCard/>
            <ReviewCard/>
            <ReviewCard/>
            <ReviewCard/>

        </div>
    );
}

export function ReviewCard(){
    return(
        <div className="w-full h-auto border p-[10px] my-[10px] border-gray-300 rounded shadow-lg">
                <div className="flex">
                    <h1 className="w-[50%] font-semibold">Username</h1>
                    <h1 className="w-[50%] text-end italic text-gray-500">Date Created</h1>
                </div>
                <hr className="text-gray-300" />
                <p className="my-[4px] text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi excepturi adipisci placeat modi qui, harum voluptatem aliquam, nam optio facilis deleniti officiis nulla, asperiores velit nobis maiores et libero molestiae!</p>
                <hr className="text-gray-300" />
                <div className="text-amber-300">★★★★☆</div>
            </div>
    );
}