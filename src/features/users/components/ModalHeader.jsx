import {RxCross1} from "react-icons/rx";

const ModalHeader = ({title, event}) => {
    return (
        <div className={`modal-header`} >
            <h3 className={`text-xl font-semibold capitalize`} > {title} </h3>
            <button onClick={event} className={`text-gray-300 text-2xl outline-none`} > <RxCross1 /> </button>
        </div>
    );
};

export default ModalHeader;
