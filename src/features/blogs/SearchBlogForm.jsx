import {Input} from "antd";
import {useSearchBlogsMutation} from "@/features/blogs/blogApi.js";
import {useState} from "react";
import {RxCross1} from "react-icons/rx";
import {useDispatch, useSelector} from "react-redux";
import {setAlertMessage} from "@/core/globalSlice.js";
import {setCurrentPage} from "@/features/blogs/blogSlice.js";
import {useGetCategoryByIdQuery} from "@/features/categories/categoriesApi.js";

const SearchBlogForm = ({setSearchedBlogs}) => {

    const [searchBlogs, {isLoading}] = useSearchBlogsMutation();
    const [searchValue, setSearchValue] = useState(null);

    const {keyword} = useSelector(state => state.category)

    const {data : categoryData} = useGetCategoryByIdQuery(keyword);
    const categoryTitle = categoryData?.data?.title

    const dispatch = useDispatch()

    const handleSearch = async (value) => {
        try {
            const {data} = await searchBlogs({title : value, categoryId: keyword});
            const blogs = data?.data
            dispatch(setCurrentPage(1))
            if(blogs?.length){
                setSearchedBlogs(blogs)
            }else{
                dispatch(setAlertMessage({type: "info", content: <>There is no blogs with title <span className={`capitalize text-cBlue`}> "{searchValue}" </span> { categoryTitle && <> in category <span className={`capitalize text-cBlue`}> "{categoryTitle}" </span></> } ! </>}));
                setSearchValue(null)
            }
        }catch (error){
            throw new Error(error)
        }
    }

    const clearData = () => {
        setSearchValue(null)
        setSearchedBlogs(null)
        dispatch(setCurrentPage(1))
    }

    return (
        <section className={`w-full p-5 bg-white dark:bg-slate-700 shadow rounded-md`} >
            <label htmlFor="search-blog" className={`text-lg font-medium inline-block mb-1`} > Search Blogs </label>
            <div className={`relative`} >
                <Input.Search id={"search-blog"} placeholder="Search blogs by title" onSearch={handleSearch} disabled={isLoading} onChange={(e) => setSearchValue(e.target.value)} value={searchValue}/>
                {
                    searchValue && <button type={"button"} onClick={clearData} className={`absolute right-12 top-1/2 transform -translate-y-1/2 z-[5] w-6 h-6 border rounded-full bg-black/30 hover:bg-black/50 duration-200 flex items-center justify-center text-sm`} > <RxCross1 /> </button>
                }
            </div>
        </section>
    )
}

export default SearchBlogForm