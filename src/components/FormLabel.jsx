const FormLabel = ({label, isOptional}) => {
    return (
        <div className={`flex items-center gap-1`}>
            <p className={`form-label`}> {label} </p>
            {isOptional ? <p className={` text-darkBgSec dark:text-white/50 text-sm font-light`} > (Optional) </p> : ""}
        </div>
    )
}

export default FormLabel;