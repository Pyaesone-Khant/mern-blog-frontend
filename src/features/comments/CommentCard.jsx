import {useGetUserByIdQuery, useGetUserDataQuery} from "../users/UserApi";
import EditCommentForm from "./EditCommentForm";
import Author from "../blogs/components/Author.jsx";
import CommentActionsMenu from "@/features/comments/CommentActionsMenu.jsx";
import {useState} from "react";

const CommentCard = ({commentItem}) => {
    const {data: commentedUser} = useGetUserByIdQuery(commentItem?.userId);
    const author = commentedUser?.data;

    const [isEditing, setIsEditing] = useState(false)
    const toggleEditing = () => setIsEditing(!isEditing)

    const {data: userData} = useGetUserDataQuery();
    const currentUser = userData?.data;

    return (
        <section className={`py-3 border-b border-darkBgSec/20 dark:border-gray-700`}>
            {!isEditing ? (
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <Author author={author} isComment={true}/>
                        {currentUser?._id === author?._id ||
                        currentUser?.email === "admin123@gmail.com" ? (
                            <div className="flex items-center gap-3 ">
                                <CommentActionsMenu toggleEditing={toggleEditing}
                                                    commentId={commentItem?._id}
                                                    returnPath={`/blogs/${commentItem?.blogId}`}/>
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
                    toggleEditing={toggleEditing}
                />
            )}
        </section>
    );
};

export default CommentCard;
