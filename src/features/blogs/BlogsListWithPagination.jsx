// icons
import {MdArrowBackIos, MdArrowForwardIos,} from "react-icons/md";

// components
import {Pagination} from "antd";
import PaginateBtn from "@/components/antd/btns/PaginateBtn.jsx";
import BlogCard from "./components/BlogCard.jsx";
import BlogNotFound from "./BlogNotFound";

// reducers
import {setCurrentPage} from "@/features/blogs/blogSlice.js";

// hooks
import {useResponsive} from "@/hooks/useResponsive.js";

// utils
import {cn} from "@/utils.js";

// redux
import {useDispatch, useSelector} from "react-redux";

const BlogsListWithPagination = ({blogs, totalBlogs, loading}) => {
    const {itemsPerPage, currentPage} = useSelector((state) => state.blog);
    const {isMediumDevice} = useResponsive();
    const dispatch = useDispatch();
    const totalPages = Math.ceil(totalBlogs / itemsPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            dispatch(setCurrentPage(currentPage + 1));
        }
    }
    const goToPrevPage = () => {
        if (currentPage > 1) {
            dispatch(setCurrentPage(currentPage - 1));
        }
    }

    return blogs?.length > 0 ?
        <div className={cn("w-full h-full flex flex-col gap-5 items-center", {"max-w-[70%]": !isMediumDevice})}>
            <div className={`grid grid-cols-1 gap-5 w-full items-stretch `}>
                {
                    blogs?.map((blog) =>
                        <BlogCard
                            key={blog._id}
                            blog={blog}
                            isBFetching={loading}
                        />
                    )
                }
            </div>
            <div className={" hidden md:flex mt-auto !font-grm "}>
                <Pagination total={totalBlogs} pageSize={itemsPerPage} current={currentPage}
                            onChange={(value) => dispatch(setCurrentPage(value))} showLessItems={true}
                            showSizeChanger={false} responsive={true}/>
            </div>
            <div className={" md:hidden mt-auto w-full flex justify-center gap-5 items-center"}>
                <PaginateBtn
                    label={<p className={`w-full flex items-center justify-center`}><MdArrowBackIos/> Previous </p>}
                    event={goToPrevPage} breakPoint={1}/>
                <p className={`text-lg font-medium font-grm `}> {currentPage} / {totalPages} </p>
                <PaginateBtn
                    label={<p className={`w-full flex items-center justify-center`}> Next <MdArrowForwardIos/></p>}
                    event={goToNextPage} breakPoint={totalPages}/>
            </div>
        </div>
        : (
            <BlogNotFound/>
        )


};

export default BlogsListWithPagination;
