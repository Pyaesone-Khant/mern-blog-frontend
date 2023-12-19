import {useGetUserByIdQuery, useGetUserDataQuery} from "../users/UserApi";
import EditCommentForm from "./EditCommentForm";
import Author from "../blogs/Author";
import CommentActionsMenu from "@/features/comments/CommentActionsMenu.jsx";
import {useSelector} from "react-redux";

const CommentCard = ({ commentItem }) => {
    const { data: commentedUser } = useGetUserByIdQuery(commentItem?.userId);
    const author = commentedUser?.data;

    const {isEditing} = useSelector(state => state.comment)

    const {data : userData} = useGetUserDataQuery();
    const currentUser = userData?.data;

    return (
        <section className={`py-3 border-b border-darkBgSec/20 dark:border-gray-700`}>
            {!isEditing ? (
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <Author author={author} userId={author?._id} isComment={true} />
                        {currentUser?._id === author?._id ||
                        currentUser?.email === "admin123@gmail.com" ? (
                            <div className="flex items-center gap-3 ">
                                <CommentActionsMenu handleEdit={() => setIsEditing(true)}
                                            commentId={commentItem?._id}        returnPath={`/blogs/${commentItem?.blogId}`} />
                            </div>

                        ) : (
                            ""
                        )}
                    </div>
                    <p className={`text-darkBgSec dark:text-gray-300 text-sm pl-9`}>
                        {" "}
                        {commentItem?.comment}{" "}
                    </p>
                </div>
            ) : (
                <EditCommentForm
                    commentItem={commentItem}
                    author={author}
                />
            )}
        </section>
    );
};

export default CommentCard;
