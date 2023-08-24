import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginAccountMutation } from "./authApi";
import Cookies from "js-cookie";
import { notification } from "antd";
import { useDispatch } from "react-redux";
import { setLoginState } from "./authSlice";
import { PwsBtn, SubmitBtn, ErrorMsg } from "@/components";

const Login = () => {
    const [isShowed, setIsShowed] = useState(false);
    const [canSave, setCanSave] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState("");
    const [api, contextHolder] = notification.useNotification();
    const message = useLocation().state;
    const dispatch = useDispatch();

    const openNotification = () => {
        api.success({
            description: (
                <p className="font-sans font-medium tracking-wider">
                    {" "}
                    {message}
                </p>
            ),
            duration: 2,
        });
    };

    useEffect(() => {
        if (message?.trim().length) {
            openNotification();
        }
    }, []);

    const form = useForm();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = form;
    const formData = watch();

    const [loginAccount] = useLoginAccountMutation();
    const nav = useNavigate();

    const onSubmit = async (userData) => {
        try {
            setIsSubmitting(true);
            const { data } = await loginAccount(userData);
            if (data?.success) {
                Cookies.set("user", JSON.stringify(data?.user), {
                    expires: 60 * 60 * 24,
                });
                Cookies.set("token", data?.token, {
                    expires: 60 * 60 * 24,
                });
                setIsSubmitting(false);
                dispatch(
                    setLoginState({
                        isLoggedIn: true,
                        user: data?.user,
                        token: data?.token,
                    })
                );
                nav("..");
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
        if (formData.email && formData.password) {
            setCanSave(true);
        } else {
            setCanSave(false);
        }
    }, [formData]);

    const handleShowPassword = () => {
        setIsShowed(!isShowed);
    };

    return (
        <section className="flex items-center justify-center w-full">
            {contextHolder}
            <div className="common-card">
                <h2 className="form-tlt"> Login Account </h2>
                {apiError && <ErrorMsg message={apiError} isFromApi={true} />}
                <form action="#" onSubmit={handleSubmit(onSubmit)}>
                    {/* email */}
                    <div className="mb-5">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: "Email is required!",
                                },
                                pattern: {
                                    value: /^([\w.]{4,10})+@([\w-]+\.)+[\w-]{2,4}$/,
                                    message: "Invalid email address!",
                                },
                            })}
                            id="email"
                            className={`form-input ${
                                errors.email?.message ? "input-error" : ""
                            }`}
                        />
                        <ErrorMsg message={errors.email?.message} />
                    </div>

                    {/* password */}
                    <div className="mb-5">
                        <label htmlFor="password">Password</label>
                        <div className="relative">
                            <input
                                type={isShowed ? "text" : "password"}
                                {...register("password")}
                                id="password"
                                className={`form-input ${
                                    errors.password?.message
                                        ? "input-error"
                                        : ""
                                }`}
                            />
                            <PwsBtn
                                event={handleShowPassword}
                                isShowed={isShowed}
                            />
                        </div>
                        <ErrorMsg message={errors.password?.message} />
                    </div>

                    <div className="flex items-center gap-2 mb-5">
                        <p>Don't have an account? </p>
                        <Link
                            to={"/register"}
                            className=" text-blue-600 border-b border-blue-600 dark:text-darkTer dark:border-darkTer "
                        >
                            {" "}
                            Register{" "}
                        </Link>
                    </div>
                    <SubmitBtn
                        isSubmitting={isSubmitting}
                        label={"Login"}
                        canSave={canSave}
                        isDisabled={true}
                    />
                </form>
            </div>
        </section>
    );
};

export default Login;
