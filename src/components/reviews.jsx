export default function Reviews(){

    return(
        <div className="w-full p-[10px] flex flex-col justify-center">
            {/* add review */}
            <div className="w-full h-[130px] p-[4px] border border-gray-300 rounded shadow-lg shadow-gray-300 text-end ">
                <textarea className="w-full h-[80px] max-h-[100px] border border-gray-300 overflow-scroll" placeholder="Add Review"></textarea>
                <button className="w-[100px] bg-green-500 p-[4px] rounded m-[4px]">Add</button>
            </div>

            <ReviewCard/>
            <ReviewCard/>
            <ReviewCard/>
            <ReviewCard/>
            <ReviewCard/>

            {/* review card */}
            <div className="w-full h-auto border p-[4px] my-[10px] border-gray-300 rounded shadow-lg">
                <div className="flex">
                    <h1 className="w-[50%] font-semibold">Username</h1>
                    <h1 className="w-[50%] text-end italic text-gray-500">Date Created</h1>
                </div>
                <hr className="text-gray-300" />
                <p className="text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi excepturi adipisci placeat modi qui, harum voluptatem aliquam, nam optio facilis deleniti officiis nulla, asperiores velit nobis maiores et libero molestiae!</p>
            </div>

        </div>
    );
}

export function ReviewCard(){
    return(
        <div className="w-full h-auto border p-[4px] my-[10px] border-gray-300 rounded shadow-lg">
                <div className="flex">
                    <h1 className="w-[50%] font-semibold">Username</h1>
                    <h1 className="w-[50%] text-end italic text-gray-500">Date Created</h1>
                </div>
                <hr className="text-gray-300" />
                <p className="text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi excepturi adipisci placeat modi qui, harum voluptatem aliquam, nam optio facilis deleniti officiis nulla, asperiores velit nobis maiores et libero molestiae!</p>
            </div>
    );
}