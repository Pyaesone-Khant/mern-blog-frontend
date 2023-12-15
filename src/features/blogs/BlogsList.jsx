import BlogCard from "./BlogCard";
import BlogNotFound from "./BlogNotFound";
import {Pagination} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from "@/features/blogs/blogSlice.js";
import PaginateBtn from "@/components/antd/btns/PaginateBtn.jsx";
import {
    MdArrowBackIos,
    MdArrowForwardIos,
} from "react-icons/md";

const BlogsList = ({ blogs, totalBlogs, isBFetching }) => {
    const { itemsPerPage, currentPage } = useSelector((state) => state.blog);
    const dispatch = useDispatch();
    const totalPages = Math.ceil(totalBlogs / itemsPerPage);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            dispatch(setCurrentPage(currentPage + 1));
        }
    }

    const goToPrevPage = () => {
        if(currentPage > 1) {
            dispatch(setCurrentPage(currentPage - 1));
        }
    }

    return blogs?.length > 0 ?
        <div className=" w-full h-full flex flex-col gap-5 items-center">
            <div className={`grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 w-full items-stretch content-stretch `} >
                {
                    blogs?.map((blog) =>
                        <BlogCard
                            key={blog._id}
                            blog={blog}
                            isBFetching={isBFetching}
                        />
                    )
                }
            </div>
            <div className={" hidden md:flex mt-auto"} >
                <Pagination total={totalBlogs} pageSize={itemsPerPage} current={currentPage} onChange={(value) => dispatch(setCurrentPage(value))} showLessItems={true} showSizeChanger={false} responsive={true}  />
            </div>
            <div className={" md:hidden mt-auto w-full flex justify-center gap-5 items-center"} >
                <PaginateBtn label={<p className={`w-full flex items-center justify-center`}> <MdArrowBackIos/> Previous </p>} event={goToPrevPage} breakPoint={1} />
                <p className={`text-lg font-medium `}> {currentPage} / {totalPages} </p>
                    <PaginateBtn label={<p className={`w-full flex items-center justify-center`}> Next <MdArrowForwardIos/></p>}  event={goToNextPage} breakPoint={totalPages} />

            </div>
        </div>
             : (
                <BlogNotFound />)


};

export default BlogsList;
