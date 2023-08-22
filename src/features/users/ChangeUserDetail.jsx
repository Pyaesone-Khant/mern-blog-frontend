import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import { Spinner } from "@/components";
import { useNavigate } from "react-router-dom";
import { useUpdateUserMutation } from "./UserApi";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setLoginState } from "../auth/authSlice";

const ChangeUserDetail = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [canSave, setCanSave] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState("");
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const form = useForm({
        defaultValues: {
            name: user?.name,
            newPassword: null,
        },
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = form;
    const formData = watch();
    const nav = useNavigate();

    const [updateUser] = useUpdateUserMutation();

    const onSubmit = async (data) => {
        const updatedUser = data.newPassword
            ? { ...data, id: user?._id }
            : { name: data?.name, password: data?.password, id: user?._id };
        setIsSubmitting(true);
        try {
            const { data } = await updateUser(updatedUser);
            if (data?.success) {
                Cookies.remove("token");
                Cookies.remove("user");
                setIsSubmitting(false);
                dispatch(setLoginState(false));
                nav("/login", { state: data?.message });
            } else {
                setIsSubmitting(false);
                setApiError(data?.message);
            }
        } catch (error) {
            throw new Error(error);
        }
    };
    useEffect(() => {
        if (formData.name && formData.password) {
            setCanSave(true);
        } else {
            setCanSave(false);
        }
    }, [formData]);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
    };

    return (
        <section className="  flex items-center justify-center  w-full">
            <div className="p-5 rounded-md shadow-md max-w-2xl w-full border bg-white">
                <h2 className="form-tlt"> Change Password </h2>

                {apiError ? (
                    <p className=" p-3 rounded-md bg-red-700/60 border border-red-500 text-white  my-5">
                        {" "}
                        {apiError}{" "}
                    </p>
                ) : (
                    ""
                )}
                <form action="#" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-5">
                        <label htmlFor="name"> Name</label>
                        <input
                            type="text"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: "Name is required!",
                                },
                                pattern: {
                                    value: /\b([A-ZÀ-ÿ][-,a-zA-Z. ']+[ ]*)+/,
                                    message:
                                        "First letter of the name must be a capital letter!",
                                },
                                minLength: {
                                    value: 5,
                                    message:
                                        "Name must have at least 5 characters!",
                                },
                            })}
                            id="name"
                            className={`form-input ${
                                errors.name?.message ? "input-error" : ""
                            }`}
                        />

                        <p className="error"> {errors.name?.message} </p>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password"> Current Password</label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message:
                                            "Current password is required to change a new one!",
                                    },
                                })}
                                id="password"
                                className={`form-input ${
                                    errors.password?.message
                                        ? "input-error"
                                        : ""
                                }`}
                            />
                            <button
                                onClick={handleShowNewPassword}
                                type="button"
                                className="pws-btn"
                            >
                                {showNewPassword ? (
                                    <BsEyeFill />
                                ) : (
                                    <BsEyeSlashFill />
                                )}
                            </button>
                        </div>
                        <p className="error"> {errors.password?.message} </p>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="newPassword">
                            {" "}
                            New Password{" "}
                            <span className="text-gray-400">
                                {" "}
                                (Optional){" "}
                            </span>{" "}
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("newPassword", {
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                        message:
                                            "Password must have minimum eight characters, at least one uppercase letter, one number and one special character.",
                                    },
                                })}
                                id="newPassword"
                                className={`form-input ${
                                    errors.newPassword?.message
                                        ? "input-error"
                                        : ""
                                }`}
                            />
                            <button
                                onClick={handleShowPassword}
                                type="button"
                                className="pws-btn"
                            >
                                {showPassword ? (
                                    <BsEyeFill />
                                ) : (
                                    <BsEyeSlashFill />
                                )}
                            </button>
                        </div>
                        <p className="error"> {errors.newPassword?.message} </p>
                    </div>
                    <button
                        className={` btn submit-btn ${
                            canSave && !isSubmitting ? "" : "disabled"
                        }`}
                        disabled={!canSave || isSubmitting}
                    >
                        {isSubmitting ? <Spinner /> : "Save"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ChangeUserDetail;
