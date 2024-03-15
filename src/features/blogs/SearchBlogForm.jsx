import { setAlertMessage } from "@/core/globalSlice.js";
import { useGetSearchedDataQuery } from "@/features/auth/authApi";
import { useResponsive } from "@/hooks/useResponsive.js";
import { cn } from "@/utils.js";
import { Form, Input } from "antd";
import { useState } from "react";
import { GoSearch } from "react-icons/go";
import { MdClear } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SearchBlogForm = ({ event }) => {

    const [search, setSearch] = useState("")
    const [isInvalid, setIsInvalid] = useState(true)
    const [isSearching, setIsSearching] = useState(false)
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const nav = useNavigate()
    const { isMobile } = useResponsive()

    const { data: searchedData, isLoading, isFetching } = useGetSearchedDataQuery(search, {
        skip: !search
    })


    const onSearch = ({ keyword }) => {
        if (!keyword || keyword === "" || keyword?.trim().length === 0) {
            dispatch(setAlertMessage({ content: "Please enter a valid keyword", type: "error" }))
            return;
        }
        setSearch(keyword);
        if (!isLoading && !isFetching) {
            nav(`/search?q=${keyword}`)
            isMobile && event()
        }
    }

    const onChange = (e) => {
        const value = e.target.value;
        if (!value || value?.trim().length === 0) {
            setIsInvalid(true)
        } else {
            setIsInvalid(false)
        }
    }

    const onClear = () => {
        form.resetFields();
        setIsInvalid(true)
    }


    return <Form form={form} onFinish={onSearch}
        className={cn(`flex items-center relative overflow-hidden rounded-full min-w-[200px] md:min-w-[300px] w-full bg-black/[0.05]  dark:!bg-white/10 px-2 border border-transparent duration-200`, { " border-black/30 dark:border-white/30 ": isSearching })}>
        <GoSearch className={cn(`text-2xl text-gray-500 duration-200`, { "text-black dark:text-white": isSearching })} />
        <Form.Item name={"keyword"} className={`mb-0 w-full`}>
            <Input placeholder={`Search Here . . .`}
                className={"md:h-10 h-9 text-sm !w-full dark:!text-white dark:!placeholder-gray-400 !border-none !bg-transparent focus:!shadow-none px-1"} onChange={onChange} autoComplete="off" onFocus={() => setIsSearching(true)} onBlur={() => setIsSearching(false)} />
        </Form.Item>


        <MdClear onClick={onClear} className={cn(`px-0 py-0 absolute  top-1/2 transform -translate-y-1/2 duration-300 text-2xl cursor-pointer text-black/70 dark:text-white/70`, {
            "right-2": !isInvalid,
            "-right-20": isInvalid
        })} />
    </Form>
}

export default SearchBlogForm