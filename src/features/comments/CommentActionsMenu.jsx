import {Dropdown} from "antd";
import {MdMoreHoriz, MdOutlineDelete, MdOutlineEdit} from "react-icons/md";
import ConfirmationModal from "@/features/blogs/components/ConfirmationModal.jsx";
import {useDeleteCommentMutation} from "@/features/comments/commentsApi.js";

const CommentActionsMenu = ({toggleEditing, commentId, returnPath}) => {

    const [deleteComment] = useDeleteCommentMutation();
    const items = [
        {
            key: 1,
            label: <p className={`py-1`}>Edit</p>,
            icon: <MdOutlineEdit className={`!text-lg`}/>,
            onClick: toggleEditing,
        },
        {
            key: 2,
            label: <ConfirmationModal returnPath={returnPath} event={() => deleteComment(commentId)} isComment={true}/>,
            danger: true,
            icon: <MdOutlineDelete className={`!text-lg`}/>
        }
    ]

    return (
        <section className={`flex`}>
            <Dropdown menu={{items}} trigger={["click"]} placement={"bottomRight"}>
                <button className={`text-2xl`}><MdMoreHoriz/></button>
            </Dropdown>
        </section>
    )
}

export default CommentActionsMenu;