import { CiCirclePlus } from "react-icons/ci";


export default function Reviews(){
    return(
        <div className="w-full h-auto p-[20px] flex flex-col justify-center">
            <div className="flex items-center">
                <h1 className="mx-3 font-bold text-2xl">Reviews</h1>
            </div>

            <div className="w-full h-[160px] p-[5px] my-[10px] shadow-xl shadow-blue-200 border border-gray-300 rounded">
                <textarea className="w-full h-[100px] max-h-[100px] overflow-scroll border border-gray-300 rounded"></textarea>
                <div className="text-end my-[5px]">
                    <button className="btn-green-600 btn-sm">Add Review</button>
                </div>
            </div>

            {/* review card */}
            <div className="w-full h-[150px] p-[5px] my-[10px] shadow-xl shadow-blue-200 border border-gray-300 rounded">
                <div className="flex flex-row mb-1">
                    <h1 className="w-[50%] font-semibold">User's Name</h1>
                    <h1 className="w-[50%] text-end italic text-gray-500">Date Created</h1>
                </div>
                <hr className="text-gray-300" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae voluptas incidunt pariatur delectus consequatur fugiat error eos libero! Quis voluptatibus doloremque soluta autem! Ad commodi accusamus quae, porro fuga ipsum.
                Deleniti neque alias laborum repellat praesentium? Laudantium dolor delectus, aut nobis quod ipsam, odio quibusdam tempora tempore odit autem, nulla est optio natus ad! Temporibus, cumque. Facere aliquid sed perferendis!</p>
                </div>
            {/* end of review card */}

            {/* review card */}
            <div className="w-full p-[5px] my-[10px] shadow-xl shadow-blue-200 border border-gray-300 rounded">
                <div className="flex flex-row mb-1">
                    <h1 className="w-[50%] font-semibold">User's Name</h1>
                    <h1 className="w-[50%] text-end text-gray-500 mx-2">Date Created</h1>
                </div>
                <hr className="text-gray-300" />
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae voluptas incidunt pariatur delectus consequatur fugiat error eos libero! Quis voluptatibus doloremque soluta autem! Ad commodi accusamus quae, porro fuga ipsum.
                Deleniti neque alias laborum repellat praesentium? Laudantium dolor delectus, aut nobis quod ipsam, odio quibusdam tempora tempore odit autem, nulla est optio natus ad! Temporibus, cumque. Facere aliquid sed perferendis!</p>
                </div>
            {/* end of review card */}
        </div>
    )
}