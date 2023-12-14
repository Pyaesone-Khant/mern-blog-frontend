import {  useState } from "react";
import {SubmitBtn, FormLabel} from "@/components";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterAccountMutation } from "./authApi";
import {useDispatch} from "react-redux";
import {setAlertMessage} from "@/core/globalSlice.js";
import {Form, Input} from "antd";

const Register = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const nav = useNavigate();
    const dispatch = useDispatch();
    const currentRoute = location.pathname;

    const [registerAccount] = useRegisterAccountMutation();
    const onSubmit = async (values) => {
        try {
            delete values.password_confirmation;
            setIsSubmitting(true);
            const { data } = await registerAccount(values);
            if (data?.success) {
                setIsSubmitting(false);
                nav("/verifyOtp", {state : {
                    email : values?.email, prevRoute : currentRoute
                    }});
                dispatch(setAlertMessage({type : "success", content : data?.message}))
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
        <section className=" w-full flex items-center justify-center">
            <div className="common-card">

                {/*<p>Dear {name}, </p>*/}
                {/*<br/><br/>*/}
                {/*<p> Thank you for registering on our website! To complete the registration process and verify your email, please user this One-Time Password (OTP).</p>*/}
                {/*<p> Your OTP : <strong> otp </strong> </p>*/}
                {/*<p>Thank you for using our blog app!</p>*/}
                {/*<br/><br/>*/}
                {/*<p> Best regards, <br/> PK-Blog Team. </p>*/}

                <div className="text-center mb-8">
                <h2 className="form-tlt"> Register Account </h2>
                    <p className={` text-gray-500 dark:text-gray-300`} >Already have an account? <Link
                        to={"/login"}
                        className=" text-blue-600 border-b border-blue-600 dark:text-darkTer dark:border-darkTer "
                    >
                        {" "}
                        Login{" "}
                    </Link></p>

                </div>

                <Form layout={"vertical"} onFinish={onSubmit} >
                    <Form.Item label={<FormLabel label={"name"}/>} name={"name"} rules={[
                        {
                            required : true, message : "Name is required!"
                        },{
                        pattern: /\b([A-ZÀ-ÿ][-,a-zA-Z. ']+[ ]*)+/,
                        message:
                        "First letter of the name must be a capital letter!",
                    },{
                        min: 5,
                        message: "Name should not be too short!",
                    },
                    ]} >
                        <Input placeholder={"Enter your name"} />
                    </Form.Item>
                    <Form.Item label={<FormLabel label={"email"}/>} name={"email"} rules={[
                        {
                            required : true, message : "Email address is required!"
                        },{
                        type: "email",
                            pattern: /^([\w.]{4,10})+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: "Invalid email address!",
                        }
                    ]} >
                        <Input placeholder={"example@gmail.com"} />
                    </Form.Item>
                    <Form.Item label={<FormLabel label={"password" +
                        ""}/>} name={"password"} rules={[
                        {
                            required : true, message : "Password is required!"
                        },{
                            pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                            message:
                                "Password must have minimum eight characters, at least one uppercase letter, one number and one special character.",
                        }
                    ]} >
                        <Input.Password placeholder={"Enter your password"} />
                    </Form.Item>
                    <Form.Item label={<FormLabel label={"Confirm Password"}/>} name={"password_confirmation"} dependencies={["password"]} rules={[
                        {
                            required : true, message : "Password confirmation is required!"
                        },({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The password confirmation does not match!'));
                            },
                        }),
                    ]} >
                        <Input.Password placeholder={"Confirm your password"} />
                    </Form.Item>
                    <div className={`py-3`} ></div>
                    <SubmitBtn label={"Register"} isSubmitting={isSubmitting} />
                </Form>
            </div>
        </section>
    );
};

export default Register;
