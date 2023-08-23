import { ErrorMsg } from "@/components";
import { useForm } from "react-hook-form";
import { BsCheck2 } from "react-icons/bs";
import {
    useGetCommentByIdQuery,
    useUpdateCommentMutation,
} from "./commentsApi";
import { useEffect } from "react";
import { IconBtn } from "@/components";

const EditCommentForm = ({ setIsEditing, commentItem }) => {
    const { data: currentCommentData } = useGetCommentByIdQuery(
        commentItem?._id
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm();

    useEffect(() => {
        if (currentCommentData) {
            setValue("comment", currentCommentData?.data.comment);
        }
    }, [currentCommentData]);

    const [updateComment] = useUpdateCommentMutation();

    const handleCommentUpdate = async (commentData) => {
        try {
            const updatedCommentObj = {
                id: commentItem?._id,
                comment: commentData?.comment,
            };
            await updateComment(updatedCommentObj);
            setIsEditing(false);
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <form action="#" onSubmit={handleSubmit(handleCommentUpdate)}>
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
                <ErrorMsg message={errors.comment?.message} />
            </div>
            <IconBtn
                event={handleCommentUpdate}
                icon={<BsCheck2 />}
                tooltip={"Save"}
                action={"submit"}
            />
        </form>
    );
};

export default EditCommentForm;
