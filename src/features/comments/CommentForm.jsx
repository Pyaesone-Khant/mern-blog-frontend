import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useCreateCommentMutation } from "./commentsApi";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components";

const CommentForm = ({ blogId, isCommenting, setIsCommenting }) => {
    const form = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user: currentUser } = useSelector((state) => state.auth);
    const [createComment] = useCreateCommentMutation();
    const nav = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = form;

    const onFormSubmit = async (data) => {
        const commentData = {
            userId: currentUser?._id,
            blogId: blogId,
            comment: data.comment,
        };
        setIsSubmitting(true);
        try {
            const { data } = await createComment(commentData);
            if (data?.success) {
                setValue("comment", "");
                setIsSubmitting(false);
                setIsCommenting(false);
                nav(`/blogs/${blogId}`);
            } else {
                setIsSubmitting(false);
                nav(`/blogs/${blogId}`);
            }
        } catch (error) {
            throw new Error(error);
        }
    };
    return (
        <section className="max-w-2xl w-full mx-auto">
            {isCommenting ? (
                <form
                    action=""
                    className="my-1"
                    onSubmit={handleSubmit(onFormSubmit)}
                >
                    <div className="">
                        <textarea
                            placeholder={`Commenting as ${currentUser?.name} . . .`}
                            rows={3}
                            {...register("comment", {
                                required: {
                                    value: true,
                                    message: "Blog content is required!",
                                },
                                pattern: {
                                    value: /^([@A-Za-z])+[\w -!$_.]*/,
                                    message:
                                        "First letter of the content must be capital !",
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
                    <button className="ml-auto btn submit-btn ">
                        {isSubmitting ? <Spinner /> : "Send"}
                    </button>
                </form>
            ) : (
                ""
            )}
        </section>
    );
};

export default CommentForm;
