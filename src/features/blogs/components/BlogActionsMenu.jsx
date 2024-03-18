import { useState } from "react";

// icons
import { MdMoreHoriz, MdOutlineDelete, MdOutlineEdit } from "react-icons/md";

// components
import { CustomBtn, CustomModal } from "@/components/index.js";
import MenuLink from "@/components/navbar/MenuLink.jsx";
import { Dropdown } from "antd";

// hooks
import { useCurrentUser } from "@/hooks/useCurrentUser.js";
import { useSlugChanger } from "@/hooks/useSlugChanger.js";

// api
import { useDeleteBlogMutation } from "@/features/blogs/blogApi.js";

// reducer
import { setAlertMessage } from "@/core/globalSlice.js";

// third-party
import { useDispatch } from "react-redux";

const BlogActionsMenu = ({ blogId, slug }) => {

    const [openModal, setOpenModal] = useState(false)
    const { currentUser } = useCurrentUser()
    const nameSlug = useSlugChanger(currentUser?.name)
    const dispatch = useDispatch()

    const [deleteBlog, { isLoading }] = useDeleteBlogMutation();

    const handleDelete = async () => {
        try {
            const { data, error } = await deleteBlog(blogId);
            if (data) {
                dispatch(setAlertMessage({ content: data?.message, type: "success" }))
            } else {
                dispatch(setAlertMessage({ content: error?.data?.message, type: "error" }))
            }
        } catch (error) {
            throw new Error(error?.data?.message || "Something went wrong!")
        }
    }

    const toggleModal = () => setOpenModal(!openModal)

    const items = [
        {
            key: 1,
            label: <MenuLink path={`/${nameSlug}/${slug}/edit`} title={"edit"} state={blogId} className={"!py-1"} />,
            icon: <MdOutlineEdit className={`!text-lg`} />
        },
        {
            key: 2,
            label: <p className={`py-1`}> Delete </p>,
            danger: true,
            icon: <MdOutlineDelete className={`!text-lg`} />,
            onClick: toggleModal,
        }
    ]

    return (
        <section>
            <Dropdown menu={{ items }} trigger={["click"]} placement={"bottomRight"}>
                <button
                    className={`text-2xl dark:text-gray-400 dark:hover:text-gray-200 text-darkBgSec/80 hover:text-darkBgSec duration-200`}>
                    <MdMoreHoriz /></button>
            </Dropdown>

            {/*for delete confirmation*/}
            <CustomModal isOpen={openModal}
                closeModal={toggleModal}
                title={"Are you sure you want to delete this blog?"}
            >
                <p>You won&apos;t be able revert this!</p>
                <div className={`pt-2 flex items-center justify-center gap-2`}>
                    <CustomBtn
                        variant={"cancel"}
                        size={"xs"}
                        onClick={toggleModal}
                    >
                        Cancel
                    </CustomBtn>
                    <CustomBtn
                        variant={"danger"}
                        size={"xs"}
                        loading={isLoading}
                        onClick={handleDelete}
                    >
                        Delete
                    </CustomBtn>
                </div>
            </CustomModal>
        </section>
    );
};

export default BlogActionsMenu;
