import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const FormSkeleton = ({ height, width, classes }) => {
    return (
        <div className={classes + " form-input"}>
            <Skeleton height={height} width={width} />
        </div>
    )
}

export default FormSkeleton;