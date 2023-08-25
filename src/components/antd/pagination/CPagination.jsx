import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import PaginateBtn from "../btns/PaginateBtn";

const CPagination = ({
    totalBlogs,
    currentPage,
    setCurrentPage,
    setItemsPerPage,
    itemsPerPage,
    displayedBlogs,
}) => {
    const totalPaginateBtn = Math.ceil(totalBlogs / itemsPerPage);
    const handlePageChange = (e) => {
        setCurrentPage(Number(e.target.value));
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

    const handleItems = (e) => {
        const count = e.target.value;
        const pageToJump = Math.ceil(totalBlogs / count);

        setItemsPerPage(count);
        if (currentPage > pageToJump) {
            setCurrentPage(pageToJump);
        }
    };

    return (
        <section className="mt-auto w-full">
            {/* for tablet & pc */}
            <div className="md:flex hidden items-center justify-center gap-16">
                <p className="text-lg font-medium flex items-center h-9 rounded-md px-2 border border-blue-500 dark:border-darkTer shadow text-blue-500 dark:text-darkTer">
                    {" "}
                    {`${displayedBlogs}  /  ${totalBlogs} `} Blogs
                </p>
                <div className="flex items-center gap-3">
                    <PaginateBtn
                        label={<IoIosArrowBack />}
                        event={handlePrevious}
                        currentPage={currentPage}
                        breakPoint={1}
                        isArrow={true}
                    />
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
                    <PaginateBtn
                        label={<IoIosArrowForward />}
                        event={handleNext}
                        currentPage={currentPage}
                        breakPoint={Number(totalPaginateBtn)}
                        isArrow={true}
                    />
                </div>

                <select
                    onChange={handleItems}
                    defaultValue={itemsPerPage}
                    className="w-28 h-9 rounded-md px-2 bg-white shadow dark:bg-gray-300 text-black text-lg outline-none cursor-pointer"
                >
                    <option value="3"> 3 Blogs </option>
                    <option value="5"> 5 Blogs </option>
                    <option value="7"> 7 Blogs </option>
                </select>
            </div>
            {/* for mobile */}
            <div className="flex md:hidden items-center justify-between w-full gap-3">
                <PaginateBtn
                    label={"Previous"}
                    event={handlePrevious}
                    currentPage={currentPage}
                    breakPoint={1}
                    isArrow={true}
                    isMobile={true}
                />
                <div className="ml-auto w-full max-w-[150px]">
                    <PaginateBtn
                        label={"Next"}
                        event={handleNext}
                        currentPage={currentPage}
                        breakPoint={Number(totalPaginateBtn)}
                        isArrow={true}
                        isMobile={true}
                    />
                </div>
            </div>
        </section>
    );
};

export default CPagination;
