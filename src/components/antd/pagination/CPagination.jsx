import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import PaginateBtn from "../btns/PaginateBtn";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage, setItemsPerPage } from "@/features/blogs/blogSlice";
import ItemSelectBox from "./ItemSelectBox";
import DisplayedStatus from "./DisplayedStatus";

const CPagination = ({ totalBlogs, displayedBlogs }) => {
    const { itemsPerPage, currentPage } = useSelector((state) => state.blog);
    const dispatch = useDispatch();

    const totalPages = Math.ceil(totalBlogs / itemsPerPage);
    const handlePageChange = (e) => {
        dispatch(setCurrentPage(Number(e.target.value)));
    };
    const handlePrevious = () => {
        if (currentPage > 0) {
            dispatch(setCurrentPage(currentPage - 1));
        }
    };
    const handleNext = () => {
        if (currentPage < totalPages) {
            dispatch(setCurrentPage(currentPage + 1));
        }
    };

    const handleItems = (e) => {
        const count = e.target.value;
        const pageToJump = Math.ceil(totalBlogs / count);

        dispatch(setItemsPerPage(count));
        if (currentPage > pageToJump) {
            dispatch(setCurrentPage(pageToJump));
        }
    };

    return (
        <section className="mt-auto w-full">
            {/* for tablet & pc */}
            <div className="md:flex md:flex-col lg:flex-row hidden items-center justify-center gap-5">
                <div className="flex items-center md:justify-between w-full lg:w-auto">
                    <DisplayedStatus
                        displayed={displayedBlogs}
                        total={totalBlogs}
                        type={totalBlogs > 1 ? "Blogs" : "Blog"}
                    />
                    <div className="md:block lg:hidden">
                        <ItemSelectBox
                            handleItems={handleItems}
                            itemsPerPage={itemsPerPage}
                        />
                    </div>
                </div>
                <div className="flex items-center gap-3 ">
                    <PaginateBtn
                        label={<IoIosArrowBack />}
                        event={handlePrevious}
                        currentPage={currentPage}
                        breakPoint={1}
                        isArrow={true}
                    />
                    {new Array(totalPages).fill(null).map((_, index) => {
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
                        breakPoint={Number(totalPages)}
                        isArrow={true}
                    />
                </div>
                <div className="hidden lg:block">
                    <ItemSelectBox
                        handleItems={handleItems}
                        itemsPerPage={itemsPerPage}
                    />
                </div>
            </div>
            {/* for mobile */}

            <div className="md:hidden flex flex-col gap-3">
                <DisplayedStatus
                    displayed={currentPage}
                    total={totalPages}
                    type={"Pages"}
                />

                <div className="flex items-center justify-between w-full gap-3">
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
                            breakPoint={Number(totalPages)}
                            isArrow={true}
                            isMobile={true}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CPagination;
