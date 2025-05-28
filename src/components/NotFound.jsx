import { TbError404 } from "react-icons/tb";

const NotFound = ({ text, classes }) => {
    return (
        <div className={classes + ' flex flex-col w-full h-full justify-center items-center'}>
            <TbError404 className="text-[100px]" />
            <p className="mt-[5px] font-medium text-[20px]">{text}</p>
        </div>
    )
}

export default NotFound;