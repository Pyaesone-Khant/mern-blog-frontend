import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PwsBtn, SubmitBtn, ErrorMsg } from "@/components";
import { useNavigate } from "react-router-dom";
import { useChangeUserPasswordMutation } from "./UserApi";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setLoginState } from "../auth/authSlice";

const ChangePasswordForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [canSave, setCanSave] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState("");
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const form = useForm();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = form;
    const formData = watch();
    const nav = useNavigate();

    const [changeUserPassword] = useChangeUserPasswordMutation();

    const onSubmit = async (data) => {
        const updatedPasswords = { ...data, id: user?._id };
        setIsSubmitting(true);
        try {
            const { data } = await changeUserPassword(updatedPasswords);
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
        if (formData.password && formData.newPassword) {
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

                {apiError && <ErrorMsg message={apiError} isFromApi={true} />}
                <form action="#" onSubmit={handleSubmit(onSubmit)}>
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
                        <label htmlFor="newPassword"> New Password</label>
                        <div className="relative">
                            <input
                                type={showNewPassword ? "text" : "password"}
                                {...register("newPassword", {
                                    required: {
                                        value: true,
                                        message: "New password is required!",
                                    },
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

export default ChangePasswordForm;
