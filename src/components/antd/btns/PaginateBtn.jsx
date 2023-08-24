import React from "react";

const PaginateBtn = ({
    label,
    event,
    currentPage,
    breakPoint,
    activePoint,
    value,
}) => {
    return (
        <button
            onClick={event}
            disabled={currentPage === breakPoint}
            className={`paginate-btn  ${
                currentPage == activePoint ? "active" : ""
            }`}
            value={value}
        >
            {label}
        </button>
    );
};

export default PaginateBtn;
