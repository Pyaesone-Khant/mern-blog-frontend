import {useState} from "react";

// icons
import {MdMoreHoriz, MdOutlineDelete, MdOutlineEdit} from "react-icons/md";

// components
import {Dropdown} from "antd";
import {CustomBtn, CustomModal} from "@/components/index.js";

// apis
import {useDeleteCommentMutation} from "@/features/comments/commentsApi.js";

// reducers
import {setAlertMessage} from "@/core/globalSlice.js";

// third-party
import {useDispatch} from "react-redux";

const CommentActionsMenu = ({toggleEditing, commentId}) => {

    const [openModal, setOpenModal] = useState(false);
    const dispatch = useDispatch()
    const [deleteComment, {isLoading}] = useDeleteCommentMutation();

    const toggleModal = () => setOpenModal(!openModal)

    const handleDelete = async () => {
        try {
            const {data, error} = await deleteComment(commentId);
            if (data) {
                dispatch(
                    setAlertMessage({type: "success", content: data?.message})
                );
                toggleModal()
            } else {
                dispatch(
                    setAlertMessage({type: "error", content: error?.data?.message})
                );
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    const items = [
        {
            key: 1,
            label: <p className={`py-1`}>Edit</p>,
            icon: <MdOutlineEdit className={`!text-lg`}/>,
            onClick: toggleEditing,
        },
        {
            key: 2,
            label: <p className={`py-1`}> Delete </p>,
            danger: true,
            icon: <MdOutlineDelete className={`!text-lg`}/>,
            onClick: toggleModal
        }
    ]

    return (
        <section className={`flex`}>
            <Dropdown menu={{items}} trigger={["click"]} placement={"bottomRight"}>
                <button className={`text-2xl`}><MdMoreHoriz/></button>
            </Dropdown>

            <CustomModal isOpen={openModal} closeModal={toggleModal}
                         title={"Are you sure you want to delete this comment?"}>
                <p>You won&apos;t be able to revert this!</p>
                <div className={`flex items-center justify-center gap-2 pt-3`}>
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
    )
}

export default CommentActionsMenu;