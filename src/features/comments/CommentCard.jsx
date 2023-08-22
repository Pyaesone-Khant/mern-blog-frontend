import { BsTrash3Fill, BsPencil, BsCheck2 } from "react-icons/bs";
import {
    useDeleteCommentMutation,
    useGetCommentByIdQuery,
    useUpdateCommentMutation,
} from "./commentsApi";
import { Tooltip } from "antd";
import { useGetUserByIdQuery } from "../users/UserApi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CommentCard = ({ commentItem }) => {
    const [deleteComment] = useDeleteCommentMutation();
    const [updateComment] = useUpdateCommentMutation();
    const { data: commentedUser } = useGetUserByIdQuery(commentItem?.userId);
    const author = commentedUser?.data;
    const [isEditing, setIsEditing] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);
    const nav = useNavigate();

    const { data: currentCommentData } = useGetCommentByIdQuery(
        commentItem?._id
    );

    const currentComment = currentCommentData?.data;

    const {
        register,
        formState: { errors },
        setValue,
        handleSubmit,
    } = useForm();

    useEffect(() => {
        if (currentCommentData) {
            setValue("comment", currentComment?.comment);
        }
    }, [currentCommentData]);

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

    const handleCommentUpdate = async (commentData) => {
        setIsEditing(false);
        try {
            const updatedCommentObj = {
                id: commentItem?._id,
                comment: commentData?.comment,
            };
            const { data } = await updateComment(updatedCommentObj);
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <section className="p-3 rounded-md bg-white ">
            {!isEditing ? (
                <div className="">
                    <p className={`text-black`}> {commentItem?.comment} </p>
                    <div className="flex items-center gap-5 mt-3">
                        <p className="text-sm font-medium text-gray-500">
                            {" "}
                            Commented By{" "}
                            <Link
                                to={`/users/${author?._id}`}
                                className=" italic underline underline-offset-2 hover:text-blue-600 duration-200"
                            >
                                {" "}
                                {author?.name}{" "}
                            </Link>{" "}
                        </p>
                        {currentUser?._id === author?._id ||
                        currentUser?.email === "admin123@gmail.com" ? (
                            <div className="flex items-center gap-3 ">
                                <Tooltip
                                    placement="top"
                                    title={<p className="font-sans">Edit </p>}
                                >
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className=" outline-none border-none text-white p-2 rounded bg-black hover:bg-slate-800 duration-200"
                                    >
                                        <BsPencil />
                                    </button>
                                </Tooltip>
                                <Tooltip
                                    placement="top"
                                    title={
                                        <p className="font-sans"> Delete </p>
                                    }
                                >
                                    <button
                                        onClick={handleDelete}
                                        className=" outline-none border-none text-white p-2 rounded bg-red-600 hover:bg-red-500 duration-200"
                                    >
                                        <BsTrash3Fill />{" "}
                                    </button>
                                </Tooltip>
                            </div>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            ) : (
                <form action="" onSubmit={handleSubmit(handleCommentUpdate)}>
                    <div className="mb-2">
                        <textarea
                            rows={2}
                            {...register("comment", {
                                required: {
                                    value: true,
                                    message: "Blog comment is required!",
                                },
                                minLength: {
                                    value: 1,
                                    message:
                                        "Blog content must have at least 1 character!",
                                },
                            })}
                            className={`form-input resize-none ${
                                errors.comment?.message ? "input-error" : ""
                            }`}
                        ></textarea>
                        <p className="error"> {errors.comment?.message} </p>
                    </div>
                    <Tooltip
                        placement="top"
                        title={<p className="font-sans">Save </p>}
                    >
                        <button
                            type="submit"
                            className=" outline-none border-none text-white p-2 rounded bg-black hover:bg-slate-800 duration-200"
                        >
                            <BsCheck2 />
                        </button>
                    </Tooltip>
                </form>
            )}
        </section>
    );
};

export default CommentCard;
