import { useState } from "react";

// components
import Author from "@/features/blogs/components/Author.jsx";
import CommentActionsMenu from "@/features/comments/CommentActionsMenu.jsx";
import EditCommentForm from "./EditCommentForm";

// hooks
import { useCurrentUser } from "@/hooks/useCurrentUser.js";

// api
import { useGetUserByIdQuery } from "@/features/users/UserApi";

const CommentCard = ({ commentItem }) => {

    const [isEditing, setIsEditing] = useState(false);
    const { currentUser } = useCurrentUser();
    const { data: author } = useGetUserByIdQuery(commentItem?.userId, {
        skip: !commentItem?.userId
    });

    const toggleEditing = () => setIsEditing(!isEditing);

    return (
        <section
            className={`py-3 border-b border-darkBgSec/20 dark:border-gray-700`}
        >
            {!isEditing ? (
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <Author author={author} isComment={true} />
                        {currentUser?._id === author?._id ||
                            currentUser?.email === "admin123@gmail.com" ? (
                            <div className="flex items-center gap-3 ">
                                <CommentActionsMenu
                                    toggleEditing={toggleEditing}
                                    commentId={commentItem?._id}
                                />
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                    <p
                        className={`text-darkBgSec dark:text-gray-300 text-sm pl-9`}
                    >
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
