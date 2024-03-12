import MenuLink from "@/components/navbar/MenuLink.jsx";
import ConfirmationModal from "@/features/blogs/components/ConfirmationModal.jsx";
import {Dropdown} from "antd";
import {MdMoreHoriz, MdOutlineDelete, MdOutlineEdit} from "react-icons/md";
import {useDeleteBlogMutation} from "@/features/blogs/blogApi.js";
import {useCurrentUser} from "@/hooks/useCurrentUser.js";
import {useSlugChanger} from "@/hooks/useSlugChanger.js";

const BlogActionsMenu = ({blogId, slug}) => {
    const {currentUser} = useCurrentUser()
    const nameSlug = useSlugChanger(currentUser?.name)

    const [deleteBlog] = useDeleteBlogMutation();

    const items = [
        {
            key: 1,
            label: <MenuLink path={`/${nameSlug}/${slug}/edit`} title={"edit"} state={blogId} className={"!py-1"}/>,
            icon: <MdOutlineEdit className={`!text-lg`}/>
        },
        {
            key: 2,
            label: <ConfirmationModal blogId={blogId} event={() => deleteBlog(blogId)} returnPath={"/"}/>,
            danger: true,
            icon: <MdOutlineDelete className={`!text-lg`}/>
        }
    ]

    return (
        <Dropdown menu={{items}} trigger={["click"]} placement={"bottomRight"}>
            <button
                className={`text-2xl dark:text-gray-400 dark:hover:text-gray-200 text-darkBgSec/80 hover:text-darkBgSec duration-200`}>
                <MdMoreHoriz/></button>
        </Dropdown>
    );
};

export default BlogActionsMenu;
