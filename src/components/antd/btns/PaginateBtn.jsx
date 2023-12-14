import {useSelector} from "react-redux";

const PaginateBtn = ({
    label,
    event,
    breakPoint,
}) => {

    const {currentPage} = useSelector(state => state.blog)

    return (
        <button
            onClick={event}
            disabled={currentPage === breakPoint}
            className={`paginate-btn disabled:paginate-btn-disabled`}
        >
            {label}
        </button>
    );
};

export default PaginateBtn;
