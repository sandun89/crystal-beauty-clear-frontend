export default function ImageSlider(props){

    const images = props.images;

    return(
        <div className="w-full h-full flex justify-center items-center bg-amber-200">
            <div className="w-[80%] aspect-square rounded-lg bg-blue-400 relative">
                <div className="w-full h-[100px] absolute bottom-0 left-0 bg-black"></div>
            </div>
        </div>
    );
}