export default function Home() {
  return (
    <div className="w-full h-full">
      <div className="w-full h-[65%] bg-amber-200">
        <img src="https://picsum.photos/450/300"  className="w-full h-full object-cover"/>
      </div>
      <div className="w-full h-[35%] flex justify-center bg-amber-400">
        <div className="w-full h-full lg:w-[900px] flex justify-evenly items-center bg-lime-300">
            <div className="w-[30%] aspect-square bg-amber-100"></div>
            <div className="w-[30%] aspect-square bg-amber-100"></div>
            <div className="w-[30%] aspect-square bg-amber-100"></div>
        </div>
      </div>
    </div>
  );
}
