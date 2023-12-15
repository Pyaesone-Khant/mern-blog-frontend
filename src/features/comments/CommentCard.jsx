import {useGetUserByIdQuery, useGetUserDataQuery} from "../users/UserApi";
import { useState } from "react";
import EditCommentForm from "./EditCommentForm";
import Author from "../blogs/Author";
import CommentActionsMenu from "@/features/comments/CommentActionsMenu.jsx";

const CommentCard = ({ commentItem }) => {
    const { data: commentedUser } = useGetUserByIdQuery(commentItem?.userId);
    const author = commentedUser?.data;
    const [isEditing, setIsEditing] = useState(false);
    const {data : userData} = useGetUserDataQuery();
    const currentUser = userData?.data;

    return (
        <section className="p-3 rounded-md bg-white dark:bg-slate-700 ">
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
                    setIsEditing={setIsEditing}
                    commentItem={commentItem}
                    author={author}
                />
            )}
        </section>
    );
};

export default CommentCard;
