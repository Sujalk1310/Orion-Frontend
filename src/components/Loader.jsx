import ScaleLoader from "react-spinners/ScaleLoader";

const Loader = ({ text, classes, color }) => {
    return (
        <div className={classes + " flex flex-col w-full h-full justify-center items-center"}>
            <ScaleLoader
                size="15"
                color={color}
            />
            <p className="mt-[30px] font-medium text-[20px]">{text}</p>
        </div>
    )
}

export default Loader;