import {Form, Input} from "antd";
import {useState} from "react";
import {CustomBtn} from "@/components/index.js";
import {MdOutlineSearch} from "react-icons/md";
import {cn} from "@/utils.js";
import {useDispatch} from "react-redux";
import {setAlertMessage} from "@/core/globalSlice.js";
import {useGetSearchedBlogsQuery} from "@/features/blogs/blogApi.js";
import {useNavigate} from "react-router-dom";
import {useResponsive} from "@/hooks/useResponsive.js";

const SearchBlogForm = ({event}) => {

    const [search, setSearch] = useState("")
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const nav = useNavigate()
    const {isMobile} = useResponsive()

    const {data: searchedBlogs, isLoading, isFetching} = useGetSearchedBlogsQuery(search, {
        skip: !search,
    });
    const onSearch = ({keyword}) => {
        if (!keyword || keyword === "" || keyword?.trim().length === 0) {
            dispatch(setAlertMessage({content: "Please enter a valid keyword", type: "error"}))
            return;
        }
        setSearch(keyword);
        if (!isLoading && !isFetching) {
            nav(`/search?q=${keyword}`)
            setSearch("")
            form.resetFields();
            isMobile && event()
        }
    }

    const isInvalid = !search || search === "" || search?.trim().length === 0

    const onChange = (e) => {
        setSearch(e.target.value)
    }

    return <Form form={form} onFinish={onSearch}
                 className={cn(`flex items-stretch relative overflow-hidden rounded-full w-full`)}>
        <Form.Item name={"keyword"} className={`mb-0 w-full md:w-fit`}>
            <Input placeholder={"Search Here . . ."}
                   className={"md:h-10 h-9 text-sm  rounded-full min-w-[200px] md:min-w-[300px] w-full bg-black/10 border-transparent dark:!bg-white/10 dark:!text-white dark:!placeholder-gray-400"}
                   onChange={onChange}/>
        </Form.Item>

        <CustomBtn htmlType={"submit"}
                   className={cn(`px-0 py-0 h-9 !aspect-square !rounded-full flex items-center justify-center absolute  top-1/2 transform -translate-y-1/2 duration-300`, {
                       "right-[2px]": !isInvalid,
                       "-right-20": isInvalid
                   })}>
            <MdOutlineSearch className={`!text-lg`}/>
        </CustomBtn>
    </Form>
}

export default SearchBlogForm