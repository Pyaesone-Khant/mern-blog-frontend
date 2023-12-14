import {Dropdown} from "antd";
import {MdMoreHoriz} from "react-icons/md";
import MenuLink from "@/components/navbar/MenuLink.jsx";
import ConfirmationModal from "@/features/blogs/components/ConfirmationModal.jsx";
import {useDeleteCommentMutation} from "@/features/comments/commentsApi.js";

const CommentActionsMenu = ({handleEdit, commentId, returnPath}) => {
    const [deleteComment] = useDeleteCommentMutation();
    const items = [
        {
            key : 1,
            label : <MenuLink title={"edit"} event={handleEdit} />
        },
        {
            key : 2,
            label : <ConfirmationModal returnPath={returnPath} event={() => deleteComment(commentId)} isComment={true} />,
            danger : true
        }
    ]

    return (
        <section className={`flex`} >
            <Dropdown menu={{items}} trigger={["click"]} placement={"bottomRight"}>
                <button className={`text-2xl`} > <MdMoreHoriz/> </button>
            </Dropdown>
        </section>
    )
}

export default CommentActionsMenu;