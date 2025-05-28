import Loader from "./Loader";

const FullPageLoader = () => {
    return (
        <div className="w-screen h-screen top-0 left-0 fixed z-50 bg-white backdrop-blur-xl flex flex-col justify-center items-center">
            <Loader text={"Please Wait..."} />
        </div>
    )
}

export default FullPageLoader;