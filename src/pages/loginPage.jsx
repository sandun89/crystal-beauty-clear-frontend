export default function LoginPage(){
    return(
        <div className="w-full h-screen bg-[url(/login-bg.jpg)] bg-cover bg-center flex">
            <div className="w-[50%] h-full"></div>
            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[450px] h-[450px] p-[10px] flex flex-col backdrop-blur-md shadow-2xl rounded-xl">
                    <div className="w-[50%]  text-xl border border-white p-[10px] rounded-t-2xl text-center">Login</div>
                    <div className="w-full h-full flex justify-center flex-col items-center my-[10px]">
                        <input type="email" placeholder="Email" className="w-[90%] h-[40px] rounded-full text-center border m-[8px] border-white" />
                        <input type="password" placeholder="Password" className="w-[90%] h-[40px] rounded-full text-center border m-[8px] border-white" />
                        <button className="w-[90%] h-[40px] m-[8px] rounded-full bg-green-700 text-white">Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}