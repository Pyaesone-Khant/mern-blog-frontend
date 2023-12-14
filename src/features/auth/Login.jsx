import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginAccountMutation } from "./authApi";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { setLoginState } from "./authSlice";
import {SubmitBtn, FormLabel} from "@/components";
import {setAlertMessage} from "@/core/globalSlice.js";
import {Form, Input} from "antd";

const Login = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();
    const [loginAccount, {isLoading}] = useLoginAccountMutation();
    const nav = useNavigate();

    const onSubmit = async (userData) => {
        try {
            setIsSubmitting(true);
            const { data } = await loginAccount(userData);
            if (data?.success) {
                Cookies.set("token", data?.token, {
                    expires: 60 * 60 * 24,
                });
                setIsSubmitting(false);
                dispatch(
                    setLoginState({
                        isLoggedIn: true,
                        token: data?.token,
                    })
                );
                dispatch(setAlertMessage({type : "success", content : "Login successful!"}))
                nav("/");
            } else {
                setIsSubmitting(false);
                dispatch(setAlertMessage({type : "error", content : data?.message}))
            }
        } catch (error) {
            throw new Error(error);
        }finally {
            setIsSubmitting(false)
        }
    };

    return (
        <section className="flex items-center justify-center w-full">
            <div className="common-card">
                <div className="text-center mb-8">
                <h2 className="form-tlt"> Login Account </h2>
                    <p className={` text-gray-500 dark:text-gray-300`}>Don't have an account? <Link
                        to={"/register"}
                        className=" text-blue-600 border-b border-blue-600 dark:text-darkTer dark:border-darkTer "
                    >
                        {" "}
                        Register{" "}
                    </Link> </p>

                </div>

                <Form layout={"vertical"} onFinish={onSubmit}>
                    <Form.Item label={<FormLabel label={"email"}/>} name={"email"} rules={[
                        {required : true, message : "Email address is required!"}
                    ]} >
                        <Input placeholder={"example@gmail.com"} />
                    </Form.Item>
                    <Form.Item label={<FormLabel label={"password"} />} name={"password"} rules={[
                        {required : true, message : "Password is required!"}
                    ]} className={`mb-2`}  >
                        <Input.Password placeholder={"Enter your password"} />
                    </Form.Item>
                    <Link
                        to={"/forgotPassword"}
                        className=" text-blue-600 dark:text-darkTer dark:border-darkTer block w-fit mb-8"
                    >
                        Forgot Password ?
                    </Link>

                    <SubmitBtn
                        isSubmitting={isLoading}
                        label={"Login"}
                    />
                </Form>
            </div>
        </section>
    );
};

export default Login;
