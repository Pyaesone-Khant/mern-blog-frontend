import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import PaginateBtn from "../btns/PaginateBtn";

const CPagination = ({
    blogs,
    setRenderedBlogs,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    startIndex,
    endIndex,
}) => {
    const totalBlogs = blogs?.length;
    const totalPaginateBtn = Math.ceil(totalBlogs / itemsPerPage);
    const handlePageChange = (e) => {
        setCurrentPage(Number(e.target.value));
        const subsetPages = blogs?.slice(startIndex, endIndex);
        setRenderedBlogs(subsetPages);
    };

    const handlePrevious = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };
    const handleNext = () => {
        if (currentPage < totalPaginateBtn) {
            setCurrentPage(currentPage + 1);
        }
    };

    console.log(currentPage);
    return (
        <section className="mt-auto flex items-center justify-center gap-3">
            <PaginateBtn
                label={<IoIosArrowBack />}
                event={handlePrevious}
                currentPage={currentPage}
                breakPoint={1}
            />
            <div className="flex items-center gap-3">
                {new Array(totalPaginateBtn).fill(null).map((_, index) => {
                    return (
                        <PaginateBtn
                            key={index + 1}
                            label={index + 1}
                            event={handlePageChange}
                            currentPage={currentPage}
                            breakPoint={index + 1}
                            activePoint={index + 1}
                            value={index + 1}
                        />
                    );
                })}
            </div>
            <PaginateBtn
                label={<IoIosArrowForward />}
                event={handleNext}
                currentPage={currentPage}
                breakPoint={Number(totalPaginateBtn)}
            />
        </section>
    );
};

export default CPagination;
