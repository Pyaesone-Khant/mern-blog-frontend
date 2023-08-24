import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMsg, PwsBtn, SubmitBtn } from "@/components";
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
                dispatch(
                    setLoginState({
                        isLoggedIn: false,
                        user: null,
                        token: null,
                    })
                );
                nav("/login", { state: data?.message });
            } else {
                setIsSubmitting(false);
                setApiError(data?.message);
                setTimeout(() => {
                    setApiError(null);
                }, 3000);
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
            <div className="common-card">
                <h2 className="form-tlt"> Change Password </h2>

                {apiError && <ErrorMsg message={apiError} isFromApi={true} />}
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

                        <ErrorMsg message={errors.name?.message} />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password"> Current Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
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
                            <PwsBtn
                                isShowed={showPassword}
                                event={handleShowPassword}
                            />
                        </div>
                        <ErrorMsg message={errors.password?.message} />
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
                                type={showNewPassword ? "text" : "password"}
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
                            <PwsBtn
                                isShowed={showNewPassword}
                                event={handleShowNewPassword}
                            />
                        </div>
                        <ErrorMsg message={errors.newPassword?.message} />
                    </div>
                    <SubmitBtn
                        label={"Submit"}
                        isSubmitting={isSubmitting}
                        canSave={canSave}
                        isDisabled={true}
                    />
                </form>
            </div>
        </section>
    );
};

export default ChangeUserDetail;
