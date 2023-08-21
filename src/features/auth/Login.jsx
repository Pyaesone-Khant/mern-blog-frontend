import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsEyeSlashFill, BsEyeFill } from "react-icons/bs";
import { Spinner } from "../../components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginAccountMutation } from "./authApi";
import Cookies from "js-cookie";
import { notification } from "antd";
import { useDispatch } from "react-redux";
import { setLoginState } from "./authSlice";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
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
            //console.log(data);
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
        setShowPassword(!showPassword);
    };

    return (
        <section className="flex items-center justify-center w-full">
            {contextHolder}
            <div className="p-5 rounded-md shadow-md max-w-2xl w-full border bg-white">
                <h2 className="form-tlt"> Login Account </h2>

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
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            {...register("email")}
                            id="email"
                            className={`form-input ${
                                errors.email?.message ? "input-error" : ""
                            }`}
                        />
                        <p className="error"> {errors.email?.message} </p>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password")}
                                id="password"
                                className={`form-input ${
                                    errors.password?.message
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
                        <p className="error"> {errors.password?.message} </p>
                    </div>
                    <div className="flex items-center gap-2 mb-5">
                        <p>Don't have an account? </p>
                        <Link
                            to={"/register"}
                            className=" text-blue-600 border-b border-blue-600 "
                        >
                            {" "}
                            Register{" "}
                        </Link>
                    </div>
                    <button
                        className={` btn submit-btn ${
                            canSave && !isSubmitting ? "" : "disabled"
                        }`}
                        disabled={!canSave || isSubmitting}
                    >
                        {isSubmitting ? <Spinner /> : "Login"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Login;
