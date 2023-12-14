import MenuLink from "@/components/navbar/MenuLink.jsx";
import ConfirmationModal from "@/features/blogs/components/ConfirmationModal.jsx";
import {Dropdown} from "antd";
import {MdMoreHoriz} from "react-icons/md";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {useDeleteBlogMutation} from "@/features/blogs/blogApi.js";
const ActionsMenu = ({blogId}) => {
    const [path, setPath] = useState("");
    const location = useLocation();
    useEffect(() => {
        if(location.pathname.includes("blogs")){
            setPath("edit")
        }else{
            setPath(`/blogs/${blogId}/edit`)
        }
    }, [location]);

    const [deleteBlog] = useDeleteBlogMutation();

    const items = [
        {
            key : 1,
            label : <MenuLink path={path} title={"edit"} />
        },
        {
            key : 2,
            label : <ConfirmationModal blogId={blogId} event={() => deleteBlog(blogId)} returnPath={"/"} />,
            danger : true
        }
    ]

    return (
        <Dropdown menu={{items}} trigger={["click"]} placement={"bottomRight"}>
            <button className={`text-2xl dark:text-gray-400 dark:hover:text-gray-200 text-darkBgSec/80 hover:text-darkBgSec duration-200`}> <MdMoreHoriz/> </button>
        </Dropdown>
    );
};

export default ActionsMenu;
