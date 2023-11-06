import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { PwsBtn, SubmitBtn, ErrorMsg } from "@/components";
import { useNavigate } from "react-router-dom";
import { useDeleteUserMutation } from "./UserApi";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { setLoginState } from "../auth/authSlice";
import Swal from "sweetalert2";

const AccountDeleteForm = () => {
    const [showPassword, setShowPassword] = useState(false);
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

    const [deleteUser] = useDeleteUserMutation();

    const onSubmit = async (data) => {
        const userData = { ...data, id: user?._id };
        Swal.fire({
            title: "Are you sure?",
            text: "Deleting account will also delete your blogs!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#2563eb",
            cancelButtonColor: "#dc2626",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                handleAccountDelete(userData);
            }
        });
    };

    const handleAccountDelete = async (userData) => {
        setIsSubmitting(true);
        try {
            const { data } = await deleteUser(userData);
            if (data?.success) {
                Swal.fire(
                    "Deleted!",
                    "Your account has been deleted.",
                    "success"
                );
                Cookies.remove("token");
                Cookies.remove("user");
                setIsSubmitting(false);
                dispatch(setLoginState(false));
                nav("/", { state: data?.message });
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
        if (formData.password) {
            setCanSave(true);
        } else {
            setCanSave(false);
        }
    }, [formData]);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <section className="  flex items-center justify-center  w-full">
            <div className="common-card">
                <h2 className="form-tlt"> Confirm Account Deletion </h2>

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
                    <SubmitBtn
                        label={"Confirm"}
                        isSubmitting={isSubmitting}
                        canSave={canSave}
                        isDisabled={true}
                    />
                </form>
            </div>
        </section>
    );
};

export default AccountDeleteForm;
