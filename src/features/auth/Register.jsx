import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SubmitBtn, PwsBtn, ErrorMsg } from "@/components";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterAccountMutation } from "./authApi";

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);
    const [canSave, setCanSave] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiErrors] = useState("");
    const form = useForm();
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        setError,
    } = form;
    const formData = watch();

    const [registerAccount] = useRegisterAccountMutation();
    const nav = useNavigate();

    const onSubmit = async (data) => {
        if (data.name?.trim().length < 5) {
            setError("name", { message: "Name is too short!" });
        }
        if (data.password !== data.password_confirmation) {
            setError("password_confirmation", {
                message: "Password confirmation does not match!",
            });
            return;
        }
        const userObj = {
            name: data.name,
            email: data.email,
            password: data.password,
        };
        try {
            setIsSubmitting(true);
            const { data } = await registerAccount(userObj);
            if (data?.success) {
                setIsSubmitting(false);
                nav("/login", { state: data?.message });
            } else {
                setApiErrors(data?.message);
                setIsSubmitting(false);
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    useEffect(() => {
        if (
            formData.name &&
            formData.email &&
            formData.password &&
            formData.password_confirmation
        ) {
            setCanSave(true);
        } else {
            setCanSave(false);
        }
    }, [formData]);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleShowPasswordConfirmation = () => {
        setShowPasswordConfirmation(!showPasswordConfirmation);
    };
    return (
        <section className=" w-full flex items-center justify-center">
            <div className="p-5 rounded-md shadow-md max-w-2xl w-full border bg-white">
                <h2 className="form-tlt"> Register Account </h2>

                {apiError && <ErrorMsg message={apiError} isFromApi={true} />}

                <form action="#" onSubmit={handleSubmit(onSubmit)}>
                    {/* name */}
                    <div className="mb-5">
                        <label htmlFor="name">Name</label>
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
                                    message: "Name should not be too short!",
                                },
                            })}
                            id="name"
                            className={`form-input ${
                                errors.name?.message ? "input-error" : ""
                            }`}
                        />
                        <ErrorMsg message={errors.name?.message} />
                    </div>

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
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password is required!",
                                    },
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                        message:
                                            "Password must have minimum eight characters, at least one uppercase letter, one number and one special character.",
                                    },
                                    minLength: {
                                        value: 8,
                                        message:
                                            "Password must have at least 8 characters!",
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
                                event={handleShowPassword}
                                isShowed={showPassword}
                            />
                        </div>
                        <ErrorMsg message={errors.password?.message} />
                    </div>

                    {/* password confirmation */}
                    <div className="mb-5">
                        <label htmlFor="password_confirmation">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={
                                    showPasswordConfirmation
                                        ? "text"
                                        : "password"
                                }
                                {...register("password_confirmation", {
                                    required: {
                                        value: true,
                                        message:
                                            "Please confirm your password!",
                                    },
                                })}
                                id="password_confirmation"
                                className={`form-input ${
                                    errors.password_confirmation?.message
                                        ? "input-error"
                                        : ""
                                }`}
                            />
                            <PwsBtn
                                event={handleShowPasswordConfirmation}
                                isShowed={showPasswordConfirmation}
                            />
                        </div>
                        <ErrorMsg
                            message={errors.password_confirmation?.message}
                        />
                    </div>

                    <div className="flex items-center gap-2 mb-5">
                        <p>Already have an account? </p>
                        <Link
                            to={"/login"}
                            className=" text-blue-600 border-b border-blue-600 "
                        >
                            {" "}
                            Login{" "}
                        </Link>
                    </div>
                    <SubmitBtn
                        isSubmitting={isSubmitting}
                        label={"Register"}
                        canSave={canSave}
                        isDisabled={true}
                    />
                </form>
            </div>
        </section>
    );
};

export default Register;
