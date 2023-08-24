import { BsTrash3Fill, BsPencilFill } from "react-icons/bs";
import { useDeleteCommentMutation } from "./commentsApi";
import { useGetUserByIdQuery } from "../users/UserApi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import EditCommentForm from "./EditCommentForm";
import { IconBtn } from "@/components";

const CommentCard = ({ commentItem }) => {
    const [deleteComment] = useDeleteCommentMutation();
    const { data: commentedUser } = useGetUserByIdQuery(commentItem?.userId);
    const author = commentedUser?.data;
    const [isEditing, setIsEditing] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);
    const nav = useNavigate();

    const handleDelete = async () => {
        try {
            const { data } = await deleteComment(commentItem?._id);
            if (data?.success) {
                nav(`/blogs/${commentItem?.blogId}`);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <section className="p-3 rounded-md bg-white dark:bg-slate-700 ">
            {!isEditing ? (
                <div>
                    <p className={`text-black dark:text-white`}>
                        {" "}
                        {commentItem?.comment}{" "}
                    </p>
                    <div className="flex items-center gap-5 mt-3">
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {" "}
                            Commented By{" "}
                            <Link
                                to={`/users/${author?._id}`}
                                className=" italic underline underline-offset-2 hover:text-blue-500 dark:hover:text-darkTer duration-200"
                            >
                                {" "}
                                {author?.name}{" "}
                            </Link>{" "}
                        </p>
                        {currentUser?._id === author?._id ||
                        currentUser?.email === "admin123@gmail.com" ? (
                            <div className="flex items-center gap-3 ">
                                <IconBtn
                                    event={() => setIsEditing(true)}
                                    action={"edit"}
                                    icon={<BsPencilFill />}
                                    tooltip="Edit"
                                />
                                <IconBtn
                                    event={handleDelete}
                                    action={"delete"}
                                    icon={<BsTrash3Fill />}
                                    tooltip="Delete"
                                />
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            ) : (
                <EditCommentForm
                    setIsEditing={setIsEditing}
                    commentItem={commentItem}
                />
            )}
        </section>
    );
};

export default CommentCard;
