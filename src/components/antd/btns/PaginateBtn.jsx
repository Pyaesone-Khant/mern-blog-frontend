import React from "react";

const PaginateBtn = ({
    label,
    event,
    currentPage,
    breakPoint,
    activePoint,
    value,
    isArrow,
    isMobile,
}) => {
    return (
        <button
            onClick={event}
            disabled={currentPage === breakPoint}
            className={`paginate-btn  ${
                currentPage == activePoint ? "active" : ""
            } ${isArrow ? "arrow-btn" : ""} ${
                isArrow && currentPage === breakPoint ? "disabled" : ""
            } ${
                isMobile
                    ? `text ${currentPage === breakPoint ? "hidden" : ""}`
                    : "icon"
            } `}
            value={value}
        >
            {label}
        </button>
    );
};

export default PaginateBtn;
