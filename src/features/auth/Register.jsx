// components
import {BackBtn, CustomBtn} from "@/components";
import AuthComponentWrapper from "@/features/auth/AuthComponentWrapper.jsx";
import {Form, Input} from "antd";

// apis
import {useRegisterAccountMutation} from "./authApi";

// reducers
import {setAlertMessage} from "@/core/globalSlice.js";

// third-party
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";

const Register = () => {

    const nav = useNavigate();
    const dispatch = useDispatch();
    const currentRoute = location.pathname;

    const [registerAccount, {isLoading}] = useRegisterAccountMutation();
    const onSubmit = async (values) => {
        try {
            delete values.password_confirmation;
            const {data, error} = await registerAccount(values);
            if (data) {
                nav("/verifyOtp", {
                    state: {
                        email: values?.email, prevRoute: currentRoute
                    }
                });
                dispatch(setAlertMessage({type: "success", content: data?.message}))
            } else {
                dispatch(setAlertMessage({type: "error", content: error?.data?.message || "Something went wrong!"}))
            }
        } catch (error) {
            throw new Error(error);
        }
    };

    return (
        <AuthComponentWrapper>
            <Form layout={"vertical"} onFinish={onSubmit} className={`max-w-md w-full px-4`}>
                <div className="text-center mb-6">
                    <h2 className="form-tlt"> Register Account </h2>
                </div>
                <Form.Item name={"name"} rules={[
                    {
                        required: true, message: "Name is required!"
                    }, {
                        pattern: /\b([A-ZÀ-ÿ][-,a-zA-Z. ']+[ ]*)+/,
                        message:
                            "First letter of the name must be a capital letter!",
                    }, {
                        min: 4,
                        message: "Name should not be too short!",
                    },
                ]}>
                    <Input placeholder={"Name"}/>
                </Form.Item>
                <Form.Item name={"email"} rules={[
                    {
                        required: true, message: "Email address is required!"
                    }, {
                        type: "email",
                        pattern: /^([\w.]{4,10})+@([\w-]+\.)+[\w-]{2,4}$/,
                        message: "Invalid email address!",
                    }
                ]}>
                    <Input placeholder={"Email"}/>
                </Form.Item>
                <Form.Item name={"password"} rules={[
                    {
                        required: true, message: "Password is required!"
                    }, {
                        pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                            "Password must have minimum eight characters, at least one uppercase letter, one number and one special character.",
                    }
                ]}>
                    <Input.Password placeholder={"Password"}/>
                </Form.Item>
                <Form.Item name={"password_confirmation"}
                           dependencies={["password"]} rules={[
                    {
                        required: true, message: "Password confirmation is required!"
                    }, ({getFieldValue}) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('The password confirmation does not match!'));
                        },
                    }),
                ]}>
                    <Input.Password placeholder={"Confirm Password"}/>
                </Form.Item>
                <CustomBtn htmlType={"submit"} className={`w-full`} loading={isLoading}>
                    Register
                </CustomBtn>

                <div className={`flex items-center justify-center mt-6`}>
                    <p className={`dark:text-gray-300 text-black`}>Already have an account?</p>
                    <CustomBtn isLink={true} href={"/login"} size={"xs"} variant={"ghost"} className={`font-semibold`}>
                        Login
                    </CustomBtn>
                </div>

                <div className={`mt-10 flex justify-center`}>
                    <BackBtn/>
                </div>
            </Form>
        </AuthComponentWrapper>
    );
};

export default Register;
