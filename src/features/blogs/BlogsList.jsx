import BlogCard from "./BlogCard";
import BlogNotFound from "./BlogNotFound";
import {Pagination} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentPage} from "@/features/blogs/blogSlice.js";

const BlogsList = ({ blogs, totalBlogs, isBFetching }) => {
    const { itemsPerPage, currentPage } = useSelector((state) => state.blog);
    const dispatch = useDispatch();

    return blogs?.length > 0 ?
        <div className=" w-full h-full flex flex-col gap-5 items-center">
            {
                blogs?.map((blog) =>
                    <BlogCard
                        key={blog._id}
                        blog={blog}
                        isBFetching={isBFetching}
                    />
                )
            }
            <div className={" hidden md:flex mt-auto"} >
                <Pagination total={totalBlogs} pageSize={itemsPerPage} current={currentPage} onChange={(value) => dispatch(setCurrentPage(value))} showLessItems={true} showSizeChanger={false} responsive={true}  />
            </div>
            <div className={" md:hidden mt-auto"} >
            <Pagination simple current={currentPage} total={totalBlogs} pageSize={itemsPerPage} onChange={(value) => dispatch(setCurrentPage(value))} responsive={true} className={'md:hidden'} />
            </div>
        </div>
             : (
                <BlogNotFound />)


};

export default BlogsList;
